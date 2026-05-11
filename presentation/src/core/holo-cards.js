/**
 * 3D Holographic Cards — glowing transparent planes with text
 * Used for INCLUDED/EXCLUDED scope in Zone 2
 */
import * as THREE from 'three';

/**
 * Create a holographic card with title and list items
 * @param {string} title - Card heading
 * @param {string[]} items - List items
 * @param {number} color - Hex color (e.g. 0x00ff88)
 * @param {number} w - Card width in world units
 * @param {number} h - Card height in world units
 * @returns {THREE.Group}
 */
export function createHoloCard(title, items, color, w = 2.4, h = 3) {
  const group = new THREE.Group();
  const colorObj = new THREE.Color(color);
  const r = Math.floor(colorObj.r * 255);
  const g = Math.floor(colorObj.g * 255);
  const b = Math.floor(colorObj.b * 255);

  // ── Canvas texture with text ──
  const canvas = document.createElement('canvas');
  const res = 2;  // resolution multiplier
  canvas.width = 400 * res;
  canvas.height = 500 * res;
  const ctx = canvas.getContext('2d');
  ctx.scale(res, res);

  // Background — very subtle fill
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.03)`;
  ctx.fillRect(0, 0, 400, 500);

  // Title
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.textAlign = 'center';
  ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.4)`;
  ctx.shadowBlur = 8;
  ctx.fillText(title, 200, 50);

  // Divider line
  ctx.shadowBlur = 5;
  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.3)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, 70);
  ctx.lineTo(360, 70);
  ctx.stroke();

  // Items
  ctx.font = '400 14px "JetBrains Mono", monospace';
  ctx.shadowBlur = 4;
  ctx.textAlign = 'left';
  items.forEach((item, i) => {
    const y = 110 + i * 46;
    // Bullet marker
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.7)`;
    ctx.fillText('▸', 50, y);
    // Item text
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
    ctx.fillText(item, 80, y);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;

  // ── Card plane ──
  const planeMat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), planeMat);
  group.add(plane);

  // ── Glowing border frame ──
  const hw = w / 2, hh = h / 2;
  const corners = [
    new THREE.Vector3(-hw, hh, 0),
    new THREE.Vector3(hw, hh, 0),
    new THREE.Vector3(hw, -hh, 0),
    new THREE.Vector3(-hw, -hh, 0),
    new THREE.Vector3(-hw, hh, 0),  // close the loop
  ];

  const borderGeo = new THREE.BufferGeometry().setFromPoints(corners);
  const borderMat = new THREE.LineBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.6,
  });
  const border = new THREE.Line(borderGeo, borderMat);
  group.add(border);

  // ── Corner accents (small L-shapes) ──
  const cornerSize = 0.25;
  const cornerPositions = [
    [[-hw, hh], [-hw + cornerSize, hh], [-hw, hh - cornerSize]],           // top-left
    [[hw, hh], [hw - cornerSize, hh], [hw, hh - cornerSize]],              // top-right
    [[hw, -hh], [hw - cornerSize, -hh], [hw, -hh + cornerSize]],           // bottom-right
    [[-hw, -hh], [-hw + cornerSize, -hh], [-hw, -hh + cornerSize]],        // bottom-left
  ];

  cornerPositions.forEach(([origin, hEnd, vEnd]) => {
    const pts = [
      new THREE.Vector3(vEnd[0], vEnd[1], 0.01),
      new THREE.Vector3(origin[0], origin[1], 0.01),
      new THREE.Vector3(hEnd[0], hEnd[1], 0.01),
    ];
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.9,
    });
    group.add(new THREE.Line(geo, mat));
  });

  // ── Scanline effect (animated via userData) ──
  const scanGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-hw + 0.05, 0, 0.02),
    new THREE.Vector3(hw - 0.05, 0, 0.02),
  ]);
  const scanMat = new THREE.LineBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.15,
  });
  const scanLine = new THREE.Line(scanGeo, scanMat);
  group.add(scanLine);
  group.userData.scanLine = scanLine;
  group.userData.cardHeight = h;

  // Store base opacity on all materials for fade-in/out
  group.traverse(c => {
    if (c.material) {
      c.material.userData = c.material.userData || {};
      c.material.userData.baseOp = c.material.opacity;
    }
  });

  group.visible = false;
  return group;
}

/** Animate holographic cards — scanline sweep + subtle hover */
export function animateHoloCards(cards, time) {
  cards.forEach(card => {
    if (!card.visible) return;
    // Scanline sweep
    if (card.userData.scanLine) {
      const hh = card.userData.cardHeight / 2;
      const y = -hh + ((time * 0.3) % 1) * card.userData.cardHeight;
      card.userData.scanLine.position.y = y;
    }
  });
}
