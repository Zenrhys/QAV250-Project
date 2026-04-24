# QAV250 Indoor Drone Navigation System

## Capstone Project — UNM UAV Lab

An advanced indoor drone navigation system built on the QAV250 platform using **Simulink** as the central development environment, with **PX4** flight control and an **Unreal Engine** digital twin.

---

## Project Structure

```
Drone Project/
├── docs/                         # Problem statement, datasheets, reference docs
├── simulink/
│   ├── params/                   # MATLAB parameter scripts (vehicle, motor, sensor)
│   ├── plant_model/              # 6-DOF drone dynamics model
│   ├── controller/               # Custom cascaded PID flight controller
│   ├── sensors/                  # Sensor models & validation harnesses
│   ├── px4_integration/          # PX4 Host Target / SIH / HITL setup
│   └── obstacle_avoidance/       # Obstacle avoidance Simulink models
├── unreal/
│   └── IndoorDroneSim/           # Unreal Engine 5 digital twin project
├── companion/                    # Raspberry Pi companion computer code
├── mocap/                        # Motion capture bridge scripts & config
└── README.md
```

## Hardware

| Component | Model |
|---|---|
| Frame | QAV250 carbon fiber |
| Flight Controller | Pixhawk 6C mini |
| Motors | 2207 KV1950 × 4 |
| ESC | BLHeli_S 20 A (integrated PDB) |
| Props | 5″ plastic |
| GPS | M10 |
| Optical Flow | PMW3901 |
| LiDAR (range) | ST VL53L1X |
| FPV Camera | Foxeer Predator 5 Micro |
| Power | PM06 v2 micro power module |
| Telemetry | 915 MHz radio |

## Software Stack

| Tool | Version |
|---|---|
| MATLAB / Simulink | R2025b |
| Unreal Engine | 5.3 (UAV Toolbox compatible) / 5.7 (environment dev) |
| PX4 Firmware | v1.14.x |
| QGroundControl | Latest stable |

## Quick Start

1. Open MATLAB R2025b.
2. Run `simulink/params/qav250_params.m` to load vehicle parameters into the workspace.
3. Run `simulink/params/check_toolboxes.m` to verify all required toolboxes are installed.
4. Open the desired Simulink model (e.g., `simulink/plant_model/qav250_plant.slx`).

## Project Phases

| Phase | Objective | Status |
|---|---|---|
| 0 | Project structure & tooling | ⬜ |
| 1 | PX4 / QGC baseline flight | ⬜ |
| 2 | PX4–Simulink integration (SIH) | ⬜ |
| 3 | Simulink plant model | ⬜ |
| 4 | Custom flight controller | ⬜ |
| 5 | Sensor integration & validation | ⬜ |
| 6 | Companion computer obstacle avoidance | ⬜ |
| 7 | Motion capture integration | ⬜ |
| 8 | Unreal Engine digital twin | ⬜ |
