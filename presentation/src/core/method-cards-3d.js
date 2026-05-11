/**
 * 3D Methodology Cards — Six holographic cards arranged in a 2×3 grid
 * floating in 3D space. Each card has a front face (number + title) and
 * expands in-place when stepped to, revealing full procedural details.
 *
 * Layout (viewer perspective):
 *   ┌──────┐  ┌──────┐  ┌──────┐
 *   │  01  │  │  02  │  │  03  │
 *   └──────┘  └──────┘  └──────┘
 *   ┌──────┐  ┌──────┐  ┌──────┐
 *   │  04  │  │  05  │  │  06  │
 *   └──────┘  └──────┘  └──────┘
 */
import * as THREE from 'three';
import gsap from 'gsap';
import { METHOD_CARDS } from './method-cards.js';

const CYAN = 0x00f0ff;
const WHITE = 0xffffff;

// ── Card dimensions ──
const CARD_W = 1.8;
const CARD_H = 1.2;
const EXPANDED_W = 2.2;
const EXPANDED_H = 3.2;
const GRID_GAP_X = 2.3;
const GRID_GAP_Y = 1.7;

/**
 * Render the collapsed front face: big number + title
 */
function createFrontTexture(card) {
  const canvas = document.createElement('canvas');
  const res = 2;
  const cw = 480, ch = 340;
  canvas.width = cw * res;
  canvas.height = ch * res;
  const ctx = canvas.getContext('2d');
  ctx.scale(res, res);

  // Background
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  ctx.fillRect(0, 0, cw, ch);

  // Big number — ghost watermark
  ctx.font = '800 140px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
  ctx.textAlign = 'center';
  ctx.fillText(card.num, cw / 2, ch * 0.55);

  // Title
  ctx.font = '600 32px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
  ctx.shadowBlur = 10;
  ctx.textAlign = 'center';
  ctx.fillText(card.title, cw / 2, ch * 0.82);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

/**
 * Render the expanded detail face:
 * OBJECTIVE / INPUT / PROCEDURE / OUTPUT / CHECK
 */
function createDetailTexture(card) {
  const canvas = document.createElement('canvas');
  const res = 2;
  const cw = 600, ch = 960;
  canvas.width = cw * res;
  canvas.height = ch * res;
  const ctx = canvas.getContext('2d');
  ctx.scale(res, res);

  ctx.fillStyle = 'rgba(5, 8, 20, 0.02)';
  ctx.fillRect(0, 0, cw, ch);

  let y = 40;

  // ── Number + Title header ──
  ctx.font = '800 60px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(0, 240, 255, 0.22)';
  ctx.textAlign = 'left';
  ctx.fillText(card.num, 28, y + 50);

  ctx.font = '700 28px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
  ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
  ctx.shadowBlur = 8;
  ctx.fillText(card.title, 120, y + 42);
  ctx.shadowBlur = 0;

  // Divider
  y += 78;
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(28, y);
  ctx.lineTo(cw - 28, y);
  ctx.stroke();
  y += 30;

  // Helper: draw a section
  function drawSection(label, text, maxWidth) {
    ctx.font = '700 20px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
    ctx.shadowColor = 'rgba(0, 240, 255, 0.3)';
    ctx.shadowBlur = 5;
    ctx.fillText(label, 28, y);
    ctx.shadowBlur = 0;
    y += 30;

    ctx.font = '400 22px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';

    // Word-wrap
    const words = text.split(' ');
    let line = '';
    for (const word of words) {
      const test = line + (line ? ' ' : '') + word;
      if (ctx.measureText(test).width > (maxWidth || cw - 56)) {
        ctx.fillText(line, 28, y);
        y += 28;
        line = word;
      } else {
        line = test;
      }
    }
    if (line) { ctx.fillText(line, 28, y); y += 28; }
    y += 14;
  }

  // OBJECTIVE
  drawSection('OBJECTIVE', card.objective, cw - 56);

  // INPUT
  drawSection('INPUT', card.input, cw - 56);

  // PROCEDURE
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
  ctx.shadowColor = 'rgba(0, 240, 255, 0.3)';
  ctx.shadowBlur = 5;
  ctx.fillText('PROCEDURE', 28, y);
  ctx.shadowBlur = 0;
  y += 30;

  ctx.font = '400 20px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  card.procedure.forEach(step => {
    // Word-wrap each step
    const fullStep = `▸ ${step}`;
    const words = fullStep.split(' ');
    let line = '';
    for (const word of words) {
      const test = line + (line ? ' ' : '') + word;
      if (ctx.measureText(test).width > cw - 56) {
        ctx.fillText(line, 28, y);
        y += 26;
        line = '   ' + word;
      } else {
        line = test;
      }
    }
    if (line) { ctx.fillText(line, 28, y); y += 26; }
    y += 6;
  });
  y += 12;

  // OUTPUT
  drawSection('OUTPUT', card.output, cw - 56);

  // CHECK
  drawSection('CHECK', card.check, cw - 56);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

/**
 * Create a line border around a card at specified dimensions
 */
function createBorder(w, h, color, opacity) {
  const hw = w / 2, hh = h / 2;
  const pts = [
    new THREE.Vector3(-hw, hh, 0), new THREE.Vector3(hw, hh, 0),
    new THREE.Vector3(hw, -hh, 0), new THREE.Vector3(-hw, -hh, 0),
    new THREE.Vector3(-hw, hh, 0),
  ];
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({
    color, transparent: true, opacity,
  });
  return new THREE.Line(geo, mat);
}

/**
 * Create corner accent lines for a card
 */
function createCornerAccents(w, h, color, opacity) {
  const hw = w / 2, hh = h / 2;
  const cs = 0.18;
  const accents = new THREE.Group();

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
    const mat = new THREE.LineBasicMaterial({
      color, transparent: true, opacity,
    });
    mat.userData = { baseOp: opacity };
    accents.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
  });

  return accents;
}

/**
 * Build one method card (front + detail faces, borders, corner accents, scanline)
 */
function createMethodCard3D(card, index) {
  const group = new THREE.Group();

  // ── Front face (collapsed) ──
  const frontTex = createFrontTexture(card);
  const frontMat = new THREE.MeshBasicMaterial({
    map: frontTex, transparent: true, opacity: 0.75,
    side: THREE.DoubleSide, depthWrite: false,
  });
  const frontMesh = new THREE.Mesh(new THREE.PlaneGeometry(CARD_W, CARD_H), frontMat);
  frontMesh.position.z = 0.01;
  group.add(frontMesh);

  // ── Detail face (expanded) — initially hidden ──
  const detailTex = createDetailTexture(card);
  const detailMat = new THREE.MeshBasicMaterial({
    map: detailTex, transparent: true, opacity: 0,
    side: THREE.DoubleSide, depthWrite: false,
  });
  const detailMesh = new THREE.Mesh(new THREE.PlaneGeometry(EXPANDED_W, EXPANDED_H), detailMat);
  detailMesh.position.z = 0.02;
  detailMesh.visible = false;
  group.add(detailMesh);

  // ── Collapsed border + corners ──
  const borderCollapsed = createBorder(CARD_W, CARD_H, WHITE, 0.15);
  group.add(borderCollapsed);

  const cornersCollapsed = createCornerAccents(CARD_W, CARD_H, WHITE, 0.3);
  group.add(cornersCollapsed);

  // ── Expanded border + corners (initially hidden) ──
  const borderExpanded = createBorder(EXPANDED_W, EXPANDED_H, CYAN, 0.45);
  borderExpanded.visible = false;
  group.add(borderExpanded);

  const cornersExpanded = createCornerAccents(EXPANDED_W, EXPANDED_H, CYAN, 0.6);
  cornersExpanded.visible = false;
  group.add(cornersExpanded);

  // ── Scanline ──
  const hw = CARD_W / 2;
  const scanGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-hw + 0.05, 0, 0.03),
    new THREE.Vector3(hw - 0.05, 0, 0.03),
  ]);
  const scanMat = new THREE.LineBasicMaterial({
    color: WHITE, transparent: true, opacity: 0.08,
  });
  const scanLine = new THREE.Line(scanGeo, scanMat);
  group.add(scanLine);

  // ── Store references ──
  group.userData = {
    index,
    frontMat, frontMesh, detailMat, detailMesh,
    borderCollapsed, cornersCollapsed,
    borderExpanded, cornersExpanded,
    scanLine, scanMat,
    isExpanded: false,
    cardH: CARD_H,
    expandedH: EXPANDED_H,
    driftSeed: index * 2.3,
  };

  // Store base opacity on all materials for fade
  group.traverse(c => {
    if (c.material) {
      c.material.userData = c.material.userData || {};
      c.material.userData.baseOp = c.material.opacity;
    }
  });

  return group;
}

/**
 * Create the 2×3 grid of method cards
 */
export function createMethodCards3D() {
  const gridGroup = new THREE.Group();
  const cards = [];

  METHOD_CARDS.forEach((data, i) => {
    const card = createMethodCard3D(data, i);
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = (col - 1) * GRID_GAP_X;
    const y = (0.5 - row) * GRID_GAP_Y;

    card.position.set(x, y, 0);
    card.userData.basePos = card.position.clone();

    cards.push(card);
    gridGroup.add(card);
  });

  gridGroup.visible = false;
  gridGroup.userData.cards = cards;

  return gridGroup;
}

/**
 * Fade in all method cards with staggered entrance
 */
export function flickerInMethodCards(gridGroup) {
  gridGroup.visible = true;
  const cards = gridGroup.userData.cards;
  cards.forEach((card, i) => {
    // Reset position for stagger
    card.position.z = card.userData.basePos.z;
    card.traverse(c => {
      if (c.material && c.material.userData?.baseOp !== undefined) {
        c.material.opacity = 0;
        gsap.to(c.material, {
          opacity: c.material.userData.baseOp,
          duration: 0.5,
          delay: i * 0.08,
        });
      }
    });
  });
}

/**
 * Fade out all method cards
 */
export function fadeOutMethodCards(gridGroup) {
  const cards = gridGroup.userData.cards;
  cards.forEach(card => {
    // Snap-collapse if expanded (no animation — we're leaving the zone)
    if (card.userData.isExpanded) {
      snapCollapse(card);
    }
    card.traverse(c => {
      if (c.material) {
        gsap.to(c.material, { opacity: 0, duration: 0.3 });
      }
    });
  });
  setTimeout(() => { gridGroup.visible = false; }, 400);
}

/**
 * Expand a single card — swap front for detail, switch to expanded border
 */
function expandCard(card) {
  const ud = card.userData;
  if (ud.isExpanded) return;
  ud.isExpanded = true;

  // Fade out front face
  gsap.to(ud.frontMat, { opacity: 0, duration: 0.2 });
  setTimeout(() => { ud.frontMesh.visible = false; }, 200);

  // Show detail face
  ud.detailMesh.visible = true;
  gsap.to(ud.detailMat, { opacity: 0.88, duration: 0.45, delay: 0.1 });

  // Swap borders: hide collapsed, show expanded
  ud.borderCollapsed.visible = false;
  ud.cornersCollapsed.visible = false;
  ud.borderExpanded.visible = true;
  ud.cornersExpanded.visible = true;

  // Animate expanded border opacity
  ud.borderExpanded.material.opacity = 0;
  gsap.to(ud.borderExpanded.material, { opacity: 0.45, duration: 0.4, delay: 0.1 });
  ud.cornersExpanded.traverse(c => {
    if (c.material) {
      c.material.opacity = 0;
      gsap.to(c.material, { opacity: 0.6, duration: 0.4, delay: 0.15 });
    }
  });

  // Bring card forward toward camera
  gsap.to(card.position, { z: ud.basePos.z + 0.8, duration: 0.45, ease: 'power2.out' });
}

/**
 * Collapse a card back to front face with animation
 */
function collapseCard(card, duration = 0.35) {
  const ud = card.userData;
  if (!ud.isExpanded) return;
  ud.isExpanded = false;

  // Fade out detail
  gsap.to(ud.detailMat, { opacity: 0, duration: duration * 0.7 });
  setTimeout(() => {
    ud.detailMesh.visible = false;
    // Show front face
    ud.frontMesh.visible = true;
    gsap.to(ud.frontMat, { opacity: 0.75, duration: duration });
  }, duration * 700);

  // Swap borders: show collapsed, hide expanded
  setTimeout(() => {
    ud.borderExpanded.visible = false;
    ud.cornersExpanded.visible = false;
    ud.borderCollapsed.visible = true;
    ud.cornersCollapsed.visible = true;
    ud.borderCollapsed.material.opacity = 0.15;
  }, duration * 500);

  // Move back to base Z
  gsap.to(card.position, { z: ud.basePos.z, duration, ease: 'power2.inOut' });
}

/**
 * Instant collapse (no animation) — for zone transitions
 */
function snapCollapse(card) {
  const ud = card.userData;
  ud.isExpanded = false;
  ud.detailMat.opacity = 0;
  ud.detailMesh.visible = false;
  ud.frontMesh.visible = true;
  ud.frontMat.opacity = 0.75;
  ud.borderExpanded.visible = false;
  ud.cornersExpanded.visible = false;
  ud.borderCollapsed.visible = true;
  ud.cornersCollapsed.visible = true;
  ud.borderCollapsed.material.opacity = 0.15;
  card.position.z = ud.basePos.z;
}

/**
 * Step to a specific card (expand it, collapse all others, dim others)
 */
export function highlightMethodCard(gridGroup, index) {
  const cards = gridGroup.userData.cards;

  cards.forEach((card, i) => {
    if (i === index) {
      expandCard(card);
    } else {
      collapseCard(card);
      // Dim other cards' front faces
      setTimeout(() => {
        if (card.userData.frontMesh.visible) {
          gsap.to(card.userData.frontMat, { opacity: 0.2, duration: 0.3 });
        }
      }, 100);
    }
  });
}

/**
 * Reset all cards to default (all collapsed, same brightness)
 */
export function resetMethodCards3D(gridGroup) {
  const cards = gridGroup.userData.cards;
  cards.forEach(card => {
    collapseCard(card);
    setTimeout(() => {
      gsap.to(card.userData.frontMat, { opacity: 0.75, duration: 0.3 });
    }, 200);
  });
}

/**
 * Animate cards — subtle drift + scanline sweep
 */
export function animateMethodCards3D(gridGroup, time) {
  if (!gridGroup.visible) return;
  const cards = gridGroup.userData.cards;

  cards.forEach(card => {
    const ud = card.userData;
    const base = ud.basePos;
    const seed = ud.driftSeed;

    // Subtle floating drift (only X/Y, preserve Z for expand)
    const driftX = Math.sin(time * 0.25 + seed) * 0.04;
    const driftY = Math.cos(time * 0.2 + seed * 1.5) * 0.03;
    card.position.x = base.x + driftX;
    card.position.y = base.y + driftY;

    // Scanline sweep
    if (ud.scanLine) {
      const h = ud.isExpanded ? ud.expandedH : ud.cardH;
      const hh = h / 2;
      const yy = -hh + ((time * 0.4 + seed * 0.5) % 1) * h;
      ud.scanLine.position.y = yy;
    }
  });
}
