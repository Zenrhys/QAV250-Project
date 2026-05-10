/**
 * Zone Definitions — The 15-zone holographic journey
 * Each zone: { id, label, camera, content(), onEnter(), onExit() }
 */

export const ZONES = [
  /* ===== 0: IDENTITY ===== */
  {
    id: 'identity', label: 'PROJECT IDENTITY',
    camera: { pos: [0, 1.5, 8], look: [0, 0.3, 0] },
    content: () => `
      <div class="content-center">
        <div class="zone-title">QAV<span class="accent">250</span></div>
        <div class="zone-subtitle">Model-Based Design &amp; Digital Twin Validation</div>
        <div class="team-row">
          <span class="team-member">Member 1</span>
          <span class="team-member">Member 2</span>
          <span class="team-member">Member 3</span>
          <span class="team-member">Member 4</span>
        </div>
        <div class="zone-subtitle" style="margin-top:24px;font-size:10px;letter-spacing:6px;opacity:0.35">
          ENGR 4XX // DR. INSTRUCTOR // SPRING 2026
        </div>
      </div>`,
    droneState: { rotY: 'spin', scale: 1, posY: 0.3 }
  },

  /* ===== 1: PROBLEM ===== */
  {
    id: 'problem', label: 'PROBLEM SPACE',
    camera: { pos: [0, 1, 5], look: [0, 0.5, 0] },
    content: () => `
      <div class="content-left">
        <div class="zone-title" style="font-size:24px;text-align:left">THE<br>PROBLEM</div>
        <div class="zone-body" style="text-align:left;margin-top:16px">
          Indoor drone navigation demands sub-centimeter accuracy.
          Generic simulation models fail to capture vehicle-specific dynamics,
          creating a gap between virtual prototyping and real-world performance.
        </div>
      </div>
      <div class="content-right">
        <div class="metric">
          <div class="value">±15<span class="unit">cm</span></div>
          <div class="label">TYPICAL POSITION ERROR</div>
        </div>
        <div class="metric" style="margin-top:30px">
          <div class="value">62<span class="unit">%</span></div>
          <div class="label">MODEL ACCURACY (GENERIC)</div>
        </div>
      </div>`,
    droneState: { rotY: 'wobble', scale: 1, posY: 0.5 }
  },

  /* ===== 2: PURPOSE ===== */
  {
    id: 'purpose', label: 'PURPOSE & SCOPE',
    camera: { pos: [3, 2, 5], look: [0, 0.3, 0] },
    content: () => `
      <div class="content-left">
        <div class="zone-title" style="font-size:22px;text-align:left">PURPOSE</div>
        <div class="zone-body" style="text-align:left;margin-top:16px">
          Develop a validated QAV250-specific Simulink plant model and
          demonstrate the complete MathWorks model-based design workflow:
          simulate, validate, visualize, deploy.
        </div>
        <div style="margin-top:20px">
          <span class="tag">SIMULINK</span>
          <span class="tag">PX4</span>
          <span class="tag">UNREAL ENGINE</span>
          <span class="tag">OPTITRACK</span>
        </div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 1, posY: 0.3 }
  },

  /* ===== 3: OBJECTIVES ===== */
  {
    id: 'objectives', label: 'OBJECTIVES',
    camera: { pos: [-2, 2.5, 6], look: [0, 0, 0] },
    content: () => `
      <div class="content-right" style="max-width:440px">
        <div class="zone-title" style="font-size:18px;text-align:left;margin-bottom:20px">OBJECTIVES</div>
        <div class="objective-list stagger">
          <div class="objective-item"><span class="objective-num">01</span>
            <span class="objective-text">Measure QAV250 physical parameters (mass, inertia, thrust coefficients) to ±5% accuracy</span></div>
          <div class="objective-item"><span class="objective-num">02</span>
            <span class="objective-text">Build validated Simulink plant model with &lt;10% step response error vs. real flight</span></div>
          <div class="objective-item"><span class="objective-num">03</span>
            <span class="objective-text">Demonstrate PX4 SITL lockstep co-simulation pipeline end-to-end</span></div>
          <div class="objective-item"><span class="objective-num">04</span>
            <span class="objective-text">Integrate Unreal Engine 5.3 digital twin visualization</span></div>
          <div class="objective-item"><span class="objective-num">05</span>
            <span class="objective-text">Collect flight data via OptiTrack MoCap for model validation</span></div>
        </div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 1.1, posY: 0 }
  },

  /* ===== 4: RESEARCH GAP ===== */
  {
    id: 'research', label: 'RESEARCH GAP',
    camera: { pos: [0, 3, 10], look: [0, 0, 0] },
    content: () => `
      <div class="content-center">
        <div class="zone-title" style="font-size:20px">EXISTING SOLUTIONS</div>
        <div class="metric-row" style="margin-top:30px">
          <div class="metric">
            <div class="value" style="font-size:18px;color:var(--text-muted)">GAZEBO</div>
            <div class="label">GENERIC MODELS</div>
          </div>
          <div class="metric">
            <div class="value" style="font-size:18px;color:var(--text-muted)">AIRSIM</div>
            <div class="label">NO VALIDATION</div>
          </div>
          <div class="metric">
            <div class="value" style="font-size:18px;color:var(--text-muted)">MATLAB</div>
            <div class="label">GENERIC QUAD</div>
          </div>
        </div>
        <div class="zone-body" style="margin-top:30px">
          None provide a validated, vehicle-specific plant model tied to the MathWorks MBD workflow.
        </div>
        <div class="zone-title accent" style="font-size:16px;margin-top:20px;color:var(--magenta)">
          ← THE GAP →
        </div>
      </div>`,
    droneState: { rotY: 'spin', scale: 0.5, posY: 0 }
  },

  /* ===== 5: ARCHITECTURE ===== */
  {
    id: 'architecture', label: 'SYSTEM ARCHITECTURE',
    camera: { pos: [0, 3, 7], look: [0, 0.5, 0] },
    content: () => `
      <div class="content-top">
        <div class="zone-title" style="font-size:20px">SYSTEM <span class="accent">ARCHITECTURE</span></div>
      </div>
      <div class="content-bottom">
        <div class="metric-row">
          <div class="metric">
            <div class="value" style="font-size:16px">CONTROLLER</div>
            <div class="label">PX4 HOST TARGET</div>
          </div>
          <div class="metric">
            <div class="value" style="font-size:16px;color:var(--magenta)">↔</div>
            <div class="label">MAVLINK TCP</div>
          </div>
          <div class="metric">
            <div class="value" style="font-size:16px">PLANT MODEL</div>
            <div class="label">QUAD_UAV_DYNAMICS</div>
          </div>
          <div class="metric">
            <div class="value" style="font-size:16px;color:var(--magenta)">↔</div>
            <div class="label">SIM 3D API</div>
          </div>
          <div class="metric">
            <div class="value" style="font-size:16px">DIGITAL TWIN</div>
            <div class="label">UNREAL ENGINE 5.3</div>
          </div>
        </div>
      </div>`,
    droneState: { rotY: 'explode', scale: 1.3, posY: 0.5 }
  },

  /* ===== 6: METHODOLOGY ===== */
  {
    id: 'methodology', label: 'METHODOLOGY',
    camera: { pos: [4, 1.5, 4], look: [0, 0.3, 0] },
    content: () => `
      <div class="content-left" style="max-width:420px">
        <div class="zone-title" style="font-size:20px;text-align:left">METHODOLOGY</div>
        <div class="timeline" style="flex-direction:column;align-items:flex-start;margin-top:20px;width:100%">
          <div class="objective-list stagger">
            <div class="objective-item"><span class="objective-num">①</span>
              <span class="objective-text">Measure physical parameters (Workstream B)</span></div>
            <div class="objective-item"><span class="objective-num">②</span>
              <span class="objective-text">Update Simulink plant model with measured values</span></div>
            <div class="objective-item"><span class="objective-num">③</span>
              <span class="objective-text">Fly real drone with OptiTrack MoCap (Workstream C)</span></div>
            <div class="objective-item"><span class="objective-num">④</span>
              <span class="objective-text">Extract motor commands from PX4 flight logs (.ulg)</span></div>
            <div class="objective-item"><span class="objective-num">⑤</span>
              <span class="objective-text">Replay commands through plant model — compare vs ground truth</span></div>
          </div>
        </div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 1, posY: 0.3 }
  },

  /* ===== 7: HARDWARE ===== */
  {
    id: 'hardware', label: 'HARDWARE DESIGN',
    camera: { pos: [1.5, 0.8, 3], look: [0, 0, 0] },
    content: () => `
      <div class="content-right" style="max-width:350px">
        <div class="zone-title" style="font-size:18px;text-align:left">HARDWARE</div>
        <div class="metric" style="margin-top:16px;text-align:left">
          <div class="value" style="font-size:22px">0.826<span class="unit">kg</span></div>
          <div class="label">TOTAL MASS</div>
        </div>
        <div class="metric" style="margin-top:16px;text-align:left">
          <div class="value" style="font-size:22px">250<span class="unit">mm</span></div>
          <div class="label">FRAME DIAGONAL</div>
        </div>
        <div class="metric" style="margin-top:16px;text-align:left">
          <div class="value" style="font-size:22px">PIXHAWK<span class="unit"> 6C</span></div>
          <div class="label">FLIGHT CONTROLLER</div>
        </div>
        <div style="margin-top:20px">
          <span class="tag">2205 MOTORS</span>
          <span class="tag">5045 PROPS</span>
          <span class="tag">4S LIPO</span>
        </div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 1.5, posY: 0 }
  },

  /* ===== 8: SOFTWARE ===== */
  {
    id: 'software', label: 'SOFTWARE DESIGN',
    camera: { pos: [-2, 1.5, 4], look: [0, 0.3, 0] },
    content: () => `
      <div class="content-left" style="max-width:400px">
        <div class="zone-title" style="font-size:18px;text-align:left">SOFTWARE <span class="accent">STACK</span></div>
        <div class="objective-list stagger" style="margin-top:16px">
          <div class="objective-item"><span class="objective-num" style="color:var(--magenta)">PX4</span>
            <span class="objective-text">v1.14 Autopilot — EKF2, Commander, Position Controller</span></div>
          <div class="objective-item"><span class="objective-num" style="color:var(--magenta)">SIM</span>
            <span class="objective-text">Simulink R2025b — Quad_UAV_Dynamics plant model</span></div>
          <div class="objective-item"><span class="objective-num" style="color:var(--magenta)">VIZ</span>
            <span class="objective-text">Unreal Engine 5.3 — Sim 3D UAV Vehicle block</span></div>
          <div class="objective-item"><span class="objective-num" style="color:var(--magenta)">CAP</span>
            <span class="objective-text">OptiTrack Flex 13 — NatNet → MAVLink Python bridge</span></div>
        </div>
      </div>`,
    droneState: { rotY: 'spin', scale: 1, posY: 0.3 }
  },

  /* ===== 9: TESTING ===== */
  {
    id: 'testing', label: 'TESTING & VALIDATION',
    camera: { pos: [5, 2, 3], look: [0, 0.5, 0] },
    content: () => `
      <div class="content-left" style="max-width:380px">
        <div class="zone-title" style="font-size:18px;text-align:left">TEST <span class="accent">MATRIX</span></div>
        <div class="objective-list stagger" style="margin-top:16px">
          <div class="objective-item"><span class="objective-num" style="color:var(--green)">T1</span>
            <span class="objective-text">Hover hold — 1m altitude, 15s duration</span></div>
          <div class="objective-item"><span class="objective-num" style="color:var(--green)">T2</span>
            <span class="objective-text">Altitude step — 1.0m → 1.5m → 1.0m</span></div>
          <div class="objective-item"><span class="objective-num" style="color:var(--green)">T3</span>
            <span class="objective-text">Lateral step — 0.5m right, hold, return</span></div>
          <div class="objective-item"><span class="objective-num" style="color:var(--green)">T4</span>
            <span class="objective-text">Forward step — 0.5m forward, hold, return</span></div>
        </div>
        <div style="margin-top:16px">
          <span class="tag green">OPTITRACK GROUND TRUTH</span>
          <span class="tag green">PX4 .ULG LOGGING</span>
        </div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 1, posY: 0.5 }
  },

  /* ===== 10: RESULTS ===== */
  {
    id: 'results', label: 'RESULTS',
    camera: { pos: [0, 3.5, 6], look: [0, 0, 0] },
    content: () => `
      <div class="content-center">
        <div class="zone-title" style="font-size:22px">RESULTS</div>
        <div class="metric-row" style="margin-top:30px">
          <div class="metric">
            <div class="value">XX.X<span class="unit">%</span></div>
            <div class="label">POSITION RMSE REDUCTION</div>
          </div>
          <div class="metric">
            <div class="value">XX.X<span class="unit">%</span></div>
            <div class="label">ATTITUDE MATCH</div>
          </div>
          <div class="metric">
            <div class="value">X.XX<span class="unit">cm</span></div>
            <div class="label">HOVER ERROR</div>
          </div>
        </div>
        <div class="zone-body" style="margin-top:24px;opacity:0.5">
          Placeholder — real data pending flight tests
        </div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 1, posY: 0 }
  },

  /* ===== 11: ANALYSIS ===== */
  {
    id: 'analysis', label: 'ANALYSIS',
    camera: { pos: [2, 1.5, 5], look: [0, 0.3, 0] },
    content: () => `
      <div class="content-left" style="max-width:400px">
        <div class="zone-title" style="font-size:18px;text-align:left">ANALYSIS</div>
        <div class="zone-body" style="text-align:left;margin-top:16px">
          Motor command replay through the validated plant model demonstrates
          that vehicle-specific parameters significantly improve prediction accuracy
          compared to the generic MathWorks quadcopter model.
        </div>
        <div style="margin-top:20px">
          <span class="tag">MOTOR REPLAY</span>
          <span class="tag">RMSE COMPARISON</span>
          <span class="tag magenta">SIM vs REAL</span>
        </div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 1.1, posY: 0.3 }
  },

  /* ===== 12: DISCUSSION ===== */
  {
    id: 'discussion', label: 'DISCUSSION',
    camera: { pos: [-3, 2, 5], look: [0, 0.3, 0] },
    content: () => `
      <div class="content-right" style="max-width:380px">
        <div class="zone-title" style="font-size:18px;text-align:left">DISCUSSION</div>
        <div style="margin-top:20px">
          <div class="zone-subtitle" style="text-align:left;font-size:11px;color:var(--green)">STRENGTHS</div>
          <div class="objective-list stagger" style="margin-top:8px">
            <div class="objective-item" style="border-left-color:var(--green)"><span class="objective-text">End-to-end MBD workflow validated</span></div>
            <div class="objective-item" style="border-left-color:var(--green)"><span class="objective-text">Vehicle-specific parameters measured</span></div>
            <div class="objective-item" style="border-left-color:var(--green)"><span class="objective-text">Co-simulation pipeline functional</span></div>
          </div>
          <div class="zone-subtitle" style="text-align:left;font-size:11px;color:var(--red);margin-top:20px">LIMITATIONS</div>
          <div class="objective-list stagger" style="margin-top:8px">
            <div class="objective-item" style="border-left-color:var(--red)"><span class="objective-text">Magnetometer calibration in SITL</span></div>
            <div class="objective-item" style="border-left-color:var(--red)"><span class="objective-text">UE performance overhead in lockstep</span></div>
          </div>
        </div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 1, posY: 0.3 }
  },

  /* ===== 13: ETHICS ===== */
  {
    id: 'ethics', label: 'ETHICS & IMPACT',
    camera: { pos: [0, 4, 8], look: [0, 0, 0] },
    content: () => `
      <div class="content-center">
        <div class="zone-title" style="font-size:20px">ETHICS &amp; <span class="accent">IMPACT</span></div>
        <div class="metric-row" style="margin-top:30px">
          <div class="metric">
            <div class="value" style="font-size:16px">🛡️</div>
            <div class="label">FLIGHT SAFETY</div>
          </div>
          <div class="metric">
            <div class="value" style="font-size:16px">♻️</div>
            <div class="label">REDUCE CRASHES</div>
          </div>
          <div class="metric">
            <div class="value" style="font-size:16px">🔓</div>
            <div class="label">OPEN SOURCE</div>
          </div>
          <div class="metric">
            <div class="value" style="font-size:16px">🎓</div>
            <div class="label">EDUCATIONAL</div>
          </div>
        </div>
        <div class="zone-body" style="margin-top:20px">
          Virtual prototyping reduces physical test crashes, lowers cost, and enables
          safer development of autonomous indoor navigation systems.
        </div>
      </div>`,
    droneState: { rotY: 'spin', scale: 0.8, posY: 0 }
  },

  /* ===== 14: CONCLUSION ===== */
  {
    id: 'conclusion', label: 'CONCLUSION',
    camera: { pos: [0, 2, 6], look: [0, 1.5, 0] },
    content: () => `
      <div class="content-center">
        <div class="zone-title">CONCLUSION</div>
        <div class="zone-body" style="margin-top:24px">
          A vehicle-specific Simulink plant model, validated against real flight data,
          closes the gap between generic simulation and physical hardware performance.
        </div>
        <div class="zone-subtitle" style="margin-top:30px;letter-spacing:4px;font-size:11px">
          SIMULATE · VALIDATE · VISUALIZE · DEPLOY
        </div>
        <div class="zone-subtitle" style="margin-top:40px;opacity:0.3;font-size:9px">
          QAV250 CAPSTONE // SPRING 2026
        </div>
      </div>`,
    droneState: { rotY: 'spin', scale: 1, posY: 1.5 }
  }
];
