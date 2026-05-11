/**
 * 3D Software Stack — Zone 5 sub-step 0
 * Actual 3D stacked blocks with holographic wireframe edges
 */
import * as THREE from 'three';
import gsap from 'gsap';

const BLOCK_W = 2.8, BLOCK_H = 0.26, BLOCK_D = 0.6;
const GAP = 0.05;

const LAYERS = [
  { name: 'UNREAL ENGINE 5.3',         desc: 'Visualization',              color: 0x00ff88 },
  { name: 'MATLAB / SIMULINK R2025b',  desc: 'Plant model + co-sim',       color: 0x00ccff },
  { name: 'MAVLINK TCP PORT 4560',     desc: 'Lockstep protocol',          color: 0xffffff },
  { name: 'PX4 v1.16.1',              desc: 'Autopilot / EKF2 / control', color: 0xff60d0 },
  { name: 'QGROUNDCONTROL',           desc: 'Monitoring / logs',           color: 0xff60d0 },
  { name: 'OPTITRACK + PYTHON BRIDGE', desc: 'Ground truth',               color: 0x00ff88 },
];

export function createSwStack() {
  const group = new THREE.Group();
  const totalH = LAYERS.length * BLOCK_H + (LAYERS.length - 1) * GAP;
  const startY = totalH / 2 - BLOCK_H / 2;

  LAYERS.forEach((layer, i) => {
    const y = startY - i * (BLOCK_H + GAP);
    const blockGroup = new THREE.Group();

    // Solid face (very transparent)
    const geo = new THREE.BoxGeometry(BLOCK_W, BLOCK_H, BLOCK_D);
    const faceMat = new THREE.MeshBasicMaterial({
      color: layer.color, transparent: true, opacity: 0, side: THREE.DoubleSide,
    });
    faceMat.userData = { baseOp: 0.03 };
    blockGroup.add(new THREE.Mesh(geo, faceMat));

    // Wireframe edges
    const edges = new THREE.EdgesGeometry(geo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: layer.color, transparent: true, opacity: 0,
    });
    edgeMat.userData = { baseOp: 0.55 };
    blockGroup.add(new THREE.LineSegments(edges, edgeMat));

    // Front face label (canvas texture)
    const canvas = document.createElement('canvas');
    canvas.width = 600; canvas.height = 56;
    const ctx = canvas.getContext('2d');
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(layer.name, 14, 22);
    ctx.font = '400 13px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.fillText(layer.desc, 14, 44);

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    const labelMat = new THREE.MeshBasicMaterial({
      map: tex, transparent: true, opacity: 0, depthWrite: false,
    });
    labelMat.userData = { baseOp: 0.95 };
    const labelPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(BLOCK_W, BLOCK_H),
      labelMat
    );
    labelPlane.position.z = BLOCK_D / 2 + 0.01;
    blockGroup.add(labelPlane);

    blockGroup.position.y = y;
    group.add(blockGroup);
  });

  // Store base opacities
  group.traverse(c => {
    if (c.material && !c.material.userData.baseOp) {
      c.material.userData = c.material.userData || {};
      c.material.userData.baseOp = 0.5;
    }
  });

  group.visible = false;
  return group;
}

/** Flicker in with staggered block reveals */
export function flickerInStack(stack) {
  stack.visible = true;
  const mats = [];
  stack.traverse(c => { if (c.material) mats.push(c.material); });
  mats.forEach(m => { m.opacity = 0; });

  const tl = gsap.timeline();
  [0.3, 0, 0.55, 0.1, 0.7, 0.2, 0.9, 0.4].forEach((op, i) => {
    tl.to({}, { duration: [0.04,0.06,0.03,0.05,0.04,0.06,0.05,0.03][i],
      onStart: () => { mats.forEach(m => { m.opacity = op * (m.userData.baseOp || 0.5); }); }
    });
  });
  tl.to({}, { duration: 0.3, onStart: () => {
    mats.forEach(m => { gsap.to(m, { opacity: m.userData.baseOp || 0.5, duration: 0.3 }); });
  }});
}

/** Fade out */
export function fadeOutStack(stack) {
  stack.traverse(c => { if (c.material) gsap.to(c.material, { opacity: 0, duration: 0.4 }); });
  setTimeout(() => { stack.visible = false; }, 500);
}

/** Subtle breathing animation */
export function animateSwStack(stack, time) {
  if (!stack.visible) return;
  // Gentle per-block float
  stack.children.forEach((block, i) => {
    if (block.isGroup) {
      const baseY = block.userData.baseY ?? block.position.y;
      if (!block.userData.baseY) block.userData.baseY = baseY;
      block.position.y = baseY + Math.sin(time * 0.8 + i * 0.7) * 0.012;
    }
  });
}
