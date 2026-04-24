%% Simulation Configuration
%  Common simulation settings used across all Simulink models.
%  Run after qav250_params.m.

%% Solver
sim_config.solver     = 'ode4';       % fixed-step Runge-Kutta
sim_config.step_size  = params.Ts;    % 1 ms (matches PX4 inner loop)
sim_config.stop_time  = 30;           % default sim duration [s]

%% Environment
sim_config.wind       = [0; 0; 0];    % wind velocity NED [m/s] (calm for indoor)
sim_config.temp_C     = 22;           % ambient temperature [°C]
sim_config.pressure_Pa= 101325;       % sea-level pressure [Pa]

%% Ground
sim_config.ground_z   = 0;            % ground plane NED z [m] (z-down, 0 = surface)

%% Visualization
sim_config.enable_3d  = false;        % set true to launch Unreal co-sim
sim_config.ue_scene   = '';           % path to UE executable (Phase 8)

%% Load into workspace
fn = fieldnames(sim_config);
for i = 1:numel(fn)
    assignin('base', ['sim_' fn{i}], sim_config.(fn{i}));
end

fprintf('Simulation config loaded.\n');
