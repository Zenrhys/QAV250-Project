%% Check Required Toolboxes for QAV250 Drone Project
%  Run this script to verify that all needed MATLAB toolboxes and support
%  packages are installed for the capstone project.
%
%  Usage:  check_toolboxes   (from MATLAB command window)

fprintf('\n========================================\n');
fprintf(' QAV250 Project — Toolbox Checker\n');
fprintf(' MATLAB %s\n', version);
fprintf('========================================\n\n');

%% Required Toolboxes
required = {
    'Simulink',                          'simulink';
    'UAV Toolbox',                       'uav';
    'Aerospace Blockset',                'aeroblks';
    'Simulink Control Design',           'slcontrol';
    'Simulink Coder',                    'simulinkcoder';
    'Embedded Coder',                    'embeddedcoder';
    'Simulink 3D Animation',             'sl3d';
    'MATLAB Coder',                      'matlabcoder';
    'Control System Toolbox',            'control';
    'Aerospace Toolbox',                 'aero';
};

%% Optional (helpful) Toolboxes
optional = {
    'Navigation Toolbox',                'nav';
    'Robotics System Toolbox',           'robotics';
    'Computer Vision Toolbox',           'vision';
    'Image Processing Toolbox',          'images';
    'Signal Processing Toolbox',         'signal';
    'Sensor Fusion and Tracking Toolbox','fusion';
};

%% Check function
checkGroup('REQUIRED', required);
checkGroup('OPTIONAL', optional);

%% Support Packages (manual check — no reliable programmatic API)
fprintf('\n--- SUPPORT PACKAGES (verify manually in Add-On Explorer) ---\n');
fprintf('  [ ] UAV Toolbox Support Package for PX4 Autopilots\n');
fprintf('  [ ] UAV Toolbox Interface for Unreal Engine Projects\n');
fprintf('  [ ] Simulink Support Package for Raspberry Pi (if using RPi companion)\n');
fprintf('\nDone.\n\n');

%% ---------- Helper ----------
function checkGroup(label, tbl)
    fprintf('--- %s TOOLBOXES ---\n', label);
    allOk = true;
    for i = 1:size(tbl, 1)
        name = tbl{i, 1};
        id   = tbl{i, 2};
        v = ver(id);
        if ~isempty(v)
            fprintf('  [OK]   %-40s  v%s\n', name, v.Version);
        else
            fprintf('  [MISS] %-40s  ** NOT INSTALLED **\n', name);
            allOk = false;
        end
    end
    if allOk
        fprintf('  All %s toolboxes found.\n', lower(label));
    end
    fprintf('\n');
end
