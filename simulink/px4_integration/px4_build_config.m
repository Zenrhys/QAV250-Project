%% PX4 Build Configuration
%  Configuration script for PX4 Host Target builds.
%  This sets up paths and build options needed by Simulink's PX4 support package.
%
%  Run AFTER completing the Hardware Setup wizard.
%  This script stores the configuration so it persists across sessions.

%% ---------- PX4 Source & Build Settings ----------
% Path to PX4-Autopilot source inside WSL2
% The Hardware Setup wizard typically sets this, but we document it here
% for reference and manual override.
%
% To find your WSL home directory from Windows:
%   \\wsl$\Ubuntu\home\<username>\PX4-Autopilot
%
% The MATLAB support package translates this internally.

px4_config.firmware_version = 'v1.14.3';
px4_config.build_target     = 'px4_sitl_default';
px4_config.board            = 'PX4 Host Target';
px4_config.simulator        = 'SIH';           % Options: 'SIH', 'jMAVSim'

%% ---------- Communication ----------
% MAVLink UDP connection between PX4 Host Target and MATLAB/QGC
px4_config.mavlink_port     = 14540;   % default SITL MAVLink port
px4_config.qgc_port         = 18570;   % QGC UDP listening port
px4_config.serial_port      = '';      % set to COMx for real Pixhawk HITL

%% ---------- SIH Plant Model Override ----------
% When we have our own plant model (Phase 3), we can replace the SIH
% default dynamics. This flag controls whether to use the custom model.
px4_config.use_custom_plant = false;   % set true after Phase 3

%% ---------- Logging ----------
px4_config.enable_ulog      = true;    % PX4 .ulg logging
px4_config.log_topics       = {
    'vehicle_attitude'
    'vehicle_local_position'
    'actuator_outputs'
    'manual_control_setpoint'
    'sensor_combined'
};

%% ---------- Display ----------
fprintf('\n--- PX4 Build Configuration ---\n');
fprintf('  Firmware:   %s\n', px4_config.firmware_version);
fprintf('  Board:      %s\n', px4_config.board);
fprintf('  Target:     %s\n', px4_config.build_target);
fprintf('  Simulator:  %s\n', px4_config.simulator);
fprintf('  MAVLink:    UDP port %d\n', px4_config.mavlink_port);
fprintf('  QGC:        UDP port %d\n', px4_config.qgc_port);
if px4_config.use_custom_plant
    fprintf('  Plant:      CUSTOM (qav250_plant.slx)\n');
else
    fprintf('  Plant:      SIH default\n');
end
fprintf('-------------------------------\n\n');
