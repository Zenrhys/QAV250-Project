%% QAV250 Vehicle Parameters
%  All physical constants for the QAV250 quadrotor.
%  Run this script before opening any Simulink model to load params
%  into the base workspace.
%
%  To adapt for a different frame, copy this file and change values.
%  All Simulink models reference these variable names.
%
%  Units: SI (kg, m, s, rad) unless noted otherwise.

%% ---------- General ----------
params.g       = 9.81;       % gravitational acceleration [m/s^2]

%% ---------- Airframe ----------
params.mass    = 0.80;       % total mass incl. battery [kg]
                              % (QAV250 frame ~180 g, battery ~200 g,
                              %  electronics + motors ~420 g — measure!)
params.arm_len = 0.125;      % motor-to-center distance [m] (250 mm diagonal / 2)

% Inertia tensor [kg·m^2] — estimated; refine via bifilar pendulum or CAD
%   Ixx ≈ Iyy for symmetric X-frame
params.Ixx     = 0.0034;
params.Iyy     = 0.0034;
params.Izz     = 0.0060;
params.Ixy     = 0;
params.Ixz     = 0;
params.Iyz     = 0;
params.J       = diag([params.Ixx, params.Iyy, params.Izz]);  % inertia matrix

%% ---------- Motor / Propeller ----------
%  Motor: 2207 KV1950
%  Props: 5 × 3 (5-inch, 3-inch pitch) — typical for 2207/KV1950
%
%  Thrust = kT * omega^2   [N]
%  Torque = kQ * omega^2   [N·m]
%  where omega is propeller angular velocity [rad/s]
%
%  These coefficients are estimates. Measure on a thrust stand!
params.kT         = 1.0e-5;    % thrust coefficient [N/(rad/s)^2]
params.kQ         = 1.2e-7;    % torque coefficient [N·m/(rad/s)^2]
params.motor_tc   = 0.025;     % motor first-order time constant [s] (~25 ms for BLHeli_S)
params.omega_max  = 2500 * (2*pi/60);  % max RPM → rad/s (~26180 rad/s at full throttle)
params.omega_min  = 0;         % min RPM (motors can reach zero)
params.num_motors = 4;

%% ---------- Aerodynamic Drag ----------
%  Simple linear drag model: F_drag = -Cd * v
%  Adequate for low-speed indoor flight.
params.Cd_xy   = 0.1;         % translational drag coeff, x-y [N·s/m]
params.Cd_z    = 0.2;         % translational drag coeff, z [N·s/m]
params.Cd_rot  = 0.005;       % rotational drag coeff [N·m·s/rad]

%% ---------- Motor Mixing Matrix ----------
%  Maps [total_thrust; roll_moment; pitch_moment; yaw_moment]
%  to individual motor thrusts [T1; T2; T3; T4].
%
%  X-configuration (PX4 convention):
%     Motor 1: front-right (CW)
%     Motor 2: rear-left   (CW)
%     Motor 3: front-left  (CCW)
%     Motor 4: rear-right  (CCW)
%
%  Using arm geometry at 45° from body axes:
L = params.arm_len;
k = params.kQ / params.kT;    % torque-to-thrust ratio

params.mixer = [  1,    1,    1,    1;       % total thrust
                 -L,    L,    L,   -L;       % roll  (y-axis moment)
                  L,   -L,    L,   -L;       % pitch (x-axis moment)
                  k,    k,   -k,   -k  ];   % yaw   (z-axis moment)

params.mixer_inv = pinv(params.mixer);       % pseudo-inverse for allocation

%% ---------- Sensor Noise Parameters ----------
%  Modeled as Gaussian white noise + fixed bias.
%  Values are approximate for ICM-42688-P (Pixhawk 6C mini IMU).

% Accelerometer
params.accel_noise_density = 0.002;    % [m/s^2 / sqrt(Hz)]
params.accel_bias          = [0.01; 0.01; 0.02];  % [m/s^2]

% Gyroscope
params.gyro_noise_density  = 3.0e-4;  % [rad/s / sqrt(Hz)]
params.gyro_bias           = [0.001; 0.001; 0.001];  % [rad/s]

% Barometer
params.baro_noise_std      = 0.5;     % [m] altitude noise std dev

% GPS (M10)
params.gps_pos_noise_std   = 1.5;     % [m] horizontal
params.gps_vel_noise_std   = 0.1;     % [m/s]

% PMW3901 Optical Flow
params.of_noise_std        = 0.05;    % [rad/s] flow rate noise

% VL53L1X LiDAR (range sensor)
params.lidar_noise_std     = 0.02;    % [m]
params.lidar_max_range     = 4.0;     % [m]
params.lidar_min_range     = 0.04;    % [m]

%% ---------- Simulation ----------
params.Ts      = 0.001;       % base sample time [s] (1 kHz, matches PX4 inner loop)
params.Ts_ctrl = 0.004;       % controller sample time [s] (250 Hz)
params.Ts_nav  = 0.01;        % navigation / EKF sample time [s] (100 Hz)

%% ---------- Initial Conditions ----------
params.pos0    = [0; 0; 0];       % initial position NED [m]
params.vel0    = [0; 0; 0];       % initial velocity NED [m/s]
params.quat0   = [1; 0; 0; 0];   % initial quaternion [w; x; y; z]
params.omega0  = [0; 0; 0];       % initial body angular rates [rad/s]

%% ---------- Load into base workspace ----------
% Make all fields available as individual variables for Simulink
fn = fieldnames(params);
for i = 1:numel(fn)
    assignin('base', fn{i}, params.(fn{i}));
end

fprintf('QAV250 parameters loaded into workspace.\n');
fprintf('  Mass: %.2f kg | Arm length: %.3f m\n', params.mass, params.arm_len);
fprintf('  Motor kT: %.2e | kQ: %.2e\n', params.kT, params.kQ);
fprintf('  Hover RPM (approx): %.0f\n', ...
    sqrt(params.mass * params.g / (params.num_motors * params.kT)) * 60/(2*pi));
