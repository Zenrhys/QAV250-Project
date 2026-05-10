/**
 * QAV250 Holographic Presentation — Main Entry Point
 * Continuous 3D journey through a holographic environment
 */
import * as THREE from 'three';
import gsap from 'gsap';
import { createScene } from './core/scene.js';
import { createDrone, animateDrone } from './core/drone.js';
import { ZONES } from './core/zones.js';

// ── State ──
let currentZone = 0;
let isTransitioning = false;
let clock = new THREE.Clock();

// ── Initialize ──
const canvas = document.getElementById('three-canvas');
const { renderer, scene, camera, composer, particles } = createScene(canvas);

// Drone
const drone = createDrone();
scene.add(drone);

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
  gsap.to(drone.scale, { x: ds.scale, y: ds.scale, z: ds.scale, duration, ease });
  gsap.to(drone.position, { y: ds.posY || 0, duration, ease });
  drone.userData.currentState = ds.rotY;

  // Architecture zone: spread arms
  if (zone.id === 'architecture') {
    explodeDrone(true, duration);
  } else {
    explodeDrone(false, duration);
  }

  // Fade in new content after camera starts moving
  setTimeout(() => {
    const wrapper = document.createElement('div');
    wrapper.className = 'zone-text zone-enter';
    wrapper.innerHTML = zone.content();
    zoneContent.appendChild(wrapper);

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
    });
    isTransitioning = false;
  }, instant ? 0 : 500);

  currentZone = index;
}

// ── Drone Explode / Reassemble ──
function explodeDrone(explode, duration = 1) {
  const spread = explode ? 1.8 : 0;
  const armAngles = [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4];

  drone.userData.motors.forEach((motor, i) => {
    const angle = armAngles[i];
    const baseX = Math.cos(angle) * 1.1;
    const baseZ = Math.sin(angle) * 1.1;
    const targetX = baseX + Math.cos(angle) * spread;
    const targetZ = baseZ + Math.sin(angle) * spread;
    gsap.to(motor.position, { x: targetX, z: targetZ, duration, ease: 'power2.inOut' });
  });

  drone.userData.props.forEach((prop, i) => {
    const angle = armAngles[i];
    const baseX = Math.cos(angle) * 1.1;
    const baseZ = Math.sin(angle) * 1.1;
    const targetX = baseX + Math.cos(angle) * spread;
    const targetZ = baseZ + Math.sin(angle) * spread;
    gsap.to(prop.position, { x: targetX, z: targetZ, duration, ease: 'power2.inOut' });
  });
}

// ── Keyboard Navigation ──
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    goToZone(currentZone + 1);
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    goToZone(currentZone - 1);
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
goToZone(0, true);
animate();
console.log('[QAV250] Holographic presentation initialized — 15 zones loaded');
