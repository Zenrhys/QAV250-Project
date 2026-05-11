/**
 * Methodology Cards — 6 method cards for the Methodology zone
 * Stepped through with arrow keys; the active card expands in-place.
 */

export const METHOD_CARDS = [
  {
    num: '01',
    title: 'VEHICLE PARAMETERIZATION',
    objective: 'Measure QAV250 physical parameters to populate qav250_params.m.',
    input: 'Fully assembled QAV250 with battery installed.',
    procedure: [
      'Weighed complete vehicle with battery',
      'Measured motor-center to frame-center arm length',
      'Estimated inertia from component mass distribution + frame geometry',
      'Derived kT from 2207 KV1950 + 5″ prop data',
      'Estimated kQ from thrust coefficient + propeller behavior',
      'Assigned motor time constant from BLHeli_S ESC specs',
      'Verified motor numbering against PX4 X-config',
      'Calculated expected hover RPM from mass/gravity/kT',
    ],
    output: 'qav250_params.m — 8 vehicle-specific values',
    check: 'Hover RPM sanity-checked against expected behavior.',
  },
  {
    num: '02',
    title: 'PLANT MODEL',
    objective: 'Build a QAV250-specific Simulink plant model using measured parameters.',
    input: 'qav250_params.m',
    procedure: [
      'Loaded QAV250 values into MATLAB workspace',
      'Replaced generic quad values with QAV250-specific values',
      'Updated mass, arm length, inertia, kT, kQ, motor_tc in Quad_UAV_Dynamics',
      'Preserved existing 6-DOF plant structure',
      'Ran model in normal simulation mode',
      'Verified physically reasonable hover behavior',
    ],
    output: 'QAV250-tuned Quad_UAV_Dynamics.slx',
    check: 'Plausible hover behavior; ready for PX4 closed-loop.',
  },
  {
    num: '03',
    title: 'PX4 LOCKSTEP',
    objective: 'Establish PX4 SITL lockstep co-simulation against the QAV250 Simulink plant.',
    input: 'PX4 Host Target + QAV250-tuned Quad_UAV_Dynamics.',
    procedure: [
      'Ran PX4 SITL as active flight controller',
      'Ran Quad_UAV_Dynamics as simulated plant',
      'Connected via MAVLink TCP port 4560',
      'Sent motor PWM commands → Simulink plant',
      'Returned HIL_SENSOR / HIL_GPS / HIL_QUAT feedback → PX4',
      'Maintained synchronized lockstep timing',
    ],
    output: 'Closed-loop PX4 ↔ Simulink lockstep simulation.',
    check: 'PX4 armed, sent commands, controlled simulated QAV250.',
  },
  {
    num: '04',
    title: 'UNREAL TWIN',
    objective: 'Integrate UE 5.3 digital twin visualization via Sim 3D blocks.',
    input: 'Position + attitude from Quad_UAV_Dynamics.',
    procedure: [
      'Branched position → Sim 3D UAV Vehicle translation input',
      'Reordered attitude: yaw-pitch-roll → roll-pitch-yaw',
      'Converted radians to degrees',
      'Pointed Sim 3D Scene Config → UE project',
      'Ran UE Editor while Simulink drove vehicle pose',
    ],
    output: 'UE digital twin rendering simulated QAV250 flight.',
    check: 'Drone appeared in UE room, moved per simulation state.',
  },
  {
    num: '05',
    title: 'FLIGHT DATA',
    objective: 'Collect real flight data using OptiTrack MoCap + NatNet→MAVLink bridge.',
    input: 'Physical QAV250 inside OptiTrack cage.',
    procedure: [
      'Attached ≥4 asymmetric reflective markers to QAV250',
      'Created rigid body in Motive (ID = 1)',
      'Enabled NatNet multicast streaming (UDP 1511)',
      'Ran optitrack_bridge.py: NatNet → VISION_POSITION_ESTIMATE → Pixhawk',
      'Configured EKF2 vision fusion (EKF2_EV_CTRL=15, EKF2_HGT_REF=3)',
      'Recorded .ulg logs + OptiTrack .csv + video per test',
    ],
    output: 'PX4 .ulg logs + OptiTrack .csv ground truth + video.',
    check: 'Hand-moved drone; QGC position matched physical movement.',
  },
  {
    num: '06',
    title: 'BEHAVIOR MATCHING',
    objective: 'Replay motor commands through plant model; compare sim vs OptiTrack ground truth.',
    input: 'PX4 .ulg logs + OptiTrack .csv data.',
    procedure: [
      'Extracted motor PWM from actuator_outputs in .ulg',
      'Exported OptiTrack rigid-body tracking as .csv',
      'Replayed motor commands through Quad_UAV_Dynamics (no PX4 in loop)',
      'Time-aligned simulated trajectory with OptiTrack ground truth',
      'Overlaid sim position/attitude vs real MoCap traces',
      'Computed RMSE, % error, and correlation metrics',
    ],
    output: 'Sim-vs-real comparison plots + fidelity metrics.',
    check: 'Plant fidelity evaluated by trajectory error vs ground truth.',
  },
];

/**
 * Build the HTML for the methodology card grid.
 * Each card contains both the collapsed summary AND the expanded detail content.
 * The detail is hidden by default and revealed via CSS when the card gets .expanded.
 */
export function buildMethodCardGrid() {
  let html = '<div class="method-grid" id="method-grid">';
  METHOD_CARDS.forEach((card) => {
    const procHtml = card.procedure.map(p => `<div class="method-proc-step">▸ ${p}</div>`).join('');
    html += `
      <div class="method-card" data-card="${card.num}" id="method-card-${card.num}">
        <div class="method-card-summary">
          <div class="method-card-num">${card.num}</div>
          <div class="method-card-title">${card.title}</div>
        </div>
        <div class="method-card-detail">
          <div class="method-section">
            <div class="method-label">OBJECTIVE</div>
            <div class="method-value">${card.objective}</div>
          </div>
          <div class="method-section">
            <div class="method-label">INPUT</div>
            <div class="method-value">${card.input}</div>
          </div>
          <div class="method-section">
            <div class="method-label">PROCEDURE</div>
            <div class="method-proc">${procHtml}</div>
          </div>
          <div class="method-bottom-row">
            <div class="method-section method-half">
              <div class="method-label">OUTPUT</div>
              <div class="method-value">${card.output}</div>
            </div>
            <div class="method-section method-half">
              <div class="method-label">CHECK</div>
              <div class="method-value">${card.check}</div>
            </div>
          </div>
        </div>
      </div>`;
  });
  html += '</div>';
  return html;
}
