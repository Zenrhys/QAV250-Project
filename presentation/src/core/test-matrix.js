/**
 * Test Matrix — Holographic Aerospace Clipboard
 * 6 Validation Gates displayed as a full-screen checklist
 * Each gate decodes/flickers in when stepped to
 */

export const TEST_GATES = [
  {
    num: '01', test: 'SITL LOCKSTEP',
    setup: 'PX4 Host Target ↔ Quad_UAV_Dynamics through TCP/MAVLink.',
    evidence: 'PX4 receives plant feedback and sends motor commands.',
    pass: 'PX4 arms, takes off, and controls the simulated vehicle.',
    status: 'VERIFIED', statusIcon: '✅', statusColor: '#00ff88',
    visual: 'PX4 and Simulink boxes with a green "SYNC VERIFIED" stamp.',
  },
  {
    num: '02', test: 'QGC CONNECTIVITY',
    setup: 'QGroundControl connects to SITL through UDP heartbeat.',
    evidence: 'Vehicle appears in QGC and parameters are accessible.',
    pass: 'QGC can monitor state and access configuration.',
    status: 'VERIFIED', statusIcon: '✅', statusColor: '#00ff88',
    visual: 'QGC screen mockup with heartbeat pulse and parameter panel unlocked.',
  },
  {
    num: '03', test: 'UE CO-SIM',
    setup: 'Sim 3D blocks render the simulated drone in the Unreal viewport.',
    evidence: 'Drone appears in UE and responds to simulation pose.',
    pass: 'Virtual drone position and attitude update with Simulink state.',
    status: 'VERIFIED', statusIcon: '✅', statusColor: '#00ff88',
    visual: 'Small Unreal room with drone and a "pose response verified" tag.',
  },
  {
    num: '04', test: 'MOCAP BRIDGE',
    setup: 'OptiTrack → Python bridge → MAVLink VISION_POSITION_ESTIMATE → PX4 EKF2.',
    evidence: 'Hand-moving the drone changes the position shown in QGC.',
    pass: 'QGC position updates match physical drone movement.',
    status: 'VERIFIED', statusIcon: '✅', statusColor: '#00ff88',
    visual: 'OptiTrack rays hitting markers, then QGC position coordinates updating.',
  },
  {
    num: '05', test: 'INDOOR HOVER',
    setup: 'Force-arm, takeoff command, Motive recording, drone inside safety cage.',
    evidence: 'Altitude hold from PX4 log and OptiTrack recording.',
    pass: 'Sustained hover at 1 meter for 15 seconds.',
    status: 'IN PROGRESS', statusIcon: '◻', statusColor: '#ffbb33',
    visual: 'Drone in safety cage with a 1.0 m altitude marker and 15-second timer.',
  },
  {
    num: '06', test: 'BEHAVIOR MATCHING',
    setup: 'Replay .ulg motor commands through the Simulink plant and compare against OptiTrack ground truth.',
    evidence: 'Overlay plots and error metrics.',
    pass: 'Simulated trajectory RMSE under 10% compared to OptiTrack ground truth.',
    status: 'PENDING FLIGHT DATA', statusIcon: '◻', statusColor: '#ffbb33',
    visual: 'Two trajectory traces overlaying, with RMSE metric cards beside them.',
  },
];

/**
 * Build the full test matrix DOM
 * Returns the outer clipboard element
 */
export function buildTestMatrix() {
  const clipboard = document.createElement('div');
  clipboard.className = 'tm-clipboard';

  // Clipboard clamp decoration
  const clamp = document.createElement('div');
  clamp.className = 'tm-clamp';
  clamp.innerHTML = `
    <div class="tm-clamp-bar"></div>
    <div class="tm-clamp-ring"></div>
  `;
  clipboard.appendChild(clamp);

  // Header
  const header = document.createElement('div');
  header.className = 'tm-header';
  header.innerHTML = `
    <div class="tm-header-label">QAV250 // VALIDATION MATRIX</div>
    <div class="tm-header-status">
      <span class="tm-header-count">4/6 GATES PASSED</span>
      <span class="tm-header-divider">│</span>
      <span class="tm-header-mode">SEQUENTIAL VERIFICATION</span>
    </div>
  `;
  clipboard.appendChild(header);

  // Gate rows
  const gateList = document.createElement('div');
  gateList.className = 'tm-gate-list';

  TEST_GATES.forEach((gate, i) => {
    const row = document.createElement('div');
    row.className = 'tm-gate';
    row.setAttribute('data-gate', i);

    row.innerHTML = `
      <div class="tm-gate-header">
        <span class="tm-gate-num">${gate.num}</span>
        <span class="tm-gate-test">${gate.test}</span>
        <span class="tm-gate-status" style="color:${gate.statusColor}">${gate.statusIcon} ${gate.status}</span>
      </div>
      <div class="tm-gate-detail">
        <div class="tm-detail-row">
          <span class="tm-detail-label">SETUP</span>
          <span class="tm-detail-value">${gate.setup}</span>
        </div>
        <div class="tm-detail-row">
          <span class="tm-detail-label">EVIDENCE</span>
          <span class="tm-detail-value">${gate.evidence}</span>
        </div>
        <div class="tm-detail-row">
          <span class="tm-detail-label">PASS</span>
          <span class="tm-detail-value">${gate.pass}</span>
        </div>
        <div class="tm-detail-row">
          <span class="tm-detail-label">VISUAL</span>
          <span class="tm-detail-value tm-detail-visual">${gate.visual}</span>
        </div>
      </div>
    `;

    gateList.appendChild(row);
  });

  clipboard.appendChild(gateList);

  // Footer
  const footer = document.createElement('div');
  footer.className = 'tm-footer';
  footer.innerHTML = `
    <span class="tm-footer-item">OPTITRACK GROUND TRUTH</span>
    <span class="tm-footer-divider">·</span>
    <span class="tm-footer-item">PX4 .ULG LOGGING</span>
    <span class="tm-footer-divider">·</span>
    <span class="tm-footer-item">MATLAB ANALYSIS</span>
  `;
  clipboard.appendChild(footer);

  return clipboard;
}

/**
 * Highlight a specific gate row (expand details, dim others)
 * @param {HTMLElement} clipboard - The clipboard element
 * @param {number} index - Gate index (0-5), or -1 for overview
 */
export function highlightGate(clipboard, index) {
  const gates = clipboard.querySelectorAll('.tm-gate');
  gates.forEach((gate, i) => {
    if (index === -1) {
      // Overview: all gates visible, none expanded
      gate.classList.remove('active', 'dimmed');
    } else if (i === index) {
      gate.classList.add('active');
      gate.classList.remove('dimmed');
    } else {
      gate.classList.remove('active');
      gate.classList.add('dimmed');
    }
  });
}
