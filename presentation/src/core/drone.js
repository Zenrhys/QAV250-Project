/**
 * Procedural QAV250 Wireframe Drone — Realistic Geometry
 * Every component is a named group for the Iron Man explode view.
 *
 * Component groups stored in drone.userData.components:
 *   topPlate, bottomPlate, arms, pixhawk, gps, battery,
 *   motor1-4, prop1-4, esc, camera, vtx, osd, cables,
 *   optflow, lidar, telem
 */
import * as THREE from 'three';

const CYAN = 0x00f0ff;
const MAGENTA = 0xff00aa;
const RED_C = 0xff3344;
const BLUE_C = 0x4488ff;
const GREEN_C = 0x00ff88;
const YELLOW_C = 0xffcc00;
const PURPLE_C = 0xbb66ff;

const WIRE = (color, opacity = 0.7) =>
  new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });
const LINE_MAT = (color, opacity = 0.5) =>
  new THREE.LineBasicMaterial({ color, transparent: true, opacity });

// ── Helpers ──
function makeBox(w, h, d, color, opacity) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), WIRE(color, opacity));
}
function makeCylinder(rTop, rBot, h, segs, color, opacity) {
  return new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, segs), WIRE(color, opacity));
}
function makeRing(r, tube, color, opacity) {
  return new THREE.Mesh(new THREE.TorusGeometry(r, tube, 3, 32), WIRE(color, opacity));
}

export function createDrone() {
  const drone = new THREE.Group();
  const components = {};
  drone.userData = { components, props: [], motors: [] };

  const ARM_LEN = 1.1;
  const armAngles = [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4];

  // ═══════════════════════════════════
  // AIRFRAME — RED
  // ═══════════════════════════════════

  // Top plate — thin wide rectangle
  const topPlate = new THREE.Group();
  const tpMesh = makeBox(0.55, 0.02, 0.55, RED_C, 0.5);
  tpMesh.position.y = 0.04;
  topPlate.add(tpMesh);
  // Standoffs (4 corners)
  for (const [sx, sz] of [[0.2, 0.2], [-0.2, 0.2], [0.2, -0.2], [-0.2, -0.2]]) {
    const standoff = makeCylinder(0.015, 0.015, 0.08, 4, RED_C, 0.35);
    standoff.position.set(sx, 0, sz);
    topPlate.add(standoff);
  }
  drone.add(topPlate);
  components.topPlate = topPlate;

  // Bottom plate
  const bottomPlate = new THREE.Group();
  const bpMesh = makeBox(0.55, 0.02, 0.55, RED_C, 0.4);
  bpMesh.position.y = -0.04;
  bottomPlate.add(bpMesh);
  drone.add(bottomPlate);
  components.bottomPlate = bottomPlate;

  // Arms — 4 carbon fiber arms in X config
  const armsGroup = new THREE.Group();
  armAngles.forEach(angle => {
    const x = Math.cos(angle) * ARM_LEN;
    const z = Math.sin(angle) * ARM_LEN;
    // Thick arm using thin box
    const arm = makeBox(0.04, 0.025, 0.04, RED_C, 0.45);
    arm.scale.set(1, 1, ARM_LEN / 0.04);
    arm.position.set(x / 2, 0, z / 2);
    arm.lookAt(x, 0, z);
    armsGroup.add(arm);
  });
  drone.add(armsGroup);
  components.arms = armsGroup;

  // ═══════════════════════════════════
  // PROPULSION — GREEN
  // ═══════════════════════════════════

  armAngles.forEach((angle, i) => {
    const x = Math.cos(angle) * ARM_LEN;
    const z = Math.sin(angle) * ARM_LEN;

    // Motor — cylinder at arm tip
    const motor = new THREE.Group();
    const motorBody = makeCylinder(0.09, 0.09, 0.06, 8, GREEN_C, 0.5);
    motor.add(motorBody);
    // Motor bell (top)
    const bell = makeCylinder(0.1, 0.08, 0.03, 8, GREEN_C, 0.35);
    bell.position.y = 0.045;
    motor.add(bell);
    motor.position.set(x, 0.04, z);
    drone.add(motor);
    components[`motor${i + 1}`] = motor;
    drone.userData.motors.push(motor);

    // Prop — torus disc above motor
    const prop = new THREE.Group();
    const propRing = makeRing(0.28, 0.006, MAGENTA, 0.3);
    propRing.rotation.x = Math.PI / 2;
    prop.add(propRing);
    // Blade lines
    for (let b = 0; b < 2; b++) {
      const bladeAngle = b * Math.PI;
      const bladeGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(bladeAngle) * 0.26, 0, Math.sin(bladeAngle) * 0.26)
      ]);
      prop.add(new THREE.Line(bladeGeo, LINE_MAT(MAGENTA, 0.25)));
    }
    prop.position.set(x, 0.1, z);
    drone.add(prop);
    components[`prop${i + 1}`] = prop;
    drone.userData.props.push(prop);
  });

  // ESC / PDB board — below bottom plate
  const esc = new THREE.Group();
  const escBoard = makeBox(0.4, 0.015, 0.4, GREEN_C, 0.35);
  escBoard.position.y = -0.07;
  esc.add(escBoard);
  // ESC chips (4 small boxes)
  for (const [ex, ez] of [[0.12, 0.12], [-0.12, 0.12], [0.12, -0.12], [-0.12, -0.12]]) {
    const chip = makeBox(0.06, 0.01, 0.04, GREEN_C, 0.5);
    chip.position.set(ex, -0.065, ez);
    esc.add(chip);
  }
  drone.add(esc);
  components.esc = esc;

  // PM06 — small box on side
  const pm06 = new THREE.Group();
  const pmBox = makeBox(0.08, 0.015, 0.06, GREEN_C, 0.5);
  pmBox.position.set(0.3, -0.04, 0);
  pm06.add(pmBox);
  drone.add(pm06);
  components.pm06 = pm06;

  // Battery — rectangular box underneath
  const battery = new THREE.Group();
  const battBody = makeBox(0.35, 0.08, 0.12, RED_C, 0.45);
  battBody.position.y = -0.14;
  battery.add(battBody);
  // Battery label line
  const battLabel = makeBox(0.02, 0.005, 0.08, MAGENTA, 0.6);
  battLabel.position.set(0, -0.14, 0.065);
  battery.add(battLabel);
  drone.add(battery);
  components.battery = battery;

  // ═══════════════════════════════════
  // FLIGHT CONTROL — BLUE
  // ═══════════════════════════════════

  // Pixhawk 6C — small box on top plate
  const pixhawk = new THREE.Group();
  const pxBody = makeBox(0.14, 0.025, 0.1, BLUE_C, 0.6);
  pxBody.position.y = 0.07;
  pixhawk.add(pxBody);
  // USB port indicator
  const usb = makeBox(0.02, 0.01, 0.015, CYAN, 0.8);
  usb.position.set(0.075, 0.07, 0);
  pixhawk.add(usb);
  drone.add(pixhawk);
  components.pixhawk = pixhawk;

  // GPS mast — vertical pole + disc
  const gps = new THREE.Group();
  const mast = makeCylinder(0.01, 0.01, 0.25, 4, BLUE_C, 0.4);
  mast.position.set(0, 0.2, -0.15);
  gps.add(mast);
  const gpsPuck = makeCylinder(0.06, 0.06, 0.015, 8, BLUE_C, 0.5);
  gpsPuck.position.set(0, 0.33, -0.15);
  gps.add(gpsPuck);
  drone.add(gps);
  components.gps = gps;

  // Cables — thin lines between components
  const cables = new THREE.Group();
  const cablePaths = [
    [[0, 0.07, 0.04], [0.12, 0.07, 0.12]],   // Pixhawk to ESC
    [[0, 0.07, -0.04], [0, 0.2, -0.15]],      // Pixhawk to GPS
    [[-0.07, 0.07, 0], [-0.15, -0.04, 0]],    // Power cable
  ];
  const cableMat = LINE_MAT(BLUE_C, 0.2);
  cablePaths.forEach(([from, to]) => {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...from), new THREE.Vector3(...to)
    ]);
    cables.add(new THREE.Line(geo, cableMat));
  });
  drone.add(cables);
  components.cables = cables;

  // ═══════════════════════════════════
  // SENSORS — YELLOW
  // ═══════════════════════════════════

  // Optical Flow — small box underneath
  const optflow = new THREE.Group();
  const ofBox = makeBox(0.04, 0.015, 0.04, YELLOW_C, 0.6);
  ofBox.position.set(0.05, -0.18, 0);
  optflow.add(ofBox);
  // Lens indicator
  const ofLens = makeCylinder(0.012, 0.012, 0.005, 6, YELLOW_C, 0.8);
  ofLens.position.set(0.05, -0.19, 0);
  optflow.add(ofLens);
  drone.add(optflow);
  components.optflow = optflow;

  // LiDAR — small cylinder underneath
  const lidar = new THREE.Group();
  const lidarBody = makeCylinder(0.015, 0.015, 0.02, 6, YELLOW_C, 0.6);
  lidarBody.position.set(-0.05, -0.18, 0);
  lidar.add(lidarBody);
  drone.add(lidar);
  components.lidar = lidar;

  // ═══════════════════════════════════
  // COMMUNICATION — PURPLE
  // ═══════════════════════════════════

  // Telemetry radio — small box on rear
  const telem = new THREE.Group();
  const telemBox = makeBox(0.05, 0.02, 0.03, PURPLE_C, 0.5);
  telemBox.position.set(0, 0.06, -0.3);
  telem.add(telemBox);
  // Antenna
  const antenna = makeCylinder(0.003, 0.003, 0.15, 3, PURPLE_C, 0.4);
  antenna.position.set(0, 0.14, -0.3);
  telem.add(antenna);
  drone.add(telem);
  components.telem = telem;

  // FPV Camera — small box at front
  const fpvCam = new THREE.Group();
  const camBody = makeBox(0.04, 0.04, 0.03, PURPLE_C, 0.5);
  camBody.position.set(0, 0.01, 0.32);
  fpvCam.add(camBody);
  // Lens
  const lens = makeCylinder(0.015, 0.012, 0.01, 6, PURPLE_C, 0.7);
  lens.position.set(0, 0.01, 0.34);
  lens.rotation.x = Math.PI / 2;
  fpvCam.add(lens);
  drone.add(fpvCam);
  components.fpvCam = fpvCam;

  // VTX — small board on rear
  const vtx = new THREE.Group();
  const vtxBoard = makeBox(0.04, 0.012, 0.025, PURPLE_C, 0.45);
  vtxBoard.position.set(-0.2, 0.05, -0.1);
  vtx.add(vtxBoard);
  drone.add(vtx);
  components.vtx = vtx;

  // OSD — tiny chip on top plate
  const osd = new THREE.Group();
  const osdChip = makeBox(0.025, 0.006, 0.025, PURPLE_C, 0.45);
  osdChip.position.set(0.18, 0.055, 0.05);
  osd.add(osdChip);
  drone.add(osd);
  components.osd = osd;

  // ═══════════════════════════════════
  // LANDING GEAR
  // ═══════════════════════════════════
  const legMat = LINE_MAT(CYAN, 0.2);
  const legSpread = 0.3;
  const legH = -0.28;
  [[-legSpread, 0, legSpread], [legSpread, 0, legSpread],
  [-legSpread, 0, -legSpread], [legSpread, 0, -legSpread]].forEach(([lx, , lz]) => {
    const legGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(lx, -0.04, lz), new THREE.Vector3(lx * 1.1, legH, lz * 1.1)
    ]);
    drone.add(new THREE.Line(legGeo, legMat));
  });
  // Skids
  [[-1, 1], [1, 1]].forEach(([side]) => {
    const skidGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(side * legSpread * 1.1, legH, legSpread * 1.1),
      new THREE.Vector3(side * legSpread * 1.1, legH, -legSpread * 1.1)
    ]);
    drone.add(new THREE.Line(skidGeo, legMat));
  });

  return drone;
}

// ═══════════════════════════════════════════════
// EXPLODE POSITIONS — where each component flies to
// Arranged in a circle/grid for the Iron Man layout
// Returns {x, y, z} offsets from center
// ═══════════════════════════════════════════════
export const EXPLODE_POSITIONS = {
  topPlate: { x: 0, y: 1.5, z: 0 },
  bottomPlate: { x: 0, y: -1.5, z: 0 },
  arms: { x: 0, y: 0, z: 0 },   // Arms stay in place but spread
  battery: { x: 0, y: -2.5, z: 0 },
  pixhawk: { x: 2.2, y: 1.0, z: 0 },
  gps: { x: 2.2, y: 2.0, z: -0.5 },
  cables: { x: 2.2, y: 0, z: 0 },
  motor1: { x: 1.8, y: 0.5, z: 1.8 },
  motor2: { x: -1.8, y: 0.5, z: 1.8 },
  motor3: { x: -1.8, y: 0.5, z: -1.8 },
  motor4: { x: 1.8, y: 0.5, z: -1.8 },
  prop1: { x: 1.8, y: 1.2, z: 1.8 },
  prop2: { x: -1.8, y: 1.2, z: 1.8 },
  prop3: { x: -1.8, y: 1.2, z: -1.8 },
  prop4: { x: 1.8, y: 1.2, z: -1.8 },
  esc: { x: -2.2, y: -0.5, z: 0 },
  pm06: { x: -2.2, y: -1.5, z: 0 },
  optflow: { x: -1.5, y: -1.8, z: 1.0 },
  lidar: { x: 1.5, y: -1.8, z: 1.0 },
  telem: { x: -2.0, y: 1.5, z: -0.5 },
  fpvCam: { x: 0, y: 0.5, z: 2.5 },
  vtx: { x: -2.0, y: 0.5, z: -0.5 },
  osd: { x: -2.0, y: 1.0, z: 0.5 },
};

/**
 * Create a ghost (translucent wireframe) clone of the drone.
 * Used to visualize the sim-to-real gap in Zone 1.
 */
export function createGhostDrone(sourceDrone) {
  const ghost = sourceDrone.clone(true);

  // Replace all materials with translucent cyan wireframe
  const ghostMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
  });

  ghost.traverse(child => {
    if (child.isMesh) {
      child.material = ghostMat.clone();
      // Slightly vary opacity for depth
      child.material.opacity = 0.1 + Math.random() * 0.15;
    }
  });

  // Collect prop references for animation
  ghost.userData.ghostProps = [];
  ghost.traverse(child => {
    if (child.isMesh && child.geometry.type === 'TorusGeometry') {
      ghost.userData.ghostProps.push(child);
    }
  });

  ghost.visible = false;
  return ghost;
}

/** Animate the ghost drone — slow drift + prop spin */
export function animateGhostDrone(ghost, time) {
  if (!ghost || !ghost.visible) return;
  // Slow drift
  ghost.position.x = ghost.userData.baseX + Math.sin(time * 0.4) * 0.05;
  ghost.position.y = ghost.userData.baseY + Math.cos(time * 0.3) * 0.05;
  // Slight rotation offset
  ghost.rotation.y = time * 0.15;
  ghost.rotation.z = Math.sin(time * 0.5) * 0.05;
  // Spin ghost props
  if (ghost.userData.ghostProps) {
    ghost.userData.ghostProps.forEach((prop, i) => {
      prop.rotation.z = time * (6 + i * 0.3) * (i % 2 === 0 ? 1 : -1);
    });
  }
}

/** Spin propellers each frame */
export function animateDrone(drone, time) {
  if (!drone.userData.props) return;
  drone.userData.props.forEach((prop, i) => {
    prop.rotation.y = time * (8 + i * 0.5) * (i % 2 === 0 ? 1 : -1);
  });
}

/**
 * Animate the drone to explode or reassemble.
 * @param {THREE.Group} drone - The drone group
 * @param {boolean} explode - true to explode, false to reassemble
 * @param {number} duration - animation duration
 * @param {Function} gsap - GSAP instance
 */
export function explodeDroneComponents(drone, explode, duration, gsap) {
  const comps = drone.userData.components;
  if (!comps) return;

  Object.keys(comps).forEach(key => {
    const group = comps[key];
    if (!group) return;
    const target = explode ? EXPLODE_POSITIONS[key] : null;

    if (target) {
      // Store original position if not stored
      if (!group.userData.originalPos) {
        group.userData.originalPos = {
          x: group.position.x,
          y: group.position.y,
          z: group.position.z
        };
      }
      gsap.to(group.position, {
        x: target.x, y: target.y, z: target.z,
        duration, ease: 'power2.inOut'
      });
    } else if (group.userData.originalPos) {
      // Reassemble
      const orig = group.userData.originalPos;
      gsap.to(group.position, {
        x: orig.x, y: orig.y, z: orig.z,
        duration, ease: 'power2.inOut'
      });
    }
  });
}
