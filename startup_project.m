%% Project Startup Script
%  Automatically loads parameters and configures paths when MATLAB opens
%  in this project directory. Add this to your MATLAB path or call manually.
%
%  Usage: startup_project  (or place in the project root as startup.m)

fprintf('\n=== QAV250 Indoor Drone Navigation Project ===\n\n');

%% Add project paths
projectRoot = fileparts(mfilename('fullpath'));
addpath(genpath(fullfile(projectRoot, 'simulink')));
fprintf('Added simulink/ to MATLAB path.\n');

%% Load vehicle parameters
run(fullfile(projectRoot, 'simulink', 'params', 'qav250_params.m'));

%% Load simulation config
run(fullfile(projectRoot, 'simulink', 'params', 'sim_config.m'));

fprintf('\nProject ready. Open a Simulink model to begin.\n');
fprintf('  Plant model:  simulink/plant_model/qav250_plant.slx\n');
fprintf('  Controller:   simulink/controller/flight_controller.slx\n');
fprintf('  PX4 SIH:      simulink/px4_integration/px4_host_target_setup.slx\n\n');
