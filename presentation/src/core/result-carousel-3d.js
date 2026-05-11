/**
 * 3D Result Carousel — Hexagonal orbit of 6 result cards
 * that slowly rotates. On step, the selected card is
 * LIFTED OUT of the carousel (reparented to scene root)
 * and brought front-and-center as a near-fullscreen media viewer.
 * The carousel continues spinning behind it.
 */
import * as THREE from 'three';
import gsap from 'gsap';
import { RESULT_CARDS } from './result-cards.js';

const CYAN = 0x00f0ff;
const WHITE = 0xffffff;

// ── Dimensions ──
const THUMB_W = 1.0;
const THUMB_H = 0.75;
const VIEWER_W = 3.6;
const VIEWER_H = 2.8;
const ORBIT_RADIUS = 3.0;
const ORBIT_TILT = 0.2;

// The scale multiplier applied when the card is the focus card.
const FOCUS_SCALE = 1;
// Where the focus card sits in world space (z toward camera)
const FOCUS_POS = new THREE.Vector3(0, -0.1, 4.0);

/**
 * Render a small thumbnail card: number + title
 */
function createThumbTexture(card) {
  const canvas = document.createElement('canvas');
  const res = 2;
  const cw = 320, ch = 240;
  canvas.width = cw * res;
  canvas.height = ch * res;
  const ctx = canvas.getContext('2d');
  ctx.scale(res, res);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
  ctx.fillRect(0, 0, cw, ch);

  // Number watermark
  ctx.font = '800 80px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.textAlign = 'center';
  ctx.fillText(card.num, cw / 2, ch * 0.48);

  // Status indicator
  const isGreen = card.status === '✅';
  ctx.font = '600 14px "JetBrains Mono", monospace';
  ctx.fillStyle = isGreen ? 'rgba(0, 255, 136, 0.5)' : 'rgba(255, 187, 51, 0.5)';
  ctx.fillText(card.status, cw / 2, ch * 0.22);

  // Title
  ctx.font = '600 14px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
  ctx.shadowBlur = 6;
  ctx.fillText(card.title, cw / 2, ch * 0.78);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

/**
 * Render the large media viewer card
 */
function createViewerTexture(card) {
  const canvas = document.createElement('canvas');
  const res = 2;
  const cw = 900, ch = 720;
  canvas.width = cw * res;
  canvas.height = ch * res;
  const ctx = canvas.getContext('2d');
  ctx.scale(res, res);

  ctx.fillStyle = 'rgba(4, 8, 20, 0.02)';
  ctx.fillRect(0, 0, cw, ch);

  let y = 24;

  // ── RESULT label + text ──
  ctx.font = '700 11px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
  ctx.shadowColor = 'rgba(0, 240, 255, 0.3)';
  ctx.shadowBlur = 4;
  ctx.textAlign = 'left';
  ctx.fillText('RESULT', 28, y);
  ctx.shadowBlur = 0;
  y += 20;

  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  wrapText(ctx, card.result, 28, y, cw - 56, 19);
  y += Math.ceil(ctx.measureText(card.result).width / (cw - 56)) * 19 + 10;
  y = Math.max(y, 70);

  // ── Evidence artifact area (blank — DOM overlay shows actual image) ──
  const placeholderY = y;
  const placeholderH = 380;
  const placeholderW = cw - 56;

  // Keep spacing only — no drawing

  y = placeholderY + placeholderH + 60;
  ctx.textAlign = 'left';

  ctx.font = '700 11px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
  ctx.shadowColor = 'rgba(0, 240, 255, 0.2)';
  ctx.shadowBlur = 3;
  ctx.fillText(card.pending ? 'WHAT IT WILL DEMONSTRATE' : 'WHAT IT DEMONSTRATES', 28, y);
  ctx.shadowBlur = 0;
  y += 18;

  ctx.font = '400 13px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  wrapText(ctx, card.demonstrates, 28, y, cw - 56, 17);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (const word of words) {
    const test = line + (line ? ' ' : '') + word;
    if (ctx.measureText(test).width > maxWidth) {
      ctx.fillText(line, x, y);
      y += lineHeight;
      line = word;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, y);
}

function drawCorner(ctx, x, y, size, dx, dy) {
  ctx.beginPath();
  ctx.moveTo(x, y + dy * size);
  ctx.lineTo(x, y);
  ctx.lineTo(x + dx * size, y);
  ctx.stroke();
}

function createCardFrame(w, h, color, opacity) {
  const group = new THREE.Group();
  const hw = w / 2, hh = h / 2;

  const pts = [
    new THREE.Vector3(-hw, hh, 0), new THREE.Vector3(hw, hh, 0),
    new THREE.Vector3(hw, -hh, 0), new THREE.Vector3(-hw, -hh, 0),
    new THREE.Vector3(-hw, hh, 0),
  ];
  const borderMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), borderMat));

  const cs = Math.min(w, h) * 0.12;
  [
    [[-hw, hh], [-hw + cs, hh], [-hw, hh - cs]],
    [[hw, hh], [hw - cs, hh], [hw, hh - cs]],
    [[hw, -hh], [hw - cs, -hh], [hw, -hh + cs]],
    [[-hw, -hh], [-hw + cs, -hh], [-hw, -hh + cs]],
  ].forEach(([o, h2, v]) => {
    const cpts = [
      new THREE.Vector3(v[0], v[1], 0.02),
      new THREE.Vector3(o[0], o[1], 0.02),
      new THREE.Vector3(h2[0], h2[1], 0.02),
    ];
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: opacity * 1.8 });
    mat.userData = { baseOp: opacity * 1.8 };
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(cpts), mat));
  });

  group.userData.borderMat = borderMat;
  return group;
}

function createResultCard(card, index) {
  const group = new THREE.Group();

  // ── Thumbnail face ──
  const thumbTex = createThumbTexture(card);
  const thumbMat = new THREE.MeshBasicMaterial({
    map: thumbTex, transparent: true, opacity: 0.7,
    side: THREE.DoubleSide, depthWrite: false,
  });
  const thumbMesh = new THREE.Mesh(new THREE.PlaneGeometry(THUMB_W, THUMB_H), thumbMat);
  thumbMesh.position.z = 0.01;
  group.add(thumbMesh);

  const thumbFrame = createCardFrame(THUMB_W, THUMB_H, WHITE, 0.15);
  group.add(thumbFrame);

  // ── Viewer face (initially hidden) ──
  const viewerTex = createViewerTexture(card);
  const viewerMat = new THREE.MeshBasicMaterial({
    map: viewerTex, transparent: true, opacity: 0,
    side: THREE.DoubleSide, depthWrite: false, toneMapped: false,
  });
  const viewerMesh = new THREE.Mesh(new THREE.PlaneGeometry(VIEWER_W, VIEWER_H), viewerMat);
  viewerMesh.position.z = 0.02;
  viewerMesh.visible = false;
  group.add(viewerMesh);

  const viewerFrame = createCardFrame(VIEWER_W, VIEWER_H, CYAN, 0.35);
  viewerFrame.visible = false;
  group.add(viewerFrame);

  // ── Scanline ──
  const hw = THUMB_W / 2;
  const scanGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-hw + 0.04, 0, 0.03),
    new THREE.Vector3(hw - 0.04, 0, 0.03),
  ]);
  const scanMat = new THREE.LineBasicMaterial({
    color: WHITE, transparent: true, opacity: 0.06,
  });
  const scanLine = new THREE.Line(scanGeo, scanMat);
  group.add(scanLine);

  group.userData = {
    index,
    thumbMat, thumbMesh, thumbFrame,
    viewerMat, viewerMesh, viewerFrame,
    scanLine, scanMat,
    isActive: false,
    driftSeed: index * 2.1,
  };

  group.traverse(c => {
    if (c.material) {
      c.material.userData = c.material.userData || {};
      c.material.userData.baseOp = c.material.opacity;
    }
  });

  return group;
}

/**
 * Create the full hexagonal carousel.
 * Also creates a sibling "focusGroup" at the same level
 * that holds the currently active card (so it doesn't rotate).
 */
export function createResultCarousel() {
  // Outer wrapper that holds both the spinning carousel and the static focus group
  const wrapper = new THREE.Group();
  wrapper.name = 'resultWrapper';

  const carousel = new THREE.Group();
  carousel.name = 'resultCarousel';
  const cards = [];

  const angles = [
    Math.PI / 2,
    Math.PI / 6,
    -Math.PI / 6,
    -Math.PI / 2,
    -Math.PI * 5 / 6,
    Math.PI * 5 / 6,
  ];

  RESULT_CARDS.forEach((data, i) => {
    const card = createResultCard(data, i);
    const angle = angles[i];
    card.position.set(
      Math.cos(angle) * ORBIT_RADIUS,
      Math.sin(angle) * ORBIT_RADIUS * ORBIT_TILT,
      Math.sin(angle) * ORBIT_RADIUS * 0.3
    );
    card.userData.basePos = card.position.clone();
    card.userData.orbitAngle = angle;
    cards.push(card);
    carousel.add(card);
  });

  // Hex connecting lines
  const linePts = [];
  for (let i = 0; i < 6; i++) {
    linePts.push(cards[i].position.clone(), cards[(i + 1) % 6].position.clone());
  }
  const lineGeo = new THREE.BufferGeometry().setFromPoints(linePts);
  const lineMat = new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.06 });
  const hexLines = new THREE.LineSegments(lineGeo, lineMat);
  carousel.add(hexLines);

  wrapper.add(carousel);

  // Focus group — static, doesn't rotate. Active card gets moved here.
  const focusGroup = new THREE.Group();
  focusGroup.name = 'resultFocus';
  wrapper.add(focusGroup);

  wrapper.visible = false;
  wrapper.userData = {
    carousel, focusGroup,
    cards, hexLines, lineMat,
    rotationSpeed: 0.06,
    activeIndex: -1,
  };

  return wrapper;
}

/**
 * Flicker in carousel
 */
export function flickerInCarousel(wrapper) {
  wrapper.visible = true;
  wrapper.userData.activeIndex = -1;
  const { carousel, cards } = wrapper.userData;

  // Ensure all cards are back in the carousel
  cards.forEach((card, i) => {
    if (card.parent !== carousel) {
      carousel.add(card);
    }
    card.userData.isActive = false;
    card.userData.viewerMesh.visible = false;
    card.userData.viewerFrame.visible = false;
    card.userData.thumbMesh.visible = true;
    card.userData.thumbFrame.visible = true;
    card.position.copy(card.userData.basePos);
    card.scale.set(1, 1, 1);
    card.rotation.set(0, 0, 0);

    card.traverse(c => {
      if (c.material && c.material.userData?.baseOp !== undefined) {
        c.material.opacity = 0;
        gsap.to(c.material, {
          opacity: c.material.userData.baseOp,
          duration: 0.5,
          delay: i * 0.1,
        });
      }
    });
  });

  wrapper.userData.lineMat.opacity = 0;
  gsap.to(wrapper.userData.lineMat, { opacity: 0.06, duration: 0.6, delay: 0.3 });
}

/**
 * Fade out carousel
 */
export function fadeOutCarousel(wrapper) {
  const { carousel, focusGroup, cards } = wrapper.userData;

  // Collapse any active card first
  cards.forEach(card => {
    if (card.userData.isActive) {
      // Quick snap back — no animation needed for zone exit
      card.userData.isActive = false;
      card.userData.viewerMesh.visible = false;
      card.userData.viewerFrame.visible = false;
      card.userData.thumbMesh.visible = true;
      card.userData.thumbFrame.visible = true;
      if (card.parent !== carousel) {
        carousel.add(card);
      }
      card.position.copy(card.userData.basePos);
      card.scale.set(1, 1, 1);
      card.rotation.set(0, 0, 0);
    }
    card.traverse(c => {
      if (c.material) gsap.to(c.material, { opacity: 0, duration: 0.3 });
    });
  });
  gsap.to(wrapper.userData.lineMat, { opacity: 0, duration: 0.3 });
  setTimeout(() => { wrapper.visible = false; }, 400);
}

/**
 * Expand a card: reparent from spinning carousel to static focusGroup,
 * then animate to front-and-center at large scale.
 */
function expandResultCard(card, wrapper) {
  const ud = card.userData;
  if (ud.isActive) return;
  ud.isActive = true;

  const { carousel, focusGroup } = wrapper.userData;

  // 1. Compute current world position of the card (including carousel rotation)
  card.updateWorldMatrix(true, false);
  const worldPos = new THREE.Vector3();
  card.getWorldPosition(worldPos);

  // 2. Reparent: remove from carousel, add to static focusGroup
  carousel.remove(card);
  focusGroup.add(card);

  // 3. Set position in focusGroup space (which is the same as wrapper space, no rotation)
  //    Account for wrapper's position offset
  const wrapperPos = wrapper.position;
  card.position.set(
    worldPos.x - wrapperPos.x,
    worldPos.y - wrapperPos.y,
    worldPos.z - wrapperPos.z
  );
  card.rotation.set(0, 0, 0);
  card.scale.set(1, 1, 1);

  // 4. Fade out thumb, show viewer
  gsap.to(ud.thumbMat, { opacity: 0, duration: 0.2 });
  setTimeout(() => {
    ud.thumbMesh.visible = false;
    ud.thumbFrame.visible = false;
  }, 200);

  ud.viewerMesh.visible = true;
  ud.viewerFrame.visible = true;
  gsap.to(ud.viewerMat, { opacity: 0.92, duration: 0.5, delay: 0.15 });
  ud.viewerFrame.traverse(c => {
    if (c.material) {
      c.material.opacity = 0;
      gsap.to(c.material, { opacity: c.material.userData?.baseOp || 0.35, duration: 0.4, delay: 0.2 });
    }
  });

  // 5. Animate to front-center at large scale
  gsap.to(card.position, {
    x: FOCUS_POS.x, y: FOCUS_POS.y, z: FOCUS_POS.z,
    duration: 0.65, ease: 'power2.out',
  });
  gsap.to(card.scale, {
    x: FOCUS_SCALE, y: FOCUS_SCALE, z: FOCUS_SCALE,
    duration: 0.5, delay: 0.1, ease: 'power2.out',
  });
}

/**
 * Collapse card: animate back toward its orbit slot, then reparent to carousel.
 */
function collapseResultCard(card, wrapper, duration = 0.4) {
  const ud = card.userData;
  if (!ud.isActive) return;
  ud.isActive = false;

  const { carousel } = wrapper.userData;

  // 1. Fade out viewer, prep for thumb
  gsap.to(ud.viewerMat, { opacity: 0, duration: duration * 0.6 });
  ud.viewerFrame.traverse(c => {
    if (c.material) gsap.to(c.material, { opacity: 0, duration: duration * 0.5 });
  });

  // 2. Compute where the card's orbit slot currently is in world space
  //    (accounting for carousel's current rotation)
  const bp = ud.basePos;
  const cosR = Math.cos(carousel.rotation.y);
  const sinR = Math.sin(carousel.rotation.y);
  const worldSlotX = bp.x * cosR + bp.z * sinR + wrapper.position.x;
  const worldSlotY = bp.y + wrapper.position.y;
  const worldSlotZ = -bp.x * sinR + bp.z * cosR + wrapper.position.z;

  // Position in focusGroup space
  const targetX = worldSlotX - wrapper.position.x;
  const targetY = worldSlotY - wrapper.position.y;
  const targetZ = worldSlotZ - wrapper.position.z;

  // 3. Animate toward orbit slot + shrink
  gsap.to(card.position, { x: targetX, y: targetY, z: targetZ, duration, ease: 'power2.inOut' });
  gsap.to(card.scale, { x: 1, y: 1, z: 1, duration: duration * 0.8, ease: 'power2.inOut' });

  // 4. At end of animation, reparent back to carousel
  setTimeout(() => {
    ud.viewerMesh.visible = false;
    ud.viewerFrame.visible = false;
    ud.thumbMesh.visible = true;
    ud.thumbFrame.visible = true;

    // Reparent back to carousel
    wrapper.userData.focusGroup.remove(card);
    carousel.add(card);
    card.position.copy(bp);
    card.rotation.set(0, 0, 0);
    card.scale.set(1, 1, 1);

    gsap.to(ud.thumbMat, { opacity: 0.7, duration: 0.25 });
  }, duration * 1000);
}

/**
 * Highlight a specific result card (expand it, dim others)
 */
export function highlightResultCard(wrapper, index) {
  wrapper.userData.activeIndex = index;
  const cards = wrapper.userData.cards;

  cards.forEach((card, i) => {
    if (i === index) {
      expandResultCard(card, wrapper);
    } else {
      if (card.userData.isActive) {
        collapseResultCard(card, wrapper);
      }
      // Dim orbit thumbnails
      setTimeout(() => {
        if (card.userData.thumbMesh.visible) {
          gsap.to(card.userData.thumbMat, { opacity: 0.15, duration: 0.3 });
        }
      }, 100);
    }
  });

  gsap.to(wrapper.userData.lineMat, { opacity: 0.03, duration: 0.3 });
}

/**
 * Reset carousel — collapse active card, restore all brightness
 */
export function resetCarousel(wrapper) {
  wrapper.userData.activeIndex = -1;
  const cards = wrapper.userData.cards;
  cards.forEach(card => {
    if (card.userData.isActive) {
      collapseResultCard(card, wrapper);
    }
    setTimeout(() => {
      gsap.to(card.userData.thumbMat, { opacity: 0.7, duration: 0.3 });
    }, 200);
  });
  gsap.to(wrapper.userData.lineMat, { opacity: 0.06, duration: 0.3 });
}

/**
 * Animate carousel — ALWAYS rotates + card drift + scanline
 */
export function animateResultCarousel(wrapper, time) {
  if (!wrapper.visible) return;

  const { carousel, cards } = wrapper.userData;
  const speed = wrapper.userData.rotationSpeed;

  // Carousel ALWAYS rotates
  carousel.rotation.y = time * speed;

  cards.forEach(card => {
    const ud = card.userData;

    // Subtle drift on orbit thumbnails (only when card is in the carousel)
    if (!ud.isActive && card.parent === carousel) {
      const seed = ud.driftSeed;
      const bp = ud.basePos;
      card.position.x = bp.x + Math.sin(time * 0.2 + seed) * 0.03;
      card.position.y = bp.y + Math.cos(time * 0.15 + seed * 1.4) * 0.02;
    }

    // Scanline
    if (ud.scanLine) {
      const h = ud.isActive ? VIEWER_H * FOCUS_SCALE : THUMB_H;
      const hh = h / 2;
      ud.scanLine.position.y = -hh + ((time * 0.35 + ud.driftSeed * 0.4) % 1) * h;
    }

    // Billboard: orbit thumbnails face the camera
    if (!ud.isActive && card.parent === carousel) {
      // Face toward camera (which is at +Z in world space)
      // We need to compute a look target in the carousel's local space
      const invRot = -carousel.rotation.y;
      const lookX = Math.sin(invRot) * 10;
      const lookZ = Math.cos(invRot) * 10;
      card.lookAt(lookX, card.position.y, lookZ);
    }

    // Active card in focus group: face directly toward camera (no rotation compensation needed)
    if (ud.isActive) {
      card.rotation.set(0, 0, 0);
    }
  });
}
