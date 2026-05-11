/**
 * 3D Holographic System Architecture Diagram — Zone 5
 * Canvas-rendered flow chart with animated data packets
 */
import * as THREE from 'three';
import gsap from 'gsap';

const CW = 1400, CH = 700, RES = 2;
const WORLD_W = 9, WORLD_H = WORLD_W * (CH / CW);

/** Convert canvas coords to world-space Vector3 */
function c2w(cx, cy) {
  return new THREE.Vector3((cx / CW - 0.5) * WORLD_W, (0.5 - cy / CH) * WORLD_H, 0.03);
}

/** 2-step camera sub-nav: stack → overview (Simulink/UE sub-steps removed) */
export const ARCH_STEPS = [
  { label: 'SOFTWARE STACK',    cam: [0, 0.6, 5.5],    look: [0, 0.1, 0],   show: 'stack' },
  { label: 'OVERVIEW',          cam: [0, 1.8, 7],      look: [0, 0.3, 0],   show: 'diagram' },
];

// ── Box definitions (canvas px) ──
const SIM_WRAP = { x: 20, y: 50, w: 880, h: 610 };
const QUAD  = { x: 55,  y: 115, w: 310, h: 210 };
const PX4   = { x: 555, y: 115, w: 310, h: 210 };
const ANIM  = { x: 55,  y: 430, w: 270, h: 150 };
const SIM3D = { x: 455, y: 430, w: 310, h: 150 };
const UE    = { x: 1050, y: 180, w: 310, h: 380 };

// ── Canvas helpers ──
function drawBox(ctx, b, title, subtitle, bullets, borderCol, fillCol, titleCol) {
  ctx.fillStyle = fillCol;
  ctx.fillRect(b.x, b.y, b.w, b.h);
  ctx.strokeStyle = borderCol;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(b.x, b.y, b.w, b.h);
  // corner ticks
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

function drawArrow(ctx, x1, y1, x2, y2, label, col, bidir) {
  ctx.beginPath(); ctx.strokeStyle = col; ctx.lineWidth = 1;
  ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
  const dx = x2-x1, dy = y2-y1, len = Math.sqrt(dx*dx+dy*dy);
  const ux = dx/len, uy = dy/len, sz = 6;
  // right arrow
  ctx.beginPath(); ctx.fillStyle = col;
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - ux*sz - uy*sz*0.5, y2 - uy*sz + ux*sz*0.5);
  ctx.lineTo(x2 - ux*sz + uy*sz*0.5, y2 - uy*sz - ux*sz*0.5);
  ctx.fill();
  if (bidir) {
    ctx.beginPath(); ctx.fillStyle = col;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + ux*sz + uy*sz*0.5, y1 + uy*sz - ux*sz*0.5);
    ctx.lineTo(x1 + ux*sz - uy*sz*0.5, y1 + uy*sz + ux*sz*0.5);
    ctx.fill();
  }
  if (label) {
    const mx = (x1+x2)/2, my = (y1+y2)/2;
    ctx.font = '500 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(255,255,255,0.6)';
    if (Math.abs(dy) < Math.abs(dx)) { ctx.fillText(label, mx, my - 8); }
    else { ctx.textAlign = 'left'; ctx.fillText(label, mx + 8, my); }
  }
}

function drawDashedLine(ctx, x1, y1, x2, y2, label, col) {
  ctx.beginPath(); ctx.setLineDash([6,4]); ctx.strokeStyle = col; ctx.lineWidth = 1.5;
  ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); ctx.setLineDash([]);
  // bidir arrows
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
    ctx.fillText(label, mx, my - 10);
  }
}


// ── Main creation ──
export function createArchDiagram() {
  const group = new THREE.Group();
  const canvas = document.createElement('canvas');
  canvas.width = CW * RES; canvas.height = CH * RES;
  const ctx = canvas.getContext('2d');
  ctx.scale(RES, RES);

  ctx.fillStyle = 'rgba(0,0,0,0.01)'; ctx.fillRect(0,0,CW,CH);

  // Simulink wrapper
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 2;
  ctx.strokeRect(SIM_WRAP.x, SIM_WRAP.y, SIM_WRAP.w, SIM_WRAP.h);
  ctx.font = '700 14px "JetBrains Mono", monospace'; ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.shadowColor = 'rgba(255,255,255,0.3)'; ctx.shadowBlur = 6;
  ctx.fillText('SIMULINK (MATLAB R2025b)', SIM_WRAP.x+16, SIM_WRAP.y+22);
  ctx.shadowBlur = 0;

  // Inner boxes
  drawBox(ctx, QUAD, 'QUAD_UAV_DYNAMICS', null,
    ['6-DOF rigid body dynamics', 'IMU / GPS / Baro sim', 'Motor model τ = 25 ms', 'Newton-Euler quaternion'],
    'rgba(0,200,255,0.4)', 'rgba(0,200,255,0.05)', 'rgba(100,220,255,0.95)');

  drawBox(ctx, PX4, 'PX4 HOST TARGET', 'SITL Controller',
    ['Quadcopter_Controller.slx', 'EKF2 + COMMANDER', 'PX4 SITL in WSL2', 'Monitor & Tune deploy'],
    'rgba(255,0,180,0.4)', 'rgba(255,0,180,0.04)', 'rgba(255,120,210,0.95)');

  drawBox(ctx, ANIM, 'UAV ANIMATION', null,
    ['3D trajectory visualization', 'Flight path rendering'],
    'rgba(0,255,136,0.35)', 'rgba(0,255,136,0.04)', 'rgba(0,255,160,0.95)');

  drawBox(ctx, SIM3D, 'SIM 3D UAV VEHICLE', null,
    ['Unreal Engine interface', 'Streams pos + attitude'],
    'rgba(0,255,136,0.35)', 'rgba(0,255,136,0.04)', 'rgba(0,255,160,0.95)');

  // Unreal Engine box — leave room area empty on canvas for 3D box
  drawBox(ctx, UE, 'UNREAL ENGINE 5.3', 'Digital Twin',
    ['Custom 10×10×10 ft room', 'Virtual sensors', 'UAV Toolbox interface'],
    'rgba(0,255,136,0.5)', 'rgba(0,255,136,0.04)', 'rgba(0,255,180,1)');

  // 3D room box will be added as actual geometry below (not drawn on canvas)

  // Connection lines
  const qR = QUAD.x + QUAD.w, pL = PX4.x;
  const midY1 = QUAD.y + 55;  // MAVLink
  const midY2 = QUAD.y + 100; // HIL
  const midY3 = QUAD.y + 145; // PWM

  drawDashedLine(ctx, qR, midY1, pL, midY1, 'MAVLINK TCP PORT 4560', 'rgba(255,255,255,0.45)');
  drawArrow(ctx, qR, midY2, pL, midY2, 'HIL_SENSOR / GPS / QUAT', 'rgba(100,220,255,0.5)', false);
  drawArrow(ctx, pL, midY3, qR, midY3, 'PWM MOTOR COMMANDS', 'rgba(255,120,210,0.45)', false);

  // Quad → UAV Animation (vertical)
  drawArrow(ctx, QUAD.x+QUAD.w/2, QUAD.y+QUAD.h, QUAD.x+QUAD.w/2, ANIM.y,
    'POSITION + ATTITUDE', 'rgba(0,255,136,0.4)', false);

  // Sim 3D → Unreal Engine
  const s3R = SIM3D.x + SIM3D.w;
  const ueL = UE.x;
  const linkY = SIM3D.y + SIM3D.h/2;
  drawArrow(ctx, s3R, linkY, ueL, UE.y + UE.h/2, 'CO-SIM LINK', 'rgba(0,255,136,0.5)', false);

  // Texture
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

  // ── 3D wireframe room in the Unreal Engine area ──
  const roomCenter = c2w(UE.x + UE.w / 2, UE.y + UE.h - 100);
  const roomSize = 0.7;
  const roomGeo = new THREE.BoxGeometry(roomSize * 1.3, roomSize, roomSize);
  const edges = new THREE.EdgesGeometry(roomGeo);
  const roomMat = new THREE.LineBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0 });
  roomMat.userData = { baseOp: 0.3 };
  const roomWire = new THREE.LineSegments(edges, roomMat);
  roomWire.position.copy(roomCenter);
  roomWire.position.z = 0.1;
  roomWire.rotation.x = 0.3;
  roomWire.rotation.y = -0.4;
  group.add(roomWire);
  group.userData.room = roomWire;

  // Animated data packets
  const packets = createPackets(group);

  // Store refs
  group.userData.scanLine = scanLine;
  group.userData.tableHeight = WORLD_H;
  group.userData.packets = packets;
  group.userData.nextNoiseTime = 2;

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

/** Create animated dot packets along connection paths */
function createPackets(group) {
  const dotGeo = new THREE.SphereGeometry(0.035, 6, 6);
  const packets = [];

  const paths = [
    { // HIL data: Quad → PX4
      pts: [c2w(QUAD.x+QUAD.w, QUAD.y+100), c2w(PX4.x, PX4.y+100)],
      color: 0x00ccff, count: 3, speed: 0.4
    },
    { // PWM: PX4 → Quad
      pts: [c2w(PX4.x, PX4.y+145), c2w(QUAD.x+QUAD.w, QUAD.y+145)],
      color: 0xff60d0, count: 2, speed: 0.35
    },
    { // Pos+Att: Quad → UAV Anim
      pts: [c2w(QUAD.x+QUAD.w/2, QUAD.y+QUAD.h), c2w(QUAD.x+QUAD.w/2, ANIM.y)],
      color: 0x00ff88, count: 2, speed: 0.3
    },
    { // Co-sim: Sim3D → UE
      pts: [c2w(SIM3D.x+SIM3D.w, SIM3D.y+SIM3D.h/2), c2w(UE.x, UE.y+UE.h/2)],
      color: 0x00ff88, count: 3, speed: 0.25
    },
    { // MAVLink bidirectional
      pts: [c2w(QUAD.x+QUAD.w, QUAD.y+55), c2w(PX4.x, PX4.y+55)],
      color: 0xffffff, count: 2, speed: 0.5
    },
    { // MAVLink reverse
      pts: [c2w(PX4.x, PX4.y+55), c2w(QUAD.x+QUAD.w, QUAD.y+55)],
      color: 0xffffff, count: 2, speed: 0.45
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
export function flickerInArch(diagram) {
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
export function fadeOutArch(diagram) {
  diagram.traverse(c => { if (c.material) gsap.to(c.material, { opacity: 0, duration: 0.4 }); });
  setTimeout(() => { diagram.visible = false; }, 500);
}

/** Animate packets + scanline */
export function animateArchDiagram(diagram, time) {
  if (!diagram.visible) return;

  // Scanline
  const scan = diagram.userData.scanLine;
  if (scan) {
    const hh = diagram.userData.tableHeight / 2;
    scan.position.y = -hh + ((time * 0.15) % 1) * diagram.userData.tableHeight;
  }

  // Packets
  diagram.userData.packets.forEach(dot => {
    const { path, speed, offset } = dot.userData;
    const t = ((time * speed + offset) % 1);
    const p1 = path[0], p2 = path[path.length - 1];
    dot.position.lerpVectors(p1, p2, t);
    dot.position.z = 0.05;
    const pulse = 0.5 + 0.5 * Math.sin(time * 8 + offset * 6.28);
    dot.scale.setScalar(0.8 + pulse * 0.4);
  });

  // Slowly rotate 3D room wireframe
  const room = diagram.userData.room;
  if (room) {
    room.rotation.y = -0.4 + Math.sin(time * 0.3) * 0.15;
    room.rotation.x = 0.3 + Math.cos(time * 0.25) * 0.08;
  }
}
