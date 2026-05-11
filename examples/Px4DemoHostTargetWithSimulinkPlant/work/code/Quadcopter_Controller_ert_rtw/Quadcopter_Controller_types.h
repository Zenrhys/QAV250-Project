//
// Academic License - for use in teaching, academic research, and meeting
// course requirements at degree granting institutions only.  Not for
// government, commercial, or other organizational use.
//
// File: Quadcopter_Controller_types.h
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
#ifndef Quadcopter_Controller_types_h_
#define Quadcopter_Controller_types_h_
#include "rtwtypes.h"
#include <uORB/topics/vehicle_attitude.h>
#include <uORB/topics/vehicle_local_position.h>
#ifndef struct_px4_internal_block_PWM_Quadco_T
#define struct_px4_internal_block_PWM_Quadco_T

struct px4_internal_block_PWM_Quadco_T
{
  boolean_T matlabCodegenIsDeleted;
  int32_T isInitialized;
  boolean_T isSetupComplete;
  unsigned int servoCount;
  int channelMask;
  boolean_T isMain;
  orb_advert_t armAdvertiseObj;
  orb_advert_t actuatorAdvertiseObj;
  boolean_T isArmed;
};

#endif                                // struct_px4_internal_block_PWM_Quadco_T

#ifndef struct_d_px4_internal_block_SampleTi_T
#define struct_d_px4_internal_block_SampleTi_T

struct d_px4_internal_block_SampleTi_T
{
  int32_T __dummy;
};

#endif                                // struct_d_px4_internal_block_SampleTi_T

#ifndef struct_px4_internal_block_Subscriber_T
#define struct_px4_internal_block_Subscriber_T

struct px4_internal_block_Subscriber_T
{
  boolean_T matlabCodegenIsDeleted;
  int32_T isInitialized;
  boolean_T isSetupComplete;
  d_px4_internal_block_SampleTi_T SampleTimeHandler;
  pollfd_t eventStructObj;
  orb_metadata_t * orbMetadataObj;
};

#endif                                // struct_px4_internal_block_Subscriber_T

// Parameters (default storage)
typedef struct P_Quadcopter_Controller_T_ P_Quadcopter_Controller_T;

// Forward declaration for rtModel
typedef struct tag_RTM_Quadcopter_Controller_T RT_MODEL_Quadcopter_Controlle_T;

#endif                                 // Quadcopter_Controller_types_h_

//
// File trailer for generated code.
//
// [EOF]
//
