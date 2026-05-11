/**
 * 3D Comparison Table — Glass HUD panel rendered to canvas texture
 * Flickers in on activation for Zone 4 (Research Gap)
 * Supports column-by-column camera panning
 */
import * as THREE from 'three';
import gsap from 'gsap';

export const COMP_COLS = ['GAZEBO+PX4', 'AIRSIM', 'UAV TOOLBOX', 'ACADEMIC', 'THIS PROJECT'];
const ROWS = [
  'Physics simulation',
  'PX4 support',
  'Simulink integration',
  'QAV250-specific model',
  'MBD workflow',
  'Real validation path',
];

// Data: 0 = no, 1 = yes, 2 = partial
const DATA = [
  [1, 1, 1, 2, 1],  // Physics sim — Academic have simplified models
  [1, 1, 2, 2, 1],  // PX4 — UAV Toolbox partial, Academic none
  [0, 0, 1, 2, 1],  // Simulink — Academic partial
  [0, 0, 0, 2, 1],  // QAV250-specific — nobody else
  [0, 0, 1, 2, 1],  // MBD workflow — UAV Toolbox is MathWorks
  [0, 0, 0, 2, 1],  // Real validation path — Academic partial
];

const SYMBOLS = ['✗', '✓', '◐'];
const SYM_COLORS = ['rgba(255, 70, 90, 0.45)', 'rgba(0, 255, 136, 0.9)', 'rgba(255, 204, 0, 0.85)'];

// Layout constants (shared for column position calculations)
const CW = 1100, CH = 560;
const ROW_LABEL_W = 240;
const COL_W = (CW - ROW_LABEL_W) / COMP_COLS.length;
const TABLE_LEFT = 10;

/**
 * Create the comparison table as a 3D plane with canvas texture
 * @returns {THREE.Group}
 */
export function createCompTable() {
  const group = new THREE.Group();

  const res = 2;
  const canvas = document.createElement('canvas');
  canvas.width = CW * res;
  canvas.height = CH * res;
  const ctx = canvas.getContext('2d');
  ctx.scale(res, res);

  const headerH = 50;
  const rowH = 68;
  const tableTop = 45;

  // ── Background ──
  ctx.fillStyle = 'rgba(5, 10, 25, 0.01)';
  ctx.fillRect(0, 0, CW, CH);

  // ── Column headers ──
  ctx.textAlign = 'center';

  COMP_COLS.forEach((col, ci) => {
    const x = TABLE_LEFT + ROW_LABEL_W + ci * COL_W;
    const isGlow = ci === COMP_COLS.length - 1;

    // Header cell background
    if (isGlow) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(x + 2, tableTop, COL_W - 4, headerH);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x + 2, tableTop, COL_W - 4, headerH);
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(x + 2, tableTop, COL_W - 4, headerH);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 2, tableTop, COL_W - 4, headerH);
    }

    // Header text
    ctx.fillStyle = isGlow ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.7)';
    ctx.shadowColor = isGlow ? 'rgba(255, 255, 255, 0.5)' : 'transparent';
    ctx.shadowBlur = isGlow ? 8 : 0;
    ctx.font = isGlow ? '700 13px "JetBrains Mono", monospace' : '600 11px "JetBrains Mono", monospace';
    ctx.fillText(col, x + COL_W / 2, tableTop + headerH / 2 + 5);
  });

  ctx.shadowBlur = 0;

  // ── Rows ──
  ROWS.forEach((row, ri) => {
    const y = tableTop + headerH + 6 + ri * rowH;

    // Row label background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    ctx.fillRect(TABLE_LEFT, y, ROW_LABEL_W - 4, rowH - 4);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.strokeRect(TABLE_LEFT, y, ROW_LABEL_W - 4, rowH - 4);

    // Row label text — white
    ctx.font = '500 12px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillText(row.toUpperCase(), TABLE_LEFT + 14, y + rowH / 2 + 2);

    // Data cells
    COMP_COLS.forEach((_, ci) => {
      const x = TABLE_LEFT + ROW_LABEL_W + ci * COL_W;
      const val = DATA[ri][ci];
      const isGlow = ci === COMP_COLS.length - 1;

      // Cell background
      if (isGlow) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.fillRect(x + 2, y, COL_W - 4, rowH - 4);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 2, y, COL_W - 4, rowH - 4);
      } else {
        ctx.fillStyle = 'rgba(5, 10, 20, 0.25)';
        ctx.fillRect(x + 2, y, COL_W - 4, rowH - 4);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 2, y, COL_W - 4, rowH - 4);
      }

      // Symbol
      ctx.font = isGlow ? '700 22px sans-serif' : '400 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = isGlow && val === 1 ? 'rgba(0, 255, 136, 0.95)' : SYM_COLORS[val];
      if (isGlow && val === 1) {
        ctx.shadowColor = 'rgba(0, 255, 136, 0.4)';
        ctx.shadowBlur = 8;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fillText(SYMBOLS[val], x + COL_W / 2, y + rowH / 2 + 4);
      ctx.shadowBlur = 0;
    });
  });

  // ── Outer border ──
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.strokeRect(TABLE_LEFT, tableTop, CW - TABLE_LEFT * 2, headerH + 6 + ROWS.length * rowH);

  // ── Glow column vertical highlight ──
  const glowX = TABLE_LEFT + ROW_LABEL_W + (COMP_COLS.length - 1) * COL_W;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(glowX + 1, tableTop, COL_W - 2, headerH + 6 + ROWS.length * rowH);

  // Create texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;

  // 3D plane
  const worldW = 7;
  const worldH = worldW * (CH / CW);
  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(worldW, worldH), mat);
  group.add(mesh);

  // ── Border frame — subdivided for jagged electric noise ──
  const hw = worldW / 2, hh = worldH / 2;
  const SEGS_PER_SIDE = 30; // many points for jagged arcs
  const borderPts = [];
  // Top: left to right
  for (let i = 0; i <= SEGS_PER_SIDE; i++) {
    borderPts.push(new THREE.Vector3(-hw + (worldW * i / SEGS_PER_SIDE), hh, 0));
  }
  // Right: top to bottom
  for (let i = 1; i <= SEGS_PER_SIDE; i++) {
    borderPts.push(new THREE.Vector3(hw, hh - (worldH * i / SEGS_PER_SIDE), 0));
  }
  // Bottom: right to left
  for (let i = 1; i <= SEGS_PER_SIDE; i++) {
    borderPts.push(new THREE.Vector3(hw - (worldW * i / SEGS_PER_SIDE), -hh, 0));
  }
  // Left: bottom to top
  for (let i = 1; i <= SEGS_PER_SIDE; i++) {
    borderPts.push(new THREE.Vector3(-hw, -hh + (worldH * i / SEGS_PER_SIDE), 0));
  }
  const borderGeo = new THREE.BufferGeometry().setFromPoints(borderPts);
  const borderMat = new THREE.LineBasicMaterial({
    color: 0xffffff, transparent: true, opacity: 0,
  });
  const border = new THREE.Line(borderGeo, borderMat);
  group.add(border);

  // Store border ref + base positions for electric noise
  group.userData.border = border;
  group.userData.borderBasePositions = new Float32Array(borderGeo.attributes.position.array);
  group.userData.borderSegments = SEGS_PER_SIDE;
  group.userData.worldW = worldW;
  group.userData.worldH = worldH;

  // ── Corner accents ──
  const cs = 0.3;
  [
    [[-hw, hh], [-hw + cs, hh], [-hw, hh - cs]],
    [[hw, hh], [hw - cs, hh], [hw, hh - cs]],
    [[hw, -hh], [hw - cs, -hh], [hw, -hh + cs]],
    [[-hw, -hh], [-hw + cs, -hh], [-hw, -hh + cs]],
  ].forEach(([o, h2, v]) => {
    const pts = [
      new THREE.Vector3(v[0], v[1], 0.01),
      new THREE.Vector3(o[0], o[1], 0.01),
      new THREE.Vector3(h2[0], h2[1], 0.01),
    ];
    const cMat = new THREE.LineBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0,
    });
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), cMat));
  });

  // ── Scanline ──
  const scanGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-hw + 0.05, 0, 0.02),
    new THREE.Vector3(hw - 0.05, 0, 0.02),
  ]);
  const scanMat = new THREE.LineBasicMaterial({
    color: 0xffffff, transparent: true, opacity: 0,
  });
  const scanLine = new THREE.Line(scanGeo, scanMat);
  group.add(scanLine);

  group.userData.scanLine = scanLine;
  group.userData.scanMat = scanMat;
  group.userData.tableHeight = worldH;
  group.userData.nextNoiseTime = 2;  // first noise event

  // Store base opacities
  group.traverse(c => {
    if (c.material) {
      c.material.userData = c.material.userData || {};
      c.material.userData.baseOp = c === mesh ? 0.85 : c === scanLine ? 0.1 : 0.45;
    }
  });

  group.visible = false;
  return group;
}

/**
 * Get the world-space X position for a given column index
 * Used for camera panning
 */
export function getColumnWorldX(colIndex) {
  const worldW = 7;
  // Map canvas column center to world coordinates
  const canvasCenterX = TABLE_LEFT + ROW_LABEL_W + colIndex * COL_W + COL_W / 2;
  const normalizedX = (canvasCenterX / CW) - 0.5;  // -0.5 to 0.5
  return normalizedX * worldW;
}

/**
 * Flicker the table in — rapid opacity pulses then settle
 */
export function flickerIn(table) {
  table.visible = true;

  const mats = [];
  table.traverse(c => {
    if (c.material) mats.push(c.material);
  });

  mats.forEach(m => { m.opacity = 0; });

  const tl = gsap.timeline();
  const flickers = [
    { op: 0.3, dur: 0.05 },
    { op: 0, dur: 0.08 },
    { op: 0.5, dur: 0.04 },
    { op: 0.1, dur: 0.06 },
    { op: 0.7, dur: 0.05 },
    { op: 0.2, dur: 0.07 },
    { op: 0.9, dur: 0.06 },
    { op: 0.4, dur: 0.04 },
  ];

  flickers.forEach(f => {
    tl.to({}, {
      duration: f.dur,
      onStart: () => {
        mats.forEach(m => { m.opacity = f.op * (m.userData.baseOp || 0.8); });
      }
    });
  });

  tl.to({}, {
    duration: 0.3,
    onStart: () => {
      mats.forEach(m => {
        gsap.to(m, { opacity: m.userData.baseOp || 0.8, duration: 0.3 });
      });
    }
  });
}

/**
 * Fade the table out
 */
export function fadeOutTable(table) {
  table.traverse(c => {
    if (c.material) gsap.to(c.material, { opacity: 0, duration: 0.4 });
  });
  setTimeout(() => { table.visible = false; }, 500);
}

/**
 * Animate: scanline + jagged electric noise on border wireframe
 */
export function animateCompTable(table, time) {
  if (!table.visible) return;

  // Scanline sweep
  const scan = table.userData.scanLine;
  if (scan) {
    const hh = table.userData.tableHeight / 2;
    scan.position.y = -hh + ((time * 0.2) % 1) * table.userData.tableHeight;
  }

  // Jagged electric noise on border
  const border = table.userData.border;
  if (border && table.userData.borderBasePositions) {
    const pos = border.geometry.attributes.position.array;
    const base = table.userData.borderBasePositions;
    const n = pos.length / 3;  // number of vertices

    if (time > table.userData.nextNoiseTime) {
      // Pick a random arc segment — a run of ~8-15 consecutive vertices
      const arcLen = 8 + Math.floor(Math.random() * 8);
      const arcStart = Math.floor(Math.random() * (n - arcLen));
      const intensity = 0.06 + Math.random() * 0.1;

      // Displace vertices perpendicular to the edge to create jagged lightning
      for (let i = arcStart; i < arcStart + arcLen; i++) {
        const idx = i * 3;
        const bx = base[idx], by = base[idx + 1];

        // Determine which side this vertex is on for perpendicular displacement
        const segs = table.userData.borderSegments;
        const side = Math.floor(i / segs);  // 0=top, 1=right, 2=bottom, 3=left

        // Perpendicular offset: horizontal edges jag vertically, vertical edges jag horizontally
        const jag = (Math.random() - 0.5) * 2 * intensity;
        if (side === 0 || side === 2) {
          // Top or bottom edge — jag Y
          pos[idx] = bx;
          pos[idx + 1] = by + jag;
        } else {
          // Left or right edge — jag X
          pos[idx] = bx + jag;
          pos[idx + 1] = by;
        }
      }
      border.geometry.attributes.position.needsUpdate = true;

      // Snap back after brief flash
      setTimeout(() => {
        for (let i = 0; i < pos.length; i++) pos[i] = base[i];
        border.geometry.attributes.position.needsUpdate = true;
      }, 50 + Math.random() * 60);

      // Double-strike effect
      if (Math.random() > 0.4) {
        const delay = 80 + Math.random() * 60;
        setTimeout(() => {
          const arc2Start = Math.floor(Math.random() * (n - arcLen));
          for (let i = arc2Start; i < arc2Start + arcLen; i++) {
            const idx = i * 3;
            const bx2 = base[idx], by2 = base[idx + 1];
            const segs = table.userData.borderSegments;
            const side = Math.floor(i / segs);
            const jag2 = (Math.random() - 0.5) * 2 * intensity * 0.7;
            if (side === 0 || side === 2) {
              pos[idx] = bx2;
              pos[idx + 1] = by2 + jag2;
            } else {
              pos[idx] = bx2 + jag2;
              pos[idx + 1] = by2;
            }
          }
          border.geometry.attributes.position.needsUpdate = true;
          setTimeout(() => {
            for (let i = 0; i < pos.length; i++) pos[i] = base[i];
            border.geometry.attributes.position.needsUpdate = true;
          }, 40);
        }, delay);
      }

      // Next noise in 1.5-4 seconds
      table.userData.nextNoiseTime = time + 1.5 + Math.random() * 2.5;
    }
  }
}
