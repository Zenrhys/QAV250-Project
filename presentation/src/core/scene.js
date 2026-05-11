/**
 * Three.js Scene Setup — Renderer, Camera, Post-Processing, Grid, Particles
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050510, 0.035);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 2, 8);
  camera.lookAt(0, 0, 0);

  // Post-processing
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight), 0.8, 0.5, 0.6
  );
  composer.addPass(bloomPass);

  // Ambient light
  scene.add(new THREE.AmbientLight(0x112244, 0.5));

  // Grid
  const gridGroup = createGrid();
  scene.add(gridGroup);

  // Particles
  const particles = createParticles();
  scene.add(particles);

  // Resize handler
  window.addEventListener('resize', () => {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
  });

  return { renderer, scene, camera, composer, particles, gridGroup };
}

function createGrid() {
  const group = new THREE.Group();
  const gridMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.06 });
  const extent = 50;
  const step = 2;

  for (let i = -extent; i <= extent; i += step) {
    // X lines
    const gx = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(i, -2, -extent), new THREE.Vector3(i, -2, extent)
    ]);
    group.add(new THREE.Line(gx, gridMat));
    // Z lines
    const gz = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-extent, -2, i), new THREE.Vector3(extent, -2, i)
    ]);
    group.add(new THREE.Line(gz, gridMat));
  }
  return group;
}

function createParticles() {
  const count = 800;
  const positions = new Float32Array(count * 3);
  const spread = 40;
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0x00f0ff, size: 0.04, transparent: true, opacity: 0.4, sizeAttenuation: true
  });
  return new THREE.Points(geo, mat);
}
