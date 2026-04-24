%% Launch PX4 Host Target (SIH Mode)
%  Helper script to start the PX4 SITL environment from MATLAB.
%  
%  Prerequisites:
%    - UAV Toolbox Support Package for PX4 Autopilots installed
%    - Hardware Setup wizard completed (PX4 Host Target + SIH selected)
%    - PX4 source code at ~/PX4-Autopilot in WSL2
%
%  What this does:
%    1. Loads QAV250 parameters
%    2. Loads PX4 build configuration
%    3. Provides instructions for launching the host target
%
%  Usage: launch_px4_host_target

fprintf('\n=== PX4 Host Target Launcher ===\n\n');

%% Load project parameters
projectRoot = fileparts(fileparts(fileparts(mfilename('fullpath'))));
run(fullfile(projectRoot, 'simulink', 'params', 'qav250_params.m'));
run(fullfile(projectRoot, 'simulink', 'px4_integration', 'px4_build_config.m'));

%% Check environment
fprintf('Checking environment...\n');
run(fullfile(projectRoot, 'simulink', 'px4_integration', 'verify_px4_setup.m'));

%% Instructions for launching
fprintf('\n=== HOW TO LAUNCH PX4 HOST TARGET ===\n\n');
fprintf('Option A: Use the MathWorks Example (Recommended for first run)\n');
fprintf('  1. In MATLAB command window, run:\n');
fprintf('     openExample(''px4/AttitudeControlForXConfigurationQuadcopterUsingExternalInputExample'')\n');
fprintf('  2. In the example model, click Hardware tab → Build, Deploy & Start\n');
fprintf('  3. jMAVSim should open with a simulated quadrotor\n');
fprintf('  4. Open QGC (UDP port %d) to monitor and control\n\n', px4_config.qgc_port);

fprintf('Option B: Use a custom Simulink model\n');
fprintf('  1. Open your Simulink model\n');
fprintf('  2. Hardware tab → Hardware Settings\n');
fprintf('     - Hardware board: PX4 Host Target\n');
fprintf('     - Build target: %s\n', px4_config.build_target);
fprintf('  3. Click Build, Deploy & Start\n\n');

fprintf('Option C: Launch PX4 SITL manually from WSL (for debugging)\n');
fprintf('  1. Open WSL terminal\n');
fprintf('  2. cd ~/PX4-Autopilot\n');
fprintf('  3. make px4_sitl_default\n');
fprintf('  4. Then in the PX4 shell: commander status\n\n');

fprintf('=== USEFUL PX4 COMMANDS (in PX4 shell) ===\n');
fprintf('  commander status      - Check vehicle status\n');
fprintf('  commander arm         - Arm the vehicle\n');
fprintf('  commander disarm      - Disarm the vehicle\n');
fprintf('  listener sensor_combined - View IMU data\n');
fprintf('  listener vehicle_attitude - View attitude\n');
fprintf('  listener actuator_outputs - View motor outputs\n\n');
