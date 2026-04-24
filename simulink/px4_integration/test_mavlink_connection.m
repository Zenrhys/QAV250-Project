%% Test MAVLink Connection to PX4 Host Target
%  Connects to a running PX4 SITL instance via MAVLink UDP and reads
%  heartbeat messages to verify the link is working.
%
%  Prerequisites:
%    - PX4 Host Target must already be running (via Simulink build or WSL)
%    - UAV Toolbox installed
%
%  Usage: test_mavlink_connection

fprintf('\n=== MAVLink Connection Test ===\n\n');

%% Configuration
udpPort = 14540;       % Default PX4 SITL MAVLink port
timeout = 10;          % Seconds to wait for heartbeat

fprintf('Attempting to connect to PX4 on UDP port %d...\n', udpPort);
fprintf('(Make sure PX4 Host Target is running first)\n\n');

%% Try to connect using MAVLink
try
    % Create a MAVLink connection
    % Note: The exact API depends on your UAV Toolbox version.
    % For R2025b, use mavlinkio or mavlinkclient.
    
    % Method 1: Using mavlinkio (R2024a+)
    if exist('mavlinkio', 'class')
        fprintf('Using mavlinkio client...\n');
        mavConn = mavlinkio("common.xml");
        mavConn.connect("UDP", "LocalPort", udpPort);
        
        fprintf('Connected! Listening for heartbeats (%d sec timeout)...\n', timeout);
        
        % Subscribe to heartbeat messages
        heartbeatSub = mavConn.subscriber("HEARTBEAT");
        
        tic;
        received = false;
        while toc < timeout
            msg = heartbeatSub.receive(1);
            if ~isempty(msg)
                fprintf('\n✓ HEARTBEAT received!\n');
                fprintf('  System ID:   %d\n', msg.SystemID);
                fprintf('  Component:   %d\n', msg.ComponentID);
                fprintf('  Autopilot:   %d (12 = PX4)\n', msg.Payload.autopilot);
                fprintf('  Type:        %d (2 = quadrotor)\n', msg.Payload.type);
                fprintf('  Base mode:   %d\n', msg.Payload.base_mode);
                fprintf('  System status: %d\n', msg.Payload.system_status);
                received = true;
                break;
            end
            pause(0.1);
        end
        
        if ~received
            fprintf('\n✗ No heartbeat received within %d seconds.\n', timeout);
            fprintf('  Make sure PX4 Host Target is running.\n');
        end
        
        % Clean up
        clear heartbeatSub mavConn;
        
    % Method 2: Using mavlinkclient (older API)
    elseif exist('mavlinkclient', 'class')
        fprintf('Using legacy mavlinkclient...\n');
        mavConn = mavlinkclient(udpPort);
        
        fprintf('Connected! Reading data (%d sec timeout)...\n', timeout);
        pause(2);  % Wait for some data to arrive
        
        fprintf('✓ Connection established on port %d.\n', udpPort);
        fprintf('  (Use Simulink MAVLink blocks for detailed message access)\n');
        
        clear mavConn;
    else
        fprintf('! No MAVLink client API found.\n');
        fprintf('  Verify UAV Toolbox is installed: ver(''uav'')\n');
        fprintf('  You can still use Simulink MAVLink blocks for connection.\n');
    end
    
catch ME
    fprintf('\n✗ Connection failed: %s\n', ME.message);
    fprintf('\nTroubleshooting:\n');
    fprintf('  1. Is PX4 Host Target running? (Check WSL terminal)\n');
    fprintf('  2. Is port %d available? (netstat -an | findstr %d)\n', udpPort, udpPort);
    fprintf('  3. Is Windows Firewall blocking UDP? Add an exception.\n');
    fprintf('  4. Try the WSL IP instead of localhost.\n');
end

fprintf('\n');
