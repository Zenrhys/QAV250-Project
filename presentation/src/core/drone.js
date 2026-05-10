/**
 * Procedural QAV250 Wireframe Drone Model
 */
import * as THREE from 'three';

const CYAN = 0x00f0ff;
const MAGENTA = 0xff00aa;

export function createDrone() {
  const drone = new THREE.Group();
  drone.userData = { motors: [], props: [], arms: [], body: null, subsystems: null };

  // Central body — octahedron
  const bodyGeo = new THREE.OctahedronGeometry(0.28, 0);
  const bodyMat = new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.8 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  drone.add(body);
  drone.userData.body = body;

  // Inner core glow
  const coreGeo = new THREE.IcosahedronGeometry(0.12, 1);
  const coreMat = new THREE.MeshBasicMaterial({ color: MAGENTA, wireframe: true, transparent: true, opacity: 0.4 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  drone.add(core);
  drone.userData.core = core;

  // Arms + motors + props
  const armLength = 1.1;
  const armAngles = [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4];
  const armMat = new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.7 });
  const motorMat = new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.6 });
  const propMat = new THREE.MeshBasicMaterial({ color: MAGENTA, wireframe: true, transparent: true, opacity: 0.35 });

  armAngles.forEach((angle, i) => {
    const x = Math.cos(angle) * armLength;
    const z = Math.sin(angle) * armLength;

    // Arm line
    const armGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, 0, z)
    ]);
    const arm = new THREE.Line(armGeo, armMat.clone());
    drone.add(arm);
    drone.userData.arms.push(arm);

    // Cross brace
    if (i < 2) {
      const opp = armAngles[i + 2];
      const ox = Math.cos(opp) * armLength;
      const oz = Math.sin(opp) * armLength;
      const braceGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, 0, z), new THREE.Vector3(ox, 0, oz)
      ]);
      const brace = new THREE.Line(braceGeo, new THREE.LineBasicMaterial({
        color: CYAN, transparent: true, opacity: 0.15
      }));
      drone.add(brace);
    }

    // Motor
    const motorGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 6);
    const motor = new THREE.Mesh(motorGeo, motorMat.clone());
    motor.position.set(x, 0.04, z);
    drone.add(motor);
    drone.userData.motors.push(motor);

    // Propeller
    const propGeo = new THREE.TorusGeometry(0.22, 0.008, 3, 24);
    const prop = new THREE.Mesh(propGeo, propMat.clone());
    prop.position.set(x, 0.1, z);
    prop.rotation.x = Math.PI / 2;
    drone.add(prop);
    drone.userData.props.push(prop);
  });

  // Landing gear
  const legMat = new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.3 });
  const legSpread = 0.35;
  const legH = -0.35;
  [[-legSpread, 0, legSpread], [legSpread, 0, legSpread],
   [-legSpread, 0, -legSpread], [legSpread, 0, -legSpread]].forEach(([lx, ly, lz]) => {
    const legGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(lx, 0, lz), new THREE.Vector3(lx * 1.1, legH, lz * 1.1)
    ]);
    drone.add(new THREE.Line(legGeo, legMat));
  });
  // Skids
  const skidGeo1 = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-legSpread * 1.1, legH, legSpread * 1.1),
    new THREE.Vector3(-legSpread * 1.1, legH, -legSpread * 1.1)
  ]);
  const skidGeo2 = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(legSpread * 1.1, legH, legSpread * 1.1),
    new THREE.Vector3(legSpread * 1.1, legH, -legSpread * 1.1)
  ]);
  drone.add(new THREE.Line(skidGeo1, legMat));
  drone.add(new THREE.Line(skidGeo2, legMat));

  return drone;
}

/** Spin propellers each frame */
export function animateDrone(drone, time) {
  if (!drone.userData.props) return;
  drone.userData.props.forEach((prop, i) => {
    prop.rotation.z = time * (8 + i * 0.5) * (i % 2 === 0 ? 1 : -1);
  });
  if (drone.userData.core) {
    drone.userData.core.rotation.y = time * 0.3;
    drone.userData.core.rotation.x = time * 0.2;
  }
}
