# Context for Antigravity on Laptop
## Paste this entire message into a new Antigravity conversation

I'm working on a QAV250 quadrotor drone project for a university capstone. I'm at the drone cage today doing flight tests with OptiTrack MoCap. Here's the full context:

## Project Goal
Validate a Simulink plant model (Quad_UAV_Dynamics) by comparing its predictions against real QAV250 flight data. "Behavior matching" — same motor commands in, compare position/attitude out.

## What's Done
- Simulink lockstep co-sim pipeline works (PX4 Host Target ↔ Quad_UAV_Dynamics ↔ Unreal Engine)
- QAV250 physical parameters measured (Workstream B complete)
- Presentation scaffold (Three.js) set up
- Project files at: c:\Users\Admin\Desktop\Projects\Drone Project\

## What I'm Doing Today
Flying the QAV250 in the OptiTrack cage to collect:
1. PX4 .ulg flight logs (motor commands + sensor data)
2. OptiTrack .csv exports (ground truth position/attitude)
3. Video recordings of flights

## Test Procedure
- Test 1: Hover at 1m for 15 seconds
- Test 2: Altitude step (1m → 1.5m → 1m)
- Test 3: Lateral step (right 0.5m and back)
- Test 4: Forward step (forward 0.5m and back)
- Flying manually with RC controller in Position mode (if MoCap→PX4 bridge works) or Stabilized mode (if not)

## What I'll Do With The Data After
- Extract motor commands from .ulg logs
- Replay motor commands through Simulink plant model
- Compare simulated vs real position/attitude
- Render sim flight in Unreal Engine for side-by-side demo

## Hardware
- QAV250 frame with Pixhawk 6C (PX4 v1.14)
- OptiTrack Flex 13 cameras, Motive software
- RC transmitter bound to Pixhawk

## Field Guide
I have a detailed field guide at docs/FLIGHT_TEST_FIELD_GUIDE.md in my project folder covering OptiTrack setup, marker placement, flight procedures, and data collection steps.

## What I Might Need Help With
- OptiTrack/Motive configuration questions
- PX4 parameter settings for indoor MoCap flight
- QGroundControl issues
- NatNet → PX4 EKF2 bridge configuration
- Data collection troubleshooting
- Coordinate frame questions (OptiTrack → PX4 NED transform)

## Key Coordinate Transform
PX4 uses NED (North-East-Down). OptiTrack default is different:
- PX4_x = OptiTrack_z (or whichever axis points forward)
- PX4_y = OptiTrack_x
- PX4_z = -OptiTrack_y
(Verify actual axes in Motive — I wrote them down at the cage)

## What We Worked On Today (May 4, 2026)

### Lockstep Co-Sim (Completed — Working)
We got the full PX4 Host Target ↔ Simulink plant model lockstep working:
- **Instance 1 (Controller):** `Quadcopter_Controller` deployed via Monitor & Tune to PX4 Host Target (PX4 SITL running in WSL2 Ubuntu-22.04)
- **Instance 2 (Plant):** `Quad_UAV_Dynamics` running in normal Simulink mode with simulation pacing
- TCP lockstep on port 4560 between Windows (plant) and WSL (PX4)
- The drone DOES fly — PX4 arms, takes off, and the UAV Animation shows the flight trajectory
- **Known issue:** Magnetometer calibration mismatch causes spiral flight. The simulated mag (sensor_mag_sim) provides data but PX4's calibration doesn't match → bad heading → spiral. This is a SITL config issue, not a plant model issue.

### UE Visualization (Partially Working)
- Added `Simulation 3D Scene Configuration` (library: `sim3dlib`) at top level of Quad_UAV_Dynamics
- Added `Simulation 3D UAV Vehicle` (library: `uavsim3dlib`) inside Visualization Subsystem
- Added `Reorder Attitude` MATLAB Function block (converts [yaw,pitch,roll] rad → [roll,pitch,yaw] deg for Sim3D block)
- Wired Bus Selector outputs (position + attitude) to both UAV Animation AND Sim3D blocks
- **Problem:** UE co-sim makes simulation extremely slow (~10x slower). We commented out the Sim3D blocks for testing. Will need to either reduce visualization rate or run UE separately.

### Key Configuration for PX4 SITL Launch
- PX4 runs in WSL at `~/PX4-Autopilot`, built as `px4_sitl_default`
- `sensor_mag_sim start` must be run in PX4 console after boot to provide simulated magnetometer data
- `commander arm -f` force-arms past preflight checks
- **DO NOT `param save`** — we discovered that saving experimental params (especially EKF2_MAG_TYPE) prevents EKF2 from converging on subsequent boots. If params get saved accidentally, delete: `rm -f ~/PX4-Autopilot/build/px4_sitl_default/rootfs/eeprom/parameters*`
- Instrument Control Toolbox is required (provides `tcpserver` function for plant model TCP communication)

### Architecture Decision
For behavior matching (the core deliverable), we do NOT need PX4 in the simulation loop:
1. Fly real drone → collect .ulg log (contains motor commands) + OptiTrack data (ground truth)
2. Extract motor commands from .ulg
3. Replay motor commands through `Quad_UAV_Dynamics` in normal Simulink mode (no PX4, no lockstep)
4. Compare simulated position/attitude vs OptiTrack ground truth
5. Render simulated flight in UE for side-by-side video demo

The lockstep is for deliverable D3 (proving the MBD workflow) — separate from behavior matching.

### What's Queued After Flight Data Collection
- Write MATLAB script to parse .ulg → extract motor commands
- Update `qav250_params.m` with Workstream B's measured values
- Build replay pipeline: recorded motors → plant model → simulated trajectory
- Compare sim vs real → behavior matching plots
- UE side-by-side visualization (replay, not real-time)
- Fix mag calibration for cleaner lockstep demo (low priority)

### Project File Locations
- Plant model: `examples/Px4DemoHostTargetWithSimulinkPlant/models/Quad_UAV_Dynamics.slx`
- Controller: `examples/Px4DemoHostTargetWithSimulinkPlant/models/Quadcopter_Controller.slx`
- Init script: `examples/Px4DemoHostTargetWithSimulinkPlant/scripts/InitVars.m`
- QAV250 params: `simulink/params/qav250_params.m`
- UE project: `unreal/IndoorDroneSim/AutoVrtlEnv/AutoVrtlEnv.uproject`
- Presentation: `presentation/` (Vite + Three.js scaffold, npm not installed yet)
- Co-sim test model: `simulink/px4_integration/px4_unreal_cosim.slx`
