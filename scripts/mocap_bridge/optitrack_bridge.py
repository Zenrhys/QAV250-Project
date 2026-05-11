#!/usr/bin/env python3
"""
OptiTrack → PX4 MoCap Bridge
=============================
Reads rigid body pose from Motive via NatNet protocol.
Sends VISION_POSITION_ESTIMATE to PX4 Pixhawk via MAVLink.
Forwards MAVLink to QGC via UDP so you can still arm/monitor.

Setup:
  1. pip install pymavlink pyserial
  2. Download NatNetClient.py from OptiTrack GitHub (see README)
  3. Run: python optitrack_bridge.py --com COM5 --motive_ip 127.0.0.1

Author: QAV250 Capstone Project
"""

import argparse
import math
import socket
import struct
import sys
import threading
import time

try:
    from pymavlink import mavutil
except ImportError:
    print("ERROR: pymavlink not found. Run: pip install pymavlink pyserial")
    sys.exit(1)


# ============================================================
# NatNet Receiver (Minimal implementation for Motive)
# ============================================================
class NatNetReceiver:
    """
    Receives rigid body data from Motive via NatNet multicast.
    
    If this doesn't work with your Motive version, replace with
    OptiTrack's official NatNetClient.py (see README).
    """
    
    MULTICAST_ADDR = "239.255.42.99"
    DATA_PORT = 1511
    COMMAND_PORT = 1510
    NAT_FRAMEOFDATA = 7
    
    def __init__(self, server_ip="127.0.0.1", local_ip="", multicast=True):
        self.server_ip = server_ip
        self.local_ip = local_ip
        self.multicast = multicast
        self.rigid_bodies = {}
        self.running = False
        self._lock = threading.Lock()
        self.frame_count = 0
        self.last_frame_time = 0
    
    def start(self):
        """Start receiving in background thread."""
        self.running = True
        
        # Create data socket
        self.data_socket = socket.socket(
            socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP
        )
        self.data_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        
        if self.multicast:
            # Bind to data port and join multicast group
            self.data_socket.bind(("", self.DATA_PORT))
            mreq = struct.pack(
                "4s4s",
                socket.inet_aton(self.MULTICAST_ADDR),
                socket.inet_aton(self.local_ip if self.local_ip else "0.0.0.0")
            )
            self.data_socket.setsockopt(
                socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq
            )
            print(f"[NatNet] Joined multicast {self.MULTICAST_ADDR}:{self.DATA_PORT}")
        else:
            # Unicast mode: send connect request to Motive
            self.data_socket.bind(("", 0))
            local_port = self.data_socket.getsockname()[1]
            print(f"[NatNet] Unicast mode, listening on port {local_port}")
            
            # Send connection request
            cmd_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            # NAT_CONNECT = 0, payload = "ping"
            connect_msg = struct.pack("HH", 0, 4) + b"ping"
            cmd_socket.sendto(connect_msg, (self.server_ip, self.COMMAND_PORT))
            cmd_socket.close()
        
        self.thread = threading.Thread(target=self._receive_loop, daemon=True)
        self.thread.start()
        print("[NatNet] Receiver started, waiting for data...")
    
    def _receive_loop(self):
        """Receive loop running in background thread."""
        while self.running:
            try:
                self.data_socket.settimeout(1.0)
                data, addr = self.data_socket.recvfrom(65535)
                self._parse_packet(data)
            except socket.timeout:
                continue
            except Exception as e:
                if self.running:
                    print(f"[NatNet] Error: {e}")
    
    def _parse_packet(self, data):
        """Parse a NatNet data packet."""
        if len(data) < 4:
            return
        
        msg_id, payload_size = struct.unpack_from("<HH", data, 0)
        
        if msg_id != self.NAT_FRAMEOFDATA:
            return
        
        try:
            self._parse_frame(data, 4)
            self.frame_count += 1
            self.last_frame_time = time.time()
        except (struct.error, IndexError) as e:
            pass  # Packet format mismatch, try next frame
    
    def _parse_frame(self, data, offset):
        """
        Parse NatNet frame data to extract rigid bodies.
        Compatible with NatNet 3.x / 4.x (Motive).
        """
        # Frame number
        frame_num = struct.unpack_from("<I", data, offset)[0]
        offset += 4
        
        # === Marker sets ===
        n_marker_sets = struct.unpack_from("<I", data, offset)[0]
        offset += 4
        for _ in range(n_marker_sets):
            # Null-terminated name
            end = data.index(b'\0', offset)
            offset = end + 1
            # Markers in set
            n_markers = struct.unpack_from("<I", data, offset)[0]
            offset += 4
            offset += n_markers * 12  # 3 floats per marker
        
        # === Unidentified markers ===
        n_other = struct.unpack_from("<I", data, offset)[0]
        offset += 4
        offset += n_other * 12
        
        # === Rigid Bodies ===
        n_rigid_bodies = struct.unpack_from("<I", data, offset)[0]
        offset += 4
        
        for _ in range(n_rigid_bodies):
            # ID, position, orientation
            rb_id = struct.unpack_from("<i", data, offset)[0]
            offset += 4
            
            x, y, z = struct.unpack_from("<fff", data, offset)
            offset += 12
            
            qx, qy, qz, qw = struct.unpack_from("<ffff", data, offset)
            offset += 16
            
            with self._lock:
                self.rigid_bodies[rb_id] = {
                    'pos': (x, y, z),
                    'quat': (qw, qx, qy, qz),  # Store as (w, x, y, z)
                    'time': time.time(),
                    'frame': frame_num
                }
            
            # Skip per-rigid-body marker data (NatNet 3.0+)
            # Number of markers in this rigid body
            n_rb_markers = struct.unpack_from("<I", data, offset)[0]
            offset += 4
            offset += n_rb_markers * 12  # Marker positions
            offset += n_rb_markers * 4   # Marker IDs
            offset += n_rb_markers * 4   # Marker sizes
            offset += 4  # Mean marker error
            offset += 2  # Tracking flags (NatNet 2.6+)
    
    def get_rigid_body(self, rb_id=1):
        """Get latest rigid body data. Returns None if not available."""
        with self._lock:
            rb = self.rigid_bodies.get(rb_id)
            if rb is None:
                return None
            # Check staleness (>0.5s = stale)
            if time.time() - rb['time'] > 0.5:
                return None
            return rb.copy()
    
    def stop(self):
        self.running = False
        try:
            self.data_socket.close()
        except:
            pass


# ============================================================
# Coordinate Transform
# ============================================================
def optitrack_to_ned(pos, quat, frame_config="z_forward"):
    """
    Convert OptiTrack coordinates to PX4 NED frame.
    
    Motive default: X-right, Y-up, Z-forward (right-handed)
    PX4 NED:        X-forward(N), Y-right(E), Z-down(D)
    
    Args:
        pos: (x, y, z) in OptiTrack frame
        quat: (qw, qx, qy, qz) in OptiTrack frame
        frame_config: coordinate convention in Motive
            "z_forward" - Motive default (X-right, Y-up, Z-forward)
            "y_up"      - same as z_forward (alias)
            "z_up"      - Motive Z-up setting (X-forward, Y-right, Z-up)
    
    Returns:
        ned_pos: (x, y, z) in NED
        ned_euler: (roll, pitch, yaw) in radians
    """
    ox, oy, oz = pos
    qw, qx, qy, qz = quat
    
    if frame_config in ("z_forward", "y_up"):
        # Motive default: X-right, Y-up, Z-forward
        # NED: X=forward, Y=right, Z=down
        ned_x = oz   # forward = Motive Z
        ned_y = ox   # right   = Motive X
        ned_z = -oy  # down    = -Motive Y
        
        # Quaternion transform (same axis mapping)
        ned_qw = qw
        ned_qx = qz
        ned_qy = qx
        ned_qz = -qy
    
    elif frame_config == "z_up":
        # Motive Z-up: X-forward, Y-right, Z-up (some labs set this)
        # NED: X=forward, Y=right, Z=down
        ned_x = ox    # forward = Motive X
        ned_y = oy    # right   = Motive Y
        ned_z = -oz   # down    = -Motive Z
        
        ned_qw = qw
        ned_qx = qx
        ned_qy = qy
        ned_qz = -qz
    
    else:
        raise ValueError(f"Unknown frame_config: {frame_config}")
    
    # Quaternion to Euler (roll, pitch, yaw)
    # Using aerospace convention (ZYX rotation)
    sinr_cosp = 2 * (ned_qw * ned_qx + ned_qy * ned_qz)
    cosr_cosp = 1 - 2 * (ned_qx * ned_qx + ned_qy * ned_qy)
    roll = math.atan2(sinr_cosp, cosr_cosp)
    
    sinp = 2 * (ned_qw * ned_qy - ned_qz * ned_qx)
    sinp = max(-1, min(1, sinp))  # Clamp for asin
    pitch = math.asin(sinp)
    
    siny_cosp = 2 * (ned_qw * ned_qz + ned_qx * ned_qy)
    cosy_cosp = 1 - 2 * (ned_qy * ned_qy + ned_qz * ned_qz)
    yaw = math.atan2(siny_cosp, cosy_cosp)
    
    return (ned_x, ned_y, ned_z), (roll, pitch, yaw)


# ============================================================
# MAVLink Bridge
# ============================================================
class MAVLinkBridge:
    """
    Connects to Pixhawk via serial, forwards MAVLink to QGC,
    and injects VISION_POSITION_ESTIMATE messages.
    """
    
    def __init__(self, com_port, baud=921600, qgc_host="127.0.0.1", qgc_port=14550):
        self.com_port = com_port
        self.baud = baud
        self.qgc_host = qgc_host
        self.qgc_port = qgc_port
        self.running = False
        self.px4_conn = None
        self.qgc_socket = None
        self.qgc_addr = None
        self.msg_count = 0
    
    def connect(self):
        """Connect to Pixhawk and set up QGC forwarding."""
        print(f"[MAVLink] Connecting to Pixhawk on {self.com_port} @ {self.baud}...")
        
        try:
            self.px4_conn = mavutil.mavlink_connection(
                self.com_port, baud=self.baud, source_system=255, source_component=190
            )
        except Exception as e:
            print(f"[MAVLink] Failed to connect: {e}")
            print(f"[MAVLink] Make sure QGC is CLOSED and COM port is correct.")
            return False
        
        # Wait for heartbeat
        print("[MAVLink] Waiting for Pixhawk heartbeat...")
        msg = self.px4_conn.wait_heartbeat(timeout=10)
        if msg is None:
            print("[MAVLink] No heartbeat received. Check USB connection.")
            return False
        
        print(f"[MAVLink] Connected! System {self.px4_conn.target_system}, "
              f"Component {self.px4_conn.target_component}")
        
        # Set up UDP socket for QGC forwarding
        self.qgc_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.qgc_socket.setblocking(False)
        self.qgc_socket.bind(("0.0.0.0", self.qgc_port + 1))  # Listen on 14551
        
        print(f"[MAVLink] QGC forwarding: connect QGC to UDP 127.0.0.1:{self.qgc_port + 1}")
        
        self.running = True
        return True
    
    def start_forwarding(self):
        """Start forwarding MAVLink between Pixhawk and QGC."""
        # Thread: Pixhawk → QGC
        self.fwd_thread = threading.Thread(target=self._forward_px4_to_qgc, daemon=True)
        self.fwd_thread.start()
        
        # Thread: QGC → Pixhawk
        self.rev_thread = threading.Thread(target=self._forward_qgc_to_px4, daemon=True)
        self.rev_thread.start()
    
    def _forward_px4_to_qgc(self):
        """Forward messages from Pixhawk to QGC."""
        while self.running:
            try:
                msg = self.px4_conn.recv_match(blocking=True, timeout=0.1)
                if msg is not None:
                    # Forward raw bytes to QGC
                    buf = msg.get_msgbuf()
                    if self.qgc_addr:
                        self.qgc_socket.sendto(buf, self.qgc_addr)
                    else:
                        # Send to default QGC address
                        self.qgc_socket.sendto(buf, (self.qgc_host, self.qgc_port))
            except Exception:
                pass
    
    def _forward_qgc_to_px4(self):
        """Forward messages from QGC to Pixhawk."""
        while self.running:
            try:
                data, addr = self.qgc_socket.recvfrom(65535)
                self.qgc_addr = addr  # Remember QGC's address for replies
                self.px4_conn.write(data)
            except BlockingIOError:
                time.sleep(0.01)
            except Exception:
                pass
    
    def send_vision_position(self, ned_pos, euler, timestamp_us):
        """
        Send VISION_POSITION_ESTIMATE to PX4.
        
        Args:
            ned_pos: (x, y, z) in NED frame, meters
            euler: (roll, pitch, yaw) in radians
            timestamp_us: timestamp in microseconds
        """
        if self.px4_conn is None:
            return
        
        self.px4_conn.mav.vision_position_estimate_send(
            timestamp_us,
            ned_pos[0], ned_pos[1], ned_pos[2],
            euler[0], euler[1], euler[2]
        )
        self.msg_count += 1
    
    def stop(self):
        self.running = False
        if self.px4_conn:
            self.px4_conn.close()
        if self.qgc_socket:
            self.qgc_socket.close()


# ============================================================
# Main
# ============================================================
def main():
    parser = argparse.ArgumentParser(
        description="OptiTrack → PX4 MoCap Bridge",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Windows, Motive on same machine, Pixhawk on COM5:
  python optitrack_bridge.py --com COM5
  
  # Motive on a different machine:
  python optitrack_bridge.py --com COM5 --motive_ip 192.168.1.100
  
  # Linux:
  python optitrack_bridge.py --com /dev/ttyACM0 --motive_ip 192.168.1.100
  
  # Use rigid body ID 2 instead of 1:
  python optitrack_bridge.py --com COM5 --rb_id 2
  
  # Custom coordinate frame (Motive set to Z-up):
  python optitrack_bridge.py --com COM5 --frame z_up
        """
    )
    
    parser.add_argument("--com", required=True,
                        help="Serial port for Pixhawk (e.g., COM5, /dev/ttyACM0)")
    parser.add_argument("--baud", type=int, default=921600,
                        help="Serial baud rate (default: 921600)")
    parser.add_argument("--motive_ip", default="127.0.0.1",
                        help="IP of machine running Motive (default: 127.0.0.1)")
    parser.add_argument("--rb_id", type=int, default=1,
                        help="Rigid body ID in Motive (default: 1)")
    parser.add_argument("--rate", type=int, default=30,
                        help="Rate to send vision estimates, Hz (default: 30)")
    parser.add_argument("--frame", default="z_forward",
                        choices=["z_forward", "y_up", "z_up"],
                        help="Motive coordinate frame convention (default: z_forward)")
    parser.add_argument("--qgc_port", type=int, default=14550,
                        help="UDP port for QGC connection (default: 14550)")
    parser.add_argument("--unicast", action="store_true",
                        help="Use NatNet unicast instead of multicast")
    parser.add_argument("--no_forward", action="store_true",
                        help="Don't forward MAVLink to QGC (use if QGC is on a separate connection)")
    
    args = parser.parse_args()
    
    print("=" * 60)
    print("  OptiTrack → PX4 MoCap Bridge")
    print("=" * 60)
    print(f"  Pixhawk:    {args.com} @ {args.baud}")
    print(f"  Motive IP:  {args.motive_ip}")
    print(f"  Rigid Body: ID {args.rb_id}")
    print(f"  Send Rate:  {args.rate} Hz")
    print(f"  Frame:      {args.frame}")
    print(f"  QGC Port:   {args.qgc_port}")
    print("=" * 60)
    
    # --- Connect to Pixhawk ---
    bridge = MAVLinkBridge(
        args.com, args.baud,
        qgc_port=args.qgc_port
    )
    if not bridge.connect():
        sys.exit(1)
    
    if not args.no_forward:
        bridge.start_forwarding()
        print(f"\n[INFO] Open QGC → Application Settings → Comm Links")
        print(f"[INFO] Add UDP connection to 127.0.0.1:{args.qgc_port + 1}")
        print(f"[INFO] QGC will be able to arm/monitor through this bridge\n")
    
    # --- Start NatNet receiver ---
    natnet = NatNetReceiver(
        server_ip=args.motive_ip,
        multicast=not args.unicast
    )
    natnet.start()
    
    # --- Main loop: read OptiTrack, send to PX4 ---
    send_interval = 1.0 / args.rate
    last_send = 0
    last_status = 0
    no_data_warned = False
    
    print("\n[Bridge] Running. Press Ctrl+C to stop.\n")
    
    try:
        while True:
            now = time.time()
            
            # Rate limit
            if now - last_send < send_interval:
                time.sleep(0.001)
                continue
            
            # Get rigid body data
            rb = natnet.get_rigid_body(args.rb_id)
            
            if rb is None:
                if not no_data_warned and now - natnet.last_frame_time > 3:
                    print("[Bridge] Waiting for OptiTrack data...")
                    print("         Make sure Motive is streaming and rigid body exists")
                    no_data_warned = True
                time.sleep(0.1)
                continue
            
            no_data_warned = False
            
            # Transform coordinates
            ned_pos, euler = optitrack_to_ned(rb['pos'], rb['quat'], args.frame)
            
            # Send to PX4
            timestamp_us = int(now * 1e6)
            bridge.send_vision_position(ned_pos, euler, timestamp_us)
            last_send = now
            
            # Status print every 2 seconds
            if now - last_status > 2.0:
                print(f"[Bridge] OptiTrack→PX4 | "
                      f"NED: ({ned_pos[0]:+.3f}, {ned_pos[1]:+.3f}, {ned_pos[2]:+.3f}) m | "
                      f"RPY: ({math.degrees(euler[0]):+.1f}, {math.degrees(euler[1]):+.1f}, "
                      f"{math.degrees(euler[2]):+.1f})° | "
                      f"Msgs: {bridge.msg_count} | "
                      f"NatNet frames: {natnet.frame_count}")
                last_status = now
    
    except KeyboardInterrupt:
        print("\n[Bridge] Shutting down...")
    finally:
        natnet.stop()
        bridge.stop()
        print("[Bridge] Done.")


if __name__ == "__main__":
    main()
