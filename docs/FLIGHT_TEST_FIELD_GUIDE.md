# QAV250 Flight Test Field Guide
## Everything You Need To Know At The Cage

---

## PART 1: EQUIPMENT CHECK (Before Leaving)

- [ ] QAV250 drone (props installed, battery connector accessible)
- [ ] 2x charged LiPo batteries
- [ ] RC transmitter (charged, bound to Pixhawk)
- [ ] Laptop with QGroundControl installed
- [ ] USB cable (micro-USB or USB-C, whatever your Pixhawk 6C uses)
- [ ] SD card reader (or USB cable to download logs via QGC)
- [ ] Phone/camera on tripod for recording video
- [ ] OptiTrack reflective markers (if not already on drone)
- [ ] Double-sided tape or marker mounts for attaching markers to QAV250

---

## PART 2: OPTITRACK SETUP

### 2a. Motive Software (on the MoCap PC)

1. Open **Motive** on the MoCap PC
2. The Flex 13 cameras should auto-detect. You'll see camera feeds in the viewport
3. **Calibrate** (if not already done):
   - Wand tool → wave the calibration wand around the capture volume
   - Set ground plane using the L-frame
   - This may already be done if the cage is regularly used

### 2b. Attach Markers to QAV250

- Stick **at least 4** reflective markers on the QAV250 frame
- Place them **asymmetrically** (not symmetric front/back) so Motive can determine orientation
- Example placement:
  ```
       Front
    M1 ●     ● M2
        \   /
         [X]        ← Pixhawk center
        /   \
    M3 ●     ● M4
              ● M5  ← Extra marker on one arm to break symmetry
       Back
  ```

### 2c. Create Rigid Body in Motive

1. Place drone in the capture volume (on the ground, centered)
2. In Motive's 3D view, you should see the markers as dots
3. **Select all markers** belonging to the drone (Ctrl+click or drag select)
4. Right-click → **Rigid Body** → **Create From Selected Markers**
5. Name it `QAV250`
6. The drone should now show with XYZ axes in the viewport

### 2d. Verify Tracking

- Pick up the drone and move it around by hand
- The rigid body in Motive should follow smoothly
- Check the orientation makes sense (front of drone = forward axis)
- **Write down which Motive axis = which real direction:**
  ```
  Motive +X = _________ (forward / right / up?)
  Motive +Y = _________ (forward / right / up?)
  Motive +Z = _________ (forward / right / up?)
  ```
  This is CRITICAL for coordinate transforms later.

### 2e. Recording in Motive

- **Before each flight:** Click the red **Record** button in Motive
- **After each flight:** Click **Stop**
- The recording (`.tak` file) saves automatically
- **Label each take** by right-clicking in the Take list → Rename → e.g., `Test1_Hover`, `Test2_AltStep`

---

## PART 3: PX4 + QGroundControl SETUP

### 3a. Connect QGC to Pixhawk

1. Plug Pixhawk into laptop via USB (or connect via telemetry radio)
2. Open QGroundControl
3. QGC should auto-detect and connect (green bar at top)
4. Go to **Vehicle Setup** → verify firmware is loaded

### 3b. Check Flight Mode Switch (RC Transmitter)

Your RC transmitter should have a switch mapped to flight modes:
- **Stabilized** — you control attitude, no position hold
- **Position** — you control position (ONLY works if OptiTrack→PX4 bridge is active)
- **Land** — auto-land (emergency)

If unsure, check in QGC: **Vehicle Setup** → **Flight Modes**

### 3c. Arm Safety

- **Kill switch**: Know where it is on your RC. If anything goes wrong, HIT IT
- Have a **safety pilot** who knows the drone
- First flight should be a **very short hover** (2-3 seconds) to verify everything works

---

## PART 4: FLYING THE TEST MANEUVERS

### You are NOT programming waypoints. You fly manually with the RC controller.

**IMPORTANT:** All tests are done with the RC transmitter in **Position mode** 
(if OptiTrack bridge is working) or **Stabilized mode** (if not).

### Test 1 — Hover (most important, do this first)
```
1. Place drone in center of cage
2. Start Motive recording
3. Start phone video recording
4. Arm the drone (throttle down-right for 2 sec, or QGC arm button)
5. Slowly raise throttle to take off to ~1 meter
6. Release sticks to center → drone should hover (in Position mode)
7. Hold for 15 seconds — DON'T touch the sticks
8. Lower throttle slowly to land (or switch to Land mode)
9. Disarm
10. Stop Motive recording
11. Stop video recording
```

### Test 2 — Altitude Step
```
1. Take off and hover at ~1m (hold 5 seconds)
2. Smoothly push throttle up to climb to ~1.5m
3. Release throttle to center → hold 10 seconds
4. Smoothly lower back to ~1m
5. Hold 5 seconds
6. Land
```

### Test 3 — Lateral (Right) Step
```
1. Take off and hover at ~1m (hold 5 seconds)
2. Push right stick RIGHT briefly → drone slides right ~0.5m
3. Release stick → drone holds new position
4. Hold 10 seconds
5. Push left to return
6. Hold 5 seconds
7. Land
```

### Test 4 — Forward Step
```
1. Take off and hover at ~1m (hold 5 seconds)
2. Push right stick FORWARD briefly → drone moves forward ~0.5m
3. Release stick → drone holds new position
4. Hold 10 seconds
5. Push back to return
6. Hold 5 seconds
7. Land
```

### Tips:
- Be GENTLE with stick inputs — small, quick movements
- In **Position mode**, releasing the sticks = drone holds position
- In **Stabilized mode**, you have to manually balance — harder but still works
- If drone drifts badly, switch to **Land mode** immediately
- Battery warning = LAND IMMEDIATELY

---

## PART 5: COLLECTING THE DATA

### 5a. PX4 Flight Logs (.ulg)

**Option A — via QGC (easiest):**
1. Connect Pixhawk to laptop via USB
2. In QGC: **Analyze Tools** (top icon bar, wrench/chart icon) → **Log Download**
3. Click **Refresh** — you'll see a list of logs with dates/times
4. Select the logs from today's flights
5. Click **Download** → saves as `.ulg` files to your computer
6. Default save location: `Documents/QGroundControl/Logs/`

**Option B — SD card:**
1. Power off the Pixhawk
2. Remove the SD card from the Pixhawk
3. Put SD card in laptop reader
4. Navigate to `/log/` folder on the SD card
5. Copy today's folders (named by date, e.g., `2026-05-05/`)
6. Each `.ulg` file inside is one flight session
7. Put SD card back in Pixhawk

### 5b. OptiTrack Data (.csv)

**In Motive:**
1. Select the take you want to export in the Take list
2. Go to **File** → **Export Tracking Data...**
3. Settings:
   - Format: **CSV**
   - What to export: **Rigid Bodies** (check this, uncheck Markers unless you want raw marker data too)
   - Coordinate space: **Global** 
   - Frame range: **All** (or trim to your flight only)
4. Click **Export**
5. Save as e.g., `Test1_Hover.csv`, `Test2_AltStep.csv`, etc.

The CSV will contain columns like:
```
Frame, Time, QAV250_X, QAV250_Y, QAV250_Z, QAV250_QX, QAV250_QY, QAV250_QZ, QAV250_QW
```

### 5c. Video

- Transfer phone recordings to laptop
- Name them to match: `Test1_Hover.mp4`, etc.

---

## PART 6: DATA NAMING CONVENTION

Keep everything organized:
```
flight_data/
├── Test1_Hover/
│   ├── flight_log.ulg
│   ├── optitrack.csv
│   └── video.mp4
├── Test2_AltStep/
│   ├── flight_log.ulg
│   ├── optitrack.csv
│   └── video.mp4
├── Test3_LateralStep/
│   └── ...
└── Test4_ForwardStep/
    └── ...
```

---

## PART 7: IF OPTITRACK→PX4 BRIDGE ISN'T READY

If Workstream C hasn't finished the NatNet→MAVLink bridge, you can still collect useful data:

1. Fly in **Stabilized mode** (attitude control only, no position hold)
2. The maneuvers will be rougher (no auto-hover) but still usable
3. OptiTrack STILL records position/attitude — this is your ground truth regardless
4. PX4 STILL logs motor commands — this is your simulation input regardless
5. The behavior matching comparison still works, the inputs are just less clean

---

## PART 8: EMERGENCY PROCEDURES

- **Kill switch** on RC — memorize its position BEFORE arming
- If drone flips or behaves erratically → **KILL IMMEDIATELY**
- Stay outside the cage netting at all times during flight
- One person flies, one person watches, one person manages software
- If battery voltage drops below 14.0V (shown in QGC) → LAND NOW

---

## QUICK REFERENCE CARD

```
BEFORE EACH TEST:
  ✓ Motive recording ON
  ✓ Video recording ON
  ✓ Battery check (>14.8V)

FLY THE MANEUVER

AFTER EACH TEST:
  ✓ Motive recording STOP  
  ✓ Video recording STOP
  ✓ Note test number and time

AFTER ALL TESTS:
  ✓ Download .ulg from Pixhawk (QGC → Analyze → Log Download)
  ✓ Export .csv from Motive (File → Export Tracking Data)
  ✓ Transfer videos
  ✓ Label everything to match
```
