%% Add Unreal Engine Visualization to Quad_UAV_Dynamics Plant Model
%  This script adds Simulation 3D blocks to the existing MathWorks
%  plant model so the drone is visualized in Unreal Engine.
%
%  Prerequisites:
%    - Quad_UAV_Dynamics model must be loaded
%    - UAV Toolbox Interface for Unreal Engine Projects installed
%
%  Usage: Run this script from MATLAB command window

fprintf('\n=== Adding Unreal Engine Visualization ===\n\n');

model = 'Quad_UAV_Dynamics';
visSub = [model '/Visualization Subsystem'];

% Ensure model is loaded and unlocked
load_system(model);
set_param(model, 'Lock', 'off');

%% Step 1: Add Simulation 3D Scene Configuration at top level
fprintf('[1] Adding Simulation 3D Scene Configuration...\n');
sceneBlockPath = [model '/Sim3D Scene Config'];
if isempty(find_system(model, 'SearchDepth', 1, 'Name', 'Sim3D Scene Config'))
    % Find the correct library block path
    try
        add_block('sim3dlib/Simulation 3D Scene Configuration', sceneBlockPath);
    catch
        % Try alternate library path
        try
            add_block('uaborbitlib/Simulation 3D Scene Configuration', sceneBlockPath);
        catch
            % Search for it
            libBlocks = find_system('simulink', 'SearchDepth', 0);
            error('Could not find Simulation 3D Scene Configuration block. Check library browser manually.');
        end
    end
    
    % Position it nicely in the model
    set_param(sceneBlockPath, 'Position', [50 400 250 450]);
    
    % Configure for custom UE project
    try
        set_param(sceneBlockPath, 'SceneDesc', 'Unreal Editor');
    catch
        try
            set_param(sceneBlockPath, 'SceneSource', 'Unreal Editor');
        catch
            fprintf('  NOTE: Set Scene source to "Unreal Editor" manually in block dialog.\n');
        end
    end
    
    fprintf('  Added Simulation 3D Scene Configuration.\n');
    fprintf('  >> MANUAL STEP: Double-click the block and set:\n');
    fprintf('     Scene source = Unreal Editor\n');
    fprintf('     Project = c:\\Users\\Admin\\Desktop\\Projects\\Drone Project\\unreal\\IndoorDroneSim\\AutoVrtlEnv\\AutoVrtlEnv.uproject\n\n');
else
    fprintf('  Already exists, skipping.\n');
end

%% Step 2: Add Mux blocks and Sim 3D UAV Vehicle in Visualization Subsystem
fprintf('[2] Adding Sim 3D UAV Vehicle to Visualization Subsystem...\n');

uavBlockPath = [visSub '/Sim3D UAV Vehicle'];
if isempty(find_system(visSub, 'SearchDepth', 1, 'Name', 'Sim3D UAV Vehicle'))
    % Add Simulation 3D UAV Vehicle block
    try
        add_block('sim3dlib/Sensors and Actors/Simulation 3D UAV Vehicle', uavBlockPath);
    catch
        try
            add_block('uavorbitlib/Simulation 3D UAV Vehicle', uavBlockPath);
        catch
            try
                % Find it by searching loaded libraries
                libs = find_system('SearchDepth', 0, 'Type', 'block_diagram', 'BlockDiagramType', 'library');
                found = false;
                for k = 1:length(libs)
                    results = find_system(libs{k}, 'Name', 'Simulation 3D UAV Vehicle');
                    if ~isempty(results)
                        add_block(results{1}, uavBlockPath);
                        found = true;
                        break;
                    end
                end
                if ~found
                    error('Block not found in any loaded library.');
                end
            catch ME
                fprintf('  ERROR: Could not add Simulation 3D UAV Vehicle automatically.\n');
                fprintf('  Please add it manually from Library Browser (search "Simulation 3D UAV Vehicle").\n');
                fprintf('  Error: %s\n', ME.message);
            end
        end
    end
    set_param(uavBlockPath, 'Position', [600 50 800 150]);
    fprintf('  Added Simulation 3D UAV Vehicle.\n');
else
    fprintf('  Already exists, skipping.\n');
end

%% Step 3: Add Mux blocks to combine signals into vectors
fprintf('[3] Adding Mux blocks for position and attitude...\n');

% Mux for position [X, Y, Z]
posMuxPath = [visSub '/Pos Mux'];
if isempty(find_system(visSub, 'SearchDepth', 1, 'Name', 'Pos Mux'))
    add_block('simulink/Signal Routing/Mux', posMuxPath);
    set_param(posMuxPath, 'Inputs', '3');
    set_param(posMuxPath, 'Position', [450 55 455 95]);
    fprintf('  Added Position Mux (3 inputs: X, Y, Z).\n');
end

% Mux for attitude [Roll, Pitch, Yaw] — note reorder from yaw,pitch,roll
attMuxPath = [visSub '/Att Mux'];
if isempty(find_system(visSub, 'SearchDepth', 1, 'Name', 'Att Mux'))
    add_block('simulink/Signal Routing/Mux', attMuxPath);
    set_param(attMuxPath, 'Inputs', '3');
    set_param(attMuxPath, 'Position', [450 105 455 145]);
    fprintf('  Added Attitude Mux (3 inputs: Roll, Pitch, Yaw).\n');
end

%% Step 4: Display wiring instructions
fprintf('\n=== MANUAL WIRING REQUIRED ===\n\n');
fprintf('Open the Visualization Subsystem and wire:\n\n');
fprintf('POSITION (Translation input):\n');
fprintf('  Bus Selector output "X" ──→ Pos Mux input 1\n');
fprintf('  Bus Selector output "Y" ──→ Pos Mux input 2\n');
fprintf('  Bus Selector output "Z" ──→ Pos Mux input 3\n');
fprintf('  Pos Mux output          ──→ Sim3D UAV Vehicle "Translation" input\n\n');
fprintf('ATTITUDE (Rotation input):\n');
fprintf('  Bus Selector1 output "roll"  ──→ Att Mux input 1\n');
fprintf('  Bus Selector1 output "pitch" ──→ Att Mux input 2\n');
fprintf('  Bus Selector1 output "yaw"   ──→ Att Mux input 3\n');
fprintf('  Att Mux output               ──→ Sim3D UAV Vehicle "Rotation" input\n\n');
fprintf('NOTE: The existing UAV Animation block can stay — both visualizers\n');
fprintf('      can run simultaneously (UAV Animation + Unreal Engine).\n\n');
fprintf('After wiring, SAVE the model: Ctrl+S\n\n');
fprintf('=== Done ===\n');
