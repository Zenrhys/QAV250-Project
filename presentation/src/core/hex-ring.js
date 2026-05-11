/**
 * Hexagonal Objective Ring — 6 floating 3D nodes around the drone
 * Each node has a front (number + title) and back (target + validation + status)
 * Nodes flip on highlight to reveal details
 */
import * as THREE from 'three';
import gsap from 'gsap';

const CYAN = 0x00f0ff;

/** Objective data */
export const OBJECTIVES = [
  {
    num: '01', title: 'Parameters',
    target: 'Measure mass, inertia,\nkT, kQ, motor_tc',
    validation: 'Hover RPM comparison',
    status: 'COMPLETE', statusColor: '#00ff88'
  },
  {
    num: '02', title: 'Plant Model',
    target: 'Build Simulink model\nwith measured params',
    validation: '<10% RMSE vs flight data',
    status: 'COMPLETE', statusColor: '#00ff88'
  },
  {
    num: '03', title: 'PX4 SITL',
    target: 'Establish lockstep co-sim\nvia MAVLink TCP',
    validation: 'Arm + takeoff + hover',
    status: 'COMPLETE', statusColor: '#00ff88'
  },
  {
    num: '04', title: 'Unreal Twin',
    target: 'Integrate UE 5.3 via\nSim 3D blocks',
    validation: 'Drone renders in UE',
    status: 'IN PROGRESS', statusColor: '#ffcc00'
  },
  {
    num: '05', title: 'MoCap Data',
    target: 'Collect flight data via\nOptiTrack + NatNet bridge',
    validation: 'Indoor hover w/ pos hold',
    status: 'COMPLETE', statusColor: '#00ff88'
  },
  {
    num: '06', title: 'Behavior Match',
    target: 'Replay motor commands,\ncompare vs ground truth',
    validation: 'RMSE metrics',
    status: 'IN PROGRESS', statusColor: '#ffcc00'
  },
];

const HEX_RADIUS = 2.8;
const NODE_W = 1.6;
const NODE_H = 1.2;

/**
 * Render text onto a canvas for one face of a node
 */
function createFaceTexture(obj, isFront, w, h) {
  const canvas = document.createElement('canvas');
  const res = 2;
  canvas.width = w * res;
  canvas.height = h * res;
  const ctx = canvas.getContext('2d');
  ctx.scale(res, res);

  if (isFront) {
    // ── Front face: number + title ──
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.fillRect(0, 0, w, h);

    // Big number
    ctx.font = '700 52px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.textAlign = 'center';
    ctx.fillText(obj.num, w / 2, h * 0.48);

    // Title
    ctx.font = '600 20px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';
    ctx.shadowBlur = 5;
    ctx.fillText(obj.title.toUpperCase(), w / 2, h * 0.72);
  } else {
    // ── Back face: target + validation + status ──
    ctx.fillStyle = 'rgba(0, 20, 30, 0.03)';
    ctx.fillRect(0, 0, w, h);

    // Section: TARGET
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
    ctx.textAlign = 'left';
    ctx.shadowColor = 'rgba(0, 240, 255, 0.3)';
    ctx.shadowBlur = 5;
    ctx.fillText('TARGET', 16, 24);

    ctx.font = '400 14px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.shadowBlur = 0;
    const targetLines = obj.target.split('\n');
    targetLines.forEach((line, i) => {
      ctx.fillText(line, 16, 44 + i * 18);
    });

    // Section: VALIDATION
    const valY = 44 + targetLines.length * 18 + 14;
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
    ctx.shadowBlur = 5;
    ctx.fillText('VALIDATION', 16, valY);

    ctx.font = '400 14px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.shadowBlur = 0;
    ctx.fillText(obj.validation, 16, valY + 18);

    // Section: STATUS
    const statusY = valY + 42;
    ctx.font = '700 13px "JetBrains Mono", monospace';
    ctx.fillStyle = obj.statusColor;
    ctx.shadowColor = obj.statusColor;
    ctx.shadowBlur = 4;
    ctx.fillText(`● ${obj.status}`, 16, statusY);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

/**
 * Create a single hex node (front + back faces in a group)
 */
function createHexNode(obj, index) {
  const node = new THREE.Group();
  const cW = 250, cH = 190;

  // ── Front face ──
  const frontTex = createFaceTexture(obj, true, cW, cH);
  const frontMat = new THREE.MeshBasicMaterial({
    map: frontTex, transparent: true, opacity: 0.8,
    side: THREE.FrontSide, depthWrite: false,
  });
  const frontMesh = new THREE.Mesh(new THREE.PlaneGeometry(NODE_W, NODE_H), frontMat);
  frontMesh.position.z = 0.01;
  node.add(frontMesh);

  // ── Back face (flipped, initially hidden behind front) ──
  const backTex = createFaceTexture(obj, false, cW, cH);
  const backMat = new THREE.MeshBasicMaterial({
    map: backTex, transparent: true, opacity: 0.85,
    side: THREE.FrontSide, depthWrite: false,
  });
  const backMesh = new THREE.Mesh(new THREE.PlaneGeometry(NODE_W, NODE_H), backMat);
  backMesh.rotation.y = Math.PI;  // Face the opposite direction
  backMesh.position.z = -0.01;
  node.add(backMesh);

  // ── Border ──
  const hw = NODE_W / 2, hh = NODE_H / 2;
  const borderPts = [
    new THREE.Vector3(-hw, hh, 0), new THREE.Vector3(hw, hh, 0),
    new THREE.Vector3(hw, -hh, 0), new THREE.Vector3(-hw, -hh, 0),
    new THREE.Vector3(-hw, hh, 0),
  ];
  const borderMat = new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.3 });
  node.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(borderPts), borderMat));

  // ── Corner accents ──
  const cs = 0.15;
  [
    [[-hw, hh], [-hw + cs, hh], [-hw, hh - cs]],
    [[hw, hh], [hw - cs, hh], [hw, hh - cs]],
    [[hw, -hh], [hw - cs, -hh], [hw, -hh + cs]],
    [[-hw, -hh], [-hw + cs, -hh], [-hw, -hh + cs]],
  ].forEach(([o, h2, v]) => {
    const pts = [
      new THREE.Vector3(v[0], v[1], 0.02),
      new THREE.Vector3(o[0], o[1], 0.02),
      new THREE.Vector3(h2[0], h2[1], 0.02),
    ];
    const mat = new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.5 });
    node.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
  });

  // Store references
  node.userData = {
    index,
    frontMat, backMat, borderMat,
    isFlipped: false,
    baseOpacity: 0.4,      // dim by default
    highlightOpacity: 0.9,  // bright when selected
  };

  // Store base opacity on all materials
  node.traverse(c => {
    if (c.material) {
      c.material.userData = c.material.userData || {};
      c.material.userData.baseOp = c.material.opacity;
    }
  });

  return node;
}

/**
 * Create the full hexagonal ring
 * @returns {{ ring: THREE.Group, nodes: THREE.Group[], lines: THREE.Line }}
 */
export function createHexRing() {
  const ring = new THREE.Group();
  const nodes = [];

  // Position nodes in hexagonal arrangement
  // Hex angles: top=90°, then 30°, -30°, -90°, -150°, 150° (clockwise from top)
  const angles = [
    Math.PI / 2,        // top: 01 Parameters
    Math.PI / 6,        // top-right: 02 Plant Model
    -Math.PI / 6,       // bottom-right: 03 PX4 SITL
    -Math.PI / 2,       // bottom: 04 Unreal Twin
    -Math.PI * 5 / 6,   // bottom-left: 05 MoCap Data
    Math.PI * 5 / 6,    // top-left: 06 Behavior Match
  ];

  OBJECTIVES.forEach((obj, i) => {
    const node = createHexNode(obj, i);
    const angle = angles[i];
    node.position.set(
      Math.cos(angle) * HEX_RADIUS,
      Math.sin(angle) * HEX_RADIUS * 0.6,  // flatten Y for perspective
      0
    );
    // Store base position for drift
    node.userData.basePos = node.position.clone();
    node.userData.driftSeed = i * 1.7;
    nodes.push(node);
    ring.add(node);
  });

  // ── Connecting lines between adjacent nodes ──
  const linePts = [];
  for (let i = 0; i < 6; i++) {
    const a = nodes[i].position;
    const b = nodes[(i + 1) % 6].position;
    linePts.push(a.clone(), b.clone());
  }
  const lineGeo = new THREE.BufferGeometry().setFromPoints(linePts);
  const lineMat = new THREE.LineBasicMaterial({
    color: CYAN, transparent: true, opacity: 0.1
  });
  const hexLines = new THREE.LineSegments(lineGeo, lineMat);
  ring.add(hexLines);

  // Store base opacity
  lineMat.userData = { baseOp: 0.1 };

  ring.visible = false;
  ring.userData.nodes = nodes;
  ring.userData.hexLines = hexLines;
  ring.userData.lineMat = lineMat;

  return ring;
}

/**
 * Highlight a specific node (flip it to show back face)
 * @param {THREE.Group} ring - The hex ring group
 * @param {number} index - Node index (0-5), or -1 to show all fronts
 */
export function highlightNode(ring, index) {
  const nodes = ring.userData.nodes;

  nodes.forEach((node, i) => {
    const ud = node.userData;
    const isSelected = (i === index);

    if (isSelected) {
      // Flip to back (details) + brighten
      if (!ud.isFlipped) {
        // Animate flip: rotate Y from 0 to PI
        gsap.to(node.rotation, { y: Math.PI, duration: 0.6, ease: 'power2.inOut' });
        ud.isFlipped = true;
      }
      // Brighten border
      gsap.to(ud.borderMat, { opacity: 0.8, duration: 0.4 });
      // Scale up slightly
      gsap.to(node.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 0.4, ease: 'power2.out' });
    } else {
      // Flip back to front if was flipped
      if (ud.isFlipped) {
        gsap.to(node.rotation, { y: 0, duration: 0.5, ease: 'power2.inOut' });
        ud.isFlipped = false;
      }
      // Dim
      const dimAmount = (index === -1) ? 0.5 : 0.25;
      gsap.to(ud.borderMat, { opacity: dimAmount * 0.5, duration: 0.3 });
      gsap.to(node.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
    }
  });
}

/**
 * Animate hex ring — subtle drift on each node
 */
export function animateHexRing(ring, time) {
  if (!ring.visible) return;
  const nodes = ring.userData.nodes;

  nodes.forEach(node => {
    const base = node.userData.basePos;
    const seed = node.userData.driftSeed;
    // Subtle drift around base position
    node.position.x = base.x + Math.sin(time * 0.3 + seed) * 0.06;
    node.position.y = base.y + Math.cos(time * 0.25 + seed * 1.3) * 0.04;
  });
}
