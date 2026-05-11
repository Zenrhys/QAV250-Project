//
// Academic License - for use in teaching, academic research, and meeting
// course requirements at degree granting institutions only.  Not for
// government, commercial, or other organizational use.
//
// File: Quadcopter_Controller.h
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
#ifndef Quadcopter_Controller_h_
#define Quadcopter_Controller_h_
#include <poll.h>
#include <uORB/uORB.h>
#include "rtwtypes.h"
#include "rtw_extmode.h"
#include "sysran_types.h"
#include "MW_PX4_PWM.h"
#include "MW_uORB_Read.h"
#include "Quadcopter_Controller_types.h"
#include <uORB/topics/vehicle_local_position.h>
#include <uORB/topics/vehicle_attitude.h>

extern "C"
{

#include "rtGetNaN.h"

}

extern "C"
{

#include "rt_nonfinite.h"

}

#include <stddef.h>

// Macros for accessing real-time model data structure
#ifndef rtmGetFinalTime
#define rtmGetFinalTime(rtm)           ((rtm)->Timing.tFinal)
#endif

#ifndef rtmGetRTWExtModeInfo
#define rtmGetRTWExtModeInfo(rtm)      ((rtm)->extModeInfo)
#endif

#ifndef rtmGetErrorStatus
#define rtmGetErrorStatus(rtm)         ((rtm)->errorStatus)
#endif

#ifndef rtmSetErrorStatus
#define rtmSetErrorStatus(rtm, val)    ((rtm)->errorStatus = (val))
#endif

#ifndef rtmGetStopRequested
#define rtmGetStopRequested(rtm)       ((rtm)->Timing.stopRequestedFlag)
#endif

#ifndef rtmSetStopRequested
#define rtmSetStopRequested(rtm, val)  ((rtm)->Timing.stopRequestedFlag = (val))
#endif

#ifndef rtmGetStopRequestedPtr
#define rtmGetStopRequestedPtr(rtm)    (&((rtm)->Timing.stopRequestedFlag))
#endif

#ifndef rtmGetT
#define rtmGetT(rtm)                   ((rtm)->Timing.taskTime0)
#endif

#ifndef rtmGetTFinal
#define rtmGetTFinal(rtm)              ((rtm)->Timing.tFinal)
#endif

#ifndef rtmGetTPtr
#define rtmGetTPtr(rtm)                (&(rtm)->Timing.taskTime0)
#endif

// Block signals (default storage)
struct B_Quadcopter_Controller_T {
  px4_Bus_vehicle_local_position In1;  // '<S6>/In1'
  px4_Bus_vehicle_local_position r;
  real_T VectorConcatenate[9];         // '<S544>/Vector Concatenate'
  real_T rtb_VectorConcatenate_m[9];
  px4_Bus_vehicle_attitude In1_b;      // '<S5>/In1'
  px4_Bus_vehicle_attitude r1;
  real_T dv[4];
  uint16_T pwmValue[8];
  boolean_T Compare[9];                // '<S532>/Compare'
  real_T des_alt;                      // '<S1>/des_alt'
  real_T DataTypeConversion[3];        // '<S502>/Data Type Conversion'
  real_T x;                            // '<S1>/x+'
  real_T y;                            // '<S1>/y+'
  real_T DeadZone_n;                   // '<S422>/DeadZone'
  real_T Saturation_g;                 // '<S383>/Saturation'
  real_T FilterCoefficient;            // '<S223>/Filter Coefficient'
  real_T Filter_f;                     // '<S371>/Filter'
  real_T Filter_l;                     // '<S425>/Filter'
  real_T Integrator_l;                 // '<S430>/Integrator'
  real_T IntegralGain_j;               // '<S427>/Integral Gain'
  real_T FilterCoefficient_p;          // '<S487>/Filter Coefficient'
  real_T DeadZone;                     // '<S476>/DeadZone'
  real_T Saturation_e;                 // '<S60>/Saturation'
  real_T FilterCoefficient_db;         // '<S275>/Filter Coefficient'
  real_T Filter_o;                     // '<S100>/Filter'
  real_T FilterCoefficient_f;          // '<S327>/Filter Coefficient'
  real_T IntegralGain_o;               // '<S156>/Integral Gain'
  real_T Saturation_l;                 // '<S166>/Saturation'
  real_T DeadZone_l;                   // '<S151>/DeadZone'
  boolean_T NOT;                       // '<S2>/NOT'
  boolean_T NOT_n;                     // '<S3>/NOT'
};

// Block states (default storage) for system '<Root>'
struct DW_Quadcopter_Controller_T {
  px4_internal_block_Subscriber_T obj; // '<S3>/SourceBlock'
  px4_internal_block_Subscriber_T obj_m;// '<S2>/SourceBlock'
  px4_internal_block_PWM_Quadco_T obj_n;// '<Root>/PX4 PWM Output'
  real_T Filter_DSTATE;                // '<S215>/Filter'
  real_T Integrator_DSTATE;            // '<S220>/Integrator'
  real_T Integrator_DSTATE_k;          // '<S376>/Integrator'
  real_T Filter_DSTATE_b;              // '<S371>/Filter'
  real_T Integrator_DSTATE_b;          // '<S430>/Integrator'
  real_T Filter_DSTATE_f;              // '<S425>/Filter'
  real_T Integrator_DSTATE_j;          // '<S484>/Integrator'
  real_T Filter_DSTATE_j;              // '<S479>/Filter'
  real_T Integrator_DSTATE_f;          // '<S272>/Integrator'
  real_T Filter_DSTATE_o;              // '<S267>/Filter'
  real_T Integrator_DSTATE_o;          // '<S53>/Integrator'
  real_T Filter_DSTATE_ox;             // '<S48>/Filter'
  real_T Integrator_DSTATE_jo;         // '<S324>/Integrator'
  real_T Filter_DSTATE_oxe;            // '<S319>/Filter'
  real_T Integrator_DSTATE_m;          // '<S105>/Integrator'
  real_T Filter_DSTATE_d;              // '<S100>/Filter'
  real_T Filter_DSTATE_k;              // '<S154>/Filter'
  real_T Integrator_DSTATE_i;          // '<S159>/Integrator'
  real_T lastSin;                      // '<S1>/x+'
  real_T lastCos;                      // '<S1>/x+'
  real_T lastSin_k;                    // '<S1>/y+'
  real_T lastCos_e;                    // '<S1>/y+'
  int32_T systemEnable;                // '<S1>/x+'
  int32_T systemEnable_e;              // '<S1>/y+'
  int8_T IfWarningError_SubsysRanBC;   // '<S511>/If Warning//Error'
  int8_T ElseNoAction_SubsysRanBC;     // '<S520>/Else No Action'
  int8_T ElseIfNotOrthogonal_SubsysRanBC;// '<S520>/Else If Not Orthogonal'
  int8_T None_SubsysRanBC;             // '<S521>/None'
  int8_T Error_SubsysRanBC;            // '<S521>/Error'
  int8_T Warning_SubsysRanBC;          // '<S521>/Warning'
  int8_T IfNotProper_SubsysRanBC;      // '<S520>/If Not Proper'
  int8_T None_SubsysRanBC_a;           // '<S523>/None'
  int8_T Error_SubsysRanBC_f;          // '<S523>/Error'
  int8_T Warning_SubsysRanBC_f;        // '<S523>/Warning'
  int8_T AxisRotDefault_SubsysRanBC;   // '<S506>/AxisRotDefault'
  int8_T IfActionSubsystem2_SubsysRanBC;// '<S512>/If Action Subsystem2'
  int8_T IfActionSubsystem1_SubsysRanBC;// '<S512>/If Action Subsystem1'
  int8_T IfActionSubsystem_SubsysRanBC;// '<S512>/If Action Subsystem'
  int8_T AxisRotZeroR3_SubsysRanBC;    // '<S506>/AxisRotZeroR3'
  int8_T IfActionSubsystem2_SubsysRanB_g;// '<S516>/If Action Subsystem2'
  int8_T IfActionSubsystem1_SubsysRanB_j;// '<S516>/If Action Subsystem1'
  int8_T IfActionSubsystem_SubsysRanBC_g;// '<S516>/If Action Subsystem'
  int8_T EnabledSubsystem_SubsysRanBC; // '<S3>/Enabled Subsystem'
  int8_T EnabledSubsystem_SubsysRanBC_n;// '<S2>/Enabled Subsystem'
  boolean_T doneDoubleBufferReInit;    // '<S11>/Rotation mat '
};

// Parameters (default storage)
struct P_Quadcopter_Controller_T_ {
  real_T PID_Altitude_D;               // Mask Parameter: PID_Altitude_D
                                          //  Referenced by: '<S213>/Derivative Gain'

  real_T PID_vz_D;                     // Mask Parameter: PID_vz_D
                                          //  Referenced by: '<S369>/Derivative Gain'

  real_T PID_x_D;                      // Mask Parameter: PID_x_D
                                          //  Referenced by: '<S423>/Derivative Gain'

  real_T PID_y_D;                      // Mask Parameter: PID_y_D
                                          //  Referenced by: '<S477>/Derivative Gain'

  real_T PID_vx_D;                     // Mask Parameter: PID_vx_D
                                          //  Referenced by: '<S265>/Derivative Gain'

  real_T PID_pitch_D;                  // Mask Parameter: PID_pitch_D
                                          //  Referenced by: '<S46>/Derivative Gain'

  real_T PID_vy_D;                     // Mask Parameter: PID_vy_D
                                          //  Referenced by: '<S317>/Derivative Gain'

  real_T PID_roll_D;                   // Mask Parameter: PID_roll_D
                                          //  Referenced by: '<S98>/Derivative Gain'

  real_T PID_yaw_D;                    // Mask Parameter: PID_yaw_D
                                          //  Referenced by: '<S152>/Derivative Gain'

  real_T PID_Altitude_I;               // Mask Parameter: PID_Altitude_I
                                          //  Referenced by: '<S217>/Integral Gain'

  real_T PID_vz_I;                     // Mask Parameter: PID_vz_I
                                          //  Referenced by: '<S373>/Integral Gain'

  real_T PID_pitch_I;                  // Mask Parameter: PID_pitch_I
                                          //  Referenced by: '<S50>/Integral Gain'

  real_T PID_roll_I;                   // Mask Parameter: PID_roll_I
                                          //  Referenced by: '<S102>/Integral Gain'

  real_T PID_yaw_I;                    // Mask Parameter: PID_yaw_I
                                          //  Referenced by: '<S156>/Integral Gain'

  real_T PID_vx_I;                     // Mask Parameter: PID_vx_I
                                          //  Referenced by: '<S269>/Integral Gain'

  real_T PID_vy_I;                     // Mask Parameter: PID_vy_I
                                          //  Referenced by: '<S321>/Integral Gain'

  real_T PID_x_I;                      // Mask Parameter: PID_x_I
                                          //  Referenced by: '<S427>/Integral Gain'

  real_T PID_y_I;                      // Mask Parameter: PID_y_I
                                          //  Referenced by: '<S481>/Integral Gain'

  real_T PID_Altitude_InitialConditionFo;
                              // Mask Parameter: PID_Altitude_InitialConditionFo
                                 //  Referenced by: '<S215>/Filter'

  real_T PID_vz_InitialConditionForFilte;
                              // Mask Parameter: PID_vz_InitialConditionForFilte
                                 //  Referenced by: '<S371>/Filter'

  real_T PID_x_InitialConditionForFilter;
                              // Mask Parameter: PID_x_InitialConditionForFilter
                                 //  Referenced by: '<S425>/Filter'

  real_T PID_y_InitialConditionForFilter;
                              // Mask Parameter: PID_y_InitialConditionForFilter
                                 //  Referenced by: '<S479>/Filter'

  real_T PID_vx_InitialConditionForFilte;
                              // Mask Parameter: PID_vx_InitialConditionForFilte
                                 //  Referenced by: '<S267>/Filter'

  real_T PID_pitch_InitialConditionForFi;
                              // Mask Parameter: PID_pitch_InitialConditionForFi
                                 //  Referenced by: '<S48>/Filter'

  real_T PID_vy_InitialConditionForFilte;
                              // Mask Parameter: PID_vy_InitialConditionForFilte
                                 //  Referenced by: '<S319>/Filter'

  real_T PID_roll_InitialConditionForFil;
                              // Mask Parameter: PID_roll_InitialConditionForFil
                                 //  Referenced by: '<S100>/Filter'

  real_T PID_yaw_InitialConditionForFilt;
                              // Mask Parameter: PID_yaw_InitialConditionForFilt
                                 //  Referenced by: '<S154>/Filter'

  real_T PID_Altitude_InitialCondition_j;
                              // Mask Parameter: PID_Altitude_InitialCondition_j
                                 //  Referenced by: '<S220>/Integrator'

  real_T PID_vz_InitialConditionForInteg;
                              // Mask Parameter: PID_vz_InitialConditionForInteg
                                 //  Referenced by: '<S376>/Integrator'

  real_T PID_x_InitialConditionForIntegr;
                              // Mask Parameter: PID_x_InitialConditionForIntegr
                                 //  Referenced by: '<S430>/Integrator'

  real_T PID_y_InitialConditionForIntegr;
                              // Mask Parameter: PID_y_InitialConditionForIntegr
                                 //  Referenced by: '<S484>/Integrator'

  real_T PID_vx_InitialConditionForInteg;
                              // Mask Parameter: PID_vx_InitialConditionForInteg
                                 //  Referenced by: '<S272>/Integrator'

  real_T PID_pitch_InitialConditionForIn;
                              // Mask Parameter: PID_pitch_InitialConditionForIn
                                 //  Referenced by: '<S53>/Integrator'

  real_T PID_vy_InitialConditionForInteg;
                              // Mask Parameter: PID_vy_InitialConditionForInteg
                                 //  Referenced by: '<S324>/Integrator'

  real_T PID_roll_InitialConditionForInt;
                              // Mask Parameter: PID_roll_InitialConditionForInt
                                 //  Referenced by: '<S105>/Integrator'

  real_T PID_yaw_InitialConditionForInte;
                              // Mask Parameter: PID_yaw_InitialConditionForInte
                                 //  Referenced by: '<S159>/Integrator'

  real_T PID_Altitude_LowerSaturationLim;
                              // Mask Parameter: PID_Altitude_LowerSaturationLim
                                 //  Referenced by:
                                 //    '<S227>/Saturation'
                                 //    '<S212>/DeadZone'

  real_T PID_vz_LowerSaturationLimit;
                                  // Mask Parameter: PID_vz_LowerSaturationLimit
                                     //  Referenced by: '<S383>/Saturation'

  real_T PID_x_LowerSaturationLimit;
                                   // Mask Parameter: PID_x_LowerSaturationLimit
                                      //  Referenced by:
                                      //    '<S437>/Saturation'
                                      //    '<S422>/DeadZone'

  real_T PID_y_LowerSaturationLimit;
                                   // Mask Parameter: PID_y_LowerSaturationLimit
                                      //  Referenced by:
                                      //    '<S491>/Saturation'
                                      //    '<S476>/DeadZone'

  real_T PID_vx_LowerSaturationLimit;
                                  // Mask Parameter: PID_vx_LowerSaturationLimit
                                     //  Referenced by: '<S279>/Saturation'

  real_T PID_pitch_LowerSaturationLimit;
                               // Mask Parameter: PID_pitch_LowerSaturationLimit
                                  //  Referenced by: '<S60>/Saturation'

  real_T PID_vy_LowerSaturationLimit;
                                  // Mask Parameter: PID_vy_LowerSaturationLimit
                                     //  Referenced by: '<S331>/Saturation'

  real_T PID_roll_LowerSaturationLimit;
                                // Mask Parameter: PID_roll_LowerSaturationLimit
                                   //  Referenced by: '<S112>/Saturation'

  real_T PID_yaw_LowerSaturationLimit;
                                 // Mask Parameter: PID_yaw_LowerSaturationLimit
                                    //  Referenced by:
                                    //    '<S166>/Saturation'
                                    //    '<S151>/DeadZone'

  real_T PID_Altitude_N;               // Mask Parameter: PID_Altitude_N
                                          //  Referenced by: '<S223>/Filter Coefficient'

  real_T PID_vz_N;                     // Mask Parameter: PID_vz_N
                                          //  Referenced by: '<S379>/Filter Coefficient'

  real_T PID_x_N;                      // Mask Parameter: PID_x_N
                                          //  Referenced by: '<S433>/Filter Coefficient'

  real_T PID_y_N;                      // Mask Parameter: PID_y_N
                                          //  Referenced by: '<S487>/Filter Coefficient'

  real_T PID_vx_N;                     // Mask Parameter: PID_vx_N
                                          //  Referenced by: '<S275>/Filter Coefficient'

  real_T PID_pitch_N;                  // Mask Parameter: PID_pitch_N
                                          //  Referenced by: '<S56>/Filter Coefficient'

  real_T PID_vy_N;                     // Mask Parameter: PID_vy_N
                                          //  Referenced by: '<S327>/Filter Coefficient'

  real_T PID_roll_N;                   // Mask Parameter: PID_roll_N
                                          //  Referenced by: '<S108>/Filter Coefficient'

  real_T PID_yaw_N;                    // Mask Parameter: PID_yaw_N
                                          //  Referenced by: '<S162>/Filter Coefficient'

  real_T PID_Altitude_P;               // Mask Parameter: PID_Altitude_P
                                          //  Referenced by: '<S225>/Proportional Gain'

  real_T PID_vz_P;                     // Mask Parameter: PID_vz_P
                                          //  Referenced by: '<S381>/Proportional Gain'

  real_T PID_x_P;                      // Mask Parameter: PID_x_P
                                          //  Referenced by: '<S435>/Proportional Gain'

  real_T PID_y_P;                      // Mask Parameter: PID_y_P
                                          //  Referenced by: '<S489>/Proportional Gain'

  real_T PID_vx_P;                     // Mask Parameter: PID_vx_P
                                          //  Referenced by: '<S277>/Proportional Gain'

  real_T PID_pitch_P;                  // Mask Parameter: PID_pitch_P
                                          //  Referenced by: '<S58>/Proportional Gain'

  real_T PID_vy_P;                     // Mask Parameter: PID_vy_P
                                          //  Referenced by: '<S329>/Proportional Gain'

  real_T PID_roll_P;                   // Mask Parameter: PID_roll_P
                                          //  Referenced by: '<S110>/Proportional Gain'

  real_T PID_yaw_P;                    // Mask Parameter: PID_yaw_P
                                          //  Referenced by: '<S164>/Proportional Gain'

  real_T PID_Altitude_UpperSaturationLim;
                              // Mask Parameter: PID_Altitude_UpperSaturationLim
                                 //  Referenced by:
                                 //    '<S227>/Saturation'
                                 //    '<S212>/DeadZone'

  real_T PID_vz_UpperSaturationLimit;
                                  // Mask Parameter: PID_vz_UpperSaturationLimit
                                     //  Referenced by: '<S383>/Saturation'

  real_T PID_x_UpperSaturationLimit;
                                   // Mask Parameter: PID_x_UpperSaturationLimit
                                      //  Referenced by:
                                      //    '<S437>/Saturation'
                                      //    '<S422>/DeadZone'

  real_T PID_y_UpperSaturationLimit;
                                   // Mask Parameter: PID_y_UpperSaturationLimit
                                      //  Referenced by:
                                      //    '<S491>/Saturation'
                                      //    '<S476>/DeadZone'

  real_T PID_vx_UpperSaturationLimit;
                                  // Mask Parameter: PID_vx_UpperSaturationLimit
                                     //  Referenced by: '<S279>/Saturation'

  real_T PID_pitch_UpperSaturationLimit;
                               // Mask Parameter: PID_pitch_UpperSaturationLimit
                                  //  Referenced by: '<S60>/Saturation'

  real_T PID_vy_UpperSaturationLimit;
                                  // Mask Parameter: PID_vy_UpperSaturationLimit
                                     //  Referenced by: '<S331>/Saturation'

  real_T PID_roll_UpperSaturationLimit;
                                // Mask Parameter: PID_roll_UpperSaturationLimit
                                   //  Referenced by: '<S112>/Saturation'

  real_T PID_yaw_UpperSaturationLimit;
                                 // Mask Parameter: PID_yaw_UpperSaturationLimit
                                    //  Referenced by:
                                    //    '<S166>/Saturation'
                                    //    '<S151>/DeadZone'

  real_T DCM2Ang_tolerance;            // Mask Parameter: DCM2Ang_tolerance
                                          //  Referenced by:
                                          //    '<S532>/Constant'
                                          //    '<S534>/Constant'

  uint8_T DCM2Ang_action;              // Mask Parameter: DCM2Ang_action
                                          //  Referenced by:
                                          //    '<S511>/Constant'
                                          //    '<S521>/Constant'
                                          //    '<S523>/Constant'

  px4_Bus_vehicle_local_position Out1_Y0;// Computed Parameter: Out1_Y0
                                            //  Referenced by: '<S6>/Out1'

  px4_Bus_vehicle_local_position Constant_Value;// Computed Parameter: Constant_Value
                                                   //  Referenced by: '<S3>/Constant'

  px4_Bus_vehicle_attitude Out1_Y0_o;  // Computed Parameter: Out1_Y0_o
                                          //  Referenced by: '<S5>/Out1'

  px4_Bus_vehicle_attitude Constant_Value_n;// Computed Parameter: Constant_Value_n
                                               //  Referenced by: '<S2>/Constant'

  real_T Constant_Value_g;             // Expression: 1
                                          //  Referenced by: '<S517>/Constant'

  real_T Constant_Value_p;             // Expression: 1
                                          //  Referenced by: '<S518>/Constant'

  real_T Constant_Value_j;             // Expression: 1
                                          //  Referenced by: '<S513>/Constant'

  real_T Constant_Value_h;             // Expression: 1
                                          //  Referenced by: '<S514>/Constant'

  real_T Constant1_Value;              // Expression: 0
                                          //  Referenced by: '<S523>/Constant1'

  real_T Constant1_Value_d;            // Expression: 0
                                          //  Referenced by: '<S521>/Constant1'

  real_T Bias1_Bias[9];                // Expression: -eye(3)
                                          //  Referenced by: '<S524>/Bias1'

  real_T Bias_Bias;                    // Expression: -1
                                          //  Referenced by: '<S525>/Bias'

  real_T Constant1_Value_c;            // Expression: 0
                                          //  Referenced by: '<S149>/Constant1'

  real_T Constant1_Value_p;            // Expression: 0
                                          //  Referenced by: '<S210>/Constant1'

  real_T Constant1_Value_ck;           // Expression: 0
                                          //  Referenced by: '<S420>/Constant1'

  real_T Constant1_Value_cm;           // Expression: 0
                                          //  Referenced by: '<S474>/Constant1'

  real_T Mixermatrix_Value[16];
                          // Expression: [1 -1 1 1;1 1 -1 1;1 -1 -1 -1;1 1 1 -1]
                             //  Referenced by: '<S12>/Mixer matrix'

  real_T des_alt_Value;                // Expression: 5.003813882532419
                                          //  Referenced by: '<S1>/des_alt'

  real_T Gain_Gain;                    // Expression: -1
                                          //  Referenced by: '<S1>/Gain'

  real_T Clamping_zero_Value;          // Expression: 0
                                          //  Referenced by: '<S210>/Clamping_zero'

  real_T Filter_gainval;               // Computed Parameter: Filter_gainval
                                          //  Referenced by: '<S215>/Filter'

  real_T Integrator_gainval;           // Computed Parameter: Integrator_gainval
                                          //  Referenced by: '<S220>/Integrator'

  real_T Integrator_gainval_l;       // Computed Parameter: Integrator_gainval_l
                                        //  Referenced by: '<S376>/Integrator'

  real_T Filter_gainval_d;             // Computed Parameter: Filter_gainval_d
                                          //  Referenced by: '<S371>/Filter'

  real_T Gain_Gain_f;                  // Expression: 2
                                          //  Referenced by: '<S538>/Gain'

  real_T Gain_Gain_o;                  // Expression: 2
                                          //  Referenced by: '<S541>/Gain'

  real_T Gain_Gain_a;                  // Expression: 2
                                          //  Referenced by: '<S536>/Gain'

  real_T Gain_Gain_ff;                 // Expression: 2
                                          //  Referenced by: '<S542>/Gain'

  real_T Gain_Gain_n;                  // Expression: 2
                                          //  Referenced by: '<S537>/Gain'

  real_T Gain_Gain_l;                  // Expression: 2
                                          //  Referenced by: '<S540>/Gain'

  real_T Gain1_Gain[3];                // Expression: [1 1 -1]
                                          //  Referenced by: '<S510>/Gain1'

  real_T Gain2_Gain[2];                // Expression: [1 1]
                                          //  Referenced by: '<S510>/Gain2'

  real_T Gain3_Gain[2];                // Expression: [-1 1]
                                          //  Referenced by: '<S510>/Gain3'

  real_T x_Amp;                        // Expression: 1
                                          //  Referenced by: '<S1>/x+'

  real_T x_Bias;                       // Expression: 0
                                          //  Referenced by: '<S1>/x+'

  real_T x_Freq;                       // Expression: 2*pi*.125
                                          //  Referenced by: '<S1>/x+'

  real_T x_Phase;                      // Expression: -pi/2
                                          //  Referenced by: '<S1>/x+'

  real_T x_Hsin;                       // Computed Parameter: x_Hsin
                                          //  Referenced by: '<S1>/x+'

  real_T x_HCos;                       // Computed Parameter: x_HCos
                                          //  Referenced by: '<S1>/x+'

  real_T x_PSin;                       // Computed Parameter: x_PSin
                                          //  Referenced by: '<S1>/x+'

  real_T x_PCos;                       // Computed Parameter: x_PCos
                                          //  Referenced by: '<S1>/x+'

  real_T X_SwitchOn_SineWave_Value;    // Expression: 1
                                          //  Referenced by: '<S1>/X_SwitchOn_Sine Wave'

  real_T des_x_Value;                  // Expression: 0
                                          //  Referenced by: '<S1>/des_x'

  real_T Switch_Threshold;             // Expression: 0
                                          //  Referenced by: '<S1>/Switch'

  real_T Integrator_gainval_lq;     // Computed Parameter: Integrator_gainval_lq
                                       //  Referenced by: '<S430>/Integrator'

  real_T Filter_gainval_p;             // Computed Parameter: Filter_gainval_p
                                          //  Referenced by: '<S425>/Filter'

  real_T y_Amp;                        // Expression: 1
                                          //  Referenced by: '<S1>/y+'

  real_T y_Bias;                       // Expression: 0
                                          //  Referenced by: '<S1>/y+'

  real_T y_Freq;                       // Expression: 2*pi*.125
                                          //  Referenced by: '<S1>/y+'

  real_T y_Phase;                      // Expression: 0
                                          //  Referenced by: '<S1>/y+'

  real_T y_Hsin;                       // Computed Parameter: y_Hsin
                                          //  Referenced by: '<S1>/y+'

  real_T y_HCos;                       // Computed Parameter: y_HCos
                                          //  Referenced by: '<S1>/y+'

  real_T y_PSin;                       // Computed Parameter: y_PSin
                                          //  Referenced by: '<S1>/y+'

  real_T y_PCos;                       // Computed Parameter: y_PCos
                                          //  Referenced by: '<S1>/y+'

  real_T des_y_Value;                  // Expression: 0
                                          //  Referenced by: '<S1>/des_y'

  real_T Switch1_Threshold;            // Expression: 0
                                          //  Referenced by: '<S1>/Switch1'

  real_T Integrator_gainval_d;       // Computed Parameter: Integrator_gainval_d
                                        //  Referenced by: '<S484>/Integrator'

  real_T Filter_gainval_b;             // Computed Parameter: Filter_gainval_b
                                          //  Referenced by: '<S479>/Filter'

  real_T Integrator_gainval_e;       // Computed Parameter: Integrator_gainval_e
                                        //  Referenced by: '<S272>/Integrator'

  real_T Filter_gainval_n;             // Computed Parameter: Filter_gainval_n
                                          //  Referenced by: '<S267>/Filter'

  real_T Gain1_Gain_c;                 // Expression: pi/180
                                          //  Referenced by: '<S14>/Gain1'

  real_T Integrator_gainval_ld;     // Computed Parameter: Integrator_gainval_ld
                                       //  Referenced by: '<S53>/Integrator'

  real_T Filter_gainval_k;             // Computed Parameter: Filter_gainval_k
                                          //  Referenced by: '<S48>/Filter'

  real_T Integrator_gainval_o;       // Computed Parameter: Integrator_gainval_o
                                        //  Referenced by: '<S324>/Integrator'

  real_T Filter_gainval_l;             // Computed Parameter: Filter_gainval_l
                                          //  Referenced by: '<S319>/Filter'

  real_T Gain_Gain_p;                  // Expression: -1
                                          //  Referenced by: '<S11>/Gain'

  real_T Gain1_Gain_d;                 // Expression: pi/180
                                          //  Referenced by: '<S15>/Gain1'

  real_T Integrator_gainval_e1;     // Computed Parameter: Integrator_gainval_e1
                                       //  Referenced by: '<S105>/Integrator'

  real_T Filter_gainval_j;             // Computed Parameter: Filter_gainval_j
                                          //  Referenced by: '<S100>/Filter'

  real_T des_yaw_Value;                // Expression: 0
                                          //  Referenced by: '<S1>/des_yaw'

  real_T Gain1_Gain_n;                 // Expression: pi/180
                                          //  Referenced by: '<S13>/Gain1'

  real_T Clamping_zero_Value_m;        // Expression: 0
                                          //  Referenced by: '<S149>/Clamping_zero'

  real_T Filter_gainval_i;             // Computed Parameter: Filter_gainval_i
                                          //  Referenced by: '<S154>/Filter'

  real_T Integrator_gainval_b;       // Computed Parameter: Integrator_gainval_b
                                        //  Referenced by: '<S159>/Integrator'

  real_T Saturation_UpperSat;          // Expression: 1
                                          //  Referenced by: '<S12>/Saturation'

  real_T Saturation_LowerSat;          // Expression: 0
                                          //  Referenced by: '<S12>/Saturation'

  real_T Gain_Gain_j;                  // Expression: 1000
                                          //  Referenced by: '<S8>/Gain'

  real_T Constant_Value_o;             // Expression: 1000
                                          //  Referenced by: '<S8>/Constant'

  real_T Clamping_zero_Value_e;        // Expression: 0
                                          //  Referenced by: '<S420>/Clamping_zero'

  real_T Clamping_zero_Value_d;        // Expression: 0
                                          //  Referenced by: '<S474>/Clamping_zero'

  boolean_T Assertion_Enabled;         // Computed Parameter: Assertion_Enabled
                                          //  Referenced by: '<S531>/Assertion'

  boolean_T Assertion_Enabled_e;      // Computed Parameter: Assertion_Enabled_e
                                         //  Referenced by: '<S529>/Assertion'

  boolean_T Assertion_Enabled_l;      // Computed Parameter: Assertion_Enabled_l
                                         //  Referenced by: '<S528>/Assertion'

  boolean_T Assertion_Enabled_c;      // Computed Parameter: Assertion_Enabled_c
                                         //  Referenced by: '<S526>/Assertion'

  boolean_T Constant_Value_a;          // Computed Parameter: Constant_Value_a
                                          //  Referenced by: '<S4>/Constant'

  int8_T Constant_Value_nq;            // Computed Parameter: Constant_Value_nq
                                          //  Referenced by: '<S149>/Constant'

  int8_T Constant2_Value;              // Computed Parameter: Constant2_Value
                                          //  Referenced by: '<S149>/Constant2'

  int8_T Constant3_Value;              // Computed Parameter: Constant3_Value
                                          //  Referenced by: '<S149>/Constant3'

  int8_T Constant4_Value;              // Computed Parameter: Constant4_Value
                                          //  Referenced by: '<S149>/Constant4'

  int8_T Constant_Value_m;             // Computed Parameter: Constant_Value_m
                                          //  Referenced by: '<S210>/Constant'

  int8_T Constant2_Value_c;            // Computed Parameter: Constant2_Value_c
                                          //  Referenced by: '<S210>/Constant2'

  int8_T Constant3_Value_e;            // Computed Parameter: Constant3_Value_e
                                          //  Referenced by: '<S210>/Constant3'

  int8_T Constant4_Value_o;            // Computed Parameter: Constant4_Value_o
                                          //  Referenced by: '<S210>/Constant4'

  int8_T Constant_Value_b;             // Computed Parameter: Constant_Value_b
                                          //  Referenced by: '<S420>/Constant'

  int8_T Constant2_Value_j;            // Computed Parameter: Constant2_Value_j
                                          //  Referenced by: '<S420>/Constant2'

  int8_T Constant3_Value_c;            // Computed Parameter: Constant3_Value_c
                                          //  Referenced by: '<S420>/Constant3'

  int8_T Constant4_Value_g;            // Computed Parameter: Constant4_Value_g
                                          //  Referenced by: '<S420>/Constant4'

  int8_T Constant_Value_b5;            // Computed Parameter: Constant_Value_b5
                                          //  Referenced by: '<S474>/Constant'

  int8_T Constant2_Value_a;            // Computed Parameter: Constant2_Value_a
                                          //  Referenced by: '<S474>/Constant2'

  int8_T Constant3_Value_k;            // Computed Parameter: Constant3_Value_k
                                          //  Referenced by: '<S474>/Constant3'

  int8_T Constant4_Value_k;            // Computed Parameter: Constant4_Value_k
                                          //  Referenced by: '<S474>/Constant4'

};

// Real-time Model Data Structure
struct tag_RTM_Quadcopter_Controller_T {
  const char_T *errorStatus;
  RTWExtModeInfo *extModeInfo;

  //
  //  Sizes:
  //  The following substructure contains sizes information
  //  for many of the model attributes such as inputs, outputs,
  //  dwork, sample times, etc.

  struct {
    uint32_T checksums[4];
  } Sizes;

  //
  //  SpecialInfo:
  //  The following substructure contains special information
  //  related to other components that are dependent on RTW.

  struct {
    const void *mappingInfo;
  } SpecialInfo;

  //
  //  Timing:
  //  The following substructure contains information regarding
  //  the timing information for the model.

  struct {
    time_T taskTime0;
    uint32_T clockTick0;
    time_T stepSize0;
    time_T tFinal;
    boolean_T stopRequestedFlag;
  } Timing;
};

// Block parameters (default storage)
#ifdef __cplusplus

extern "C"
{

#endif

  extern P_Quadcopter_Controller_T Quadcopter_Controller_P;

#ifdef __cplusplus

}

#endif

// Block signals (default storage)
#ifdef __cplusplus

extern "C"
{

#endif

  extern struct B_Quadcopter_Controller_T Quadcopter_Controller_B;

#ifdef __cplusplus

}

#endif

// Block states (default storage)
extern struct DW_Quadcopter_Controller_T Quadcopter_Controller_DW;

#ifdef __cplusplus

extern "C"
{

#endif

  // Model entry point functions
  extern void Quadcopter_Controller_initialize(void);
  extern void Quadcopter_Controller_step(void);
  extern void Quadcopter_Controller_terminate(void);

#ifdef __cplusplus

}

#endif

// Real-time Model object
#ifdef __cplusplus

extern "C"
{

#endif

  extern RT_MODEL_Quadcopter_Controlle_T *const Quadcopter_Controller_M;

#ifdef __cplusplus

}

#endif

extern volatile boolean_T stopRequested;
extern volatile boolean_T runModel;

//-
//  These blocks were eliminated from the model due to optimizations:
//
//  Block '<S1>/Rate Transition3' : Eliminated since input and output rates are identical
//  Block '<S12>/Reshape' : Reshape block reduction
//  Block '<S510>/Reshape' : Reshape block reduction
//  Block '<S510>/Reshape1' : Reshape block reduction
//  Block '<S510>/Reshape2' : Reshape block reduction
//  Block '<S524>/Reshape' : Reshape block reduction
//  Block '<S533>/Reshape' : Reshape block reduction
//  Block '<S544>/Reshape (9) to [3x3] column-major' : Reshape block reduction


//-
//  The generated code includes comments that allow you to trace directly
//  back to the appropriate location in the model.  The basic format
//  is <system>/block_name, where system is the system number (uniquely
//  assigned by Simulink) and block_name is the name of the block.
//
//  Use the MATLAB hilite_system command to trace the generated code back
//  to the model.  For example,
//
//  hilite_system('<S3>')    - opens system 3
//  hilite_system('<S3>/Kp') - opens and selects block Kp which resides in S3
//
//  Here is the system hierarchy for this model
//
//  '<Root>' : 'Quadcopter_Controller'
//  '<S1>'   : 'Quadcopter_Controller/Commands'
//  '<S2>'   : 'Quadcopter_Controller/PX4 uORB Read2'
//  '<S3>'   : 'Quadcopter_Controller/PX4 uORB Read5'
//  '<S4>'   : 'Quadcopter_Controller/Subsystem'
//  '<S5>'   : 'Quadcopter_Controller/PX4 uORB Read2/Enabled Subsystem'
//  '<S6>'   : 'Quadcopter_Controller/PX4 uORB Read5/Enabled Subsystem'
//  '<S7>'   : 'Quadcopter_Controller/Subsystem/Controller'
//  '<S8>'   : 'Quadcopter_Controller/Subsystem/Omega to PX4 PWM'
//  '<S9>'   : 'Quadcopter_Controller/Subsystem/Signal Conditioning'
//  '<S10>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller'
//  '<S11>'  : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller'
//  '<S12>'  : 'Quadcopter_Controller/Subsystem/Controller/To Actuator'
//  '<S13>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/Degrees to Radians'
//  '<S14>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/Degrees to Radians1'
//  '<S15>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/Degrees to Radians2'
//  '<S16>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch'
//  '<S17>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll'
//  '<S18>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw'
//  '<S19>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Anti-windup'
//  '<S20>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/D Gain'
//  '<S21>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/External Derivative'
//  '<S22>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Filter'
//  '<S23>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Filter ICs'
//  '<S24>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/I Gain'
//  '<S25>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Ideal P Gain'
//  '<S26>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Ideal P Gain Fdbk'
//  '<S27>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Integrator'
//  '<S28>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Integrator ICs'
//  '<S29>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/N Copy'
//  '<S30>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/N Gain'
//  '<S31>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/P Copy'
//  '<S32>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Parallel P Gain'
//  '<S33>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Reset Signal'
//  '<S34>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Saturation'
//  '<S35>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Saturation Fdbk'
//  '<S36>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Sum'
//  '<S37>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Sum Fdbk'
//  '<S38>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Tracking Mode'
//  '<S39>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Tracking Mode Sum'
//  '<S40>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Tsamp - Integral'
//  '<S41>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Tsamp - Ngain'
//  '<S42>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/postSat Signal'
//  '<S43>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/preInt Signal'
//  '<S44>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/preSat Signal'
//  '<S45>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Anti-windup/Passthrough'
//  '<S46>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/D Gain/Internal Parameters'
//  '<S47>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/External Derivative/Error'
//  '<S48>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Filter/Disc. Forward Euler Filter'
//  '<S49>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Filter ICs/Internal IC - Filter'
//  '<S50>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/I Gain/Internal Parameters'
//  '<S51>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Ideal P Gain/Passthrough'
//  '<S52>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Ideal P Gain Fdbk/Disabled'
//  '<S53>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Integrator/Discrete'
//  '<S54>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Integrator ICs/Internal IC'
//  '<S55>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/N Copy/Disabled'
//  '<S56>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/N Gain/Internal Parameters'
//  '<S57>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/P Copy/Disabled'
//  '<S58>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Parallel P Gain/Internal Parameters'
//  '<S59>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Reset Signal/Disabled'
//  '<S60>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Saturation/Enabled'
//  '<S61>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Saturation Fdbk/Disabled'
//  '<S62>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Sum/Sum_PID'
//  '<S63>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Sum Fdbk/Disabled'
//  '<S64>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Tracking Mode/Disabled'
//  '<S65>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Tracking Mode Sum/Passthrough'
//  '<S66>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Tsamp - Integral/TsSignalSpecification'
//  '<S67>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/Tsamp - Ngain/Passthrough'
//  '<S68>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/postSat Signal/Forward_Path'
//  '<S69>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/preInt Signal/Internal PreInt'
//  '<S70>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_pitch/preSat Signal/Forward_Path'
//  '<S71>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Anti-windup'
//  '<S72>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/D Gain'
//  '<S73>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/External Derivative'
//  '<S74>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Filter'
//  '<S75>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Filter ICs'
//  '<S76>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/I Gain'
//  '<S77>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Ideal P Gain'
//  '<S78>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Ideal P Gain Fdbk'
//  '<S79>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Integrator'
//  '<S80>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Integrator ICs'
//  '<S81>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/N Copy'
//  '<S82>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/N Gain'
//  '<S83>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/P Copy'
//  '<S84>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Parallel P Gain'
//  '<S85>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Reset Signal'
//  '<S86>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Saturation'
//  '<S87>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Saturation Fdbk'
//  '<S88>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Sum'
//  '<S89>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Sum Fdbk'
//  '<S90>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Tracking Mode'
//  '<S91>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Tracking Mode Sum'
//  '<S92>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Tsamp - Integral'
//  '<S93>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Tsamp - Ngain'
//  '<S94>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/postSat Signal'
//  '<S95>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/preInt Signal'
//  '<S96>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/preSat Signal'
//  '<S97>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Anti-windup/Passthrough'
//  '<S98>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/D Gain/Internal Parameters'
//  '<S99>'  : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/External Derivative/Error'
//  '<S100>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Filter/Disc. Forward Euler Filter'
//  '<S101>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Filter ICs/Internal IC - Filter'
//  '<S102>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/I Gain/Internal Parameters'
//  '<S103>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Ideal P Gain/Passthrough'
//  '<S104>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Ideal P Gain Fdbk/Disabled'
//  '<S105>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Integrator/Discrete'
//  '<S106>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Integrator ICs/Internal IC'
//  '<S107>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/N Copy/Disabled'
//  '<S108>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/N Gain/Internal Parameters'
//  '<S109>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/P Copy/Disabled'
//  '<S110>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Parallel P Gain/Internal Parameters'
//  '<S111>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Reset Signal/Disabled'
//  '<S112>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Saturation/Enabled'
//  '<S113>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Saturation Fdbk/Disabled'
//  '<S114>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Sum/Sum_PID'
//  '<S115>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Sum Fdbk/Disabled'
//  '<S116>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Tracking Mode/Disabled'
//  '<S117>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Tracking Mode Sum/Passthrough'
//  '<S118>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Tsamp - Integral/TsSignalSpecification'
//  '<S119>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/Tsamp - Ngain/Passthrough'
//  '<S120>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/postSat Signal/Forward_Path'
//  '<S121>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/preInt Signal/Internal PreInt'
//  '<S122>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_roll/preSat Signal/Forward_Path'
//  '<S123>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Anti-windup'
//  '<S124>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/D Gain'
//  '<S125>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/External Derivative'
//  '<S126>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Filter'
//  '<S127>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Filter ICs'
//  '<S128>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/I Gain'
//  '<S129>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Ideal P Gain'
//  '<S130>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Ideal P Gain Fdbk'
//  '<S131>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Integrator'
//  '<S132>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Integrator ICs'
//  '<S133>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/N Copy'
//  '<S134>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/N Gain'
//  '<S135>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/P Copy'
//  '<S136>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Parallel P Gain'
//  '<S137>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Reset Signal'
//  '<S138>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Saturation'
//  '<S139>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Saturation Fdbk'
//  '<S140>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Sum'
//  '<S141>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Sum Fdbk'
//  '<S142>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Tracking Mode'
//  '<S143>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Tracking Mode Sum'
//  '<S144>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Tsamp - Integral'
//  '<S145>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Tsamp - Ngain'
//  '<S146>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/postSat Signal'
//  '<S147>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/preInt Signal'
//  '<S148>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/preSat Signal'
//  '<S149>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Anti-windup/Disc. Clamping Parallel'
//  '<S150>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Anti-windup/Disc. Clamping Parallel/Dead Zone'
//  '<S151>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Anti-windup/Disc. Clamping Parallel/Dead Zone/Enabled'
//  '<S152>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/D Gain/Internal Parameters'
//  '<S153>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/External Derivative/Error'
//  '<S154>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Filter/Disc. Forward Euler Filter'
//  '<S155>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Filter ICs/Internal IC - Filter'
//  '<S156>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/I Gain/Internal Parameters'
//  '<S157>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Ideal P Gain/Passthrough'
//  '<S158>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Ideal P Gain Fdbk/Passthrough'
//  '<S159>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Integrator/Discrete'
//  '<S160>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Integrator ICs/Internal IC'
//  '<S161>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/N Copy/Disabled'
//  '<S162>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/N Gain/Internal Parameters'
//  '<S163>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/P Copy/Disabled'
//  '<S164>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Parallel P Gain/Internal Parameters'
//  '<S165>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Reset Signal/Disabled'
//  '<S166>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Saturation/Enabled'
//  '<S167>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Saturation Fdbk/Passthrough'
//  '<S168>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Sum/Sum_PID'
//  '<S169>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Sum Fdbk/Enabled'
//  '<S170>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Tracking Mode/Disabled'
//  '<S171>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Tracking Mode Sum/Passthrough'
//  '<S172>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Tsamp - Integral/TsSignalSpecification'
//  '<S173>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/Tsamp - Ngain/Passthrough'
//  '<S174>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/postSat Signal/Feedback_Path'
//  '<S175>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/preInt Signal/Internal PreInt'
//  '<S176>' : 'Quadcopter_Controller/Subsystem/Controller/Attitude controller/PID_yaw/preSat Signal/Feedback_Path'
//  '<S177>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude'
//  '<S178>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx'
//  '<S179>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy'
//  '<S180>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz'
//  '<S181>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x'
//  '<S182>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y'
//  '<S183>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/Rotation mat '
//  '<S184>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Anti-windup'
//  '<S185>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/D Gain'
//  '<S186>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/External Derivative'
//  '<S187>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Filter'
//  '<S188>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Filter ICs'
//  '<S189>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/I Gain'
//  '<S190>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Ideal P Gain'
//  '<S191>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Ideal P Gain Fdbk'
//  '<S192>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Integrator'
//  '<S193>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Integrator ICs'
//  '<S194>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/N Copy'
//  '<S195>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/N Gain'
//  '<S196>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/P Copy'
//  '<S197>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Parallel P Gain'
//  '<S198>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Reset Signal'
//  '<S199>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Saturation'
//  '<S200>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Saturation Fdbk'
//  '<S201>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Sum'
//  '<S202>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Sum Fdbk'
//  '<S203>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Tracking Mode'
//  '<S204>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Tracking Mode Sum'
//  '<S205>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Tsamp - Integral'
//  '<S206>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Tsamp - Ngain'
//  '<S207>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/postSat Signal'
//  '<S208>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/preInt Signal'
//  '<S209>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/preSat Signal'
//  '<S210>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Anti-windup/Disc. Clamping Parallel'
//  '<S211>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Anti-windup/Disc. Clamping Parallel/Dead Zone'
//  '<S212>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Anti-windup/Disc. Clamping Parallel/Dead Zone/Enabled'
//  '<S213>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/D Gain/Internal Parameters'
//  '<S214>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/External Derivative/Error'
//  '<S215>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Filter/Disc. Forward Euler Filter'
//  '<S216>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Filter ICs/Internal IC - Filter'
//  '<S217>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/I Gain/Internal Parameters'
//  '<S218>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Ideal P Gain/Passthrough'
//  '<S219>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Ideal P Gain Fdbk/Passthrough'
//  '<S220>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Integrator/Discrete'
//  '<S221>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Integrator ICs/Internal IC'
//  '<S222>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/N Copy/Disabled'
//  '<S223>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/N Gain/Internal Parameters'
//  '<S224>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/P Copy/Disabled'
//  '<S225>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Parallel P Gain/Internal Parameters'
//  '<S226>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Reset Signal/Disabled'
//  '<S227>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Saturation/Enabled'
//  '<S228>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Saturation Fdbk/Passthrough'
//  '<S229>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Sum/Sum_PID'
//  '<S230>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Sum Fdbk/Enabled'
//  '<S231>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Tracking Mode/Disabled'
//  '<S232>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Tracking Mode Sum/Passthrough'
//  '<S233>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Tsamp - Integral/TsSignalSpecification'
//  '<S234>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/Tsamp - Ngain/Passthrough'
//  '<S235>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/postSat Signal/Feedback_Path'
//  '<S236>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/preInt Signal/Internal PreInt'
//  '<S237>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_Altitude/preSat Signal/Feedback_Path'
//  '<S238>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Anti-windup'
//  '<S239>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/D Gain'
//  '<S240>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/External Derivative'
//  '<S241>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Filter'
//  '<S242>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Filter ICs'
//  '<S243>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/I Gain'
//  '<S244>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Ideal P Gain'
//  '<S245>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Ideal P Gain Fdbk'
//  '<S246>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Integrator'
//  '<S247>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Integrator ICs'
//  '<S248>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/N Copy'
//  '<S249>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/N Gain'
//  '<S250>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/P Copy'
//  '<S251>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Parallel P Gain'
//  '<S252>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Reset Signal'
//  '<S253>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Saturation'
//  '<S254>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Saturation Fdbk'
//  '<S255>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Sum'
//  '<S256>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Sum Fdbk'
//  '<S257>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Tracking Mode'
//  '<S258>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Tracking Mode Sum'
//  '<S259>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Tsamp - Integral'
//  '<S260>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Tsamp - Ngain'
//  '<S261>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/postSat Signal'
//  '<S262>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/preInt Signal'
//  '<S263>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/preSat Signal'
//  '<S264>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Anti-windup/Passthrough'
//  '<S265>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/D Gain/Internal Parameters'
//  '<S266>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/External Derivative/Error'
//  '<S267>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Filter/Disc. Forward Euler Filter'
//  '<S268>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Filter ICs/Internal IC - Filter'
//  '<S269>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/I Gain/Internal Parameters'
//  '<S270>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Ideal P Gain/Passthrough'
//  '<S271>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Ideal P Gain Fdbk/Disabled'
//  '<S272>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Integrator/Discrete'
//  '<S273>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Integrator ICs/Internal IC'
//  '<S274>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/N Copy/Disabled'
//  '<S275>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/N Gain/Internal Parameters'
//  '<S276>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/P Copy/Disabled'
//  '<S277>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Parallel P Gain/Internal Parameters'
//  '<S278>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Reset Signal/Disabled'
//  '<S279>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Saturation/Enabled'
//  '<S280>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Saturation Fdbk/Disabled'
//  '<S281>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Sum/Sum_PID'
//  '<S282>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Sum Fdbk/Disabled'
//  '<S283>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Tracking Mode/Disabled'
//  '<S284>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Tracking Mode Sum/Passthrough'
//  '<S285>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Tsamp - Integral/TsSignalSpecification'
//  '<S286>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/Tsamp - Ngain/Passthrough'
//  '<S287>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/postSat Signal/Forward_Path'
//  '<S288>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/preInt Signal/Internal PreInt'
//  '<S289>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vx/preSat Signal/Forward_Path'
//  '<S290>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Anti-windup'
//  '<S291>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/D Gain'
//  '<S292>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/External Derivative'
//  '<S293>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Filter'
//  '<S294>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Filter ICs'
//  '<S295>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/I Gain'
//  '<S296>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Ideal P Gain'
//  '<S297>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Ideal P Gain Fdbk'
//  '<S298>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Integrator'
//  '<S299>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Integrator ICs'
//  '<S300>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/N Copy'
//  '<S301>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/N Gain'
//  '<S302>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/P Copy'
//  '<S303>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Parallel P Gain'
//  '<S304>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Reset Signal'
//  '<S305>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Saturation'
//  '<S306>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Saturation Fdbk'
//  '<S307>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Sum'
//  '<S308>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Sum Fdbk'
//  '<S309>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Tracking Mode'
//  '<S310>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Tracking Mode Sum'
//  '<S311>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Tsamp - Integral'
//  '<S312>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Tsamp - Ngain'
//  '<S313>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/postSat Signal'
//  '<S314>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/preInt Signal'
//  '<S315>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/preSat Signal'
//  '<S316>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Anti-windup/Passthrough'
//  '<S317>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/D Gain/Internal Parameters'
//  '<S318>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/External Derivative/Error'
//  '<S319>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Filter/Disc. Forward Euler Filter'
//  '<S320>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Filter ICs/Internal IC - Filter'
//  '<S321>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/I Gain/Internal Parameters'
//  '<S322>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Ideal P Gain/Passthrough'
//  '<S323>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Ideal P Gain Fdbk/Disabled'
//  '<S324>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Integrator/Discrete'
//  '<S325>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Integrator ICs/Internal IC'
//  '<S326>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/N Copy/Disabled'
//  '<S327>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/N Gain/Internal Parameters'
//  '<S328>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/P Copy/Disabled'
//  '<S329>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Parallel P Gain/Internal Parameters'
//  '<S330>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Reset Signal/Disabled'
//  '<S331>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Saturation/Enabled'
//  '<S332>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Saturation Fdbk/Disabled'
//  '<S333>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Sum/Sum_PID'
//  '<S334>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Sum Fdbk/Disabled'
//  '<S335>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Tracking Mode/Disabled'
//  '<S336>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Tracking Mode Sum/Passthrough'
//  '<S337>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Tsamp - Integral/TsSignalSpecification'
//  '<S338>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/Tsamp - Ngain/Passthrough'
//  '<S339>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/postSat Signal/Forward_Path'
//  '<S340>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/preInt Signal/Internal PreInt'
//  '<S341>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vy/preSat Signal/Forward_Path'
//  '<S342>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Anti-windup'
//  '<S343>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/D Gain'
//  '<S344>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/External Derivative'
//  '<S345>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Filter'
//  '<S346>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Filter ICs'
//  '<S347>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/I Gain'
//  '<S348>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Ideal P Gain'
//  '<S349>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Ideal P Gain Fdbk'
//  '<S350>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Integrator'
//  '<S351>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Integrator ICs'
//  '<S352>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/N Copy'
//  '<S353>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/N Gain'
//  '<S354>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/P Copy'
//  '<S355>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Parallel P Gain'
//  '<S356>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Reset Signal'
//  '<S357>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Saturation'
//  '<S358>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Saturation Fdbk'
//  '<S359>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Sum'
//  '<S360>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Sum Fdbk'
//  '<S361>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Tracking Mode'
//  '<S362>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Tracking Mode Sum'
//  '<S363>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Tsamp - Integral'
//  '<S364>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Tsamp - Ngain'
//  '<S365>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/postSat Signal'
//  '<S366>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/preInt Signal'
//  '<S367>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/preSat Signal'
//  '<S368>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Anti-windup/Passthrough'
//  '<S369>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/D Gain/Internal Parameters'
//  '<S370>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/External Derivative/Error'
//  '<S371>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Filter/Disc. Forward Euler Filter'
//  '<S372>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Filter ICs/Internal IC - Filter'
//  '<S373>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/I Gain/Internal Parameters'
//  '<S374>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Ideal P Gain/Passthrough'
//  '<S375>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Ideal P Gain Fdbk/Disabled'
//  '<S376>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Integrator/Discrete'
//  '<S377>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Integrator ICs/Internal IC'
//  '<S378>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/N Copy/Disabled'
//  '<S379>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/N Gain/Internal Parameters'
//  '<S380>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/P Copy/Disabled'
//  '<S381>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Parallel P Gain/Internal Parameters'
//  '<S382>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Reset Signal/Disabled'
//  '<S383>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Saturation/Enabled'
//  '<S384>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Saturation Fdbk/Disabled'
//  '<S385>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Sum/Sum_PID'
//  '<S386>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Sum Fdbk/Disabled'
//  '<S387>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Tracking Mode/Disabled'
//  '<S388>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Tracking Mode Sum/Passthrough'
//  '<S389>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Tsamp - Integral/TsSignalSpecification'
//  '<S390>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/Tsamp - Ngain/Passthrough'
//  '<S391>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/postSat Signal/Forward_Path'
//  '<S392>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/preInt Signal/Internal PreInt'
//  '<S393>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_vz/preSat Signal/Forward_Path'
//  '<S394>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Anti-windup'
//  '<S395>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/D Gain'
//  '<S396>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/External Derivative'
//  '<S397>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Filter'
//  '<S398>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Filter ICs'
//  '<S399>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/I Gain'
//  '<S400>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Ideal P Gain'
//  '<S401>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Ideal P Gain Fdbk'
//  '<S402>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Integrator'
//  '<S403>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Integrator ICs'
//  '<S404>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/N Copy'
//  '<S405>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/N Gain'
//  '<S406>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/P Copy'
//  '<S407>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Parallel P Gain'
//  '<S408>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Reset Signal'
//  '<S409>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Saturation'
//  '<S410>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Saturation Fdbk'
//  '<S411>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Sum'
//  '<S412>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Sum Fdbk'
//  '<S413>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Tracking Mode'
//  '<S414>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Tracking Mode Sum'
//  '<S415>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Tsamp - Integral'
//  '<S416>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Tsamp - Ngain'
//  '<S417>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/postSat Signal'
//  '<S418>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/preInt Signal'
//  '<S419>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/preSat Signal'
//  '<S420>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Anti-windup/Disc. Clamping Parallel'
//  '<S421>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Anti-windup/Disc. Clamping Parallel/Dead Zone'
//  '<S422>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Anti-windup/Disc. Clamping Parallel/Dead Zone/Enabled'
//  '<S423>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/D Gain/Internal Parameters'
//  '<S424>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/External Derivative/Error'
//  '<S425>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Filter/Disc. Forward Euler Filter'
//  '<S426>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Filter ICs/Internal IC - Filter'
//  '<S427>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/I Gain/Internal Parameters'
//  '<S428>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Ideal P Gain/Passthrough'
//  '<S429>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Ideal P Gain Fdbk/Disabled'
//  '<S430>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Integrator/Discrete'
//  '<S431>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Integrator ICs/Internal IC'
//  '<S432>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/N Copy/Disabled'
//  '<S433>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/N Gain/Internal Parameters'
//  '<S434>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/P Copy/Disabled'
//  '<S435>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Parallel P Gain/Internal Parameters'
//  '<S436>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Reset Signal/Disabled'
//  '<S437>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Saturation/Enabled'
//  '<S438>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Saturation Fdbk/Disabled'
//  '<S439>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Sum/Sum_PID'
//  '<S440>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Sum Fdbk/Disabled'
//  '<S441>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Tracking Mode/Disabled'
//  '<S442>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Tracking Mode Sum/Passthrough'
//  '<S443>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Tsamp - Integral/TsSignalSpecification'
//  '<S444>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/Tsamp - Ngain/Passthrough'
//  '<S445>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/postSat Signal/Forward_Path'
//  '<S446>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/preInt Signal/Internal PreInt'
//  '<S447>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_x/preSat Signal/Forward_Path'
//  '<S448>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Anti-windup'
//  '<S449>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/D Gain'
//  '<S450>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/External Derivative'
//  '<S451>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Filter'
//  '<S452>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Filter ICs'
//  '<S453>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/I Gain'
//  '<S454>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Ideal P Gain'
//  '<S455>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Ideal P Gain Fdbk'
//  '<S456>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Integrator'
//  '<S457>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Integrator ICs'
//  '<S458>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/N Copy'
//  '<S459>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/N Gain'
//  '<S460>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/P Copy'
//  '<S461>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Parallel P Gain'
//  '<S462>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Reset Signal'
//  '<S463>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Saturation'
//  '<S464>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Saturation Fdbk'
//  '<S465>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Sum'
//  '<S466>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Sum Fdbk'
//  '<S467>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Tracking Mode'
//  '<S468>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Tracking Mode Sum'
//  '<S469>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Tsamp - Integral'
//  '<S470>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Tsamp - Ngain'
//  '<S471>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/postSat Signal'
//  '<S472>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/preInt Signal'
//  '<S473>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/preSat Signal'
//  '<S474>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Anti-windup/Disc. Clamping Parallel'
//  '<S475>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Anti-windup/Disc. Clamping Parallel/Dead Zone'
//  '<S476>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Anti-windup/Disc. Clamping Parallel/Dead Zone/Enabled'
//  '<S477>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/D Gain/Internal Parameters'
//  '<S478>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/External Derivative/Error'
//  '<S479>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Filter/Disc. Forward Euler Filter'
//  '<S480>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Filter ICs/Internal IC - Filter'
//  '<S481>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/I Gain/Internal Parameters'
//  '<S482>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Ideal P Gain/Passthrough'
//  '<S483>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Ideal P Gain Fdbk/Disabled'
//  '<S484>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Integrator/Discrete'
//  '<S485>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Integrator ICs/Internal IC'
//  '<S486>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/N Copy/Disabled'
//  '<S487>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/N Gain/Internal Parameters'
//  '<S488>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/P Copy/Disabled'
//  '<S489>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Parallel P Gain/Internal Parameters'
//  '<S490>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Reset Signal/Disabled'
//  '<S491>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Saturation/Enabled'
//  '<S492>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Saturation Fdbk/Disabled'
//  '<S493>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Sum/Sum_PID'
//  '<S494>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Sum Fdbk/Disabled'
//  '<S495>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Tracking Mode/Disabled'
//  '<S496>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Tracking Mode Sum/Passthrough'
//  '<S497>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Tsamp - Integral/TsSignalSpecification'
//  '<S498>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/Tsamp - Ngain/Passthrough'
//  '<S499>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/postSat Signal/Forward_Path'
//  '<S500>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/preInt Signal/Internal PreInt'
//  '<S501>' : 'Quadcopter_Controller/Subsystem/Controller/Position & Altitude controller/PID_y/preSat Signal/Forward_Path'
//  '<S502>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/XYZ from Vehicle Local Position'
//  '<S503>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude'
//  '<S504>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/dx,dy,dz from vehile_local_position'
//  '<S505>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles'
//  '<S506>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang'
//  '<S507>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/Quat2DCM'
//  '<S508>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/AxisRotDefault'
//  '<S509>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/AxisRotZeroR3'
//  '<S510>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Get DCM Values'
//  '<S511>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM'
//  '<S512>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/AxisRotDefault/Protect asincos input'
//  '<S513>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/AxisRotDefault/Protect asincos input/If Action Subsystem'
//  '<S514>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/AxisRotDefault/Protect asincos input/If Action Subsystem1'
//  '<S515>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/AxisRotDefault/Protect asincos input/If Action Subsystem2'
//  '<S516>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/AxisRotZeroR3/Protect asincos input'
//  '<S517>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/AxisRotZeroR3/Protect asincos input/If Action Subsystem'
//  '<S518>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/AxisRotZeroR3/Protect asincos input/If Action Subsystem1'
//  '<S519>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/AxisRotZeroR3/Protect asincos input/If Action Subsystem2'
//  '<S520>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM/If Warning//Error'
//  '<S521>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM/If Warning//Error/Else If Not Orthogonal'
//  '<S522>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM/If Warning//Error/Else No Action'
//  '<S523>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM/If Warning//Error/If Not Proper'
//  '<S524>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM/If Warning//Error/isNotOrthogonal'
//  '<S525>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM/If Warning//Error/isNotProper'
//  '<S526>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM/If Warning//Error/Else If Not Orthogonal/Error'
//  '<S527>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM/If Warning//Error/Else If Not Orthogonal/None'
//  '<S528>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM/If Warning//Error/Else If Not Orthogonal/Warning'
//  '<S529>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM/If Warning//Error/If Not Proper/Error'
//  '<S530>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM/If Warning//Error/If Not Proper/None'
//  '<S531>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM/If Warning//Error/If Not Proper/Warning'
//  '<S532>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM/If Warning//Error/isNotOrthogonal/transpose*dcm ~= eye(3)'
//  '<S533>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM/If Warning//Error/isNotProper/Determinant of 3x3 Matrix'
//  '<S534>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/DCM2Ang/Validate DCM/If Warning//Error/isNotProper/determinant does not equal 1'
//  '<S535>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/Quat2DCM/A11'
//  '<S536>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/Quat2DCM/A12'
//  '<S537>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/Quat2DCM/A13'
//  '<S538>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/Quat2DCM/A21'
//  '<S539>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/Quat2DCM/A22'
//  '<S540>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/Quat2DCM/A23'
//  '<S541>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/Quat2DCM/A31'
//  '<S542>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/Quat2DCM/A32'
//  '<S543>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/Quat2DCM/A33'
//  '<S544>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/Quat2DCM/Create 3x3 Matrix'
//  '<S545>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/Quat2DCM/Quaternion Normalize'
//  '<S546>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/Quat2DCM/Quaternion Normalize/Quaternion Modulus'
//  '<S547>' : 'Quadcopter_Controller/Subsystem/Signal Conditioning/Y,P,R from Vehicle Attitude/Quaternions to Rotation Angles/Quat2DCM/Quaternion Normalize/Quaternion Modulus/Quaternion Norm'

#endif                                 // Quadcopter_Controller_h_

//
// File trailer for generated code.
//
// [EOF]
//
