/**
 * Explode View Sub-Steps — Zone 7
 * 12 unique components, one per step
 * Each `partKey` maps to EXPLODE_POSITIONS in drone.js
 * `camOffset`  = [x, y, z] added to component world pos for camera position
 * `lookOffset` = [x, y, z] added to component world pos for camera look-at target
 */

export const EXPLODE_STEPS = [
  // ── AIRFRAME (Red) ──
  { id: 'frame', label: 'CARBON FIBER 250 AIRFRAME + HARDWARE', spec: '250mm diagonal · 0.125m arm length', type: 'component', icon: '⬡', partKey: 'topPlate', camOffset: [0, 0.5, 1.5], lookOffset: [0, 0, 0], image: '/images/parts/carbon_fiber_airframe.jpg' },
  { id: 'battery', label: 'BATTERY STRAPS', spec: 'Secures LiPo to frame', type: 'component', icon: '⬡', partKey: 'battery', camOffset: [0, 0, 1.5], lookOffset: [0, -0.3, 0], image: '/images/parts/drone-battery.png' },

  // ── FLIGHT CONTROL (Blue) ──
  { id: 'pixhawk', label: 'PIXHAWK 6C MINI FLIGHT CONTROLLER', spec: 'STM32H7 · dual IMU (BMI055 + ICM42688P) · PX4 v1.16.1', type: 'component', icon: '◈', partKey: 'pixhawk', camOffset: [0, 1, 1], lookOffset: [0, 0, 0], image: '/images/parts/pixhawk_6c_mini.jpg' },
  { id: 'gps', label: 'M10 GPS MODULE', spec: '+ IST8310 compass (I2C)', type: 'component', icon: '◈', partKey: 'gps', camOffset: [0, 1, 1], lookOffset: [0, 0.5, 0], image: '/images/parts/GPS_module.jpg' },

  // ── PROPULSION (Green) ──
  { id: 'motors', label: 'MOTOR 2207 KV1950 ×4', spec: 'CCW: M1 FR, M2 RL · CW: M3 FL, M4 RR', type: 'component', icon: '⟐', partKey: 'motor1', camOffset: [0, 0.5, 1.5], lookOffset: [0, 0, 0], image: '/images/parts/Motor_2207_KV1950.jpg' },
  { id: 'props', label: '5" PROPELLERS ×8 (4 SPARE)', spec: 'CW + CCW matched pairs', type: 'component', icon: '⟐', partKey: 'prop1', camOffset: [0, 0.5, 1.5], lookOffset: [0, 0, 0], image: '/images/parts/drone_propeller.jpg' },
  { id: 'esc', label: 'PDB + BLHELI_S ESC 20A', spec: 'Integrated PDB + 4× ESCs · ~25ms motor time constant', type: 'component', icon: '⟐', partKey: 'esc', camOffset: [0, 0.5, 1.5], lookOffset: [0, 0, 0], image: '/images/parts/PDB + BLHELI_S_ESC_20A.jpg' },

  // ── SENSORS (Yellow) ──
  { id: 'optflow', label: 'PMW3901 OPTICAL FLOW SENSOR', spec: 'Ground velocity estimation · noise σ = 0.05 rad/s', type: 'component', icon: '◉', partKey: 'optflow', camOffset: [0.25, 0.1, 0.75], lookOffset: [0.05, -0.2, 0], image: '/images/parts/optical_flow_sensor.jpg' },
  { id: 'lidar', label: 'ST VL53L1X LIDAR (RANGE SENSOR)', spec: '0.04–4.0m range · noise σ = 0.02m', type: 'component', icon: '◉', partKey: 'lidar', camOffset: [0, 0.5, 1.5], lookOffset: [0, 0, 0], image: '/images/parts/lidar.jpg' },

  // ── COMMUNICATION (Purple) ──
  { id: 'telem', label: 'TELEMETRY RADIO (915 MHZ)', spec: 'FTDI FT231X USB · 57600 baud', type: 'component', icon: '◇', partKey: 'telem', camOffset: [0, 0.5, 1.5], lookOffset: [0, 0, 0], image: '/images/parts/telemetry_radio.jpg' },
];
