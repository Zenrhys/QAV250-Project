//
// Academic License - for use in teaching, academic research, and meeting
// course requirements at degree granting institutions only.  Not for
// government, commercial, or other organizational use.
//
// File: Quadcopter_Controller_data.cpp
//
// Code generated for Simulink model 'Quadcopter_Controller'.
//
// Model version                  : 5.0
// Simulink Coder version         : 25.2 (R2025b) 28-Jul-2025
// C/C++ source code generated on : Mon May  4 12:54:32 2026
//
// Target selection: ert.tlc
// Embedded hardware selection: ARM Compatible->ARM Cortex
// Code generation objectives: Unspecified
// Validation result: Not run
//
#include "Quadcopter_Controller.h"

// Block parameters (default storage)
P_Quadcopter_Controller_T Quadcopter_Controller_P = {
  // Mask Parameter: PID_Altitude_D
  //  Referenced by: '<S213>/Derivative Gain'

  0.01,

  // Mask Parameter: PID_vz_D
  //  Referenced by: '<S369>/Derivative Gain'

  0.05,

  // Mask Parameter: PID_x_D
  //  Referenced by: '<S423>/Derivative Gain'

  0.0,

  // Mask Parameter: PID_y_D
  //  Referenced by: '<S477>/Derivative Gain'

  0.0,

  // Mask Parameter: PID_vx_D
  //  Referenced by: '<S265>/Derivative Gain'

  0.0,

  // Mask Parameter: PID_pitch_D
  //  Referenced by: '<S46>/Derivative Gain'

  0.0145948093220339,

  // Mask Parameter: PID_vy_D
  //  Referenced by: '<S317>/Derivative Gain'

  0.0,

  // Mask Parameter: PID_roll_D
  //  Referenced by: '<S98>/Derivative Gain'

  0.015,

  // Mask Parameter: PID_yaw_D
  //  Referenced by: '<S152>/Derivative Gain'

  0.075,

  // Mask Parameter: PID_Altitude_I
  //  Referenced by: '<S217>/Integral Gain'

  0.01,

  // Mask Parameter: PID_vz_I
  //  Referenced by: '<S373>/Integral Gain'

  0.1,

  // Mask Parameter: PID_pitch_I
  //  Referenced by: '<S50>/Integral Gain'

  0.005,

  // Mask Parameter: PID_roll_I
  //  Referenced by: '<S102>/Integral Gain'

  0.005,

  // Mask Parameter: PID_yaw_I
  //  Referenced by: '<S156>/Integral Gain'

  0.0001,

  // Mask Parameter: PID_vx_I
  //  Referenced by: '<S269>/Integral Gain'

  0.01,

  // Mask Parameter: PID_vy_I
  //  Referenced by: '<S321>/Integral Gain'

  0.01,

  // Mask Parameter: PID_x_I
  //  Referenced by: '<S427>/Integral Gain'

  0.0,

  // Mask Parameter: PID_y_I
  //  Referenced by: '<S481>/Integral Gain'

  0.0,

  // Mask Parameter: PID_Altitude_InitialConditionFo
  //  Referenced by: '<S215>/Filter'

  0.0,

  // Mask Parameter: PID_vz_InitialConditionForFilte
  //  Referenced by: '<S371>/Filter'

  0.0,

  // Mask Parameter: PID_x_InitialConditionForFilter
  //  Referenced by: '<S425>/Filter'

  0.0,

  // Mask Parameter: PID_y_InitialConditionForFilter
  //  Referenced by: '<S479>/Filter'

  0.0,

  // Mask Parameter: PID_vx_InitialConditionForFilte
  //  Referenced by: '<S267>/Filter'

  0.0,

  // Mask Parameter: PID_pitch_InitialConditionForFi
  //  Referenced by: '<S48>/Filter'

  0.0,

  // Mask Parameter: PID_vy_InitialConditionForFilte
  //  Referenced by: '<S319>/Filter'

  0.0,

  // Mask Parameter: PID_roll_InitialConditionForFil
  //  Referenced by: '<S100>/Filter'

  0.0,

  // Mask Parameter: PID_yaw_InitialConditionForFilt
  //  Referenced by: '<S154>/Filter'

  0.0,

  // Mask Parameter: PID_Altitude_InitialCondition_j
  //  Referenced by: '<S220>/Integrator'

  0.0,

  // Mask Parameter: PID_vz_InitialConditionForInteg
  //  Referenced by: '<S376>/Integrator'

  0.0,

  // Mask Parameter: PID_x_InitialConditionForIntegr
  //  Referenced by: '<S430>/Integrator'

  0.0,

  // Mask Parameter: PID_y_InitialConditionForIntegr
  //  Referenced by: '<S484>/Integrator'

  0.0,

  // Mask Parameter: PID_vx_InitialConditionForInteg
  //  Referenced by: '<S272>/Integrator'

  0.0,

  // Mask Parameter: PID_pitch_InitialConditionForIn
  //  Referenced by: '<S53>/Integrator'

  0.0,

  // Mask Parameter: PID_vy_InitialConditionForInteg
  //  Referenced by: '<S324>/Integrator'

  0.0,

  // Mask Parameter: PID_roll_InitialConditionForInt
  //  Referenced by: '<S105>/Integrator'

  0.0,

  // Mask Parameter: PID_yaw_InitialConditionForInte
  //  Referenced by: '<S159>/Integrator'

  0.0,

  // Mask Parameter: PID_Altitude_LowerSaturationLim
  //  Referenced by:
  //    '<S227>/Saturation'
  //    '<S212>/DeadZone'

  -10.0,

  // Mask Parameter: PID_vz_LowerSaturationLimit
  //  Referenced by: '<S383>/Saturation'

  0.0,

  // Mask Parameter: PID_x_LowerSaturationLimit
  //  Referenced by:
  //    '<S437>/Saturation'
  //    '<S422>/DeadZone'

  -20.0,

  // Mask Parameter: PID_y_LowerSaturationLimit
  //  Referenced by:
  //    '<S491>/Saturation'
  //    '<S476>/DeadZone'

  -20.0,

  // Mask Parameter: PID_vx_LowerSaturationLimit
  //  Referenced by: '<S279>/Saturation'

  -50.0,

  // Mask Parameter: PID_pitch_LowerSaturationLimit
  //  Referenced by: '<S60>/Saturation'

  -0.05,

  // Mask Parameter: PID_vy_LowerSaturationLimit
  //  Referenced by: '<S331>/Saturation'

  -50.0,

  // Mask Parameter: PID_roll_LowerSaturationLimit
  //  Referenced by: '<S112>/Saturation'

  -0.05,

  // Mask Parameter: PID_yaw_LowerSaturationLimit
  //  Referenced by:
  //    '<S166>/Saturation'
  //    '<S151>/DeadZone'

  -0.01,

  // Mask Parameter: PID_Altitude_N
  //  Referenced by: '<S223>/Filter Coefficient'

  10.0,

  // Mask Parameter: PID_vz_N
  //  Referenced by: '<S379>/Filter Coefficient'

  10.0,

  // Mask Parameter: PID_x_N
  //  Referenced by: '<S433>/Filter Coefficient'

  1.0,

  // Mask Parameter: PID_y_N
  //  Referenced by: '<S487>/Filter Coefficient'

  1.0,

  // Mask Parameter: PID_vx_N
  //  Referenced by: '<S275>/Filter Coefficient'

  1.0,

  // Mask Parameter: PID_pitch_N
  //  Referenced by: '<S56>/Filter Coefficient'

  50.0,

  // Mask Parameter: PID_vy_N
  //  Referenced by: '<S327>/Filter Coefficient'

  1.0,

  // Mask Parameter: PID_roll_N
  //  Referenced by: '<S108>/Filter Coefficient'

  100.0,

  // Mask Parameter: PID_yaw_N
  //  Referenced by: '<S162>/Filter Coefficient'

  10.0,

  // Mask Parameter: PID_Altitude_P
  //  Referenced by: '<S225>/Proportional Gain'

  2.3,

  // Mask Parameter: PID_vz_P
  //  Referenced by: '<S381>/Proportional Gain'

  0.5,

  // Mask Parameter: PID_x_P
  //  Referenced by: '<S435>/Proportional Gain'

  0.85800438596491224,

  // Mask Parameter: PID_y_P
  //  Referenced by: '<S489>/Proportional Gain'

  0.85,

  // Mask Parameter: PID_vx_P
  //  Referenced by: '<S277>/Proportional Gain'

  4.0,

  // Mask Parameter: PID_pitch_P
  //  Referenced by: '<S58>/Proportional Gain'

  0.027,

  // Mask Parameter: PID_vy_P
  //  Referenced by: '<S329>/Proportional Gain'

  4.0,

  // Mask Parameter: PID_roll_P
  //  Referenced by: '<S110>/Proportional Gain'

  0.03,

  // Mask Parameter: PID_yaw_P
  //  Referenced by: '<S164>/Proportional Gain'

  0.005,

  // Mask Parameter: PID_Altitude_UpperSaturationLim
  //  Referenced by:
  //    '<S227>/Saturation'
  //    '<S212>/DeadZone'

  10.0,

  // Mask Parameter: PID_vz_UpperSaturationLimit
  //  Referenced by: '<S383>/Saturation'

  1.0,

  // Mask Parameter: PID_x_UpperSaturationLimit
  //  Referenced by:
  //    '<S437>/Saturation'
  //    '<S422>/DeadZone'

  20.0,

  // Mask Parameter: PID_y_UpperSaturationLimit
  //  Referenced by:
  //    '<S491>/Saturation'
  //    '<S476>/DeadZone'

  20.0,

  // Mask Parameter: PID_vx_UpperSaturationLimit
  //  Referenced by: '<S279>/Saturation'

  50.0,

  // Mask Parameter: PID_pitch_UpperSaturationLimit
  //  Referenced by: '<S60>/Saturation'

  0.05,

  // Mask Parameter: PID_vy_UpperSaturationLimit
  //  Referenced by: '<S331>/Saturation'

  50.0,

  // Mask Parameter: PID_roll_UpperSaturationLimit
  //  Referenced by: '<S112>/Saturation'

  0.05,

  // Mask Parameter: PID_yaw_UpperSaturationLimit
  //  Referenced by:
  //    '<S166>/Saturation'
  //    '<S151>/DeadZone'

  0.01,

  // Mask Parameter: DCM2Ang_tolerance
  //  Referenced by:
  //    '<S532>/Constant'
  //    '<S534>/Constant'

  4.4408920985006262E-16,

  // Mask Parameter: DCM2Ang_action
  //  Referenced by:
  //    '<S511>/Constant'
  //    '<S521>/Constant'
  //    '<S523>/Constant'

  1U,

  // Computed Parameter: Out1_Y0
  //  Referenced by: '<S6>/Out1'

  {
    (0ULL),                            // timestamp
    (0ULL),                            // timestamp_sample
    (0ULL),                            // ref_timestamp
    0.0,                               // ref_lat
    0.0,                               // ref_lon
    0.0F,                              // x
    0.0F,                              // y
    0.0F,                              // z

    {
      0.0F, 0.0F }
    ,                                  // delta_xy
    0.0F,                              // delta_z
    0.0F,                              // vx
    0.0F,                              // vy
    0.0F,                              // vz
    0.0F,                              // z_deriv

    {
      0.0F, 0.0F }
    ,                                  // delta_vxy
    0.0F,                              // delta_vz
    0.0F,                              // ax
    0.0F,                              // ay
    0.0F,                              // az
    0.0F,                              // heading
    0.0F,                              // delta_heading
    0.0F,                              // ref_alt
    0.0F,                              // dist_bottom
    0.0F,                              // eph
    0.0F,                              // epv
    0.0F,                              // evh
    0.0F,                              // evv
    0.0F,                              // vxy_max
    0.0F,                              // vz_max
    0.0F,                              // hagl_min
    0.0F,                              // hagl_max
    false,                             // xy_valid
    false,                             // z_valid
    false,                             // v_xy_valid
    false,                             // v_z_valid
    0U,                                // xy_reset_counter
    0U,                                // z_reset_counter
    0U,                                // vxy_reset_counter
    0U,                                // vz_reset_counter
    0U,                                // heading_reset_counter
    false,                             // heading_good_for_control
    false,                             // xy_global
    false,                             // z_global
    false,                             // dist_bottom_valid
    0U,                                // dist_bottom_sensor_bitfield
    false,                             // dead_reckoning
    0U                                 // _padding0
  },

  // Computed Parameter: Constant_Value
  //  Referenced by: '<S3>/Constant'

  {
    (0ULL),                            // timestamp
    (0ULL),                            // timestamp_sample
    (0ULL),                            // ref_timestamp
    0.0,                               // ref_lat
    0.0,                               // ref_lon
    0.0F,                              // x
    0.0F,                              // y
    0.0F,                              // z

    {
      0.0F, 0.0F }
    ,                                  // delta_xy
    0.0F,                              // delta_z
    0.0F,                              // vx
    0.0F,                              // vy
    0.0F,                              // vz
    0.0F,                              // z_deriv

    {
      0.0F, 0.0F }
    ,                                  // delta_vxy
    0.0F,                              // delta_vz
    0.0F,                              // ax
    0.0F,                              // ay
    0.0F,                              // az
    0.0F,                              // heading
    0.0F,                              // delta_heading
    0.0F,                              // ref_alt
    0.0F,                              // dist_bottom
    0.0F,                              // eph
    0.0F,                              // epv
    0.0F,                              // evh
    0.0F,                              // evv
    0.0F,                              // vxy_max
    0.0F,                              // vz_max
    0.0F,                              // hagl_min
    0.0F,                              // hagl_max
    false,                             // xy_valid
    false,                             // z_valid
    false,                             // v_xy_valid
    false,                             // v_z_valid
    0U,                                // xy_reset_counter
    0U,                                // z_reset_counter
    0U,                                // vxy_reset_counter
    0U,                                // vz_reset_counter
    0U,                                // heading_reset_counter
    false,                             // heading_good_for_control
    false,                             // xy_global
    false,                             // z_global
    false,                             // dist_bottom_valid
    0U,                                // dist_bottom_sensor_bitfield
    false,                             // dead_reckoning
    0U                                 // _padding0
  },

  // Computed Parameter: Out1_Y0_o
  //  Referenced by: '<S5>/Out1'

  {
    (0ULL),                            // timestamp
    (0ULL),                            // timestamp_sample

    {
      0.0F, 0.0F, 0.0F, 0.0F }
    ,                                  // q

    {
      0.0F, 0.0F, 0.0F, 0.0F }
    ,                                  // delta_q_reset
    0U,                                // quat_reset_counter

    {
      0U, 0U, 0U, 0U, 0U, 0U, 0U }
    // _padding0
  },

  // Computed Parameter: Constant_Value_n
  //  Referenced by: '<S2>/Constant'

  {
    (0ULL),                            // timestamp
    (0ULL),                            // timestamp_sample

    {
      0.0F, 0.0F, 0.0F, 0.0F }
    ,                                  // q

    {
      0.0F, 0.0F, 0.0F, 0.0F }
    ,                                  // delta_q_reset
    0U,                                // quat_reset_counter

    {
      0U, 0U, 0U, 0U, 0U, 0U, 0U }
    // _padding0
  },

  // Expression: 1
  //  Referenced by: '<S517>/Constant'

  1.0,

  // Expression: 1
  //  Referenced by: '<S518>/Constant'

  1.0,

  // Expression: 1
  //  Referenced by: '<S513>/Constant'

  1.0,

  // Expression: 1
  //  Referenced by: '<S514>/Constant'

  1.0,

  // Expression: 0
  //  Referenced by: '<S523>/Constant1'

  0.0,

  // Expression: 0
  //  Referenced by: '<S521>/Constant1'

  0.0,

  // Expression: -eye(3)
  //  Referenced by: '<S524>/Bias1'

  { -1.0, -0.0, -0.0, -0.0, -1.0, -0.0, -0.0, -0.0, -1.0 },

  // Expression: -1
  //  Referenced by: '<S525>/Bias'

  -1.0,

  // Expression: 0
  //  Referenced by: '<S149>/Constant1'

  0.0,

  // Expression: 0
  //  Referenced by: '<S210>/Constant1'

  0.0,

  // Expression: 0
  //  Referenced by: '<S420>/Constant1'

  0.0,

  // Expression: 0
  //  Referenced by: '<S474>/Constant1'

  0.0,

  // Expression: [1 -1 1 1;1 1 -1 1;1 -1 -1 -1;1 1 1 -1]
  //  Referenced by: '<S12>/Mixer matrix'

  { 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0,
    -1.0, -1.0 },

  // Expression: 5.003813882532419
  //  Referenced by: '<S1>/des_alt'

  5.0038138825324188,

  // Expression: -1
  //  Referenced by: '<S1>/Gain'

  -1.0,

  // Expression: 0
  //  Referenced by: '<S210>/Clamping_zero'

  0.0,

  // Computed Parameter: Filter_gainval
  //  Referenced by: '<S215>/Filter'

  0.01,

  // Computed Parameter: Integrator_gainval
  //  Referenced by: '<S220>/Integrator'

  0.01,

  // Computed Parameter: Integrator_gainval_l
  //  Referenced by: '<S376>/Integrator'

  0.01,

  // Computed Parameter: Filter_gainval_d
  //  Referenced by: '<S371>/Filter'

  0.01,

  // Expression: 2
  //  Referenced by: '<S538>/Gain'

  2.0,

  // Expression: 2
  //  Referenced by: '<S541>/Gain'

  2.0,

  // Expression: 2
  //  Referenced by: '<S536>/Gain'

  2.0,

  // Expression: 2
  //  Referenced by: '<S542>/Gain'

  2.0,

  // Expression: 2
  //  Referenced by: '<S537>/Gain'

  2.0,

  // Expression: 2
  //  Referenced by: '<S540>/Gain'

  2.0,

  // Expression: [1 1 -1]
  //  Referenced by: '<S510>/Gain1'

  { 1.0, 1.0, -1.0 },

  // Expression: [1 1]
  //  Referenced by: '<S510>/Gain2'

  { 1.0, 1.0 },

  // Expression: [-1 1]
  //  Referenced by: '<S510>/Gain3'

  { -1.0, 1.0 },

  // Expression: 1
  //  Referenced by: '<S1>/x+'

  1.0,

  // Expression: 0
  //  Referenced by: '<S1>/x+'

  0.0,

  // Expression: 2*pi*.125
  //  Referenced by: '<S1>/x+'

  0.78539816339744828,

  // Expression: -pi/2
  //  Referenced by: '<S1>/x+'

  -1.5707963267948966,

  // Computed Parameter: x_Hsin
  //  Referenced by: '<S1>/x+'

  0.0078539008887113342,

  // Computed Parameter: x_HCos
  //  Referenced by: '<S1>/x+'

  0.99996915764478966,

  // Computed Parameter: x_PSin
  //  Referenced by: '<S1>/x+'

  -0.99996915764478966,

  // Computed Parameter: x_PCos
  //  Referenced by: '<S1>/x+'

  -0.0078539008887112283,

  // Expression: 1
  //  Referenced by: '<S1>/X_SwitchOn_Sine Wave'

  1.0,

  // Expression: 0
  //  Referenced by: '<S1>/des_x'

  0.0,

  // Expression: 0
  //  Referenced by: '<S1>/Switch'

  0.0,

  // Computed Parameter: Integrator_gainval_lq
  //  Referenced by: '<S430>/Integrator'

  0.01,

  // Computed Parameter: Filter_gainval_p
  //  Referenced by: '<S425>/Filter'

  0.01,

  // Expression: 1
  //  Referenced by: '<S1>/y+'

  1.0,

  // Expression: 0
  //  Referenced by: '<S1>/y+'

  0.0,

  // Expression: 2*pi*.125
  //  Referenced by: '<S1>/y+'

  0.78539816339744828,

  // Expression: 0
  //  Referenced by: '<S1>/y+'

  0.0,

  // Computed Parameter: y_Hsin
  //  Referenced by: '<S1>/y+'

  0.0078539008887113342,

  // Computed Parameter: y_HCos
  //  Referenced by: '<S1>/y+'

  0.99996915764478966,

  // Computed Parameter: y_PSin
  //  Referenced by: '<S1>/y+'

  -0.0078539008887113342,

  // Computed Parameter: y_PCos
  //  Referenced by: '<S1>/y+'

  0.99996915764478966,

  // Expression: 0
  //  Referenced by: '<S1>/des_y'

  0.0,

  // Expression: 0
  //  Referenced by: '<S1>/Switch1'

  0.0,

  // Computed Parameter: Integrator_gainval_d
  //  Referenced by: '<S484>/Integrator'

  0.01,

  // Computed Parameter: Filter_gainval_b
  //  Referenced by: '<S479>/Filter'

  0.01,

  // Computed Parameter: Integrator_gainval_e
  //  Referenced by: '<S272>/Integrator'

  0.01,

  // Computed Parameter: Filter_gainval_n
  //  Referenced by: '<S267>/Filter'

  0.01,

  // Expression: pi/180
  //  Referenced by: '<S14>/Gain1'

  0.017453292519943295,

  // Computed Parameter: Integrator_gainval_ld
  //  Referenced by: '<S53>/Integrator'

  0.01,

  // Computed Parameter: Filter_gainval_k
  //  Referenced by: '<S48>/Filter'

  0.01,

  // Computed Parameter: Integrator_gainval_o
  //  Referenced by: '<S324>/Integrator'

  0.01,

  // Computed Parameter: Filter_gainval_l
  //  Referenced by: '<S319>/Filter'

  0.01,

  // Expression: -1
  //  Referenced by: '<S11>/Gain'

  -1.0,

  // Expression: pi/180
  //  Referenced by: '<S15>/Gain1'

  0.017453292519943295,

  // Computed Parameter: Integrator_gainval_e1
  //  Referenced by: '<S105>/Integrator'

  0.01,

  // Computed Parameter: Filter_gainval_j
  //  Referenced by: '<S100>/Filter'

  0.01,

  // Expression: 0
  //  Referenced by: '<S1>/des_yaw'

  0.0,

  // Expression: pi/180
  //  Referenced by: '<S13>/Gain1'

  0.017453292519943295,

  // Expression: 0
  //  Referenced by: '<S149>/Clamping_zero'

  0.0,

  // Computed Parameter: Filter_gainval_i
  //  Referenced by: '<S154>/Filter'

  0.01,

  // Computed Parameter: Integrator_gainval_b
  //  Referenced by: '<S159>/Integrator'

  0.01,

  // Expression: 1
  //  Referenced by: '<S12>/Saturation'

  1.0,

  // Expression: 0
  //  Referenced by: '<S12>/Saturation'

  0.0,

  // Expression: 1000
  //  Referenced by: '<S8>/Gain'

  1000.0,

  // Expression: 1000
  //  Referenced by: '<S8>/Constant'

  1000.0,

  // Expression: 0
  //  Referenced by: '<S420>/Clamping_zero'

  0.0,

  // Expression: 0
  //  Referenced by: '<S474>/Clamping_zero'

  0.0,

  // Computed Parameter: Assertion_Enabled
  //  Referenced by: '<S531>/Assertion'

  true,

  // Computed Parameter: Assertion_Enabled_e
  //  Referenced by: '<S529>/Assertion'

  true,

  // Computed Parameter: Assertion_Enabled_l
  //  Referenced by: '<S528>/Assertion'

  true,

  // Computed Parameter: Assertion_Enabled_c
  //  Referenced by: '<S526>/Assertion'

  true,

  // Computed Parameter: Constant_Value_a
  //  Referenced by: '<S4>/Constant'

  true,

  // Computed Parameter: Constant_Value_nq
  //  Referenced by: '<S149>/Constant'

  1,

  // Computed Parameter: Constant2_Value
  //  Referenced by: '<S149>/Constant2'

  -1,

  // Computed Parameter: Constant3_Value
  //  Referenced by: '<S149>/Constant3'

  1,

  // Computed Parameter: Constant4_Value
  //  Referenced by: '<S149>/Constant4'

  -1,

  // Computed Parameter: Constant_Value_m
  //  Referenced by: '<S210>/Constant'

  1,

  // Computed Parameter: Constant2_Value_c
  //  Referenced by: '<S210>/Constant2'

  -1,

  // Computed Parameter: Constant3_Value_e
  //  Referenced by: '<S210>/Constant3'

  1,

  // Computed Parameter: Constant4_Value_o
  //  Referenced by: '<S210>/Constant4'

  -1,

  // Computed Parameter: Constant_Value_b
  //  Referenced by: '<S420>/Constant'

  1,

  // Computed Parameter: Constant2_Value_j
  //  Referenced by: '<S420>/Constant2'

  -1,

  // Computed Parameter: Constant3_Value_c
  //  Referenced by: '<S420>/Constant3'

  1,

  // Computed Parameter: Constant4_Value_g
  //  Referenced by: '<S420>/Constant4'

  -1,

  // Computed Parameter: Constant_Value_b5
  //  Referenced by: '<S474>/Constant'

  1,

  // Computed Parameter: Constant2_Value_a
  //  Referenced by: '<S474>/Constant2'

  -1,

  // Computed Parameter: Constant3_Value_k
  //  Referenced by: '<S474>/Constant3'

  1,

  // Computed Parameter: Constant4_Value_k
  //  Referenced by: '<S474>/Constant4'

  -1
};

//
// File trailer for generated code.
//
// [EOF]
//
