# Phase 2 — PX4–Simulink Integration Setup Guide

## Overview
This guide walks through setting up the **PX4 Host Target** with **SIH (Simulation-In-Hardware)** in Simulink. Once complete, you can run PX4 autopilot firmware on your PC as a SITL simulator, controlled entirely from Simulink.

---

## Prerequisites

- [x] MATLAB R2025b installed
- [ ] Virtualization enabled in BIOS (Intel VT-x / AMD-V)
- [ ] Internet connection (for toolchain downloads)

---

## Step 1 — Install Required MATLAB Toolboxes & Support Packages

Run `check_toolboxes.m` first to see what's missing, then install via Add-On Explorer:

1. Open MATLAB R2025b.
2. **Home** tab → **Add-Ons** → **Get Hardware Support Packages**.
3. Search for and install:
   - **UAV Toolbox Support Package for PX4 Autopilots**
4. After installation, the **Hardware Setup** wizard will launch automatically.

> **Note**: If the wizard doesn't launch, go to **Add-Ons** → click the options button (⋮) next to the PX4 support package → **Setup**.

---

## Step 2 — Install Python 3.8.2

The Hardware Setup wizard will prompt you to install Python 3.8.2 (used for firmware upload).

- Download from: https://www.python.org/downloads/release/python-382/
- Install with **"Add Python to PATH"** checked.
- Verify: Open PowerShell → `python --version` → should show `Python 3.8.2`.

---

## Step 3 — Install & Configure WSL2

PX4 builds inside a Linux environment via Windows Subsystem for Linux 2.

### 3a. Install WSL2
Open **PowerShell as Administrator**:
```powershell
wsl --install
```
Restart your computer when prompted.

### 3b. Set Up Ubuntu
After reboot, open a terminal and type:
```powershell
wsl
```
You'll be prompted to create a Unix username/password. Remember these — you'll need them for `sudo`.

### 3c. Verify
```bash
# Inside WSL shell
lsb_release -a
# Should show Ubuntu 22.04 or 24.04
```

---

## Step 4 — Download PX4 Firmware Source (v1.14.3)

Inside WSL:
```bash
cd ~
git clone https://github.com/PX4/PX4-Autopilot.git --recursive
cd PX4-Autopilot
git checkout v1.14.3 -f
git submodule update --init --recursive
```

> **IMPORTANT**: Clone into your WSL home directory (`~`), NOT into `/mnt/c/...`. Cloning into the Windows filesystem causes severe performance issues and permission errors.

---

## Step 5 — Install PX4 Toolchain

Still inside WSL, from the PX4-Autopilot directory:
```bash
cd ~/PX4-Autopilot/Tools/setup
bash ./ubuntu.sh
```

This installs GCC, CMake, Ninja, and Python packages. Enter your `sudo` password when prompted.

After completion, restart WSL:
```bash
exit
```
Then in PowerShell:
```powershell
wsl --shutdown
wsl
```

### Verify the toolchain
```bash
cd ~/PX4-Autopilot
make px4_sitl_default
```
This should compile successfully. It may take 5–10 minutes on the first build.

---

## Step 6 — Configure PX4 Host Target in MATLAB Hardware Setup

Back in MATLAB, continue the Hardware Setup wizard:

1. **Select PX4 Autopilot Board** → choose **PX4 Host Target**.
2. **Select Build Target** → `px4_sitl_default`.
3. **Select Simulator** → **SIH in Host Target**.
4. **Select Visualizer** → **jMAVSim** (or Simulink for later phases).
5. **Set PX4 Source Path** → Browse to the WSL path (the wizard handles the path mapping).
6. **Test Connection** → The wizard will build and launch the PX4 host target. Verify that jMAVSim opens and shows a quadrotor.

---

## Step 7 — Install QGroundControl

1. Download from: https://docs.qgroundcontrol.com/master/en/qgc-user-guide/getting_started/download_and_install.html
2. Install on Windows.
3. Configure a **UDP** connection to the PX4 Host Target:
   - **Application Settings** → **Comm Links** → **Add**.
   - Type: **UDP**, Port: **18570**.
   - You may need to use the WSL IP (find it with `hostname -I` in WSL).

---

## Step 8 — Run the MathWorks Example Model

1. In MATLAB, open the example:
   ```matlab
   openExample('px4/AttitudeControlForXConfigurationQuadcopterUsingExternalInputExample')
   ```
   Or search for **"Attitude Control for X-Configuration Quadcopter Using External Input"** in the documentation.

2. Click **Build, Deploy & Start** on the Hardware tab (or press Ctrl+B).
3. Verify:
   - PX4 Host Target launches (console output in WSL).
   - jMAVSim opens and shows a quadrotor.
   - QGC connects and shows vehicle status.
   - If you have an RC controller / joystick, you can arm and fly the simulated vehicle.
   - Simulink scopes show attitude angles and motor outputs.

---

## Step 9 — Run the Project Verification Script

Run the verification script we've created:
```matlab
run('simulink/px4_integration/verify_px4_setup.m')
```

This checks that all components are properly configured.

---

## Troubleshooting

| Issue | Solution |
|---|---|
| WSL not found | Run `wsl --install` in admin PowerShell, reboot |
| PX4 build fails | Ensure toolchain installed (`make px4_sitl_default` in WSL) |
| jMAVSim doesn't open | Install Java JDK in WSL: `sudo apt install default-jdk` |
| QGC can't connect | Check WSL IP (`hostname -I`), set UDP port 18570 |
| MATLAB can't find WSL | Ensure WSL2 is default: `wsl --set-default-version 2` |
| Slow build | Clone PX4 source in WSL home (`~`), not `/mnt/c/` |

---

## Next Steps
Once the example model runs successfully:
1. → **Phase 3**: Build the custom plant model to replace jMAVSim's default dynamics.
2. → **Phase 4**: Design the custom flight controller to replace PX4's default cascaded PID.
