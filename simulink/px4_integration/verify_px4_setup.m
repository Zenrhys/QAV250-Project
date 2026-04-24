%% Verify PX4-Simulink Integration Setup
%  Run this script after completing the Hardware Setup wizard to verify
%  that all components are properly configured for PX4 Host Target SIH.
%
%  Usage: verify_px4_setup (from MATLAB command window)

fprintf('\n==========================================\n');
fprintf(' PX4-Simulink Integration Verification\n');
fprintf('==========================================\n\n');

passed = 0;
failed = 0;
warnings = 0;

%% 1. Check MATLAB version
fprintf('[1] MATLAB Version: ');
v = ver('matlab');
if str2double(v.Version(1:4)) >= 24.2  % R2025b is version 24.2.x
    fprintf('OK (%s - %s)\n', v.Version, v.Release);
    passed = passed + 1;
else
    fprintf('WARNING - R2025b recommended, found %s\n', v.Release);
    warnings = warnings + 1;
end

%% 2. Check UAV Toolbox
fprintf('[2] UAV Toolbox: ');
v = ver('uav');
if ~isempty(v)
    fprintf('OK (v%s)\n', v.Version);
    passed = passed + 1;
else
    fprintf('FAIL - Not installed\n');
    fprintf('    Install via: Add-Ons > Get Hardware Support Packages\n');
    failed = failed + 1;
end

%% 3. Check Aerospace Blockset
fprintf('[3] Aerospace Blockset: ');
v = ver('aeroblks');
if ~isempty(v)
    fprintf('OK (v%s)\n', v.Version);
    passed = passed + 1;
else
    fprintf('FAIL - Not installed\n');
    failed = failed + 1;
end

%% 4. Check Simulink
fprintf('[4] Simulink: ');
v = ver('simulink');
if ~isempty(v)
    fprintf('OK (v%s)\n', v.Version);
    passed = passed + 1;
else
    fprintf('FAIL - Not installed\n');
    failed = failed + 1;
end

%% 5. Check Simulink Coder
fprintf('[5] Simulink Coder: ');
v = ver('simulinkcoder');
if ~isempty(v)
    fprintf('OK (v%s)\n', v.Version);
    passed = passed + 1;
else
    fprintf('FAIL - Not installed (needed for code generation)\n');
    failed = failed + 1;
end

%% 6. Check Embedded Coder
fprintf('[6] Embedded Coder: ');
v = ver('embeddedcoder');
if ~isempty(v)
    fprintf('OK (v%s)\n', v.Version);
    passed = passed + 1;
else
    fprintf('WARNING - Not installed (needed for Pixhawk deploy, not SIH)\n');
    warnings = warnings + 1;
end

%% 7. Check Simulink Control Design (for PID autotuner later)
fprintf('[7] Simulink Control Design: ');
v = ver('slcontrol');
if ~isempty(v)
    fprintf('OK (v%s)\n', v.Version);
    passed = passed + 1;
else
    fprintf('WARNING - Not installed (needed for Phase 4 PID autotuner)\n');
    warnings = warnings + 1;
end

%% 8. Check WSL2 availability
fprintf('[8] WSL2: ');
try
    [status, result] = system('wsl --status 2>&1');
    if status == 0 || contains(result, 'Default Distribution')
        fprintf('OK\n');
        passed = passed + 1;
    else
        fprintf('WARNING - WSL2 may not be properly configured\n');
        fprintf('    Run: wsl --install (in admin PowerShell)\n');
        warnings = warnings + 1;
    end
catch
    fprintf('FAIL - Cannot execute wsl command\n');
    failed = failed + 1;
end

%% 9. Check PX4 source in WSL
fprintf('[9] PX4 Source (v1.14.3): ');
try
    [status, result] = system('wsl bash -c "test -d ~/PX4-Autopilot && echo exists || echo missing" 2>&1');
    result = strtrim(result);
    if contains(result, 'exists')
        fprintf('OK (found ~/PX4-Autopilot in WSL)\n');
        passed = passed + 1;
        
        % Check version
        [~, ver_result] = system('wsl bash -c "cd ~/PX4-Autopilot && git describe --tags 2>/dev/null" 2>&1');
        ver_result = strtrim(ver_result);
        if ~isempty(ver_result)
            fprintf('    Version: %s\n', ver_result);
        end
    else
        fprintf('NOT FOUND\n');
        fprintf('    Run in WSL:\n');
        fprintf('      cd ~\n');
        fprintf('      git clone https://github.com/PX4/PX4-Autopilot.git --recursive\n');
        fprintf('      cd PX4-Autopilot && git checkout v1.14.3 -f\n');
        fprintf('      git submodule update --init --recursive\n');
        failed = failed + 1;
    end
catch
    fprintf('SKIP - Cannot check (WSL not available)\n');
    warnings = warnings + 1;
end

%% 10. Check PX4 toolchain in WSL
fprintf('[10] PX4 Toolchain (SITL): ');
try
    % For Host Target / SITL, we only need native gcc (not the ARM cross-compiler)
    [~, result_gcc] = system('wsl bash -c "which gcc 2>/dev/null && echo found || echo missing" 2>&1');
    [~, result_cmake] = system('wsl bash -c "which cmake 2>/dev/null && echo found || echo missing" 2>&1');
    if contains(result_gcc, 'found') && contains(result_cmake, 'found')
        fprintf('OK (gcc + cmake found)\n');
        passed = passed + 1;
    else
        fprintf('NOT FOUND\n');
        fprintf('    Run in WSL:\n');
        fprintf('      cd ~/PX4-Autopilot/Tools/setup\n');
        fprintf('      bash ./ubuntu.sh\n');
        failed = failed + 1;
    end
    
    % Also check ARM cross-compiler (needed later for Pixhawk deploy)
    [~, result_arm] = system('wsl bash -c "which arm-none-eabi-gcc 2>/dev/null && echo found || echo missing" 2>&1');
    if contains(result_arm, 'found')
        fprintf('    ARM cross-compiler: OK (ready for Pixhawk deploy)\n');
    else
        fprintf('    ARM cross-compiler: not installed (needed later for Pixhawk deploy)\n');
        warnings = warnings + 1;
    end
catch
    fprintf('SKIP - Cannot check (WSL not available)\n');
    warnings = warnings + 1;
end

%% 11. Check Python
fprintf('[11] Python: ');
try
    [status, result] = system('python --version 2>&1');
    if status == 0
        fprintf('OK (%s)\n', strtrim(result));
        passed = passed + 1;
    else
        [status2, result2] = system('python3 --version 2>&1');
        if status2 == 0
            fprintf('OK (%s)\n', strtrim(result2));
            passed = passed + 1;
        else
            fprintf('NOT FOUND\n');
            fprintf('    Install Python 3.8.2 from python.org\n');
            failed = failed + 1;
        end
    end
catch
    fprintf('FAIL\n');
    failed = failed + 1;
end

%% Summary
fprintf('\n------------------------------------------\n');
fprintf(' Results: %d passed, %d failed, %d warnings\n', passed, failed, warnings);
fprintf('------------------------------------------\n');

if failed == 0
    fprintf(' ✓ All critical checks passed!\n');
    fprintf('   You can proceed to run the PX4 Host Target example.\n');
else
    fprintf(' ✗ %d critical check(s) failed.\n', failed);
    fprintf('   Fix the issues above before proceeding.\n');
end

if warnings > 0
    fprintf(' ⚠ %d warning(s) — non-blocking but should be resolved.\n', warnings);
end
fprintf('\n');
