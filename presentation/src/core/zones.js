/**
 * Zone Definitions — The 16-zone holographic journey
 * Each zone: { id, label, camera, content(), onEnter(), onExit() }
 */

export const ZONES = [
  /* ===== 0: IDENTITY ===== */
  {
    id: 'identity', label: 'PROJECT IDENTITY',
    camera: { pos: [0, 1.5, 8], look: [0, 0.3, 0] },
    content: () => `
      <!-- TOP: Hero title above drone -->
      <div class="hero-top">
        <div class="hero-title">QAV<span class="accent">250</span></div>
        <div class="hero-subtitle">PLANT MODEL DEVELOPMENT &amp; MBD WORKFLOW VALIDATION</div>
        <div class="hero-tagline">A MathWorks Model-Based Design Case Study for the HolyBro QAV250</div>
      </div>

      <!-- BOTTOM: Team + info below drone -->
      <div class="hero-bottom">
        <div class="hero-oneliner">
          Developing the first validated Simulink plant model for the QAV250 platform to demonstrate
          the Model-Based Design workflow from simulation to hardware deployment.
        </div>
        <div class="team-row">
          <span class="team-member">Shoaib Nadeem</span>
          <span class="team-member">Simon Ballard</span>
          <span class="team-member">Mohammed Almutari</span>
        </div>
        <div class="hero-course">ECE 420 // DR. TITO BUSANI // UNIVERSITY OF NEW MEXICO</div>
        <div class="hero-sponsor">SPONSOR: <span class="accent">MATHWORKS</span></div>
      </div>`,
    droneState: { rotY: 'spin', scale: 1, posY: 0.3 }
  },

  /* ===== 1: PROBLEM ===== */
  {
    id: 'problem', label: 'PROBLEM SPACE',
    camera: { pos: [0, 0.2, 3], look: [0, 0, 0] },
    content: () => `
      <div class="zone-panel zone-panel-top">
        <div class="zone-title">THE <span class="accent">PROBLEM</span></div>
        <div class="zone-bullets zone-bullets-center">
          <div class="zone-bullet"><span class="bullet-marker">▸</span> HolyBro QAV250 + Pixhawk 6C Mini — a new kit with <span class="accent">no existing plant model</span></div>
          <div class="zone-bullet"><span class="bullet-marker">▸</span> MathWorks MBD workflow requires a validated Simulink model as its foundation</div>
          <div class="zone-bullet"><span class="bullet-marker">▸</span> Without one, controllers validated in simulation <span class="accent">cannot be trusted</span> on hardware</div>
          <div class="zone-bullet"><span class="bullet-marker">▸</span> The sim-to-real gap is entirely unknown — 12+ physical parameters are estimates</div>
        </div>
      </div>
      <div class="gap-marker">
        <div class="gap-line"></div>
        <div class="gap-label">Δ&nbsp;=&nbsp;<span class="accent">?</span></div>
        <div class="gap-line"></div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 0.4, posY: -0.1, posX: 1.2 }
  },

  /* ===== 2: PURPOSE ===== */
  {
    id: 'purpose', label: 'PURPOSE & SCOPE',
    camera: { pos: [0, 1, 6], look: [0, -0.5, 0] },
    content: () => `
      <div class="zone-panel zone-panel-top">
        <div class="zone-title">PURPOSE & <span class="accent">SCOPE</span></div>
        <div class="zone-bullets zone-bullets-center">
          <div class="zone-bullet"><span class="bullet-marker">▸</span> Build a validated <span class="accent">Simulink plant model</span> for the QAV250</div>
          <div class="zone-bullet"><span class="bullet-marker">▸</span> Execute the full MathWorks <span class="accent">Model-Based Design</span> pipeline</div>
          <div class="zone-bullet"><span class="bullet-marker">▸</span> Validate via <span class="accent">behavior matching</span> against real flight data</div>
          <div class="zone-bullet"><span class="bullet-marker">▸</span> Visualize in an Unreal Engine 5.3 <span class="accent">digital twin</span></div>
        </div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 0.7, posY: 0.3, visible: false }
  },

  /* ===== 3: OBJECTIVES ===== */
  {
    id: 'objectives', label: 'OBJECTIVES',
    camera: { pos: [0, 1.5, 7], look: [0, 0, 0] },
    content: () => `
      <div class="zone-panel zone-panel-top">
        <div class="zone-title"><span class="accent">OBJECTIVES</span></div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 0.35, posY: 0 }
  },

  /* ===== 4: RESEARCH GAP ===== */
  {
    id: 'research', label: 'EXISTING SOLUTIONS',
    camera: { pos: [0, 1.5, 6], look: [0, 0, 0] },
    content: () => `
      <div class="zone-panel zone-panel-top">
        <div class="zone-title">EXISTING SOLUTIONS & <span class="accent">THE GAP</span></div>
      </div>`,
    droneState: { rotY: 'spin', scale: 0.5, posY: 0, visible: false }
  },

  /* ===== 5: SYSTEM ARCHITECTURE & SOFTWARE STACK ===== */
  {
    id: 'architecture', label: 'SYSTEM ARCHITECTURE',
    camera: { pos: [0, 0.6, 5.5], look: [0, 0.1, 0] },
    content: () => `
      <div class="zone-panel zone-panel-top">
        <div class="zone-title">SYSTEM <span class="accent">ARCHITECTURE</span></div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 0, posY: 0, visible: false }
  },

  /* ===== 6: VALIDATION PIPELINE ===== */
  {
    id: 'hw-architecture', label: 'VALIDATION PIPELINE',
    camera: { pos: [0, 1.8, 7], look: [0, 0.3, 0] },
    content: () => `
      <div class="zone-panel zone-panel-top">
        <div class="zone-title">HARDWARE <span class="accent">PATH</span></div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 0, posY: 0, visible: false }
  },

  /* ===== 7: DESIGN DETAILS / EXPLODE VIEW ===== */
  {
    id: 'hardware', label: 'DESIGN DETAILS',
    camera: { pos: [1.5, 0.8, 3], look: [0, 0, 0] },
    content: () => `
      <div class="zone-panel zone-panel-top">
        <div class="zone-title">DESIGN <span class="accent">DETAILS</span></div>
        <div class="zone-subtitle" style="font-size:11px;opacity:0.5;margin-top:6px">17 COMPONENTS · 8 MEASURED PARAMETERS · USE → TO EXPLORE</div>
      </div>`,
    droneState: { rotY: 'explode', scale: 1.5, posY: 0 }
  },

  /* ===== 9: METHODOLOGY ===== */
  {
    id: 'methodology', label: 'METHODOLOGY',
    camera: { pos: [0, 0.3, 8], look: [0, -0.1, 0] },
    content: () => `
      <div class="zone-panel zone-panel-top">
        <div class="zone-title"><span class="accent">METHODOLOGY</span></div>
        <div class="zone-subtitle" style="font-size:11px;opacity:0.5;margin-top:6px">6 OBJECTIVES · USE → TO STEP THROUGH</div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 0, posY: 0, visible: false }
  },

  /* ===== 10: TESTING & VALIDATION ===== */
  {
    id: 'testing', label: 'TESTING & VALIDATION',
    camera: { pos: [0, 0.3, 6], look: [0, 0, 0] },
    content: () => `
      <div class="zone-panel zone-panel-top">
        <div class="zone-title">VALIDATION <span class="accent">MATRIX</span></div>
        <div class="zone-subtitle" style="font-size:11px;opacity:0.5;margin-top:6px">6 GATES · USE → TO STEP THROUGH</div>
      </div>
      <div id="test-matrix-mount"></div>`,
    droneState: { rotY: 'spin-slow', scale: 0, posY: 0, visible: false }
  },

  /* ===== 11: RESULTS ===== */
  {
    id: 'results', label: 'RESULTS',
    camera: { pos: [0, 0.3, 9], look: [0, 0, 0] },
    content: () => `
      <div class="zone-panel zone-panel-top">
        <div class="zone-title"><span class="accent">RESULTS</span></div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 0, posY: 0, visible: false }
  },

  /* ===== 11: ANALYSIS ===== */
  {
    id: 'analysis', label: 'ANALYSIS',
    camera: { pos: [3, 1.5, 5], look: [0, 0.3, 0] },
    content: () => `
      <div class="content-left" style="max-width:460px">
        <div class="zone-title" style="font-size:32px;text-align:left">ANALYSIS</div>
        <div class="objective-list stagger" style="margin-top:16px">
          <div class="objective-item" style="border-left-color:var(--green)"><span class="objective-text">The MBD infrastructure works end-to-end</span></div>
          <div class="objective-item" style="border-left-color:var(--orange)"><span class="objective-text">The model-fidelity claim remains pending until behavior matching is complete</span></div>
          <div class="objective-item" style="border-left-color:var(--green)"><span class="objective-text">Vehicle-specific parameters matter — they replace generic quadrotor assumptions</span></div>
          <div class="objective-item" style="border-left-color:var(--cyan)"><span class="objective-text">The final comparison is QAV250-specific model vs generic MathWorks model using the same motor commands</span></div>
        </div>
        <div class="zone-subtitle" style="text-align:left;font-size:10px;color:var(--red);margin-top:20px;letter-spacing:2px">KNOWN ISSUE</div>
        <div class="zone-body" style="text-align:left;margin-top:6px;font-size:11px;color:rgba(255,255,255,0.5)">
          Mag calibration mismatch in SITL causes spiral flight — a SITL configuration issue, not a plant model flaw.
        </div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 1.1, posY: 0.3 }
  },

  /* ===== 12: DISCUSSION ===== */
  {
    id: 'discussion', label: 'DISCUSSION',
    camera: { pos: [3, 1.5, 5], look: [0, 0.3, 0] },
    content: () => `
      <div class="content-left" style="max-width:460px">
        <div class="zone-title" style="font-size:32px;text-align:left">DISCUSSION</div>
        <div class="zone-subtitle" style="text-align:left;font-size:10px;color:var(--green);margin-top:16px;letter-spacing:2px">STRENGTHS</div>
        <div class="objective-list stagger" style="margin-top:8px">
          <div class="objective-item" style="border-left-color:var(--green)"><span class="objective-text">Complete MBD workflow demonstrated from parameter measurement through co-simulation</span></div>
          <div class="objective-item" style="border-left-color:var(--green)"><span class="objective-text">First Simulink model tuned to QAV250 hardware</span></div>
          <div class="objective-item" style="border-left-color:var(--green)"><span class="objective-text">UE digital twin provides visual validation of simulated flight</span></div>
          <div class="objective-item" style="border-left-color:var(--green)"><span class="objective-text">OptiTrack bridge reusable for any indoor PX4 platform</span></div>
        </div>
        <div class="zone-subtitle" style="text-align:left;font-size:10px;color:var(--red);margin-top:16px;letter-spacing:2px">LIMITATIONS</div>
        <div class="objective-list stagger" style="margin-top:8px">
          <div class="objective-item" style="border-left-color:var(--red)"><span class="objective-text">SITL mag calibration causes spiral flight behavior</span></div>
          <div class="objective-item" style="border-left-color:var(--red)"><span class="objective-text">UE co-sim 10× slower than real-time</span></div>
          <div class="objective-item" style="border-left-color:var(--red)"><span class="objective-text">Inertia estimated, not measured via bifilar pendulum</span></div>
          <div class="objective-item" style="border-left-color:var(--red)"><span class="objective-text">Motor tilt bias prevented clean hover data collection</span></div>
        </div>
        <div class="zone-subtitle" style="text-align:left;font-size:10px;color:var(--cyan);margin-top:16px;letter-spacing:2px">REAL-WORLD VALUE</div>
        <div class="objective-list stagger" style="margin-top:8px">
          <div class="objective-item"><span class="objective-text">MathWorks can host as a reference QAV250 example</span></div>
          <div class="objective-item"><span class="objective-text">Other teams plug in qav250_params.m for immediate accuracy improvement</span></div>
        </div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 1, posY: 0.3 }
  },

  /* ===== 13: FUTURE WORK ===== */
  {
    id: 'future', label: 'FUTURE WORK',
    camera: { pos: [3, 1.5, 6], look: [0, 0.3, 0] },
    content: () => `
      <div class="content-left" style="max-width:460px">
        <div class="zone-title" style="font-size:32px;text-align:left">RECOMMENDATIONS &amp; <span class="accent">FUTURE WORK</span></div>
        <div class="objective-list stagger" style="margin-top:16px">
          <div class="objective-item"><span class="objective-num">①</span>
            <span class="objective-text"><strong>Complete flight testing</strong> — Resolve motor tilt bias via ESC calibration or USB bridge</span></div>
          <div class="objective-item"><span class="objective-num">②</span>
            <span class="objective-text"><strong>Bifilar pendulum test</strong> — Measure actual inertia instead of estimation</span></div>
          <div class="objective-item"><span class="objective-num">③</span>
            <span class="objective-text"><strong>USB bridge</strong> — Replace telemetry radio with USB for higher bandwidth position data</span></div>
          <div class="objective-item"><span class="objective-num">④</span>
            <span class="objective-text"><strong>Companion computer</strong> — Deploy obstacle avoidance to RPi via MAVLink</span></div>
          <div class="objective-item"><span class="objective-num">⑤</span>
            <span class="objective-text"><strong>Real-time sim + flight</strong> — Digital twin mirrors live drone pose for side-by-side comparison</span></div>
          <div class="objective-item"><span class="objective-num">⑥</span>
            <span class="objective-text"><strong>Scalable parameters</strong> — Adapt model for S500, X500 — only qav250_params.m changes</span></div>
          <div class="objective-item"><span class="objective-num">⑦</span>
            <span class="objective-text"><strong>Pixhawk code gen</strong> — Simulink → Embedded Coder → Pixhawk 6C deployment</span></div>
        </div>
      </div>`,
    droneState: { rotY: 'spin-slow', scale: 1.1, posY: 0.3 }
  },

  /* ===== 14: CONCLUSION ===== */
  {
    id: 'conclusion', label: 'CONCLUSION',
    camera: { pos: [3, 1.5, 6], look: [0, 0.3, 0] },
    content: () => `
      <div class="content-center" style="max-width:650px">
        <div class="zone-title">CONCLUSION</div>
        <div class="objective-list stagger" style="margin-top:24px;text-align:left">
          <div class="objective-item" style="border-left-color:var(--cyan)"><span class="objective-text">QAV250 lacked a validated Simulink plant model — this project addressed that gap</span></div>
          <div class="objective-item" style="border-left-color:var(--cyan)"><span class="objective-text">Measured vehicle-specific parameters and built a QAV250-tuned plant model</span></div>
          <div class="objective-item" style="border-left-color:var(--cyan)"><span class="objective-text">Established complete MBD pipeline: PX4 lockstep co-sim → UE digital twin</span></div>
          <div class="objective-item" style="border-left-color:var(--cyan)"><span class="objective-text">Pipeline verified end-to-end — behavior matching validation as immediate next step</span></div>
        </div>
        <div class="zone-subtitle" style="margin-top:30px;letter-spacing:4px;font-size:11px">
          MEASURE · SIMULATE · VALIDATE · VISUALIZE · DEPLOY
        </div>
        <div class="zone-body" style="margin-top:20px;font-size:12px;opacity:0.6;max-width:600px">
          Vehicle-specific Simulink plant modeling bridges the sim-to-real gap for affordable drone platforms,
          providing a foundation for a MathWorks QAV250 reference example.
        </div>
        <div class="zone-subtitle" style="margin-top:40px;opacity:0.3;font-size:9px">
          QAV250 CAPSTONE // SPRING 2026 // UNIVERSITY OF NEW MEXICO
        </div>
      </div>`,
    droneState: { rotY: 'spin', scale: 0.3, posY: 8 }
  },

  /* ===== 15: REFERENCES ===== */
  {
    id: 'references', label: 'REFERENCES',
    camera: { pos: [0, 1, 6], look: [0, 0, 0] },
    content: () => `
      <div class="content-center" style="max-width:800px">
        <div class="zone-title" style="font-size:32px">REFERENCES &amp; <span class="accent">ACKNOWLEDGEMENTS</span></div>

        <div class="zone-subtitle" style="margin-top:24px;font-size:10px;letter-spacing:3px;color:var(--cyan)">CONTRIBUTORS / HELPERS</div>
        <div class="objective-list stagger" style="margin-top:12px;text-align:center">
          <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px 24px;font-family:var(--font-data);font-size:12px;letter-spacing:2px;color:var(--text);opacity:0.8">
            <span>Dr. Ramiro Jordan</span>
            <span style="opacity:0.2">·</span>
            <span>Cole Pinkalla</span>
            <span style="opacity:0.2">·</span>
            <span>Ryan Garcia</span>
            <span style="opacity:0.2">·</span>
            <span>Ahmed Mekky</span>
            <span style="opacity:0.2">·</span>
            <span>Jon Loftin</span>
          </div>
        </div>

        <div class="zone-subtitle" style="margin-top:28px;font-size:10px;letter-spacing:3px;color:var(--cyan)">REFERENCES</div>
        <div class="objective-list stagger" style="margin-top:12px;text-align:left;max-width:700px">
          <div class="objective-item" style="border-left-color:rgba(255,255,255,0.1);padding:6px 16px"><span class="objective-text" style="font-size:11px;opacity:0.7">[1] MathWorks, "Overview: Set Up a 3D Scenario Simulation with Simulink and Unreal Engine."</span></div>
          <div class="objective-item" style="border-left-color:rgba(255,255,255,0.1);padding:6px 16px"><span class="objective-text" style="font-size:11px;opacity:0.7">[2] MathWorks, "PX4 Autopilots Support from UAV Toolbox."</span></div>
          <div class="objective-item" style="border-left-color:rgba(255,255,255,0.1);padding:6px 16px"><span class="objective-text" style="font-size:11px;opacity:0.7">[3] MathWorks, "UAV Toolbox Support Package for PX4 Autopilots." MATLAB Central File Exchange.</span></div>
          <div class="objective-item" style="border-left-color:rgba(255,255,255,0.1);padding:6px 16px"><span class="objective-text" style="font-size:11px;opacity:0.7">[4] PX4 Autopilot, "PX4 Autopilot User Guide."</span></div>
          <div class="objective-item" style="border-left-color:rgba(255,255,255,0.1);padding:6px 16px"><span class="objective-text" style="font-size:11px;opacity:0.7">[5] Holybro, "QAV250 Kit."</span></div>
          <div class="objective-item" style="border-left-color:rgba(255,255,255,0.1);padding:6px 16px"><span class="objective-text" style="font-size:11px;opacity:0.7">[6] Holybro, "Pixhawk 6C Mini."</span></div>
          <div class="objective-item" style="border-left-color:rgba(255,255,255,0.1);padding:6px 16px"><span class="objective-text" style="font-size:11px;opacity:0.7">[7] OptiTrack, "Motive."</span></div>
          <div class="objective-item" style="border-left-color:rgba(255,255,255,0.1);padding:6px 16px"><span class="objective-text" style="font-size:11px;opacity:0.7">[8] OptiTrack, "NatNet SDK Documentation."</span></div>
          <div class="objective-item" style="border-left-color:rgba(255,255,255,0.1);padding:6px 16px"><span class="objective-text" style="font-size:11px;opacity:0.7">[9] MAVLink, "MAVLink Developer Guide."</span></div>
        </div>

        <div class="zone-subtitle" style="margin-top:30px;opacity:0.2;font-size:9px">
          ECE 420 // DR. TITO BUSANI // UNIVERSITY OF NEW MEXICO // SPRING 2026
        </div>
      </div>`,
    droneState: { rotY: 'spin', scale: 0, posY: 0, visible: false }
  }
];
