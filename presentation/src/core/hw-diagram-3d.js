/**
 * 3D Holographic Hardware Path Diagram — Zone 6
 * Canvas-rendered flow chart: OptiTrack → Python Bridge → Pixhawk ↔ QGC
 */
import * as THREE from 'three';
import gsap from 'gsap';

const CW = 1200, CH = 650, RES = 2;
const WORLD_W = 8, WORLD_H = WORLD_W * (CH / CW);

function c2w(cx, cy) {
  return new THREE.Vector3((cx / CW - 0.5) * WORLD_W, (0.5 - cy / CH) * WORLD_H, 0.03);
}

// ── Box definitions (canvas px) ──
const PIXHAWK = { x: 430, y: 50,  w: 340, h: 210 };
const QGC     = { x: 860, y: 100, w: 280, h: 180 };
const BRIDGE  = { x: 430, y: 370, w: 340, h: 180 };
const OPTI    = { x: 40,  y: 370, w: 310, h: 180 };

// ── Canvas helpers ──
function drawBox(ctx, b, title, subtitle, bullets, borderCol, fillCol, titleCol) {
  ctx.fillStyle = fillCol;
  ctx.fillRect(b.x, b.y, b.w, b.h);
  ctx.strokeStyle = borderCol;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(b.x, b.y, b.w, b.h);
  const tk = 10;
  [[b.x,b.y],[b.x+b.w,b.y],[b.x+b.w,b.y+b.h],[b.x,b.y+b.h]].forEach(([cx,cy],i)=>{
    const dx = (i===0||i===3)?1:-1, dy = (i<2)?1:-1;
    ctx.beginPath(); ctx.moveTo(cx, cy+dy*tk); ctx.lineTo(cx, cy); ctx.lineTo(cx+dx*tk, cy);
    ctx.strokeStyle = borderCol; ctx.lineWidth = 2; ctx.stroke();
  });
  ctx.font = '700 13px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillStyle = titleCol;
  ctx.fillText(title, b.x + 14, b.y + 26);
  let yOff = 26;
  if (subtitle) { yOff += 16; ctx.font = '400 10px "JetBrains Mono", monospace'; ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.fillText(subtitle, b.x+14, b.y+yOff); }
  yOff += 18;
  ctx.font = '400 10px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.65)';
  bullets.forEach((bl,i) => { ctx.fillText('▸ ' + bl, b.x+16, b.y+yOff+i*16); });
}

function drawArrow(ctx, x1, y1, x2, y2, label, col, labelSide) {
  ctx.beginPath(); ctx.strokeStyle = col; ctx.lineWidth = 1;
  ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
  const dx = x2-x1, dy = y2-y1, len = Math.sqrt(dx*dx+dy*dy);
  const ux = dx/len, uy = dy/len, sz = 6;
  ctx.beginPath(); ctx.fillStyle = col;
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - ux*sz - uy*sz*0.5, y2 - uy*sz + ux*sz*0.5);
  ctx.lineTo(x2 - ux*sz + uy*sz*0.5, y2 - uy*sz - ux*sz*0.5);
  ctx.fill();
  if (label) {
    const mx = (x1+x2)/2, my = (y1+y2)/2;
    ctx.font = '500 9px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    if (Math.abs(dy) < Math.abs(dx)) {
      ctx.textAlign = 'center';
      ctx.fillText(label, mx, labelSide === 'below' ? my + 14 : my - 8);
    } else {
      ctx.textAlign = 'left';
      ctx.fillText(label, labelSide === 'left' ? mx - 10 : mx + 10, my);
      if (labelSide === 'left') ctx.textAlign = 'right';
    }
  }
}

function drawBidirArrow(ctx, x1, y1, x2, y2, label, col) {
  ctx.beginPath(); ctx.strokeStyle = col; ctx.lineWidth = 1.5;
  ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
  const dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy), ux=dx/len, uy=dy/len, sz=5;
  [1,-1].forEach(dir => {
    const ax = dir===1?x2:x1, ay = dir===1?y2:y1, sign = dir;
    ctx.beginPath(); ctx.fillStyle = col;
    ctx.moveTo(ax, ay);
    ctx.lineTo(ax - sign*ux*sz - uy*sz*0.4, ay - sign*uy*sz + ux*sz*0.4);
    ctx.lineTo(ax - sign*ux*sz + uy*sz*0.4, ay - sign*uy*sz - ux*sz*0.4);
    ctx.fill();
  });
  if (label) {
    const mx=(x1+x2)/2, my=(y1+y2)/2;
    ctx.font = '600 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(255,255,255,0.7)';
    if (Math.abs(dy) < Math.abs(dx)) ctx.fillText(label, mx, my - 10);
    else { ctx.textAlign = 'left'; ctx.fillText(label, mx + 10, my); }
  }
}

// ── Main creation ──
export function createHwDiagram() {
  const group = new THREE.Group();
  const canvas = document.createElement('canvas');
  canvas.width = CW * RES; canvas.height = CH * RES;
  const ctx = canvas.getContext('2d');
  ctx.scale(RES, RES);
  ctx.fillStyle = 'rgba(0,0,0,0.01)'; ctx.fillRect(0,0,CW,CH);

  // ── Boxes ──
  drawBox(ctx, PIXHAWK, 'PIXHAWK 6C MINI', 'PX4 Autopilot v1.14',
    ['EKF2 fuses MoCap pose', 'COM_RC_IN_MODE = 4 (no RC)', 'EKF2_EV_CTRL = 15', 'STM32H7 · QAV250 airframe'],
    'rgba(0,200,255,0.4)', 'rgba(0,200,255,0.05)', 'rgba(100,220,255,0.95)');

  drawBox(ctx, QGC, 'QGROUNDCONTROL', 'Ground Station',
    ['Arm / monitor / log', 'Emergency stop', 'UDP port 14551', 'Parameter tuning'],
    'rgba(255,0,180,0.4)', 'rgba(255,0,180,0.04)', 'rgba(255,120,210,0.95)');

  drawBox(ctx, BRIDGE, 'PYTHON MOCAP BRIDGE', 'optitrack_bridge.py',
    ['NatNet → MAVLink transform', 'ATT_POS_MOCAP message', 'Y-up → NED conversion', 'UDP fwd → QGC :14551'],
    'rgba(255,180,0,0.4)', 'rgba(255,180,0,0.04)', 'rgba(255,200,80,0.95)');

  drawBox(ctx, OPTI, 'OPTITRACK MOTIVE', 'Flex 13 Cameras × 6',
    ['120 Hz sub-mm accuracy', 'Rigid body tracking', 'NatNet SDK streaming', '≥4 reflective markers'],
    'rgba(0,255,136,0.4)', 'rgba(0,255,136,0.04)', 'rgba(0,255,160,0.95)');

  // ── Connection lines ──

  // Pixhawk ↔ QGC: bidirectional "Telemetry 57600 baud"
  drawBidirArrow(ctx,
    PIXHAWK.x + PIXHAWK.w, PIXHAWK.y + PIXHAWK.h/2,
    QGC.x, QGC.y + QGC.h/2,
    'TELEMETRY 57600 BAUD', 'rgba(255,120,210,0.5)');

  // Pixhawk ↔ Python Bridge: "USB / Serial"
  drawBidirArrow(ctx,
    PIXHAWK.x + PIXHAWK.w/2, PIXHAWK.y + PIXHAWK.h,
    BRIDGE.x + BRIDGE.w/2, BRIDGE.y,
    'USB / SERIAL (MAVLINK)', 'rgba(100,220,255,0.5)');

  // OptiTrack → Python Bridge: "NatNet Multicast UDP 1511"
  drawArrow(ctx,
    OPTI.x + OPTI.w, OPTI.y + OPTI.h/2,
    BRIDGE.x, BRIDGE.y + BRIDGE.h/2,
    'NATNET MULTICAST UDP 1511', 'rgba(0,255,136,0.5)');

  // ── Texture ──
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(WORLD_W, WORLD_H), mat);
  group.add(mesh);

  // Border frame
  const hw = WORLD_W/2, hh = WORLD_H/2;
  const bPts = [new THREE.Vector3(-hw,hh,0),new THREE.Vector3(hw,hh,0),new THREE.Vector3(hw,-hh,0),new THREE.Vector3(-hw,-hh,0),new THREE.Vector3(-hw,hh,0)];
  const bMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(bPts), bMat));

  // Scanline
  const scanMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
  const scanLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-hw+0.05,0,0.02), new THREE.Vector3(hw-0.05,0,0.02)]),
    scanMat
  );
  group.add(scanLine);

  // Animated packets
  const packets = createPackets(group);

  group.userData.scanLine = scanLine;
  group.userData.tableHeight = WORLD_H;
  group.userData.packets = packets;

  // Base opacities
  group.traverse(c => {
    if (c.material) {
      c.material.userData = c.material.userData || {};
      if (c === mesh) c.material.userData.baseOp = 0.9;
      else if (c === scanLine) c.material.userData.baseOp = 0.08;
      else if (c.userData.isPacket) c.material.userData.baseOp = 0.85;
      else c.material.userData.baseOp = 0.35;
    }
  });

  group.visible = false;
  return group;
}

function createPackets(group) {
  const dotGeo = new THREE.SphereGeometry(0.035, 6, 6);
  const packets = [];
  const paths = [
    { // Telemetry: Pixhawk → QGC
      pts: [c2w(PIXHAWK.x+PIXHAWK.w, PIXHAWK.y+PIXHAWK.h/2), c2w(QGC.x, QGC.y+QGC.h/2)],
      color: 0xff60d0, count: 2, speed: 0.4
    },
    { // Telemetry: QGC → Pixhawk
      pts: [c2w(QGC.x, QGC.y+QGC.h/2), c2w(PIXHAWK.x+PIXHAWK.w, PIXHAWK.y+PIXHAWK.h/2)],
      color: 0xff60d0, count: 2, speed: 0.35
    },
    { // USB: Pixhawk → Bridge
      pts: [c2w(PIXHAWK.x+PIXHAWK.w/2, PIXHAWK.y+PIXHAWK.h), c2w(BRIDGE.x+BRIDGE.w/2, BRIDGE.y)],
      color: 0x00ccff, count: 2, speed: 0.3
    },
    { // USB: Bridge → Pixhawk
      pts: [c2w(BRIDGE.x+BRIDGE.w/2, BRIDGE.y), c2w(PIXHAWK.x+PIXHAWK.w/2, PIXHAWK.y+PIXHAWK.h)],
      color: 0x00ccff, count: 2, speed: 0.35
    },
    { // NatNet: OptiTrack → Bridge
      pts: [c2w(OPTI.x+OPTI.w, OPTI.y+OPTI.h/2), c2w(BRIDGE.x, BRIDGE.y+BRIDGE.h/2)],
      color: 0x00ff88, count: 3, speed: 0.3
    },
  ];

  paths.forEach(p => {
    for (let d = 0; d < p.count; d++) {
      const mat = new THREE.MeshBasicMaterial({ color: p.color, transparent: true, opacity: 0 });
      mat.userData = { baseOp: 0.85 };
      const dot = new THREE.Mesh(dotGeo, mat);
      dot.userData = { isPacket: true, path: p.pts, speed: p.speed, offset: d / p.count };
      group.add(dot);
      packets.push(dot);
    }
  });
  return packets;
}

/** Flicker in */
export function flickerInHw(diagram) {
  diagram.visible = true;
  const mats = [];
  diagram.traverse(c => { if (c.material) mats.push(c.material); });
  mats.forEach(m => { m.opacity = 0; });
  const tl = gsap.timeline();
  [0.25, 0, 0.5, 0.1, 0.6, 0.15, 0.85, 0.3].forEach((op, i) => {
    tl.to({}, { duration: [0.05,0.08,0.04,0.06,0.05,0.07,0.06,0.04][i],
      onStart: () => { mats.forEach(m => { m.opacity = op * (m.userData.baseOp || 0.8); }); }
    });
  });
  tl.to({}, { duration: 0.3, onStart: () => {
    mats.forEach(m => { gsap.to(m, { opacity: m.userData.baseOp || 0.8, duration: 0.3 }); });
  }});
}

/** Fade out */
export function fadeOutHw(diagram) {
  diagram.traverse(c => { if (c.material) gsap.to(c.material, { opacity: 0, duration: 0.4 }); });
  setTimeout(() => { diagram.visible = false; }, 500);
}

/** Animate packets + scanline */
export function animateHwDiagram(diagram, time) {
  if (!diagram.visible) return;
  const scan = diagram.userData.scanLine;
  if (scan) {
    const hh = diagram.userData.tableHeight / 2;
    scan.position.y = -hh + ((time * 0.15) % 1) * diagram.userData.tableHeight;
  }
  diagram.userData.packets.forEach(dot => {
    const { path, speed, offset } = dot.userData;
    const t = ((time * speed + offset) % 1);
    const p1 = path[0], p2 = path[path.length - 1];
    dot.position.lerpVectors(p1, p2, t);
    dot.position.z = 0.05;
    const pulse = 0.5 + 0.5 * Math.sin(time * 8 + offset * 6.28);
    dot.scale.setScalar(0.8 + pulse * 0.4);
  });
}
