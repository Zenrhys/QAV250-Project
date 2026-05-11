/**
 * QAV250 Holographic Presentation — Main Entry Point
 * Continuous 3D journey through a holographic environment
 * Includes Zone 7 sub-navigation (Iron Man explode view)
 */
import * as THREE from 'three';
import gsap from 'gsap';
import { createScene } from './core/scene.js';
import { createDrone, animateDrone, explodeDroneComponents, createGhostDrone, animateGhostDrone, EXPLODE_POSITIONS } from './core/drone.js';
import { createHoloCard, animateHoloCards } from './core/holo-cards.js';
import { createHexRing, highlightNode, animateHexRing, OBJECTIVES } from './core/hex-ring.js';
import { createCompTable, flickerIn, fadeOutTable, animateCompTable } from './core/comp-table.js';
import { createArchDiagram, flickerInArch, fadeOutArch, animateArchDiagram, ARCH_STEPS } from './core/arch-diagram-3d.js';
import { createSwStack, flickerInStack, fadeOutStack, animateSwStack } from './core/sw-stack-3d.js';
import { createHwDiagram, flickerInHw, fadeOutHw, animateHwDiagram } from './core/hw-diagram-3d.js';
import { ZONES } from './core/zones.js';
import { EXPLODE_STEPS } from './core/explode-data.js';
import { decodeText, decodeSequence } from './core/decode.js';
import { METHOD_CARDS } from './core/method-cards.js';
import { createMethodCards3D, flickerInMethodCards, fadeOutMethodCards, highlightMethodCard, resetMethodCards3D, animateMethodCards3D } from './core/method-cards-3d.js';
import { TEST_GATES, buildTestMatrix, highlightGate } from './core/test-matrix.js';
import { RESULT_CARDS } from './core/result-cards.js';
import { createResultCarousel, flickerInCarousel, fadeOutCarousel, highlightResultCard, resetCarousel, animateResultCarousel } from './core/result-carousel-3d.js';

// ── EDITOR MODE — set to false for production ──
const EDITOR = false;

if (EDITOR) {
  const panel = document.createElement('div');
  panel.id = 'editor-panel';
  panel.innerHTML = `
    <style>
      #editor-panel {
        position: fixed; bottom: 10px; right: 10px; z-index: 9999;
        background: rgba(0,0,0,0.9); border: 1px solid rgba(0,240,255,0.3);
        border-radius: 6px; padding: 10px 14px; color: #ccc;
        font: 10px/1.5 "JetBrains Mono", monospace; width: 280px;
        max-height: 70vh; overflow-y: auto; pointer-events: auto;
      }
      #editor-panel h3 { color: #00f0ff; font-size: 9px; letter-spacing: 2px; margin: 10px 0 2px; border-top: 1px solid rgba(0,240,255,0.15); padding-top: 6px; }
      #editor-panel h3:first-of-type { border-top: none; }
      body.editor-mode, body.editor-mode * { cursor: default !important; }
      #editor-panel label { display: flex; justify-content: space-between; align-items: center; gap: 6px; margin: 1px 0; font-size: 9px; }
      #editor-panel input[type=range] { width: 100px; height: 12px; }
      #editor-panel .val { color: #0f8; min-width: 28px; text-align: right; font-size: 9px; }
      #editor-panel summary { cursor: pointer; color: #00f0ff; font-size: 10px; letter-spacing: 2px; }
      #editor-panel details[open] summary { margin-bottom: 4px; }
    </style>
    <details open>
      <summary>▶ EDITOR</summary>

      <h3>HERO (Zone 0)</h3>
      <label>Title <input type="range" min="40" max="200" value="160" id="ed-hero-title"> <span class="val" id="ed-hero-title-v">160</span></label>
      <label>Subtitle <input type="range" min="8" max="24" value="16" id="ed-hero-sub"> <span class="val" id="ed-hero-sub-v">16</span></label>
      <label>Team Names <input type="range" min="8" max="24" value="14" id="ed-hero-team"> <span class="val" id="ed-hero-team-v">14</span></label>

      <h3>ZONE PANELS (1-3)</h3>
      <label>Zone Title <input type="range" min="16" max="72" value="56" id="ed-ztitle"> <span class="val" id="ed-ztitle-v">56</span></label>
      <label>Zone Subtitle <input type="range" min="8" max="24" value="12" id="ed-zsub"> <span class="val" id="ed-zsub-v">12</span></label>
      <label>Zone Body <input type="range" min="8" max="24" value="14" id="ed-zbody"> <span class="val" id="ed-zbody-v">14</span></label>

      <h3>OBJECTIVES HEX (Zone 2 — canvas)</h3>
      <label>Number <input type="range" min="20" max="80" value="52" id="ed-hex-num"> <span class="val" id="ed-hex-num-v">52</span></label>
      <label>Title <input type="range" min="10" max="32" value="20" id="ed-hex-title"> <span class="val" id="ed-hex-title-v">20</span></label>
      <label>Status Label <input type="range" min="6" max="18" value="11" id="ed-hex-label"> <span class="val" id="ed-hex-label-v">11</span></label>
      <label>Status Value <input type="range" min="8" max="22" value="14" id="ed-hex-status"> <span class="val" id="ed-hex-status-v">14</span></label>
      <label>Complete <input type="range" min="8" max="20" value="13" id="ed-hex-comp"> <span class="val" id="ed-hex-comp-v">13</span></label>

      <h3>HOLO CARDS (Zone 3 — canvas)</h3>
      <label>Card Title <input type="range" min="10" max="28" value="18" id="ed-holo-title"> <span class="val" id="ed-holo-title-v">18</span></label>
      <label>Card Body <input type="range" min="8" max="22" value="14" id="ed-holo-body"> <span class="val" id="ed-holo-body-v">14</span></label>

      <h3>COMP TABLE (Zone 3 — canvas)</h3>
      <label>Header <input type="range" min="8" max="20" value="13" id="ed-ct-header"> <span class="val" id="ed-ct-header-v">13</span></label>
      <label>Cell Text <input type="range" min="8" max="20" value="12" id="ed-ct-cell"> <span class="val" id="ed-ct-cell-v">12</span></label>
      <label>Emoji <input type="range" min="12" max="36" value="20" id="ed-ct-emoji"> <span class="val" id="ed-ct-emoji-v">20</span></label>

      <h3>SW STACK (Zone 4 — canvas)</h3>
      <label>Layer Name <input type="range" min="10" max="28" value="18" id="ed-sw-name"> <span class="val" id="ed-sw-name-v">18</span></label>
      <label>Layer Desc <input type="range" min="8" max="20" value="13" id="ed-sw-desc"> <span class="val" id="ed-sw-desc-v">13</span></label>

      <h3>ARCH DIAGRAM (Zone 5 — canvas)</h3>
      <label>Box Title <input type="range" min="8" max="22" value="13" id="ed-arch-title"> <span class="val" id="ed-arch-title-v">13</span></label>
      <label>Box Subtitle <input type="range" min="6" max="18" value="10" id="ed-arch-sub"> <span class="val" id="ed-arch-sub-v">10</span></label>
      <label>Connector <input type="range" min="6" max="16" value="9" id="ed-arch-conn"> <span class="val" id="ed-arch-conn-v">9</span></label>

      <h3>HW DIAGRAM (Zone 6 — canvas)</h3>
      <label>Box Title <input type="range" min="8" max="22" value="13" id="ed-hw-title"> <span class="val" id="ed-hw-title-v">13</span></label>
      <label>Box Subtitle <input type="range" min="6" max="18" value="10" id="ed-hw-sub"> <span class="val" id="ed-hw-sub-v">10</span></label>
      <label>Connector <input type="range" min="6" max="16" value="9" id="ed-hw-conn"> <span class="val" id="ed-hw-conn-v">9</span></label>

      <h3>DESIGN DETAILS (Zone 7)</h3>
      <label>Photo W <input type="range" min="100" max="700" value="550" id="ed-expl-w"> <span class="val" id="ed-expl-w-v">550</span></label>
      <label>Photo H <input type="range" min="80" max="600" value="488" id="ed-expl-h"> <span class="val" id="ed-expl-h-v">488</span></label>
      <label>Meta Title <input type="range" min="8" max="24" value="14" id="ed-expl-title"> <span class="val" id="ed-expl-title-v">14</span></label>
      <label>Meta Spec <input type="range" min="6" max="18" value="10" id="ed-expl-spec"> <span class="val" id="ed-expl-spec-v">10</span></label>

      <h3>METHODOLOGY (Zone 8 — canvas)</h3>
      <label>Front Title <input type="range" min="12" max="36" value="24" id="ed-meth-ftitle"> <span class="val" id="ed-meth-ftitle-v">24</span></label>
      <label>Section Label <input type="range" min="8" max="24" value="14" id="ed-meth-label"> <span class="val" id="ed-meth-label-v">14</span></label>
      <label>Body Text <input type="range" min="8" max="24" value="16" id="ed-meth-body"> <span class="val" id="ed-meth-body-v">16</span></label>
      <label>Procedure <input type="range" min="8" max="24" value="15" id="ed-meth-proc"> <span class="val" id="ed-meth-proc-v">15</span></label>
      <label>Detail Title <input type="range" min="10" max="28" value="20" id="ed-meth-dtitle"> <span class="val" id="ed-meth-dtitle-v">20</span></label>

      <h3>TEST MATRIX (Zone 9)</h3>
      <label>Header <input type="range" min="8" max="28" value="16" id="ed-tm-header"> <span class="val" id="ed-tm-header-v">16</span></label>
      <label>Gate Name <input type="range" min="8" max="32" value="21" id="ed-tm-test"> <span class="val" id="ed-tm-test-v">21</span></label>
      <label>Gate Number <input type="range" min="8" max="32" value="22" id="ed-tm-num"> <span class="val" id="ed-tm-num-v">22</span></label>
      <label>Detail Label <input type="range" min="6" max="24" value="17" id="ed-tm-dlabel"> <span class="val" id="ed-tm-dlabel-v">17</span></label>
      <label>Detail Value <input type="range" min="8" max="28" value="19" id="ed-tm-dval"> <span class="val" id="ed-tm-dval-v">19</span></label>
      <label>Status <input type="range" min="6" max="24" value="16" id="ed-tm-status"> <span class="val" id="ed-tm-status-v">16</span></label>

      <h3>RESULTS (Zone 10 — canvas+DOM)</h3>
      <label>Thumb Title <input type="range" min="8" max="24" value="14" id="ed-res-thumb"> <span class="val" id="ed-res-thumb-v">14</span></label>
      <label>Viewer Result <input type="range" min="8" max="24" value="15" id="ed-res-result"> <span class="val" id="ed-res-result-v">15</span></label>
      <label>Viewer Label <input type="range" min="6" max="18" value="11" id="ed-res-label"> <span class="val" id="ed-res-label-v">11</span></label>
      <label>Viewer Body <input type="range" min="8" max="20" value="13" id="ed-res-body"> <span class="val" id="ed-res-body-v">13</span></label>
      <label>Overlay W (vw) <input type="range" min="20" max="90" value="55" id="ed-res-w"> <span class="val" id="ed-res-w-v">55</span></label>
      <label>Overlay H (vh) <input type="range" min="20" max="90" value="55" id="ed-res-h"> <span class="val" id="ed-res-h-v">55</span></label>

      <h3>ANALYSIS—CONCLUSION (11-15)</h3>
      <label>Section Title <input type="range" min="10" max="32" value="18" id="ed-late-title"> <span class="val" id="ed-late-title-v">18</span></label>
      <label>Bullet Text <input type="range" min="8" max="20" value="12" id="ed-late-bullet"> <span class="val" id="ed-late-bullet-v">12</span></label>
      <label>Sub Label <input type="range" min="6" max="18" value="10" id="ed-late-sub"> <span class="val" id="ed-late-sub-v">10</span></label>
    </details>
  `;
  document.body.appendChild(panel);
  document.body.classList.add('editor-mode');

  // Helper: wire a slider to live DOM updates
  const wire = (id, selector, prop) => {
    const slider = document.getElementById(id);
    const valEl = document.getElementById(id + '-v');
    slider.addEventListener('input', () => {
      valEl.textContent = slider.value;
      if (selector) {
        const unit = id.includes('-w') || id.includes('-h') ? (id.includes('vw') || id.includes('vh') ? '' : 'px') : 'px';
        document.querySelectorAll(selector).forEach(el => el.style[prop || 'fontSize'] = slider.value + unit);
      }
    });
  };

  // Helper: wire a slider that just logs (canvas-based)
  const wireLog = (id, label) => {
    const slider = document.getElementById(id);
    const valEl = document.getElementById(id + '-v');
    slider.addEventListener('input', () => {
      valEl.textContent = slider.value;
      console.log(`[EDITOR] ${label}: ${slider.value}px`);
    });
  };

  // Hero
  wire('ed-hero-title', '.hero-title', 'fontSize');
  wire('ed-hero-sub', '.hero-subtitle, .hero-tagline', 'fontSize');
  wire('ed-hero-team', '.hero-oneliner', 'fontSize');

  // Zone panels
  wire('ed-ztitle', '.zone-title', 'fontSize');
  wire('ed-zsub', '.zone-subtitle', 'fontSize');
  wire('ed-zbody', '.zone-body', 'fontSize');

  // Objectives hex (canvas)
  wireLog('ed-hex-num', 'Hex ring number');
  wireLog('ed-hex-title', 'Hex ring title');
  wireLog('ed-hex-label', 'Hex ring status label');
  wireLog('ed-hex-status', 'Hex ring status value');
  wireLog('ed-hex-comp', 'Hex ring complete text');

  // Holo cards (canvas)
  wireLog('ed-holo-title', 'Holo card title');
  wireLog('ed-holo-body', 'Holo card body');

  // Comp table (canvas)
  wireLog('ed-ct-header', 'Comp table header');
  wireLog('ed-ct-cell', 'Comp table cell text');
  wireLog('ed-ct-emoji', 'Comp table emoji');

  // SW Stack (canvas)
  wireLog('ed-sw-name', 'SW stack layer name');
  wireLog('ed-sw-desc', 'SW stack layer desc');

  // Arch diagram (canvas)
  wireLog('ed-arch-title', 'Arch diagram box title');
  wireLog('ed-arch-sub', 'Arch diagram box subtitle');
  wireLog('ed-arch-conn', 'Arch diagram connector');

  // HW diagram (canvas)
  wireLog('ed-hw-title', 'HW diagram box title');
  wireLog('ed-hw-sub', 'HW diagram box subtitle');
  wireLog('ed-hw-conn', 'HW diagram connector');

  // Explode view
  const wireExplode = (id, prop) => {
    const slider = document.getElementById(id);
    const valEl = document.getElementById(id + '-v');
    slider.addEventListener('input', () => {
      valEl.textContent = slider.value;
      document.querySelectorAll('.explode-photo-frame').forEach(el => el.style[prop] = slider.value + 'px');
    });
  };
  wireExplode('ed-expl-w', 'width');
  wireExplode('ed-expl-h', 'height');
  wire('ed-expl-title', '.explode-meta-title, .explode-meta-label', 'fontSize');
  wire('ed-expl-spec', '.explode-meta-spec', 'fontSize');

  // Methodology (canvas)
  wireLog('ed-meth-ftitle', 'Method front title');
  wireLog('ed-meth-label', 'Method section label');
  wireLog('ed-meth-body', 'Method body text');
  wireLog('ed-meth-proc', 'Method procedure text');
  wireLog('ed-meth-dtitle', 'Method detail title');

  // Test Matrix (DOM)
  wire('ed-tm-header', '.tm-header-label', 'fontSize');
  wire('ed-tm-test', '.tm-gate-test', 'fontSize');
  wire('ed-tm-num', '.tm-gate-num', 'fontSize');
  wire('ed-tm-dlabel', '.tm-detail-label', 'fontSize');
  wire('ed-tm-dval', '.tm-detail-value', 'fontSize');
  wire('ed-tm-status', '.tm-gate-status', 'fontSize');

  // Results carousel (canvas)
  wireLog('ed-res-thumb', 'Result thumb title');
  wireLog('ed-res-result', 'Result viewer result text');
  wireLog('ed-res-label', 'Result viewer label');
  wireLog('ed-res-body', 'Result viewer body');

  // Results overlay (DOM)
  const wireOverlay = (id, prop, unit) => {
    const slider = document.getElementById(id);
    const valEl = document.getElementById(id + '-v');
    slider.addEventListener('input', () => {
      valEl.textContent = slider.value;
      const overlay = document.getElementById('result-image-overlay');
      if (overlay) overlay.style[prop] = slider.value + unit;
    });
  };
  wireOverlay('ed-res-w', 'width', 'vw');
  wireOverlay('ed-res-h', 'height', 'vh');

  // Late zones (Analysis → References)
  wire('ed-late-title', '.content-left .zone-title, .content-center .zone-title', 'fontSize');
  wire('ed-late-bullet', '.objective-text', 'fontSize');
  wire('ed-late-sub', '.content-left .zone-subtitle, .content-center .zone-subtitle', 'fontSize');
}

// ── State ──
let currentZone = 0;
let isTransitioning = false;
let clock = new THREE.Clock();

// Zone 7 explode sub-step state
let explodeSubStep = -1;  // -1 = initial Zone 7 content, 0-24 = component steps
const HARDWARE_ZONE_INDEX = ZONES.findIndex(z => z.id === 'hardware');

// Zone 3 objective sub-step state
let objectiveStep = -1;  // -1 = overview (all fronts), 0-5 = highlighted node
const OBJECTIVES_ZONE_INDEX = ZONES.findIndex(z => z.id === 'objectives');

// Zone 5 architecture sub-step state
let archStep = -1;  // -1 = initial, 0 = overview, 1 = simulink zoom, 2 = UE pan
const ARCH_ZONE_INDEX = ZONES.findIndex(z => z.id === 'architecture');
const METHOD_ZONE_INDEX = ZONES.findIndex(z => z.id === 'methodology');
let methodStep = -1;  // -1 = overview (all collapsed), 0-5 = expanded card

// Testing zone sub-step state
const TESTING_ZONE_INDEX = ZONES.findIndex(z => z.id === 'testing');
let testStep = -1;  // -1 = overview (all gates, none expanded), 0-5 = expanded gate
let testMatrixEl = null;  // Reference to the mounted clipboard DOM

// Results zone sub-step state
const RESULTS_ZONE_INDEX = ZONES.findIndex(z => z.id === 'results');
let resultStep = -1;  // -1 = overview carousel, 0-5 = expanded result card

// ── Initialize ──
const canvas = document.getElementById('three-canvas');
const { renderer, scene, camera, composer, particles } = createScene(canvas);

// Drone
const drone = createDrone();
scene.add(drone);

// Ghost drone (sim-to-real gap visualization)
const ghostDrone = createGhostDrone(drone);
ghostDrone.userData.baseX = -1.8;
ghostDrone.userData.baseY = 0.3;
ghostDrone.position.set(-1.8, 0.3, 0);
scene.add(ghostDrone);

// Holographic scope cards (Zone 2)
const includedCard = createHoloCard(
  'INCLUDED',
  ['Plant model', 'Parameter measurement', 'PX4 lockstep co-sim', 'UE 5.3 digital twin', 'OptiTrack flight data', 'Behavior matching'],
  0x00ff88, 2.6, 3.2
);
includedCard.position.set(-1.5, -1.2, 1);
includedCard.rotation.y = 0.15;
scene.add(includedCard);

const excludedCard = createHoloCard(
  'EXCLUDED',
  ['Custom controller dev', 'Obstacle avoidance', 'Companion computer', 'Outdoor flight', 'ML perception'],
  0xff3344, 2.6, 3.2
);
excludedCard.position.set(1.5, -1.2, 1);
excludedCard.rotation.y = -0.15;
scene.add(excludedCard);

const holoCards = [includedCard, excludedCard];

// Hexagonal objective ring (Zone 3)
const hexRing = createHexRing();
scene.add(hexRing);

// Comparison table (Zone 4)
const compTable = createCompTable();
compTable.position.set(0, 0.3, 1);
scene.add(compTable);

// Architecture diagram (Zone 5)
const archDiagram = createArchDiagram();
archDiagram.position.set(0, 0.5, 2);
scene.add(archDiagram);

// Software stack (Zone 5 sub-step 0)
const swStack = createSwStack();
swStack.position.set(0, 0.5, 2);
scene.add(swStack);

// Hardware path diagram (Zone 6)
const hwDiagram = createHwDiagram();
hwDiagram.position.set(0, 0.5, 2);
scene.add(hwDiagram);

// Methodology 3D cards (Zone 9)
const methodCards3D = createMethodCards3D();
methodCards3D.position.set(0, -0.3, 2);
scene.add(methodCards3D);

// Result carousel (Zone 11)
const resultCarousel = createResultCarousel();
resultCarousel.position.set(0, 0, 2);
scene.add(resultCarousel);

// DOM refs
const zoneContent = document.getElementById('zone-content');
const progressFill = document.getElementById('progress-fill');
const zoneLabel = document.getElementById('zone-label');
const zoneNum = document.getElementById('zone-num');
const navHint = document.getElementById('nav-hint');

// ── Camera target (for smooth lookAt) ──
const cameraTarget = new THREE.Vector3(0, 0, 0);
const cameraTargetCurrent = new THREE.Vector3(0, 0, 0);

// ── Zone Navigation ──
function goToZone(index, instant = false) {
  if (index < 0 || index >= ZONES.length) return;
  if (isTransitioning && !instant) return;

  isTransitioning = true;
  const zone = ZONES[index];
  const duration = instant ? 0 : 1.2;
  const ease = 'power2.inOut';

  // Reset methodology sub-step when leaving that zone
  if (currentZone === METHOD_ZONE_INDEX && index !== METHOD_ZONE_INDEX) {
    methodStep = -1;
  }

  // Reset testing sub-step when leaving that zone
  if (currentZone === TESTING_ZONE_INDEX && index !== TESTING_ZONE_INDEX) {
    testStep = -1;
    testMatrixEl = null;
  }

  // Reset results sub-step when leaving that zone
  if (currentZone === RESULTS_ZONE_INDEX && index !== RESULTS_ZONE_INDEX) {
    resultStep = -1;
    clearResultOverlay();
  }

  // Reset explode sub-step when leaving Zone 7
  if (currentZone === HARDWARE_ZONE_INDEX && index !== HARDWARE_ZONE_INDEX) {
    explodeSubStep = -1;
    clearExplodeOverlay();
    // Remove stale explode metadata text
    document.querySelectorAll('.explode-meta, .explode-photo-card').forEach(el => el.remove());
    // Restore all component opacities
    const comps = drone.userData.components;
    if (comps) {
      Object.keys(comps).forEach(key => {
        const group = comps[key];
        if (!group) return;
        group.traverse(child => {
          if (child.material && child.material._origOpacity != null) {
            child.material.opacity = child.material._origOpacity;
          }
        });
      });
    }
  }

  // Update HUD
  zoneLabel.textContent = zone.label;
  zoneNum.textContent = String(index).padStart(2, '0');
  progressFill.style.width = `${(index / (ZONES.length - 1)) * 100}%`;

  // Fade out old content
  const oldContent = zoneContent.querySelector('.zone-text.active');
  if (oldContent) {
    oldContent.classList.remove('active');
    oldContent.classList.add('zone-exit');
    setTimeout(() => oldContent.remove(), 400);
  }

  // Camera animation
  const [cx, cy, cz] = zone.camera.pos;
  const [lx, ly, lz] = zone.camera.look;
  gsap.to(camera.position, { x: cx, y: cy, z: cz, duration, ease });
  gsap.to(cameraTarget, { x: lx, y: ly, z: lz, duration, ease });

  // Drone state animation
  const ds = zone.droneState;
  const droneVisible = ds.visible !== false;  // default true
  gsap.to(drone.scale, {
    x: droneVisible ? ds.scale : 0,
    y: droneVisible ? ds.scale : 0,
    z: droneVisible ? ds.scale : 0,
    duration, ease
  });
  gsap.to(drone.position, { x: ds.posX || 0, y: ds.posY || 0, duration, ease });
  drone.userData.currentState = ds.rotY;

  // Explode view: spread arms for architecture & hardware zones
  if (zone.id === 'architecture' || zone.id === 'hardware') {
    explodeDrone(true, duration);
  } else {
    explodeDrone(false, duration);
  }

  // Ghost drone: visible only during Zone 1 (problem space)
  if (zone.id === 'problem') {
    const ghostX = -(ds.posX || 1.2);  // Mirror the real drone's X
    ghostDrone.visible = true;
    ghostDrone.userData.baseX = ghostX;
    ghostDrone.userData.baseY = ds.posY || 0;
    ghostDrone.position.set(ghostX, ds.posY || 0, 0);
    ghostDrone.scale.set(ds.scale, ds.scale, ds.scale);
    ghostDrone.traverse(c => {
      if (c.isMesh) gsap.to(c.material, { opacity: c.material.userData?.targetOp || 0.18, duration: 0.8 });
    });
  } else {
    ghostDrone.traverse(c => {
      if (c.isMesh) gsap.to(c.material, { opacity: 0, duration: 0.4 });
    });
    setTimeout(() => { ghostDrone.visible = false; }, 500);
  }

  // Holographic cards: visible only during Zone 2 (purpose & scope)
  if (zone.id === 'purpose') {
    holoCards.forEach(card => {
      card.visible = true;
      card.traverse(c => {
        if (c.material && c.material.userData?.baseOp !== undefined) {
          gsap.to(c.material, { opacity: c.material.userData.baseOp, duration: 0.8 });
        }
      });
    });
  } else {
    holoCards.forEach(card => {
      card.traverse(c => {
        if (c.material) gsap.to(c.material, { opacity: 0, duration: 0.4 });
      });
      setTimeout(() => { card.visible = false; }, 500);
    });
  }

  // Hex ring: visible only during Zone 3 (objectives)
  if (zone.id === 'objectives') {
    hexRing.visible = true;
    objectiveStep = -1;
    highlightNode(hexRing, -1);  // Show all fronts
    hexRing.traverse(c => {
      if (c.material && c.material.userData?.baseOp !== undefined) {
        gsap.to(c.material, { opacity: c.material.userData.baseOp, duration: 0.8 });
      }
    });
  } else {
    objectiveStep = -1;
    hexRing.traverse(c => {
      if (c.material) gsap.to(c.material, { opacity: 0, duration: 0.4 });
    });
    setTimeout(() => { hexRing.visible = false; }, 500);
  }

  // Comparison table: visible only during Zone 4 (research gap)
  if (zone.id === 'research') {
    flickerIn(compTable);
  } else {
    fadeOutTable(compTable);
  }

  // Architecture diagram + stack: visible only during Zone 5
  if (zone.id === 'architecture') {
    archStep = 0;
    // Show stack first (step 0 default)
    flickerInStack(swStack);
    fadeOutArch(archDiagram);
  } else {
    archStep = -1;
    fadeOutArch(archDiagram);
    fadeOutStack(swStack);
  }

  // Hardware path diagram: visible only during Zone 6
  if (zone.id === 'hw-architecture') {
    flickerInHw(hwDiagram);
  } else {
    fadeOutHw(hwDiagram);
  }

  // Result carousel: visible only during results zone
  if (zone.id === 'results') {
    resultStep = -1;
    flickerInCarousel(resultCarousel);
  } else {
    fadeOutCarousel(resultCarousel);
  }

  // 3D Methodology cards: visible only during methodology zone
  if (zone.id === 'methodology') {
    methodStep = -1;
    flickerInMethodCards(methodCards3D);
  } else {
    fadeOutMethodCards(methodCards3D);
  }

  // Fade in new content after camera starts moving
  setTimeout(() => {
    const wrapper = document.createElement('div');
    wrapper.className = 'zone-text zone-enter';
    wrapper.innerHTML = zone.content();
    zoneContent.appendChild(wrapper);

    // Move position:fixed elements out of zone-text to body
    // (transforms on .zone-text create a containing block that traps fixed children)
    const fixedEls = wrapper.querySelectorAll('.arch-diagram, .hero-top, .hero-bottom, .zone-panel, .gap-marker');
    fixedEls.forEach(el => {
      el.setAttribute('data-zone', index);
      document.body.appendChild(el);
    });

    // Remove stale fixed elements from other zones
    document.querySelectorAll('.arch-diagram[data-zone], .hero-top[data-zone], .hero-bottom[data-zone], .zone-panel[data-zone], .gap-marker[data-zone]').forEach(d => {
      const dz = parseInt(d.getAttribute('data-zone'));
      if (dz !== index) d.remove();
    });

    // Force reflow then activate
    requestAnimationFrame(() => {
      wrapper.classList.add('active');
      // Stagger children
      const staggerEls = wrapper.querySelectorAll('.stagger > *');
      staggerEls.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, delay: i * 0.12, ease: 'power2.out' }
        );
      });

      // Trigger decode animation for Zone 0 hero text
      if (zone.id === 'identity') {
        const decodeEls = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-tagline, .hero-oneliner, .team-member, .hero-course, .hero-sponsor');
        decodeSequence(Array.from(decodeEls), {
          perElementDuration: 600,
          stagger: 300,
        });
      }

      // (3D methodology cards are handled via flickerInMethodCards above)

      // Mount test matrix clipboard when entering testing zone
      if (zone.id === 'testing') {
        const mount = document.getElementById('test-matrix-mount');
        if (mount) {
          testMatrixEl = buildTestMatrix();
          testMatrixEl.classList.add('flicker-in');
          mount.appendChild(testMatrixEl);
          // Decode all gate text
          setTimeout(() => {
            const decodeEls = testMatrixEl.querySelectorAll(
              '.tm-header-label, .tm-header-count, .tm-header-mode, .tm-gate-num, .tm-gate-test, .tm-gate-status, .tm-footer-item'
            );
            decodeSequence(Array.from(decodeEls), {
              perElementDuration: 400,
              stagger: 80,
            });
          }, 300);
        }
      }
    });
    isTransitioning = false;
  }, instant ? 0 : 500);

  currentZone = index;
}

// ── Drone Explode / Reassemble ──
function explodeDrone(explode, duration = 1) {
  explodeDroneComponents(drone, explode, duration, gsap);
}

// ═══════════════════════════════════════════════
// ── Zone 9: Methodology — 3D Card Stepping ──
// ═══════════════════════════════════════════════

/** Check if we're in methodology mode */
function isInMethodMode() {
  return currentZone === METHOD_ZONE_INDEX;
}

/** Expand a specific 3D method card, collapse others + pan camera */
function goToMethodStep(index) {
  if (isTransitioning) return;
  isTransitioning = true;
  methodStep = index;

  highlightMethodCard(methodCards3D, index);

  // Pan camera to center on the selected card
  const card = methodCards3D.userData.cards[index];
  const bp = card.userData.basePos;
  const gp = methodCards3D.position;
  // Card world position
  const wx = gp.x + bp.x;
  const wy = gp.y + bp.y;
  const wz = gp.z + bp.z;
  // Camera: offset toward viewer from card, slightly above
  gsap.to(camera.position, { x: wx * 0.6, y: wy * 0.5 + 0.4, z: wz + 5, duration: 0.7, ease: 'power2.inOut' });
  gsap.to(cameraTarget, { x: wx, y: wy, z: wz, duration: 0.7, ease: 'power2.inOut' });

  zoneLabel.textContent = `METHODOLOGY · ${index + 1}/${METHOD_CARDS.length}`;
  setTimeout(() => { isTransitioning = false; }, 600);
}

/** Collapse all 3D method cards back to overview + restore camera */
function resetMethodCards() {
  methodStep = -1;
  resetMethodCards3D(methodCards3D);
  zoneLabel.textContent = ZONES[METHOD_ZONE_INDEX].label;

  // Restore camera to methodology overview position
  const zone = ZONES[METHOD_ZONE_INDEX];
  const [cx, cy, cz] = zone.camera.pos;
  const [lx, ly, lz] = zone.camera.look;
  gsap.to(camera.position, { x: cx, y: cy, z: cz, duration: 0.7, ease: 'power2.inOut' });
  gsap.to(cameraTarget, { x: lx, y: ly, z: lz, duration: 0.7, ease: 'power2.inOut' });
}

// ═══════════════════════════════════════════════
// ── Zone 10: Testing — Validation Gate Stepping ──
// ═══════════════════════════════════════════════

/** Check if we're in test matrix mode */
function isInTestMode() {
  return currentZone === TESTING_ZONE_INDEX;
}

/** Expand a specific gate row, collapse others */
function goToTestStep(index) {
  if (isTransitioning || !testMatrixEl) return;
  isTransitioning = true;
  testStep = index;

  highlightGate(testMatrixEl, index);

  // Scroll the active gate into view
  const activeGate = testMatrixEl.querySelector(`.tm-gate[data-gate="${index}"]`);
  if (activeGate) {
    activeGate.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Decode the detail text for the newly expanded gate
  if (activeGate) {
    const detailValues = activeGate.querySelectorAll('.tm-detail-value');
    detailValues.forEach(el => {
      el.style.opacity = '0';
    });
    setTimeout(() => {
      decodeSequence(Array.from(detailValues), {
        perElementDuration: 500,
        stagger: 120,
      });
    }, 150);
  }

  zoneLabel.textContent = `VALIDATION · GATE ${index + 1}/${TEST_GATES.length}`;
  setTimeout(() => { isTransitioning = false; }, 500);
}

/** Collapse all gates back to overview */
function resetTestMatrix() {
  testStep = -1;
  if (testMatrixEl) highlightGate(testMatrixEl, -1);
  zoneLabel.textContent = ZONES[TESTING_ZONE_INDEX].label;
}

// ═══════════════════════════════════════════════
// ── Zone 11: Results — Carousel Card Stepping ──
// ═══════════════════════════════════════════════

/** Check if we're in results mode */
function isInResultMode() {
  return currentZone === RESULTS_ZONE_INDEX;
}

/** Remove any existing result image overlay */
function clearResultOverlay() {
  const old = document.getElementById('result-image-overlay');
  if (old) old.remove();
}

/** Expand a specific result card in the carousel */
function goToResultStep(index) {
  if (isTransitioning) return;
  isTransitioning = true;
  resultStep = index;

  highlightResultCard(resultCarousel, index);

  // Spawn DOM image overlay (same technique as explode parts)
  clearResultOverlay();
  const card = RESULT_CARDS[index];
  if (card.imagePath) {
    const overlay = document.createElement('div');
    overlay.id = 'result-image-overlay';
    overlay.style.cssText = `
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      width: 55vw; height: 55vh; z-index: 50; pointer-events: none;
      display: flex; align-items: center; justify-content: center;
    `;
    const img = document.createElement('img');
    img.src = card.imagePath;
    img.alt = card.title;
    img.style.cssText = `
      max-width: 100%; max-height: 100%; object-fit: contain;
      border: 1px solid rgba(0, 240, 255, 0.2);
      border-radius: 4px;
    `;
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.3 });
  }

  zoneLabel.textContent = `RESULTS · ${index + 1}/${RESULT_CARDS.length}`;
  setTimeout(() => { isTransitioning = false; }, 600);
}

/** Collapse carousel back to overview */
function resetResultCarousel() {
  resultStep = -1;
  clearResultOverlay();
  resetCarousel(resultCarousel);
  zoneLabel.textContent = ZONES[RESULTS_ZONE_INDEX].label;
}

// ═══════════════════════════════════════════════
// ── Zone 7: Explode View — HUD Tag System ──
// ═══════════════════════════════════════════════

/** Get or create the explode overlay container */
function getHudTagContainer() {
  let container = document.getElementById('explode-overlay');
  if (!container) {
    container = document.createElement('div');
    container.id = 'explode-overlay';
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:50;';
    document.body.appendChild(container);
  }
  return container;
}

/** Remove all HUD tags */
function clearExplodeOverlay() {
  const overlay = document.getElementById('explode-overlay');
  if (overlay) overlay.remove();
}

/** Show explode step metadata in zone-content */
function showExplodeMeta(step, index) {
  const zoneContent = document.getElementById('zone-content');

  // Remove previous explode elements
  const oldMeta = zoneContent.querySelector('.explode-meta');
  if (oldMeta) oldMeta.remove();
  const oldCard = zoneContent.querySelector('.explode-photo-card');
  if (oldCard) oldCard.remove();

  // ── Upper-left: metadata text ──
  const meta = document.createElement('div');
  meta.className = 'explode-meta active';
  meta.innerHTML = `
    <div class="explode-meta-index" data-text="${String(index + 1).padStart(2, '0')}">${String(index + 1).padStart(2, '0')}</div>
    <div class="explode-meta-label" data-text="${step.icon}  ${step.label}">${step.icon}  ${step.label}</div>
    <div class="explode-meta-spec" data-text="${step.spec}">${step.spec}</div>
    <div class="explode-meta-counter">${index + 1} / ${EXPLODE_STEPS.length}</div>
  `;
  zoneContent.appendChild(meta);

  // Decode-flicker each text line
  const lines = meta.querySelectorAll('[data-text]');
  lines.forEach((el, i) => {
    el.style.opacity = '0';
    decodeText(el, { duration: 600, delay: i * 200, scrambleCycles: 4 });
  });
  gsap.fromTo(meta.querySelector('.explode-meta-counter'),
    { opacity: 0 }, { opacity: 0.4, delay: 0.6, duration: 0.4 }
  );

  // ── Bottom-right: image placeholder card ──
  const card = document.createElement('div');
  card.className = 'explode-photo-card';
  card.innerHTML = `
    <div class="explode-photo-frame">
      ${step.image
        ? `<img class="explode-photo-img" src="${step.image}" alt="${step.label}"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />`
        : ''}
      <div class="explode-photo-placeholder" style="${step.image ? 'display:none' : 'display:flex'}">
        <span>IMAGE</span>
        <span class="explode-photo-id">${step.id.toUpperCase()}</span>
      </div>
    </div>
  `;
  zoneContent.appendChild(card);
  gsap.fromTo(card, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.4 });
}

/** Navigate to a specific explode sub-step */
function goToExplodeStep(stepIndex) {
  if (isTransitioning) return;
  isTransitioning = true;
  explodeSubStep = stepIndex;

  const step = EXPLODE_STEPS[stepIndex];

  // Update HUD label
  const zoneLabel = document.getElementById('zone-label');
  zoneLabel.textContent = `DESIGN DETAILS · ${stepIndex + 1}/${EXPLODE_STEPS.length}`;

  // Compute world position of the component
  const pos = EXPLODE_POSITIONS[step.partKey] || { x: 0, y: 0, z: 0 };
  const s = drone.scale.x;
  const wx = pos.x * s + drone.position.x;
  const wy = pos.y * s + drone.position.y;
  const wz = pos.z * s + drone.position.z;

  // Stop drone rotation so parts stay put
  drone.userData.currentState = 'frozen';
  drone.rotation.set(0, 0, 0);

  // Camera offset from step data
  const off = step.camOffset || [0, 0.5, 1.5];
  const loff = step.lookOffset || [0, 0, 0];
  const camX = wx + off[0];
  const camY = wy + off[1];
  const camZ = wz + off[2];

  gsap.to(camera.position, { x: camX, y: camY, z: camZ, duration: 0.8, ease: 'power2.inOut' });
  gsap.to(cameraTarget, { x: wx + loff[0], y: wy + loff[1], z: wz + loff[2], duration: 0.8, ease: 'power2.inOut' });

  // Fade non-active components to transparent
  const comps = drone.userData.components;
  if (comps) {
    Object.keys(comps).forEach(key => {
      const group = comps[key];
      if (!group) return;
      const isActive = (key === step.partKey);
      group.traverse(child => {
        if (child.material) {
          if (child.material._origOpacity == null) {
            child.material._origOpacity = child.material.opacity;
          }
          gsap.to(child.material, {
            opacity: isActive ? 0.8 : 0.00,
            duration: 0.5
          });
        }
      });
    });
  }

  // Show metadata text
  showExplodeMeta(step, stepIndex);

  setTimeout(() => { isTransitioning = false; }, 600);
}

/** Check if we're in Zone 7 sub-navigation mode */
function isInExplodeMode() {
  return currentZone === HARDWARE_ZONE_INDEX;
}

/** Check if we're in Zone 3 objective mode */
function isInObjectiveMode() {
  return currentZone === OBJECTIVES_ZONE_INDEX;
}

/** Navigate to a specific objective node */
function goToObjectiveStep(index) {
  if (isTransitioning) return;
  isTransitioning = true;
  objectiveStep = index;

  // Highlight the node (flips it)
  highlightNode(hexRing, index);

  // Zoom camera toward the selected node
  const node = hexRing.userData.nodes[index];
  const nodePos = node.userData.basePos;
  // Position camera offset: closer to node, slightly above, pulled toward viewer
  const camX = nodePos.x * 0.6;
  const camY = nodePos.y * 0.6 + 1.2;
  const camZ = 4;
  gsap.to(camera.position, { x: camX, y: camY, z: camZ, duration: 0.8, ease: 'power2.inOut' });
  gsap.to(cameraTarget, { x: nodePos.x, y: nodePos.y, z: 0, duration: 0.8, ease: 'power2.inOut' });

  // Update HUD
  const obj = OBJECTIVES[index];
  zoneLabel.textContent = `OBJECTIVES · ${index + 1}/${OBJECTIVES.length}`;

  setTimeout(() => { isTransitioning = false; }, 500);
}

/** Reset camera to Zone 3 overview */
function resetObjectiveCamera() {
  const zone = ZONES[OBJECTIVES_ZONE_INDEX];
  const [cx, cy, cz] = zone.camera.pos;
  const [lx, ly, lz] = zone.camera.look;
  gsap.to(camera.position, { x: cx, y: cy, z: cz, duration: 0.8, ease: 'power2.inOut' });
  gsap.to(cameraTarget, { x: lx, y: ly, z: lz, duration: 0.8, ease: 'power2.inOut' });
}

/** Check if we're in Zone 5 architecture mode */
function isInArchMode() {
  return currentZone === ARCH_ZONE_INDEX;
}

/** Navigate camera to architecture sub-step */
function goToArchStep(index) {
  if (isTransitioning) return;
  isTransitioning = true;
  archStep = index;
  const step = ARCH_STEPS[index];
  const [cx, cy, cz] = step.cam;
  const [lx, ly, lz] = step.look;
  gsap.to(camera.position, { x: cx, y: cy, z: cz, duration: 0.8, ease: 'power2.inOut' });
  gsap.to(cameraTarget, { x: lx, y: ly, z: lz, duration: 0.8, ease: 'power2.inOut' });
  zoneLabel.textContent = `SYSTEM ARCHITECTURE · ${step.label}`;

  // Toggle stack vs diagram
  if (step.show === 'stack') {
    flickerInStack(swStack);
    fadeOutArch(archDiagram);
  } else {
    fadeOutStack(swStack);
    flickerInArch(archDiagram);
  }

  setTimeout(() => { isTransitioning = false; }, 500);
}

/** Reset camera to Zone 5 overview */
function resetArchCamera() {
  const zone = ZONES[ARCH_ZONE_INDEX];
  const [cx, cy, cz] = zone.camera.pos;
  const [lx, ly, lz] = zone.camera.look;
  gsap.to(camera.position, { x: cx, y: cy, z: cz, duration: 0.8, ease: 'power2.inOut' });
  gsap.to(cameraTarget, { x: lx, y: ly, z: lz, duration: 0.8, ease: 'power2.inOut' });
}

// ── Keyboard Navigation ──
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();

    if (isInObjectiveMode()) {
      if (objectiveStep < OBJECTIVES.length - 1) {
        goToObjectiveStep(objectiveStep + 1);
      } else {
        goToZone(currentZone + 1);
      }
    } else if (isInArchMode()) {
      if (archStep < ARCH_STEPS.length - 1) {
        goToArchStep(archStep + 1);
      } else {
        goToZone(currentZone + 1);
      }
    } else if (isInExplodeMode()) {
      if (explodeSubStep < EXPLODE_STEPS.length - 1) {
        goToExplodeStep(explodeSubStep + 1);
      } else {
        goToZone(currentZone + 1);
      }
    } else if (isInMethodMode()) {
      if (methodStep < METHOD_CARDS.length - 1) {
        goToMethodStep(methodStep + 1);
      } else {
        goToZone(currentZone + 1);
      }
    } else if (isInTestMode()) {
      if (testStep < TEST_GATES.length - 1) {
        goToTestStep(testStep + 1);
      } else {
        goToZone(currentZone + 1);
      }
    } else if (isInResultMode()) {
      if (resultStep < RESULT_CARDS.length - 1) {
        goToResultStep(resultStep + 1);
      } else {
        goToZone(currentZone + 1);
      }
    } else {
      goToZone(currentZone + 1);
    }

  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();

    if (isInObjectiveMode() && objectiveStep >= 0) {
      if (objectiveStep === 0) {
        objectiveStep = -1;
        highlightNode(hexRing, -1);
        resetObjectiveCamera();
        zoneLabel.textContent = ZONES[OBJECTIVES_ZONE_INDEX].label;
      } else {
        goToObjectiveStep(objectiveStep - 1);
      }
    } else if (isInArchMode() && archStep >= 0) {
      if (archStep === 0) {
        archStep = -1;
        resetArchCamera();
        zoneLabel.textContent = ZONES[ARCH_ZONE_INDEX].label;
      } else {
        goToArchStep(archStep - 1);
      }
    } else if (isInExplodeMode() && explodeSubStep >= 0) {
      // In Zone 7 with sub-steps revealed: go back
      if (explodeSubStep === 0) {
        // Back to initial Zone 7 view (no sub-steps)
        explodeSubStep = -1;
        clearExplodeOverlay();
        zoneLabel.textContent = ZONES[HARDWARE_ZONE_INDEX].label;
      } else {
        goToExplodeStep(explodeSubStep - 1);
      }
    } else if (isInMethodMode() && methodStep >= 0) {
      if (methodStep === 0) {
        resetMethodCards();
      } else {
        goToMethodStep(methodStep - 1);
      }
    } else if (isInTestMode() && testStep >= 0) {
      if (testStep === 0) {
        resetTestMatrix();
      } else {
        goToTestStep(testStep - 1);
      }
    } else if (isInResultMode() && resultStep >= 0) {
      if (resultStep === 0) {
        resetResultCarousel();
      } else {
        goToResultStep(resultStep - 1);
      }
    } else {
      goToZone(currentZone - 1);
    }

  } else if (e.key === 'Home') {
    goToZone(0);
  } else if (e.key === 'End') {
    goToZone(ZONES.length - 1);
  }
});

// Hide nav hint after first navigation
let navHintShown = true;
document.addEventListener('keydown', () => {
  if (navHintShown) {
    navHint.classList.add('hidden');
    navHintShown = false;
  }
}, { once: true });

// ── Drone rotation behaviors ──
function updateDroneRotation(time) {
  const state = drone.userData.currentState || 'spin';
  switch (state) {
    case 'spin':
      drone.rotation.y = time * 0.3;
      break;
    case 'spin-slow':
      drone.rotation.y = time * 0.15;
      break;
    case 'wobble':
      drone.rotation.y = time * 0.2;
      drone.rotation.x = Math.sin(time * 1.5) * 0.15;
      drone.rotation.z = Math.cos(time * 1.2) * 0.1;
      break;
    case 'explode':
      drone.rotation.y = time * 0.08;
      break;
    case 'frozen':
      // No rotation — used during explode sub-steps
      break;
    default:
      drone.rotation.y = time * 0.2;
  }
}

// ── Animation Loop ──
function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();

  // Drone animation
  updateDroneRotation(time);
  animateDrone(drone, time);
  animateGhostDrone(ghostDrone, time);
  animateHoloCards(holoCards, time);
  animateHexRing(hexRing, time);
  animateCompTable(compTable, time);
  animateArchDiagram(archDiagram, time);
  animateSwStack(swStack, time);
  animateHwDiagram(hwDiagram, time);
  animateMethodCards3D(methodCards3D, time);
  animateResultCarousel(resultCarousel, time);

  // Smooth camera lookAt
  cameraTargetCurrent.lerp(cameraTarget, 0.05);
  camera.lookAt(cameraTargetCurrent);

  // Particle drift
  const pPos = particles.geometry.attributes.position.array;
  for (let i = 0; i < pPos.length; i += 3) {
    pPos[i + 1] += Math.sin(time * 0.3 + i) * 0.0003;
    pPos[i] += Math.cos(time * 0.2 + i) * 0.0002;
  }
  particles.geometry.attributes.position.needsUpdate = true;
  particles.rotation.y = time * 0.01;

  composer.render();
}

// ── Start ──
runBootSequence();
animate();

// ── Boot Sequence ──
function runBootSequence() {
  const bootScreen = document.getElementById('boot-screen');
  const bootLog = document.getElementById('boot-log');
  const bootRing = document.getElementById('boot-ring-fill');
  const bootPercent = document.getElementById('boot-percent');
  const hexLeft = document.getElementById('boot-hex-left');
  const hexRight = document.getElementById('boot-hex-right');
  const hud = document.getElementById('hud');

  // Ring circumference: 2 * π * r (r = 110 for middle ring)
  const CIRCUMFERENCE = 2 * Math.PI * 110; // 691.15

  // Hide HUD during boot
  hud.style.opacity = '0';
  hud.style.transition = 'none';

  // Generate hex streams
  const hexChars = '0123456789ABCDEF';
  function generateHex(length) {
    let str = '';
    for (let i = 0; i < length; i++) {
      str += hexChars[Math.floor(Math.random() * 16)];
      if (i % 2 === 1) str += ' ';
      if (i % 32 === 31) str += '\n';
    }
    return str;
  }

  // Continuously stream hex data
  let hexInterval = setInterval(() => {
    hexLeft.textContent = generateHex(800);
    hexRight.textContent = generateHex(800);
  }, 200);

  // Get disk layers for animation
  const diskOuter = document.querySelector('.disk-outer');
  const diskInner = document.querySelector('.disk-inner');

  // Update radial progress — powers up the disk layers
  function setProgress(pct) {
    const frac = pct / 100;
    // Middle fill ring: opacity ramps from 0 → 1
    bootRing.style.opacity = frac;
    // Outer ring: brightens with progress
    diskOuter.style.stroke = `rgba(0, 240, 255, ${0.15 + frac * 0.4})`;
    // Inner ring: brightens with progress
    diskInner.style.stroke = `rgba(255, 0, 170, ${0.1 + frac * 0.35})`;
    bootPercent.textContent = pct + '%';
  }

  // Boot log messages with timing and progress
  const bootMessages = [
    { time: 400, text: '[SYS] QAV250 Holographic Interface v2.1', cls: 'log-sys', pct: 5 },
    { time: 700, text: '[SYS] Initializing Three.js renderer...', cls: 'log-sys', pct: 10 },
    { time: 950, text: '[OK]  WebGL2 context acquired', cls: 'log-ok', pct: 15 },
    { time: 1200, text: '[SYS] Loading QAV250 geometry mesh...', cls: 'log-sys', pct: 22 },
    { time: 1450, text: '[OK]  17 components instantiated', cls: 'log-ok', pct: 30 },
    { time: 1650, text: '[SYS] Loading qav250_params.m...', cls: 'log-sys', pct: 35 },
    { time: 1850, text: '[OK]  mass=0.80kg arm=0.125m kT=1e-5', cls: 'log-ok', pct: 42 },
    { time: 2050, text: '[SYS] Connecting PX4 SITL lockstep...', cls: 'log-sys', pct: 48 },
    { time: 2300, text: '[OK]  MAVLink TCP:4560 established', cls: 'log-ok', pct: 55 },
    { time: 2500, text: '[SYS] EKF2 state estimator online', cls: 'log-sys', pct: 62 },
    { time: 2700, text: '[SYS] Unreal Engine 5.3 digital twin...', cls: 'log-sys', pct: 70 },
    { time: 2900, text: '[OK]  Sim 3D Scene Configuration ready', cls: 'log-ok', pct: 78 },
    { time: 3100, text: '[SYS] OptiTrack NatNet bridge active', cls: 'log-sys', pct: 85 },
    { time: 3300, text: '[OK]  MoCap @ 120Hz — sub-mm precision', cls: 'log-ok', pct: 92 },
    { time: 3500, text: '[SYS] All systems nominal', cls: 'log-sys', pct: 97 },
    { time: 3700, text: '[OK]  READY — Launching presentation', cls: 'log-ok', pct: 100 },
  ];

  bootMessages.forEach(({ time, text, cls, pct }) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = `log-line ${cls}`;
      line.textContent = text;
      bootLog.appendChild(line);
      bootLog.scrollTop = bootLog.scrollHeight;
      setProgress(pct);
    }, time);
  });

  // After boot completes, fade out and reveal Zone 0
  const BOOT_DURATION = 4200;
  setTimeout(() => {
    clearInterval(hexInterval);
    bootScreen.classList.add('fade-out');

    // Flicker in HUD
    hud.style.opacity = '1';
    hud.classList.add('hud-flicker-in');
    requestAnimationFrame(() => {
      hud.classList.add('active');
    });

    // Load Zone 0
    goToZone(0, true);

    // Cleanup after all animations settle
    setTimeout(() => {
      bootScreen.classList.add('hidden');
      // Remove flicker class so it doesn't interfere later
      hud.classList.remove('hud-flicker-in', 'active');
    }, 1200);
  }, BOOT_DURATION);
}

console.log('[QAV250] Holographic presentation initialized — 16 zones, 25 explode sub-steps');
