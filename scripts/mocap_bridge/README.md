# OptiTrack → PX4 MoCap Bridge

Bridges OptiTrack Motive (NatNet) position data to PX4 Pixhawk via MAVLink `VISION_POSITION_ESTIMATE`. Also forwards MAVLink to QGC so you can arm and monitor.

---

## Quick Setup (5 minutes)

### 1. Install Python + Dependencies

```bash
# Check Python is installed
python --version    # Need 3.7+

# Install dependencies
cd scripts/mocap_bridge
pip install -r requirements.txt
```

### 2. Configure Motive Streaming

In Motive:
1. **View** → **Data Streaming Pane** (opens a streaming panel)
2. Enable **Broadcast Frame Data** = ON
3. **Type** = Multicast (recommended) or Unicast
4. **Local Interface** = the network adapter connected to your network
5. **Command Port** = 1510 (default)
6. **Data Port** = 1511 (default)
7. **Multicast Address** = 239.255.42.99 (default)

### 3. Create Rigid Body

1. Place QAV250 in capture volume with reflective markers
2. Select all markers in 3D viewport
3. Right-click → **Rigid Body** → **Create From Selected Markers**
4. Note the **Rigid Body ID** (default is 1, shown in Properties panel)

### 4. Set PX4 Parameters

Connect Pixhawk via USB, open QGC → Vehicle Setup → Parameters. Set:

| Parameter | Value | Why |
|---|---|---|
| `EKF2_EV_CTRL` | `15` | Fuse position + velocity + yaw from vision |
| `EKF2_HGT_REF` | `3` (Vision) | Use MoCap for altitude |
| `EKF2_EV_DELAY` | `10` | Pipeline latency in ms (tune later) |
| `EKF2_EVP_NOISE` | `0.01` | Position noise, meters (OptiTrack is very accurate) |
| `EKF2_EVA_NOISE` | `0.01` | Attitude noise, radians |
| `EKF2_MAG_TYPE` | `5` | Don't use magnetometer (use MoCap heading) |
| `COM_ARM_MAG_STR` | `-1` | Disable mag check |
| `COM_RC_IN_MODE` | `4` | No RC stick input (arm from QGC) |
| `NAV_RCL_ACT` | `1` (Hold) | Hold position on RC loss |
| `COM_ARM_WO_GPS` | `1` | Allow arming without GPS |

**Reboot Pixhawk after setting parameters.**

### 5. Run the Bridge

**Close QGC first** (it will reconnect through the bridge).

```bash
# Basic usage (Motive on same machine, Pixhawk on COM5):
python optitrack_bridge.py --com COM5

# If Motive is on a different machine:
python optitrack_bridge.py --com COM5 --motive_ip 192.168.1.100

# If your rigid body has a different ID:
python optitrack_bridge.py --com COM5 --rb_id 2

# Linux:
python optitrack_bridge.py --com /dev/ttyACM0 --motive_ip 192.168.1.100
```

### 6. Reconnect QGC Through Bridge

1. Open QGC
2. **Application Settings** (Q icon) → **Comm Links**
3. **Add** a new connection:
   - Type: **UDP**
   - Port: **14551**
   - Target Host: **127.0.0.1**
4. Click **Connect**

QGC should connect and show the vehicle.

### 7. Verify

The bridge prints status every 2 seconds:
```
[Bridge] OptiTrack→PX4 | NED: (+0.010, -0.005, -0.950) m | RPY: (+0.5, -0.3, +45.2)° | Msgs: 150
```

In QGC, the position display should match the drone's physical position.

---

## Coordinate Frame

**Motive default** (Y-up): X-right, Y-up, Z-forward  
**PX4 NED**: X-forward(North), Y-right(East), Z-down

The bridge auto-converts using the `--frame` flag:
- `z_forward` (default) — Motive Y-up convention
- `z_up` — If you set Motive to Z-up in settings

**To verify:** Move the drone right → QGC should show Y increasing. Move forward → X increasing. Move up → Z decreasing (NED = down is positive).

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "No heartbeat" | Check COM port, try different baud (57600, 115200, 921600) |
| "Waiting for OptiTrack data" | Check Motive streaming is ON, multicast enabled |
| QGC won't connect | Make sure QGC uses UDP port 14551 (not USB) |
| Position jumps | Check marker placement, reduce `EKF2_EVP_NOISE` |
| Heading wrong | Check `--frame` setting matches Motive coordinate convention |
| Can't arm | Run `commander check` in MAVLink console to see what's failing |

---

## Finding COM Port

### Windows
- Device Manager → Ports (COM & LPT) → Look for "USB Serial Device" or "PX4 FMU"
- Or: QGC shows it when connecting

### Linux
```bash
ls /dev/ttyACM*    # Usually /dev/ttyACM0
ls /dev/ttyUSB*    # Alternative
```
