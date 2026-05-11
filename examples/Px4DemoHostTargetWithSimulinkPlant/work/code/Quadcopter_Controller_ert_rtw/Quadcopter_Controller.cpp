//
// Academic License - for use in teaching, academic research, and meeting
// course requirements at degree granting institutions only.  Not for
// government, commercial, or other organizational use.
//
// File: Quadcopter_Controller.cpp
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
#include "Quadcopter_Controller_types.h"
#include "rtwtypes.h"
#include <math.h>
#include "Quadcopter_Controller_private.h"

extern "C"
{

#include "rt_nonfinite.h"

}

#include "rt_assert.h"
#include "rt_defines.h"

// Block signals (default storage)
B_Quadcopter_Controller_T Quadcopter_Controller_B;

// Block states (default storage)
DW_Quadcopter_Controller_T Quadcopter_Controller_DW;

// Real-time model
RT_MODEL_Quadcopter_Controlle_T Quadcopter_Controller_M_ =
  RT_MODEL_Quadcopter_Controlle_T();
RT_MODEL_Quadcopter_Controlle_T *const Quadcopter_Controller_M =
  &Quadcopter_Controller_M_;

// Forward declaration for local functions
static void Quadcopter_Contro_PWM_setupImpl(px4_internal_block_PWM_Quadco_T *obj,
  boolean_T armPWM, boolean_T forceFailsafe);
real_T rt_atan2d_snf(real_T u0, real_T u1)
{
  real_T y;
  if (rtIsNaN(u0) || rtIsNaN(u1)) {
    y = (rtNaN);
  } else if (rtIsInf(u0) && rtIsInf(u1)) {
    int32_T tmp;
    int32_T tmp_0;
    if (u0 > 0.0) {
      tmp = 1;
    } else {
      tmp = -1;
    }

    if (u1 > 0.0) {
      tmp_0 = 1;
    } else {
      tmp_0 = -1;
    }

    y = atan2(static_cast<real_T>(tmp), static_cast<real_T>(tmp_0));
  } else if (u1 == 0.0) {
    if (u0 > 0.0) {
      y = RT_PI / 2.0;
    } else if (u0 < 0.0) {
      y = -(RT_PI / 2.0);
    } else {
      y = 0.0;
    }
  } else {
    y = atan2(u0, u1);
  }

  return y;
}

static void Quadcopter_Contro_PWM_setupImpl(px4_internal_block_PWM_Quadco_T *obj,
  boolean_T armPWM, boolean_T forceFailsafe)
{
  obj->isMain = true;
  pwm_open(&obj->actuatorAdvertiseObj, &obj->armAdvertiseObj);
  obj->servoCount = 8;
  if (armPWM) {
    pwm_arm(&obj->armAdvertiseObj);
    obj->isArmed = true;
  } else {
    pwm_disarm(&obj->armAdvertiseObj);
    obj->isArmed = false;
  }

  obj->channelMask = 15;
  if (obj->isMain) {
    if (forceFailsafe) {
      pwm_disarm(&obj->armAdvertiseObj);
    } else {
      pwm_arm(&obj->armAdvertiseObj);
    }
  }
}

// Model step function
void Quadcopter_Controller_step(void)
{
  real_T rtb_MatrixMultiply_idx_0;
  real_T rtb_MatrixMultiply_idx_1;
  real_T rtb_Merge_idx_0;
  real_T rtb_Merge_idx_1;
  real_T rtb_Merge_idx_2;
  int32_T i;
  int32_T i_0;
  int32_T rtb_VectorConcatenate_tmp;
  int8_T tmp_0;
  int8_T tmp_1;
  boolean_T b_varargout_1;
  boolean_T tmp;

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.EnabledSubsystem_SubsysRanBC_n);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.EnabledSubsystem_SubsysRanBC);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.IfActionSubsystem_SubsysRanBC_g);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.IfActionSubsystem1_SubsysRanB_j);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.IfActionSubsystem2_SubsysRanB_g);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.AxisRotZeroR3_SubsysRanBC);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.IfActionSubsystem_SubsysRanBC);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.IfActionSubsystem1_SubsysRanBC);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.IfActionSubsystem2_SubsysRanBC);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.AxisRotDefault_SubsysRanBC);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.Warning_SubsysRanBC_f);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.Error_SubsysRanBC_f);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.None_SubsysRanBC_a);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.IfNotProper_SubsysRanBC);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.Warning_SubsysRanBC);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.Error_SubsysRanBC);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.None_SubsysRanBC);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.ElseIfNotOrthogonal_SubsysRanBC);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.ElseNoAction_SubsysRanBC);

  // Reset subsysRan breadcrumbs
  srClearBC(Quadcopter_Controller_DW.IfWarningError_SubsysRanBC);

  // MATLABSystem: '<S2>/SourceBlock'
  tmp = uORB_read_step(Quadcopter_Controller_DW.obj_m.orbMetadataObj,
                       &Quadcopter_Controller_DW.obj_m.eventStructObj,
                       &Quadcopter_Controller_B.r1, false, 1.0);

  // Logic: '<S2>/NOT' incorporates:
  //   MATLABSystem: '<S2>/SourceBlock'
  //
  Quadcopter_Controller_B.NOT = !tmp;

  // MATLABSystem: '<S3>/SourceBlock'
  b_varargout_1 = uORB_read_step(Quadcopter_Controller_DW.obj.orbMetadataObj,
    &Quadcopter_Controller_DW.obj.eventStructObj, &Quadcopter_Controller_B.r,
    false, 1.0);

  // Logic: '<S3>/NOT' incorporates:
  //   MATLABSystem: '<S3>/SourceBlock'
  //
  Quadcopter_Controller_B.NOT_n = !b_varargout_1;

  // Outputs for Enabled SubSystem: '<S3>/Enabled Subsystem' incorporates:
  //   EnablePort: '<S6>/Enable'

  // Start for MATLABSystem: '<S3>/SourceBlock'
  if (b_varargout_1) {
    // SignalConversion generated from: '<S6>/In1'
    Quadcopter_Controller_B.In1 = Quadcopter_Controller_B.r;
    srUpdateBC(Quadcopter_Controller_DW.EnabledSubsystem_SubsysRanBC);
  }

  // End of Outputs for SubSystem: '<S3>/Enabled Subsystem'

  // Constant: '<S1>/des_alt'
  Quadcopter_Controller_B.des_alt = Quadcopter_Controller_P.des_alt_Value;

  // DataTypeConversion: '<S502>/Data Type Conversion'
  Quadcopter_Controller_B.DataTypeConversion[0] = Quadcopter_Controller_B.In1.x;
  Quadcopter_Controller_B.DataTypeConversion[1] = Quadcopter_Controller_B.In1.y;
  Quadcopter_Controller_B.DataTypeConversion[2] = Quadcopter_Controller_B.In1.z;

  // Sum: '<S11>/Add' incorporates:
  //   Gain: '<S1>/Gain'

  Quadcopter_Controller_B.DeadZone_n = Quadcopter_Controller_P.Gain_Gain *
    Quadcopter_Controller_B.des_alt -
    Quadcopter_Controller_B.DataTypeConversion[2];

  // Gain: '<S225>/Proportional Gain'
  Quadcopter_Controller_B.Saturation_g = Quadcopter_Controller_P.PID_Altitude_P *
    Quadcopter_Controller_B.DeadZone_n;

  // Gain: '<S223>/Filter Coefficient' incorporates:
  //   DiscreteIntegrator: '<S215>/Filter'
  //   Gain: '<S213>/Derivative Gain'
  //   Sum: '<S215>/SumD'

  Quadcopter_Controller_B.FilterCoefficient =
    (Quadcopter_Controller_P.PID_Altitude_D * Quadcopter_Controller_B.DeadZone_n
     - Quadcopter_Controller_DW.Filter_DSTATE) *
    Quadcopter_Controller_P.PID_Altitude_N;

  // Sum: '<S230>/Sum Fdbk'
  Quadcopter_Controller_B.Filter_f = (Quadcopter_Controller_B.Saturation_g +
    Quadcopter_Controller_DW.Integrator_DSTATE) +
    Quadcopter_Controller_B.FilterCoefficient;

  // DeadZone: '<S212>/DeadZone'
  if (Quadcopter_Controller_B.Filter_f >
      Quadcopter_Controller_P.PID_Altitude_UpperSaturationLim) {
    Quadcopter_Controller_B.Filter_f -=
      Quadcopter_Controller_P.PID_Altitude_UpperSaturationLim;
  } else if (Quadcopter_Controller_B.Filter_f >=
             Quadcopter_Controller_P.PID_Altitude_LowerSaturationLim) {
    Quadcopter_Controller_B.Filter_f = 0.0;
  } else {
    Quadcopter_Controller_B.Filter_f -=
      Quadcopter_Controller_P.PID_Altitude_LowerSaturationLim;
  }

  // End of DeadZone: '<S212>/DeadZone'

  // Gain: '<S217>/Integral Gain'
  Quadcopter_Controller_B.DeadZone_n *= Quadcopter_Controller_P.PID_Altitude_I;

  // Switch: '<S210>/Switch1' incorporates:
  //   Constant: '<S210>/Clamping_zero'
  //   Constant: '<S210>/Constant'
  //   Constant: '<S210>/Constant2'
  //   RelationalOperator: '<S210>/fix for DT propagation issue'

  if (Quadcopter_Controller_B.Filter_f >
      Quadcopter_Controller_P.Clamping_zero_Value) {
    tmp_0 = Quadcopter_Controller_P.Constant_Value_m;
  } else {
    tmp_0 = Quadcopter_Controller_P.Constant2_Value_c;
  }

  // Switch: '<S210>/Switch2' incorporates:
  //   Constant: '<S210>/Clamping_zero'
  //   Constant: '<S210>/Constant3'
  //   Constant: '<S210>/Constant4'
  //   RelationalOperator: '<S210>/fix for DT propagation issue1'

  if (Quadcopter_Controller_B.DeadZone_n >
      Quadcopter_Controller_P.Clamping_zero_Value) {
    tmp_1 = Quadcopter_Controller_P.Constant3_Value_e;
  } else {
    tmp_1 = Quadcopter_Controller_P.Constant4_Value_o;
  }

  // Switch: '<S210>/Switch' incorporates:
  //   Constant: '<S210>/Clamping_zero'
  //   Constant: '<S210>/Constant1'
  //   Logic: '<S210>/AND3'
  //   RelationalOperator: '<S210>/Equal1'
  //   RelationalOperator: '<S210>/Relational Operator'
  //   Switch: '<S210>/Switch1'
  //   Switch: '<S210>/Switch2'

  if ((Quadcopter_Controller_P.Clamping_zero_Value !=
       Quadcopter_Controller_B.Filter_f) && (tmp_0 == tmp_1)) {
    Quadcopter_Controller_B.DeadZone_n =
      Quadcopter_Controller_P.Constant1_Value_p;
  }

  // DiscreteIntegrator: '<S220>/Integrator' incorporates:
  //   Switch: '<S210>/Switch'

  Quadcopter_Controller_DW.Integrator_DSTATE +=
    Quadcopter_Controller_P.Integrator_gainval *
    Quadcopter_Controller_B.DeadZone_n;

  // Sum: '<S229>/Sum'
  Quadcopter_Controller_B.IntegralGain_o = (Quadcopter_Controller_B.Saturation_g
    + Quadcopter_Controller_DW.Integrator_DSTATE) +
    Quadcopter_Controller_B.FilterCoefficient;

  // Saturate: '<S227>/Saturation'
  if (Quadcopter_Controller_B.IntegralGain_o >
      Quadcopter_Controller_P.PID_Altitude_UpperSaturationLim) {
    Quadcopter_Controller_B.IntegralGain_o =
      Quadcopter_Controller_P.PID_Altitude_UpperSaturationLim;
  } else if (Quadcopter_Controller_B.IntegralGain_o <
             Quadcopter_Controller_P.PID_Altitude_LowerSaturationLim) {
    Quadcopter_Controller_B.IntegralGain_o =
      Quadcopter_Controller_P.PID_Altitude_LowerSaturationLim;
  }

  // Sum: '<S11>/Add1' incorporates:
  //   DataTypeConversion: '<S504>/Data Type Conversion'
  //   Saturate: '<S227>/Saturation'

  Quadcopter_Controller_B.Saturation_g = Quadcopter_Controller_B.In1.vz -
    Quadcopter_Controller_B.IntegralGain_o;

  // DiscreteIntegrator: '<S376>/Integrator' incorporates:
  //   Gain: '<S373>/Integral Gain'

  Quadcopter_Controller_DW.Integrator_DSTATE_k +=
    Quadcopter_Controller_P.PID_vz_I * Quadcopter_Controller_B.Saturation_g *
    Quadcopter_Controller_P.Integrator_gainval_l;

  // Gain: '<S379>/Filter Coefficient' incorporates:
  //   DiscreteIntegrator: '<S371>/Filter'
  //   Gain: '<S369>/Derivative Gain'
  //   Sum: '<S371>/SumD'

  Quadcopter_Controller_B.Filter_f = (Quadcopter_Controller_P.PID_vz_D *
    Quadcopter_Controller_B.Saturation_g -
    Quadcopter_Controller_DW.Filter_DSTATE_b) * Quadcopter_Controller_P.PID_vz_N;

  // Outputs for Enabled SubSystem: '<S2>/Enabled Subsystem' incorporates:
  //   EnablePort: '<S5>/Enable'

  // Start for MATLABSystem: '<S2>/SourceBlock'
  if (tmp) {
    // SignalConversion generated from: '<S5>/In1'
    Quadcopter_Controller_B.In1_b = Quadcopter_Controller_B.r1;
    srUpdateBC(Quadcopter_Controller_DW.EnabledSubsystem_SubsysRanBC_n);
  }

  // End of Outputs for SubSystem: '<S2>/Enabled Subsystem'

  // Sqrt: '<S546>/sqrt' incorporates:
  //   DataTypeConversion: '<S503>/Data Type Conversion1'
  //   Product: '<S547>/Product'
  //   Product: '<S547>/Product1'
  //   Product: '<S547>/Product2'
  //   Product: '<S547>/Product3'
  //   Sum: '<S547>/Sum'

  Quadcopter_Controller_B.DeadZone_n = sqrt(((static_cast<real_T>
    (Quadcopter_Controller_B.In1_b.q[0]) * Quadcopter_Controller_B.In1_b.q[0] +
    static_cast<real_T>(Quadcopter_Controller_B.In1_b.q[1]) *
    Quadcopter_Controller_B.In1_b.q[1]) + static_cast<real_T>
    (Quadcopter_Controller_B.In1_b.q[2]) * Quadcopter_Controller_B.In1_b.q[2]) +
    static_cast<real_T>(Quadcopter_Controller_B.In1_b.q[3]) *
    Quadcopter_Controller_B.In1_b.q[3]);

  // Product: '<S545>/Product' incorporates:
  //   DataTypeConversion: '<S503>/Data Type Conversion1'

  Quadcopter_Controller_B.IntegralGain_j = Quadcopter_Controller_B.In1_b.q[0] /
    Quadcopter_Controller_B.DeadZone_n;

  // Product: '<S545>/Product1' incorporates:
  //   DataTypeConversion: '<S503>/Data Type Conversion1'

  Quadcopter_Controller_B.Integrator_l = Quadcopter_Controller_B.In1_b.q[1] /
    Quadcopter_Controller_B.DeadZone_n;

  // Product: '<S545>/Product2' incorporates:
  //   DataTypeConversion: '<S503>/Data Type Conversion1'

  Quadcopter_Controller_B.Filter_l = Quadcopter_Controller_B.In1_b.q[2] /
    Quadcopter_Controller_B.DeadZone_n;

  // Product: '<S545>/Product3' incorporates:
  //   DataTypeConversion: '<S503>/Data Type Conversion1'

  Quadcopter_Controller_B.DeadZone_n = Quadcopter_Controller_B.In1_b.q[3] /
    Quadcopter_Controller_B.DeadZone_n;

  // Product: '<S535>/Product3' incorporates:
  //   Product: '<S539>/Product3'

  Quadcopter_Controller_B.FilterCoefficient_p =
    Quadcopter_Controller_B.IntegralGain_j *
    Quadcopter_Controller_B.IntegralGain_j;

  // Product: '<S535>/Product2' incorporates:
  //   Product: '<S539>/Product2'

  Quadcopter_Controller_B.DeadZone = Quadcopter_Controller_B.Integrator_l *
    Quadcopter_Controller_B.Integrator_l;

  // Product: '<S535>/Product1' incorporates:
  //   Product: '<S539>/Product1'
  //   Product: '<S543>/Product1'

  rtb_MatrixMultiply_idx_0 = Quadcopter_Controller_B.Filter_l *
    Quadcopter_Controller_B.Filter_l;

  // Product: '<S535>/Product' incorporates:
  //   Product: '<S539>/Product'
  //   Product: '<S543>/Product'

  rtb_MatrixMultiply_idx_1 = Quadcopter_Controller_B.DeadZone_n *
    Quadcopter_Controller_B.DeadZone_n;

  // Sum: '<S535>/Sum' incorporates:
  //   Product: '<S535>/Product'
  //   Product: '<S535>/Product1'
  //   Product: '<S535>/Product2'
  //   Product: '<S535>/Product3'

  Quadcopter_Controller_B.VectorConcatenate[0] =
    ((Quadcopter_Controller_B.FilterCoefficient_p +
      Quadcopter_Controller_B.DeadZone) - rtb_MatrixMultiply_idx_0) -
    rtb_MatrixMultiply_idx_1;

  // Product: '<S538>/Product3' incorporates:
  //   Product: '<S536>/Product3'

  Quadcopter_Controller_B.FilterCoefficient_db =
    Quadcopter_Controller_B.DeadZone_n * Quadcopter_Controller_B.IntegralGain_j;

  // Product: '<S538>/Product2' incorporates:
  //   Product: '<S536>/Product2'

  rtb_Merge_idx_1 = Quadcopter_Controller_B.Integrator_l *
    Quadcopter_Controller_B.Filter_l;

  // Gain: '<S538>/Gain' incorporates:
  //   Product: '<S538>/Product2'
  //   Product: '<S538>/Product3'
  //   Sum: '<S538>/Sum'

  Quadcopter_Controller_B.VectorConcatenate[1] = (rtb_Merge_idx_1 -
    Quadcopter_Controller_B.FilterCoefficient_db) *
    Quadcopter_Controller_P.Gain_Gain_f;

  // Product: '<S541>/Product2' incorporates:
  //   Product: '<S537>/Product2'

  Quadcopter_Controller_B.FilterCoefficient_f =
    Quadcopter_Controller_B.Integrator_l * Quadcopter_Controller_B.DeadZone_n;

  // Product: '<S541>/Product1' incorporates:
  //   Product: '<S537>/Product1'

  rtb_Merge_idx_2 = Quadcopter_Controller_B.IntegralGain_j *
    Quadcopter_Controller_B.Filter_l;

  // Gain: '<S541>/Gain' incorporates:
  //   Product: '<S541>/Product1'
  //   Product: '<S541>/Product2'
  //   Sum: '<S541>/Sum'

  Quadcopter_Controller_B.VectorConcatenate[2] = (rtb_Merge_idx_2 +
    Quadcopter_Controller_B.FilterCoefficient_f) *
    Quadcopter_Controller_P.Gain_Gain_o;

  // Gain: '<S536>/Gain' incorporates:
  //   Sum: '<S536>/Sum'

  Quadcopter_Controller_B.VectorConcatenate[3] =
    (Quadcopter_Controller_B.FilterCoefficient_db + rtb_Merge_idx_1) *
    Quadcopter_Controller_P.Gain_Gain_a;

  // Sum: '<S539>/Sum' incorporates:
  //   Sum: '<S543>/Sum'

  Quadcopter_Controller_B.FilterCoefficient_p -=
    Quadcopter_Controller_B.DeadZone;
  Quadcopter_Controller_B.VectorConcatenate[4] =
    (Quadcopter_Controller_B.FilterCoefficient_p + rtb_MatrixMultiply_idx_0) -
    rtb_MatrixMultiply_idx_1;

  // Product: '<S542>/Product1' incorporates:
  //   Product: '<S540>/Product1'

  Quadcopter_Controller_B.DeadZone = Quadcopter_Controller_B.IntegralGain_j *
    Quadcopter_Controller_B.Integrator_l;

  // Product: '<S542>/Product2' incorporates:
  //   Product: '<S540>/Product2'

  Quadcopter_Controller_B.FilterCoefficient_db =
    Quadcopter_Controller_B.Filter_l * Quadcopter_Controller_B.DeadZone_n;

  // Gain: '<S542>/Gain' incorporates:
  //   Product: '<S542>/Product1'
  //   Product: '<S542>/Product2'
  //   Sum: '<S542>/Sum'

  Quadcopter_Controller_B.VectorConcatenate[5] =
    (Quadcopter_Controller_B.FilterCoefficient_db -
     Quadcopter_Controller_B.DeadZone) * Quadcopter_Controller_P.Gain_Gain_ff;

  // Gain: '<S537>/Gain' incorporates:
  //   Sum: '<S537>/Sum'

  Quadcopter_Controller_B.VectorConcatenate[6] =
    (Quadcopter_Controller_B.FilterCoefficient_f - rtb_Merge_idx_2) *
    Quadcopter_Controller_P.Gain_Gain_n;

  // Gain: '<S540>/Gain' incorporates:
  //   Sum: '<S540>/Sum'

  Quadcopter_Controller_B.VectorConcatenate[7] =
    (Quadcopter_Controller_B.DeadZone +
     Quadcopter_Controller_B.FilterCoefficient_db) *
    Quadcopter_Controller_P.Gain_Gain_l;

  // Sum: '<S543>/Sum'
  Quadcopter_Controller_B.VectorConcatenate[8] =
    (Quadcopter_Controller_B.FilterCoefficient_p - rtb_MatrixMultiply_idx_0) +
    rtb_MatrixMultiply_idx_1;

  // Gain: '<S510>/Gain1' incorporates:
  //   Concatenate: '<S544>/Vector Concatenate'
  //   Selector: '<S510>/Selector1'

  Quadcopter_Controller_B.DeadZone_n = Quadcopter_Controller_P.Gain1_Gain[2] *
    Quadcopter_Controller_B.VectorConcatenate[6];

  // If: '<S506>/If'
  if ((Quadcopter_Controller_B.DeadZone_n >= 1.0) ||
      (Quadcopter_Controller_B.DeadZone_n <= -1.0)) {
    // Outputs for IfAction SubSystem: '<S506>/AxisRotZeroR3' incorporates:
    //   ActionPort: '<S509>/Action Port'

    // Fcn: '<S509>/Fcn1' incorporates:
    //   Concatenate: '<S544>/Vector Concatenate'
    //   Gain: '<S510>/Gain3'
    //   Selector: '<S510>/Selector3'

    rtb_Merge_idx_0 = rt_atan2d_snf(Quadcopter_Controller_P.Gain3_Gain[0] *
      Quadcopter_Controller_B.VectorConcatenate[1],
      Quadcopter_Controller_P.Gain3_Gain[1] *
      Quadcopter_Controller_B.VectorConcatenate[4]);

    // If: '<S516>/If' incorporates:
    //   Constant: '<S517>/Constant'
    //   Constant: '<S518>/Constant'

    if (Quadcopter_Controller_B.DeadZone_n > 1.0) {
      // Outputs for IfAction SubSystem: '<S516>/If Action Subsystem' incorporates:
      //   ActionPort: '<S517>/Action Port'

      Quadcopter_Controller_B.DeadZone_n =
        Quadcopter_Controller_P.Constant_Value_g;

      // End of Outputs for SubSystem: '<S516>/If Action Subsystem'

      // Update for IfAction SubSystem: '<S516>/If Action Subsystem' incorporates:
      //   ActionPort: '<S517>/Action Port'

      // Update for If: '<S516>/If' incorporates:
      //   Constant: '<S517>/Constant'

      srUpdateBC(Quadcopter_Controller_DW.IfActionSubsystem_SubsysRanBC_g);

      // End of Update for SubSystem: '<S516>/If Action Subsystem'
    } else if (Quadcopter_Controller_B.DeadZone_n < -1.0) {
      // Outputs for IfAction SubSystem: '<S516>/If Action Subsystem1' incorporates:
      //   ActionPort: '<S518>/Action Port'

      Quadcopter_Controller_B.DeadZone_n =
        Quadcopter_Controller_P.Constant_Value_p;

      // End of Outputs for SubSystem: '<S516>/If Action Subsystem1'

      // Update for IfAction SubSystem: '<S516>/If Action Subsystem1' incorporates:
      //   ActionPort: '<S518>/Action Port'

      // Update for If: '<S516>/If' incorporates:
      //   Constant: '<S518>/Constant'

      srUpdateBC(Quadcopter_Controller_DW.IfActionSubsystem1_SubsysRanB_j);

      // End of Update for SubSystem: '<S516>/If Action Subsystem1'
    } else {
      // Update for IfAction SubSystem: '<S516>/If Action Subsystem2' incorporates:
      //   ActionPort: '<S519>/Action Port'

      // Update for If: '<S516>/If'
      srUpdateBC(Quadcopter_Controller_DW.IfActionSubsystem2_SubsysRanB_g);

      // End of Update for SubSystem: '<S516>/If Action Subsystem2'
    }

    // End of If: '<S516>/If'

    // Fcn: '<S509>/Fcn2'
    if (Quadcopter_Controller_B.DeadZone_n > 1.0) {
      Quadcopter_Controller_B.DeadZone_n = 1.0;
    } else if (Quadcopter_Controller_B.DeadZone_n < -1.0) {
      Quadcopter_Controller_B.DeadZone_n = -1.0;
    }

    rtb_Merge_idx_1 = asin(Quadcopter_Controller_B.DeadZone_n);

    // End of Fcn: '<S509>/Fcn2'

    // Fcn: '<S509>/Fcn3'
    rtb_Merge_idx_2 = 0.0;

    // End of Outputs for SubSystem: '<S506>/AxisRotZeroR3'

    // Update for IfAction SubSystem: '<S506>/AxisRotZeroR3' incorporates:
    //   ActionPort: '<S509>/Action Port'

    // Update for If: '<S506>/If'
    srUpdateBC(Quadcopter_Controller_DW.AxisRotZeroR3_SubsysRanBC);

    // End of Update for SubSystem: '<S506>/AxisRotZeroR3'
  } else {
    // Outputs for IfAction SubSystem: '<S506>/AxisRotDefault' incorporates:
    //   ActionPort: '<S508>/Action Port'

    // Fcn: '<S508>/Fcn1' incorporates:
    //   Concatenate: '<S544>/Vector Concatenate'
    //   Gain: '<S510>/Gain1'
    //   Selector: '<S510>/Selector1'

    rtb_Merge_idx_0 = rt_atan2d_snf(Quadcopter_Controller_P.Gain1_Gain[0] *
      Quadcopter_Controller_B.VectorConcatenate[3],
      Quadcopter_Controller_B.VectorConcatenate[0] *
      Quadcopter_Controller_P.Gain1_Gain[1]);

    // Update for IfAction SubSystem: '<S512>/If Action Subsystem2' incorporates:
    //   ActionPort: '<S515>/Action Port'

    // Update for If: '<S512>/If'
    srUpdateBC(Quadcopter_Controller_DW.IfActionSubsystem2_SubsysRanBC);

    // End of Update for SubSystem: '<S512>/If Action Subsystem2'

    // Outputs for IfAction SubSystem: '<S512>/If Action Subsystem2' incorporates:
    //   ActionPort: '<S515>/Action Port'

    // If: '<S512>/If' incorporates:
    //   Fcn: '<S508>/Fcn2'
    //   SignalConversion generated from: '<S515>/In'

    rtb_Merge_idx_1 = asin(Quadcopter_Controller_B.DeadZone_n);

    // End of Outputs for SubSystem: '<S512>/If Action Subsystem2'

    // Fcn: '<S508>/Fcn3' incorporates:
    //   Concatenate: '<S544>/Vector Concatenate'
    //   Gain: '<S510>/Gain2'
    //   Selector: '<S510>/Selector2'

    rtb_Merge_idx_2 = rt_atan2d_snf(Quadcopter_Controller_P.Gain2_Gain[0] *
      Quadcopter_Controller_B.VectorConcatenate[7],
      Quadcopter_Controller_P.Gain2_Gain[1] *
      Quadcopter_Controller_B.VectorConcatenate[8]);

    // End of Outputs for SubSystem: '<S506>/AxisRotDefault'

    // Update for IfAction SubSystem: '<S506>/AxisRotDefault' incorporates:
    //   ActionPort: '<S508>/Action Port'

    // Update for If: '<S506>/If'
    srUpdateBC(Quadcopter_Controller_DW.AxisRotDefault_SubsysRanBC);

    // End of Update for SubSystem: '<S506>/AxisRotDefault'
  }

  // End of If: '<S506>/If'

  // Sin: '<S1>/x+'
  if (Quadcopter_Controller_DW.systemEnable != 0) {
    Quadcopter_Controller_B.DeadZone_n = Quadcopter_Controller_P.x_Freq *
      Quadcopter_Controller_M->Timing.taskTime0;
    Quadcopter_Controller_DW.lastSin = sin(Quadcopter_Controller_B.DeadZone_n);
    Quadcopter_Controller_DW.lastCos = cos(Quadcopter_Controller_B.DeadZone_n);
    Quadcopter_Controller_DW.systemEnable = 0;
  }

  // Sin: '<S1>/x+'
  Quadcopter_Controller_B.x = ((Quadcopter_Controller_DW.lastSin *
    Quadcopter_Controller_P.x_PCos + Quadcopter_Controller_DW.lastCos *
    Quadcopter_Controller_P.x_PSin) * Quadcopter_Controller_P.x_HCos +
    (Quadcopter_Controller_DW.lastCos * Quadcopter_Controller_P.x_PCos -
     Quadcopter_Controller_DW.lastSin * Quadcopter_Controller_P.x_PSin) *
    Quadcopter_Controller_P.x_Hsin) * Quadcopter_Controller_P.x_Amp +
    Quadcopter_Controller_P.x_Bias;

  // Switch: '<S1>/Switch' incorporates:
  //   Constant: '<S1>/X_SwitchOn_Sine Wave'
  //   Constant: '<S1>/des_x'

  if (Quadcopter_Controller_P.X_SwitchOn_SineWave_Value >
      Quadcopter_Controller_P.Switch_Threshold) {
    Quadcopter_Controller_B.IntegralGain_o = Quadcopter_Controller_B.x;
  } else {
    Quadcopter_Controller_B.IntegralGain_o = Quadcopter_Controller_P.des_x_Value;
  }

  // Sum: '<S11>/Subtract1' incorporates:
  //   Switch: '<S1>/Switch'

  Quadcopter_Controller_B.IntegralGain_j =
    Quadcopter_Controller_B.IntegralGain_o -
    Quadcopter_Controller_B.DataTypeConversion[0];

  // Gain: '<S433>/Filter Coefficient' incorporates:
  //   DiscreteIntegrator: '<S425>/Filter'
  //   Gain: '<S423>/Derivative Gain'
  //   Sum: '<S425>/SumD'

  Quadcopter_Controller_B.Integrator_l = (Quadcopter_Controller_P.PID_x_D *
    Quadcopter_Controller_B.IntegralGain_j -
    Quadcopter_Controller_DW.Filter_DSTATE_f) * Quadcopter_Controller_P.PID_x_N;

  // Sum: '<S439>/Sum' incorporates:
  //   DiscreteIntegrator: '<S430>/Integrator'
  //   Gain: '<S435>/Proportional Gain'

  Quadcopter_Controller_B.DeadZone_n = (Quadcopter_Controller_P.PID_x_P *
    Quadcopter_Controller_B.IntegralGain_j +
    Quadcopter_Controller_DW.Integrator_DSTATE_b) +
    Quadcopter_Controller_B.Integrator_l;

  // Sin: '<S1>/y+'
  if (Quadcopter_Controller_DW.systemEnable_e != 0) {
    Quadcopter_Controller_B.Filter_l = Quadcopter_Controller_P.y_Freq *
      Quadcopter_Controller_M->Timing.taskTime0;
    Quadcopter_Controller_DW.lastSin_k = sin(Quadcopter_Controller_B.Filter_l);
    Quadcopter_Controller_DW.lastCos_e = cos(Quadcopter_Controller_B.Filter_l);
    Quadcopter_Controller_DW.systemEnable_e = 0;
  }

  // Sin: '<S1>/y+'
  Quadcopter_Controller_B.y = ((Quadcopter_Controller_DW.lastSin_k *
    Quadcopter_Controller_P.y_PCos + Quadcopter_Controller_DW.lastCos_e *
    Quadcopter_Controller_P.y_PSin) * Quadcopter_Controller_P.y_HCos +
    (Quadcopter_Controller_DW.lastCos_e * Quadcopter_Controller_P.y_PCos -
     Quadcopter_Controller_DW.lastSin_k * Quadcopter_Controller_P.y_PSin) *
    Quadcopter_Controller_P.y_Hsin) * Quadcopter_Controller_P.y_Amp +
    Quadcopter_Controller_P.y_Bias;

  // Switch: '<S1>/Switch1' incorporates:
  //   Constant: '<S1>/X_SwitchOn_Sine Wave'
  //   Constant: '<S1>/des_y'

  if (Quadcopter_Controller_P.X_SwitchOn_SineWave_Value >
      Quadcopter_Controller_P.Switch1_Threshold) {
    Quadcopter_Controller_B.IntegralGain_o = Quadcopter_Controller_B.y;
  } else {
    Quadcopter_Controller_B.IntegralGain_o = Quadcopter_Controller_P.des_y_Value;
  }

  // Sum: '<S11>/Subtract2' incorporates:
  //   Switch: '<S1>/Switch1'

  Quadcopter_Controller_B.Filter_l = Quadcopter_Controller_B.IntegralGain_o -
    Quadcopter_Controller_B.DataTypeConversion[1];

  // Gain: '<S487>/Filter Coefficient' incorporates:
  //   DiscreteIntegrator: '<S479>/Filter'
  //   Gain: '<S477>/Derivative Gain'
  //   Sum: '<S479>/SumD'

  Quadcopter_Controller_B.FilterCoefficient_p = (Quadcopter_Controller_P.PID_y_D
    * Quadcopter_Controller_B.Filter_l -
    Quadcopter_Controller_DW.Filter_DSTATE_j) * Quadcopter_Controller_P.PID_y_N;

  // Sum: '<S493>/Sum' incorporates:
  //   DiscreteIntegrator: '<S484>/Integrator'
  //   Gain: '<S489>/Proportional Gain'

  Quadcopter_Controller_B.DeadZone = (Quadcopter_Controller_P.PID_y_P *
    Quadcopter_Controller_B.Filter_l +
    Quadcopter_Controller_DW.Integrator_DSTATE_j) +
    Quadcopter_Controller_B.FilterCoefficient_p;

  // MATLAB Function: '<S11>/Rotation mat '
  rtb_MatrixMultiply_idx_1 = sin(rtb_Merge_idx_0);
  Quadcopter_Controller_B.FilterCoefficient_db = cos(rtb_Merge_idx_0);

  // Saturate: '<S437>/Saturation'
  if (Quadcopter_Controller_B.DeadZone_n >
      Quadcopter_Controller_P.PID_x_UpperSaturationLimit) {
    Quadcopter_Controller_B.IntegralGain_o =
      Quadcopter_Controller_P.PID_x_UpperSaturationLimit;
  } else if (Quadcopter_Controller_B.DeadZone_n <
             Quadcopter_Controller_P.PID_x_LowerSaturationLimit) {
    Quadcopter_Controller_B.IntegralGain_o =
      Quadcopter_Controller_P.PID_x_LowerSaturationLimit;
  } else {
    Quadcopter_Controller_B.IntegralGain_o = Quadcopter_Controller_B.DeadZone_n;
  }

  // Sum: '<S11>/Subtract' incorporates:
  //   DataTypeConversion: '<S504>/Data Type Conversion'
  //   Saturate: '<S437>/Saturation'

  Quadcopter_Controller_B.FilterCoefficient_f = Quadcopter_Controller_B.In1.vx -
    Quadcopter_Controller_B.IntegralGain_o;

  // Saturate: '<S491>/Saturation'
  if (Quadcopter_Controller_B.DeadZone >
      Quadcopter_Controller_P.PID_y_UpperSaturationLimit) {
    Quadcopter_Controller_B.IntegralGain_o =
      Quadcopter_Controller_P.PID_y_UpperSaturationLimit;
  } else if (Quadcopter_Controller_B.DeadZone <
             Quadcopter_Controller_P.PID_y_LowerSaturationLimit) {
    Quadcopter_Controller_B.IntegralGain_o =
      Quadcopter_Controller_P.PID_y_LowerSaturationLimit;
  } else {
    Quadcopter_Controller_B.IntegralGain_o = Quadcopter_Controller_B.DeadZone;
  }

  // Sum: '<S11>/Subtract' incorporates:
  //   DataTypeConversion: '<S504>/Data Type Conversion'
  //   Saturate: '<S491>/Saturation'

  Quadcopter_Controller_B.IntegralGain_o = Quadcopter_Controller_B.In1.vy -
    Quadcopter_Controller_B.IntegralGain_o;

  // Product: '<S11>/MatrixMultiply' incorporates:
  //   MATLAB Function: '<S11>/Rotation mat '

  rtb_MatrixMultiply_idx_0 = Quadcopter_Controller_B.FilterCoefficient_db *
    Quadcopter_Controller_B.FilterCoefficient_f + rtb_MatrixMultiply_idx_1 *
    Quadcopter_Controller_B.IntegralGain_o;
  rtb_MatrixMultiply_idx_1 = -rtb_MatrixMultiply_idx_1 *
    Quadcopter_Controller_B.FilterCoefficient_f +
    Quadcopter_Controller_B.FilterCoefficient_db *
    Quadcopter_Controller_B.IntegralGain_o;

  // Gain: '<S275>/Filter Coefficient' incorporates:
  //   DiscreteIntegrator: '<S267>/Filter'
  //   Gain: '<S265>/Derivative Gain'
  //   Sum: '<S267>/SumD'

  Quadcopter_Controller_B.FilterCoefficient_db =
    (Quadcopter_Controller_P.PID_vx_D * rtb_MatrixMultiply_idx_0 -
     Quadcopter_Controller_DW.Filter_DSTATE_o) *
    Quadcopter_Controller_P.PID_vx_N;

  // Sum: '<S281>/Sum' incorporates:
  //   DiscreteIntegrator: '<S272>/Integrator'
  //   Gain: '<S277>/Proportional Gain'

  Quadcopter_Controller_B.IntegralGain_o = (Quadcopter_Controller_P.PID_vx_P *
    rtb_MatrixMultiply_idx_0 + Quadcopter_Controller_DW.Integrator_DSTATE_f) +
    Quadcopter_Controller_B.FilterCoefficient_db;

  // Saturate: '<S279>/Saturation'
  if (Quadcopter_Controller_B.IntegralGain_o >
      Quadcopter_Controller_P.PID_vx_UpperSaturationLimit) {
    Quadcopter_Controller_B.IntegralGain_o =
      Quadcopter_Controller_P.PID_vx_UpperSaturationLimit;
  } else if (Quadcopter_Controller_B.IntegralGain_o <
             Quadcopter_Controller_P.PID_vx_LowerSaturationLimit) {
    Quadcopter_Controller_B.IntegralGain_o =
      Quadcopter_Controller_P.PID_vx_LowerSaturationLimit;
  }

  // Sum: '<S10>/Add2' incorporates:
  //   Gain: '<S14>/Gain1'
  //   Saturate: '<S279>/Saturation'

  Quadcopter_Controller_B.Saturation_e = rtb_Merge_idx_1 -
    Quadcopter_Controller_P.Gain1_Gain_c *
    Quadcopter_Controller_B.IntegralGain_o;

  // DiscreteIntegrator: '<S53>/Integrator' incorporates:
  //   Gain: '<S50>/Integral Gain'

  Quadcopter_Controller_DW.Integrator_DSTATE_o +=
    Quadcopter_Controller_P.PID_pitch_I * Quadcopter_Controller_B.Saturation_e *
    Quadcopter_Controller_P.Integrator_gainval_ld;

  // Gain: '<S56>/Filter Coefficient' incorporates:
  //   DiscreteIntegrator: '<S48>/Filter'
  //   Gain: '<S46>/Derivative Gain'
  //   Sum: '<S48>/SumD'

  rtb_Merge_idx_1 = (Quadcopter_Controller_P.PID_pitch_D *
                     Quadcopter_Controller_B.Saturation_e -
                     Quadcopter_Controller_DW.Filter_DSTATE_ox) *
    Quadcopter_Controller_P.PID_pitch_N;

  // Gain: '<S327>/Filter Coefficient' incorporates:
  //   DiscreteIntegrator: '<S319>/Filter'
  //   Gain: '<S317>/Derivative Gain'
  //   Sum: '<S319>/SumD'

  Quadcopter_Controller_B.FilterCoefficient_f =
    (Quadcopter_Controller_P.PID_vy_D * rtb_MatrixMultiply_idx_1 -
     Quadcopter_Controller_DW.Filter_DSTATE_oxe) *
    Quadcopter_Controller_P.PID_vy_N;

  // Sum: '<S333>/Sum' incorporates:
  //   DiscreteIntegrator: '<S324>/Integrator'
  //   Gain: '<S329>/Proportional Gain'

  Quadcopter_Controller_B.IntegralGain_o = (Quadcopter_Controller_P.PID_vy_P *
    rtb_MatrixMultiply_idx_1 + Quadcopter_Controller_DW.Integrator_DSTATE_jo) +
    Quadcopter_Controller_B.FilterCoefficient_f;

  // Saturate: '<S331>/Saturation'
  if (Quadcopter_Controller_B.IntegralGain_o >
      Quadcopter_Controller_P.PID_vy_UpperSaturationLimit) {
    Quadcopter_Controller_B.IntegralGain_o =
      Quadcopter_Controller_P.PID_vy_UpperSaturationLimit;
  } else if (Quadcopter_Controller_B.IntegralGain_o <
             Quadcopter_Controller_P.PID_vy_LowerSaturationLimit) {
    Quadcopter_Controller_B.IntegralGain_o =
      Quadcopter_Controller_P.PID_vy_LowerSaturationLimit;
  }

  // Sum: '<S10>/Add3' incorporates:
  //   Gain: '<S11>/Gain'
  //   Gain: '<S15>/Gain1'
  //   Saturate: '<S331>/Saturation'

  Quadcopter_Controller_B.Filter_o = rtb_Merge_idx_2 -
    Quadcopter_Controller_P.Gain_Gain_p * Quadcopter_Controller_B.IntegralGain_o
    * Quadcopter_Controller_P.Gain1_Gain_d;

  // DiscreteIntegrator: '<S105>/Integrator' incorporates:
  //   Gain: '<S102>/Integral Gain'

  Quadcopter_Controller_DW.Integrator_DSTATE_m +=
    Quadcopter_Controller_P.PID_roll_I * Quadcopter_Controller_B.Filter_o *
    Quadcopter_Controller_P.Integrator_gainval_e1;

  // Gain: '<S108>/Filter Coefficient' incorporates:
  //   DiscreteIntegrator: '<S100>/Filter'
  //   Gain: '<S98>/Derivative Gain'
  //   Sum: '<S100>/SumD'

  rtb_Merge_idx_2 = (Quadcopter_Controller_P.PID_roll_D *
                     Quadcopter_Controller_B.Filter_o -
                     Quadcopter_Controller_DW.Filter_DSTATE_d) *
    Quadcopter_Controller_P.PID_roll_N;

  // Sum: '<S10>/Add1' incorporates:
  //   Constant: '<S1>/des_yaw'
  //   Gain: '<S13>/Gain1'

  Quadcopter_Controller_B.IntegralGain_o = Quadcopter_Controller_P.Gain1_Gain_n *
    Quadcopter_Controller_P.des_yaw_Value - rtb_Merge_idx_0;

  // Gain: '<S164>/Proportional Gain'
  Quadcopter_Controller_B.Saturation_l = Quadcopter_Controller_P.PID_yaw_P *
    Quadcopter_Controller_B.IntegralGain_o;

  // Gain: '<S162>/Filter Coefficient' incorporates:
  //   DiscreteIntegrator: '<S154>/Filter'
  //   Gain: '<S152>/Derivative Gain'
  //   Sum: '<S154>/SumD'

  rtb_Merge_idx_0 = (Quadcopter_Controller_P.PID_yaw_D *
                     Quadcopter_Controller_B.IntegralGain_o -
                     Quadcopter_Controller_DW.Filter_DSTATE_k) *
    Quadcopter_Controller_P.PID_yaw_N;

  // Sum: '<S169>/Sum Fdbk'
  Quadcopter_Controller_B.DeadZone_l = (Quadcopter_Controller_B.Saturation_l +
    Quadcopter_Controller_DW.Integrator_DSTATE_i) + rtb_Merge_idx_0;

  // DeadZone: '<S151>/DeadZone'
  if (Quadcopter_Controller_B.DeadZone_l >
      Quadcopter_Controller_P.PID_yaw_UpperSaturationLimit) {
    Quadcopter_Controller_B.DeadZone_l -=
      Quadcopter_Controller_P.PID_yaw_UpperSaturationLimit;
  } else if (Quadcopter_Controller_B.DeadZone_l >=
             Quadcopter_Controller_P.PID_yaw_LowerSaturationLimit) {
    Quadcopter_Controller_B.DeadZone_l = 0.0;
  } else {
    Quadcopter_Controller_B.DeadZone_l -=
      Quadcopter_Controller_P.PID_yaw_LowerSaturationLimit;
  }

  // End of DeadZone: '<S151>/DeadZone'

  // Gain: '<S156>/Integral Gain'
  Quadcopter_Controller_B.IntegralGain_o *= Quadcopter_Controller_P.PID_yaw_I;

  // Switch: '<S149>/Switch1' incorporates:
  //   Constant: '<S149>/Clamping_zero'
  //   Constant: '<S149>/Constant'
  //   Constant: '<S149>/Constant2'
  //   RelationalOperator: '<S149>/fix for DT propagation issue'

  if (Quadcopter_Controller_B.DeadZone_l >
      Quadcopter_Controller_P.Clamping_zero_Value_m) {
    tmp_0 = Quadcopter_Controller_P.Constant_Value_nq;
  } else {
    tmp_0 = Quadcopter_Controller_P.Constant2_Value;
  }

  // Switch: '<S149>/Switch2' incorporates:
  //   Constant: '<S149>/Clamping_zero'
  //   Constant: '<S149>/Constant3'
  //   Constant: '<S149>/Constant4'
  //   RelationalOperator: '<S149>/fix for DT propagation issue1'

  if (Quadcopter_Controller_B.IntegralGain_o >
      Quadcopter_Controller_P.Clamping_zero_Value_m) {
    tmp_1 = Quadcopter_Controller_P.Constant3_Value;
  } else {
    tmp_1 = Quadcopter_Controller_P.Constant4_Value;
  }

  // Switch: '<S149>/Switch' incorporates:
  //   Constant: '<S149>/Clamping_zero'
  //   Constant: '<S149>/Constant1'
  //   Logic: '<S149>/AND3'
  //   RelationalOperator: '<S149>/Equal1'
  //   RelationalOperator: '<S149>/Relational Operator'
  //   Switch: '<S149>/Switch1'
  //   Switch: '<S149>/Switch2'

  if ((Quadcopter_Controller_P.Clamping_zero_Value_m !=
       Quadcopter_Controller_B.DeadZone_l) && (tmp_0 == tmp_1)) {
    Quadcopter_Controller_B.IntegralGain_o =
      Quadcopter_Controller_P.Constant1_Value_c;
  }

  // DiscreteIntegrator: '<S159>/Integrator' incorporates:
  //   Switch: '<S149>/Switch'

  Quadcopter_Controller_DW.Integrator_DSTATE_i +=
    Quadcopter_Controller_P.Integrator_gainval_b *
    Quadcopter_Controller_B.IntegralGain_o;

  // Sum: '<S385>/Sum' incorporates:
  //   Gain: '<S381>/Proportional Gain'

  Quadcopter_Controller_B.IntegralGain_o = (Quadcopter_Controller_P.PID_vz_P *
    Quadcopter_Controller_B.Saturation_g +
    Quadcopter_Controller_DW.Integrator_DSTATE_k) +
    Quadcopter_Controller_B.Filter_f;

  // Sum: '<S62>/Sum' incorporates:
  //   Gain: '<S58>/Proportional Gain'

  Quadcopter_Controller_B.Saturation_g = (Quadcopter_Controller_P.PID_pitch_P *
    Quadcopter_Controller_B.Saturation_e +
    Quadcopter_Controller_DW.Integrator_DSTATE_o) + rtb_Merge_idx_1;

  // Sum: '<S114>/Sum' incorporates:
  //   Gain: '<S110>/Proportional Gain'

  Quadcopter_Controller_B.Saturation_e = (Quadcopter_Controller_P.PID_roll_P *
    Quadcopter_Controller_B.Filter_o +
    Quadcopter_Controller_DW.Integrator_DSTATE_m) + rtb_Merge_idx_2;

  // Sum: '<S168>/Sum'
  Quadcopter_Controller_B.Filter_o = (Quadcopter_Controller_B.Saturation_l +
    Quadcopter_Controller_DW.Integrator_DSTATE_i) + rtb_Merge_idx_0;

  // Saturate: '<S383>/Saturation'
  if (Quadcopter_Controller_B.IntegralGain_o >
      Quadcopter_Controller_P.PID_vz_UpperSaturationLimit) {
    // SignalConversion generated from: '<S12>/Product1'
    Quadcopter_Controller_B.dv[0] =
      Quadcopter_Controller_P.PID_vz_UpperSaturationLimit;
  } else if (Quadcopter_Controller_B.IntegralGain_o <
             Quadcopter_Controller_P.PID_vz_LowerSaturationLimit) {
    // SignalConversion generated from: '<S12>/Product1'
    Quadcopter_Controller_B.dv[0] =
      Quadcopter_Controller_P.PID_vz_LowerSaturationLimit;
  } else {
    // SignalConversion generated from: '<S12>/Product1'
    Quadcopter_Controller_B.dv[0] = Quadcopter_Controller_B.IntegralGain_o;
  }

  // End of Saturate: '<S383>/Saturation'

  // Saturate: '<S60>/Saturation'
  if (Quadcopter_Controller_B.Saturation_g >
      Quadcopter_Controller_P.PID_pitch_UpperSaturationLimit) {
    // SignalConversion generated from: '<S12>/Product1'
    Quadcopter_Controller_B.dv[1] =
      Quadcopter_Controller_P.PID_pitch_UpperSaturationLimit;
  } else if (Quadcopter_Controller_B.Saturation_g <
             Quadcopter_Controller_P.PID_pitch_LowerSaturationLimit) {
    // SignalConversion generated from: '<S12>/Product1'
    Quadcopter_Controller_B.dv[1] =
      Quadcopter_Controller_P.PID_pitch_LowerSaturationLimit;
  } else {
    // SignalConversion generated from: '<S12>/Product1'
    Quadcopter_Controller_B.dv[1] = Quadcopter_Controller_B.Saturation_g;
  }

  // End of Saturate: '<S60>/Saturation'

  // Saturate: '<S112>/Saturation'
  if (Quadcopter_Controller_B.Saturation_e >
      Quadcopter_Controller_P.PID_roll_UpperSaturationLimit) {
    // SignalConversion generated from: '<S12>/Product1'
    Quadcopter_Controller_B.dv[2] =
      Quadcopter_Controller_P.PID_roll_UpperSaturationLimit;
  } else if (Quadcopter_Controller_B.Saturation_e <
             Quadcopter_Controller_P.PID_roll_LowerSaturationLimit) {
    // SignalConversion generated from: '<S12>/Product1'
    Quadcopter_Controller_B.dv[2] =
      Quadcopter_Controller_P.PID_roll_LowerSaturationLimit;
  } else {
    // SignalConversion generated from: '<S12>/Product1'
    Quadcopter_Controller_B.dv[2] = Quadcopter_Controller_B.Saturation_e;
  }

  // End of Saturate: '<S112>/Saturation'

  // Saturate: '<S166>/Saturation'
  if (Quadcopter_Controller_B.Filter_o >
      Quadcopter_Controller_P.PID_yaw_UpperSaturationLimit) {
    // SignalConversion generated from: '<S12>/Product1'
    Quadcopter_Controller_B.dv[3] =
      Quadcopter_Controller_P.PID_yaw_UpperSaturationLimit;
  } else if (Quadcopter_Controller_B.Filter_o <
             Quadcopter_Controller_P.PID_yaw_LowerSaturationLimit) {
    // SignalConversion generated from: '<S12>/Product1'
    Quadcopter_Controller_B.dv[3] =
      Quadcopter_Controller_P.PID_yaw_LowerSaturationLimit;
  } else {
    // SignalConversion generated from: '<S12>/Product1'
    Quadcopter_Controller_B.dv[3] = Quadcopter_Controller_B.Filter_o;
  }

  // End of Saturate: '<S166>/Saturation'

  // Product: '<S12>/Product1' incorporates:
  //   Constant: '<S12>/Mixer matrix'

  Quadcopter_Controller_B.Filter_o = 0.0;
  Quadcopter_Controller_B.Saturation_l = 0.0;
  Quadcopter_Controller_B.Saturation_e = 0.0;
  Quadcopter_Controller_B.Saturation_g = 0.0;
  for (i = 0; i < 4; i++) {
    Quadcopter_Controller_B.IntegralGain_o = Quadcopter_Controller_B.dv[i];
    i_0 = i << 2;
    Quadcopter_Controller_B.Filter_o +=
      Quadcopter_Controller_P.Mixermatrix_Value[i_0] *
      Quadcopter_Controller_B.IntegralGain_o;
    Quadcopter_Controller_B.Saturation_l +=
      Quadcopter_Controller_P.Mixermatrix_Value[i_0 + 1] *
      Quadcopter_Controller_B.IntegralGain_o;
    Quadcopter_Controller_B.Saturation_e +=
      Quadcopter_Controller_P.Mixermatrix_Value[i_0 + 2] *
      Quadcopter_Controller_B.IntegralGain_o;
    Quadcopter_Controller_B.Saturation_g +=
      Quadcopter_Controller_P.Mixermatrix_Value[i_0 + 3] *
      Quadcopter_Controller_B.IntegralGain_o;
  }

  // End of Product: '<S12>/Product1'

  // Saturate: '<S12>/Saturation'
  if (Quadcopter_Controller_B.Filter_o >
      Quadcopter_Controller_P.Saturation_UpperSat) {
    Quadcopter_Controller_B.Filter_o =
      Quadcopter_Controller_P.Saturation_UpperSat;
  } else if (Quadcopter_Controller_B.Filter_o <
             Quadcopter_Controller_P.Saturation_LowerSat) {
    Quadcopter_Controller_B.Filter_o =
      Quadcopter_Controller_P.Saturation_LowerSat;
  }

  // DataTypeConversion: '<S8>/Data Type Conversion' incorporates:
  //   Constant: '<S8>/Constant'
  //   Gain: '<S8>/Gain'
  //   Saturate: '<S12>/Saturation'
  //   Sum: '<S8>/Sum'

  Quadcopter_Controller_B.IntegralGain_o = floor
    (Quadcopter_Controller_P.Gain_Gain_j * Quadcopter_Controller_B.Filter_o +
     Quadcopter_Controller_P.Constant_Value_o);
  if (rtIsNaN(Quadcopter_Controller_B.IntegralGain_o) || rtIsInf
      (Quadcopter_Controller_B.IntegralGain_o)) {
    Quadcopter_Controller_B.IntegralGain_o = 0.0;
  } else {
    Quadcopter_Controller_B.IntegralGain_o = fmod
      (Quadcopter_Controller_B.IntegralGain_o, 65536.0);
  }

  // Saturate: '<S12>/Saturation'
  if (Quadcopter_Controller_B.Saturation_l >
      Quadcopter_Controller_P.Saturation_UpperSat) {
    Quadcopter_Controller_B.Saturation_l =
      Quadcopter_Controller_P.Saturation_UpperSat;
  } else if (Quadcopter_Controller_B.Saturation_l <
             Quadcopter_Controller_P.Saturation_LowerSat) {
    Quadcopter_Controller_B.Saturation_l =
      Quadcopter_Controller_P.Saturation_LowerSat;
  }

  // DataTypeConversion: '<S8>/Data Type Conversion' incorporates:
  //   Constant: '<S8>/Constant'
  //   Gain: '<S8>/Gain'
  //   Saturate: '<S12>/Saturation'
  //   Sum: '<S8>/Sum'

  Quadcopter_Controller_B.Filter_o = floor(Quadcopter_Controller_P.Gain_Gain_j *
    Quadcopter_Controller_B.Saturation_l +
    Quadcopter_Controller_P.Constant_Value_o);
  if (rtIsNaN(Quadcopter_Controller_B.Filter_o) || rtIsInf
      (Quadcopter_Controller_B.Filter_o)) {
    Quadcopter_Controller_B.Filter_o = 0.0;
  } else {
    Quadcopter_Controller_B.Filter_o = fmod(Quadcopter_Controller_B.Filter_o,
      65536.0);
  }

  // Saturate: '<S12>/Saturation'
  if (Quadcopter_Controller_B.Saturation_e >
      Quadcopter_Controller_P.Saturation_UpperSat) {
    Quadcopter_Controller_B.Saturation_e =
      Quadcopter_Controller_P.Saturation_UpperSat;
  } else if (Quadcopter_Controller_B.Saturation_e <
             Quadcopter_Controller_P.Saturation_LowerSat) {
    Quadcopter_Controller_B.Saturation_e =
      Quadcopter_Controller_P.Saturation_LowerSat;
  }

  // DataTypeConversion: '<S8>/Data Type Conversion' incorporates:
  //   Constant: '<S8>/Constant'
  //   Gain: '<S8>/Gain'
  //   Saturate: '<S12>/Saturation'
  //   Sum: '<S8>/Sum'

  Quadcopter_Controller_B.Saturation_e = floor
    (Quadcopter_Controller_P.Gain_Gain_j * Quadcopter_Controller_B.Saturation_e
     + Quadcopter_Controller_P.Constant_Value_o);
  if (rtIsNaN(Quadcopter_Controller_B.Saturation_e) || rtIsInf
      (Quadcopter_Controller_B.Saturation_e)) {
    Quadcopter_Controller_B.Saturation_e = 0.0;
  } else {
    Quadcopter_Controller_B.Saturation_e = fmod
      (Quadcopter_Controller_B.Saturation_e, 65536.0);
  }

  // Saturate: '<S12>/Saturation'
  if (Quadcopter_Controller_B.Saturation_g >
      Quadcopter_Controller_P.Saturation_UpperSat) {
    Quadcopter_Controller_B.Saturation_g =
      Quadcopter_Controller_P.Saturation_UpperSat;
  } else if (Quadcopter_Controller_B.Saturation_g <
             Quadcopter_Controller_P.Saturation_LowerSat) {
    Quadcopter_Controller_B.Saturation_g =
      Quadcopter_Controller_P.Saturation_LowerSat;
  }

  // DataTypeConversion: '<S8>/Data Type Conversion' incorporates:
  //   Constant: '<S8>/Constant'
  //   Gain: '<S8>/Gain'
  //   Saturate: '<S12>/Saturation'
  //   Sum: '<S8>/Sum'

  Quadcopter_Controller_B.Saturation_g = floor
    (Quadcopter_Controller_P.Gain_Gain_j * Quadcopter_Controller_B.Saturation_g
     + Quadcopter_Controller_P.Constant_Value_o);
  if (rtIsNaN(Quadcopter_Controller_B.Saturation_g) || rtIsInf
      (Quadcopter_Controller_B.Saturation_g)) {
    Quadcopter_Controller_B.Saturation_g = 0.0;
  } else {
    Quadcopter_Controller_B.Saturation_g = fmod
      (Quadcopter_Controller_B.Saturation_g, 65536.0);
  }

  // MATLABSystem: '<Root>/PX4 PWM Output' incorporates:
  //   Constant: '<S4>/Constant'
  //   DataTypeConversion: '<S8>/Data Type Conversion'
  //   Logic: '<Root>/NOT'
  //
  for (i = 0; i < 8; i++) {
    Quadcopter_Controller_B.pwmValue[i] = 0U;
  }

  Quadcopter_Controller_B.pwmValue[0] = static_cast<uint16_T>
    (Quadcopter_Controller_B.IntegralGain_o < 0.0 ? static_cast<int32_T>(
      static_cast<uint16_T>(-static_cast<int16_T>(static_cast<uint16_T>
        (-Quadcopter_Controller_B.IntegralGain_o)))) : static_cast<int32_T>(
      static_cast<uint16_T>(Quadcopter_Controller_B.IntegralGain_o)));
  Quadcopter_Controller_B.pwmValue[1] = static_cast<uint16_T>
    (Quadcopter_Controller_B.Filter_o < 0.0 ? static_cast<int32_T>
     (static_cast<uint16_T>(-static_cast<int16_T>(static_cast<uint16_T>
        (-Quadcopter_Controller_B.Filter_o)))) : static_cast<int32_T>(
      static_cast<uint16_T>(Quadcopter_Controller_B.Filter_o)));
  Quadcopter_Controller_B.pwmValue[2] = static_cast<uint16_T>
    (Quadcopter_Controller_B.Saturation_e < 0.0 ? static_cast<int32_T>(
      static_cast<uint16_T>(-static_cast<int16_T>(static_cast<uint16_T>
        (-Quadcopter_Controller_B.Saturation_e)))) : static_cast<int32_T>(
      static_cast<uint16_T>(Quadcopter_Controller_B.Saturation_e)));
  Quadcopter_Controller_B.pwmValue[3] = static_cast<uint16_T>
    (Quadcopter_Controller_B.Saturation_g < 0.0 ? static_cast<int32_T>(
      static_cast<uint16_T>(-static_cast<int16_T>(static_cast<uint16_T>
        (-Quadcopter_Controller_B.Saturation_g)))) : static_cast<int32_T>(
      static_cast<uint16_T>(Quadcopter_Controller_B.Saturation_g)));
  if (Quadcopter_Controller_P.Constant_Value_a) {
    if (!Quadcopter_Controller_DW.obj_n.isArmed) {
      Quadcopter_Controller_DW.obj_n.isArmed = true;
      pwm_arm(&Quadcopter_Controller_DW.obj_n.armAdvertiseObj);
    }

    pwm_setServo(Quadcopter_Controller_DW.obj_n.servoCount,
                 Quadcopter_Controller_DW.obj_n.channelMask,
                 &Quadcopter_Controller_B.pwmValue[0],
                 Quadcopter_Controller_DW.obj_n.isMain,
                 &Quadcopter_Controller_DW.obj_n.actuatorAdvertiseObj);
  } else {
    pwm_disarm(&Quadcopter_Controller_DW.obj_n.armAdvertiseObj);
    Quadcopter_Controller_DW.obj_n.isArmed = false;
    pwm_resetServo(Quadcopter_Controller_DW.obj_n.servoCount,
                   Quadcopter_Controller_DW.obj_n.isMain,
                   &Quadcopter_Controller_DW.obj_n.actuatorAdvertiseObj);
  }

  if (Quadcopter_Controller_DW.obj_n.isMain) {
    if (!Quadcopter_Controller_P.Constant_Value_a) {
      pwm_disarm(&Quadcopter_Controller_DW.obj_n.armAdvertiseObj);
    } else {
      pwm_arm(&Quadcopter_Controller_DW.obj_n.armAdvertiseObj);
    }
  }

  // End of MATLABSystem: '<Root>/PX4 PWM Output'
  // DeadZone: '<S422>/DeadZone'
  if (Quadcopter_Controller_B.DeadZone_n >
      Quadcopter_Controller_P.PID_x_UpperSaturationLimit) {
    Quadcopter_Controller_B.DeadZone_n -=
      Quadcopter_Controller_P.PID_x_UpperSaturationLimit;
  } else if (Quadcopter_Controller_B.DeadZone_n >=
             Quadcopter_Controller_P.PID_x_LowerSaturationLimit) {
    Quadcopter_Controller_B.DeadZone_n = 0.0;
  } else {
    Quadcopter_Controller_B.DeadZone_n -=
      Quadcopter_Controller_P.PID_x_LowerSaturationLimit;
  }

  // End of DeadZone: '<S422>/DeadZone'

  // Gain: '<S427>/Integral Gain'
  Quadcopter_Controller_B.IntegralGain_j *= Quadcopter_Controller_P.PID_x_I;

  // DeadZone: '<S476>/DeadZone'
  if (Quadcopter_Controller_B.DeadZone >
      Quadcopter_Controller_P.PID_y_UpperSaturationLimit) {
    Quadcopter_Controller_B.DeadZone -=
      Quadcopter_Controller_P.PID_y_UpperSaturationLimit;
  } else if (Quadcopter_Controller_B.DeadZone >=
             Quadcopter_Controller_P.PID_y_LowerSaturationLimit) {
    Quadcopter_Controller_B.DeadZone = 0.0;
  } else {
    Quadcopter_Controller_B.DeadZone -=
      Quadcopter_Controller_P.PID_y_LowerSaturationLimit;
  }

  // End of DeadZone: '<S476>/DeadZone'

  // Gain: '<S481>/Integral Gain'
  Quadcopter_Controller_B.Filter_l *= Quadcopter_Controller_P.PID_y_I;

  // If: '<S511>/If1' incorporates:
  //   Constant: '<S511>/Constant'

  if (Quadcopter_Controller_P.DCM2Ang_action > 1) {
    // Outputs for IfAction SubSystem: '<S511>/If Warning//Error' incorporates:
    //   ActionPort: '<S520>/if'

    // Bias: '<S524>/Bias1' incorporates:
    //   Concatenate: '<S544>/Vector Concatenate'
    //   Math: '<S524>/Math Function'
    //   Product: '<S524>/Product'

    for (i = 0; i < 3; i++) {
      for (i_0 = 0; i_0 < 3; i_0++) {
        rtb_VectorConcatenate_tmp = 3 * i_0 + i;
        Quadcopter_Controller_B.rtb_VectorConcatenate_m[rtb_VectorConcatenate_tmp]
          = ((Quadcopter_Controller_B.VectorConcatenate[3 * i + 1] *
              Quadcopter_Controller_B.VectorConcatenate[3 * i_0 + 1] +
              Quadcopter_Controller_B.VectorConcatenate[3 * i] *
              Quadcopter_Controller_B.VectorConcatenate[3 * i_0]) +
             Quadcopter_Controller_B.VectorConcatenate[3 * i + 2] *
             Quadcopter_Controller_B.VectorConcatenate[3 * i_0 + 2]) +
          Quadcopter_Controller_P.Bias1_Bias[rtb_VectorConcatenate_tmp];
      }
    }

    // End of Bias: '<S524>/Bias1'

    // RelationalOperator: '<S532>/Compare' incorporates:
    //   Abs: '<S524>/Abs2'
    //   Constant: '<S532>/Constant'

    for (i = 0; i < 9; i++) {
      Quadcopter_Controller_B.Compare[i] = (fabs
        (Quadcopter_Controller_B.rtb_VectorConcatenate_m[i]) >
        Quadcopter_Controller_P.DCM2Ang_tolerance);
    }

    // End of RelationalOperator: '<S532>/Compare'

    // Logic: '<S524>/Logical Operator1' incorporates:
    //   RelationalOperator: '<S532>/Compare'

    tmp = Quadcopter_Controller_B.Compare[0];
    for (i = 0; i < 8; i++) {
      tmp = (tmp || Quadcopter_Controller_B.Compare[i + 1]);
    }

    // If: '<S520>/If' incorporates:
    //   Abs: '<S525>/Abs1'
    //   Bias: '<S525>/Bias'
    //   Constant: '<S534>/Constant'
    //   Logic: '<S524>/Logical Operator1'
    //   Product: '<S533>/Product'
    //   Product: '<S533>/Product1'
    //   Product: '<S533>/Product2'
    //   Product: '<S533>/Product3'
    //   Product: '<S533>/Product4'
    //   Product: '<S533>/Product5'
    //   RelationalOperator: '<S534>/Compare'
    //   Sum: '<S533>/Sum'

    if (fabs((((((Quadcopter_Controller_B.VectorConcatenate[0] *
                  Quadcopter_Controller_B.VectorConcatenate[4] *
                  Quadcopter_Controller_B.VectorConcatenate[8] -
                  Quadcopter_Controller_B.VectorConcatenate[0] *
                  Quadcopter_Controller_B.VectorConcatenate[5] *
                  Quadcopter_Controller_B.VectorConcatenate[7]) -
                 Quadcopter_Controller_B.VectorConcatenate[1] *
                 Quadcopter_Controller_B.VectorConcatenate[3] *
                 Quadcopter_Controller_B.VectorConcatenate[8]) +
                Quadcopter_Controller_B.VectorConcatenate[2] *
                Quadcopter_Controller_B.VectorConcatenate[3] *
                Quadcopter_Controller_B.VectorConcatenate[7]) +
               Quadcopter_Controller_B.VectorConcatenate[1] *
               Quadcopter_Controller_B.VectorConcatenate[5] *
               Quadcopter_Controller_B.VectorConcatenate[6]) -
              Quadcopter_Controller_B.VectorConcatenate[2] *
              Quadcopter_Controller_B.VectorConcatenate[4] *
              Quadcopter_Controller_B.VectorConcatenate[6]) +
             Quadcopter_Controller_P.Bias_Bias) >
        Quadcopter_Controller_P.DCM2Ang_tolerance) {
      // Outputs for IfAction SubSystem: '<S520>/If Not Proper' incorporates:
      //   ActionPort: '<S523>/Action Port'

      // If: '<S523>/If' incorporates:
      //   Constant: '<S523>/Constant'

      if (Quadcopter_Controller_P.DCM2Ang_action == 2) {
        // Outputs for IfAction SubSystem: '<S523>/Warning' incorporates:
        //   ActionPort: '<S531>/Action Port'

        // Assertion: '<S531>/Assertion' incorporates:
        //   Constant: '<S523>/Constant1'

        utAssert(Quadcopter_Controller_P.Constant1_Value != 0.0);

        // End of Outputs for SubSystem: '<S523>/Warning'

        // Update for IfAction SubSystem: '<S523>/Warning' incorporates:
        //   ActionPort: '<S531>/Action Port'

        // Update for If: '<S523>/If'
        srUpdateBC(Quadcopter_Controller_DW.Warning_SubsysRanBC_f);

        // End of Update for SubSystem: '<S523>/Warning'
      } else if (Quadcopter_Controller_P.DCM2Ang_action == 3) {
        // Outputs for IfAction SubSystem: '<S523>/Error' incorporates:
        //   ActionPort: '<S529>/Action Port'

        // Assertion: '<S529>/Assertion' incorporates:
        //   Constant: '<S523>/Constant1'

        utAssert(Quadcopter_Controller_P.Constant1_Value != 0.0);

        // End of Outputs for SubSystem: '<S523>/Error'

        // Update for IfAction SubSystem: '<S523>/Error' incorporates:
        //   ActionPort: '<S529>/Action Port'

        // Update for If: '<S523>/If'
        srUpdateBC(Quadcopter_Controller_DW.Error_SubsysRanBC_f);

        // End of Update for SubSystem: '<S523>/Error'
      } else {
        // Update for IfAction SubSystem: '<S523>/None' incorporates:
        //   ActionPort: '<S530>/Action Port'

        // Update for If: '<S523>/If'
        srUpdateBC(Quadcopter_Controller_DW.None_SubsysRanBC_a);

        // End of Update for SubSystem: '<S523>/None'
      }

      // End of If: '<S523>/If'
      // End of Outputs for SubSystem: '<S520>/If Not Proper'

      // Update for IfAction SubSystem: '<S520>/If Not Proper' incorporates:
      //   ActionPort: '<S523>/Action Port'

      // Update for If: '<S520>/If'
      srUpdateBC(Quadcopter_Controller_DW.IfNotProper_SubsysRanBC);

      // End of Update for SubSystem: '<S520>/If Not Proper'
    } else if (tmp) {
      // Outputs for IfAction SubSystem: '<S520>/Else If Not Orthogonal' incorporates:
      //   ActionPort: '<S521>/Action Port'

      // If: '<S521>/If' incorporates:
      //   Constant: '<S521>/Constant'

      if (Quadcopter_Controller_P.DCM2Ang_action == 2) {
        // Outputs for IfAction SubSystem: '<S521>/Warning' incorporates:
        //   ActionPort: '<S528>/Action Port'

        // Assertion: '<S528>/Assertion' incorporates:
        //   Constant: '<S521>/Constant1'

        utAssert(Quadcopter_Controller_P.Constant1_Value_d != 0.0);

        // End of Outputs for SubSystem: '<S521>/Warning'

        // Update for IfAction SubSystem: '<S521>/Warning' incorporates:
        //   ActionPort: '<S528>/Action Port'

        // Update for If: '<S521>/If'
        srUpdateBC(Quadcopter_Controller_DW.Warning_SubsysRanBC);

        // End of Update for SubSystem: '<S521>/Warning'
      } else if (Quadcopter_Controller_P.DCM2Ang_action == 3) {
        // Outputs for IfAction SubSystem: '<S521>/Error' incorporates:
        //   ActionPort: '<S526>/Action Port'

        // Assertion: '<S526>/Assertion' incorporates:
        //   Constant: '<S521>/Constant1'

        utAssert(Quadcopter_Controller_P.Constant1_Value_d != 0.0);

        // End of Outputs for SubSystem: '<S521>/Error'

        // Update for IfAction SubSystem: '<S521>/Error' incorporates:
        //   ActionPort: '<S526>/Action Port'

        // Update for If: '<S521>/If'
        srUpdateBC(Quadcopter_Controller_DW.Error_SubsysRanBC);

        // End of Update for SubSystem: '<S521>/Error'
      } else {
        // Update for IfAction SubSystem: '<S521>/None' incorporates:
        //   ActionPort: '<S527>/Action Port'

        // Update for If: '<S521>/If'
        srUpdateBC(Quadcopter_Controller_DW.None_SubsysRanBC);

        // End of Update for SubSystem: '<S521>/None'
      }

      // End of If: '<S521>/If'
      // End of Outputs for SubSystem: '<S520>/Else If Not Orthogonal'

      // Update for IfAction SubSystem: '<S520>/Else If Not Orthogonal' incorporates:
      //   ActionPort: '<S521>/Action Port'

      // Update for If: '<S520>/If'
      srUpdateBC(Quadcopter_Controller_DW.ElseIfNotOrthogonal_SubsysRanBC);

      // End of Update for SubSystem: '<S520>/Else If Not Orthogonal'
    } else {
      // Update for IfAction SubSystem: '<S520>/Else No Action' incorporates:
      //   ActionPort: '<S522>/Action Port'

      // Update for If: '<S520>/If'
      srUpdateBC(Quadcopter_Controller_DW.ElseNoAction_SubsysRanBC);

      // End of Update for SubSystem: '<S520>/Else No Action'
    }

    // End of If: '<S520>/If'
    // End of Outputs for SubSystem: '<S511>/If Warning//Error'

    // Update for IfAction SubSystem: '<S511>/If Warning//Error' incorporates:
    //   ActionPort: '<S520>/if'

    // Update for If: '<S511>/If1'
    srUpdateBC(Quadcopter_Controller_DW.IfWarningError_SubsysRanBC);

    // End of Update for SubSystem: '<S511>/If Warning//Error'
  }

  // End of If: '<S511>/If1'

  // Update for DiscreteIntegrator: '<S215>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE +=
    Quadcopter_Controller_P.Filter_gainval *
    Quadcopter_Controller_B.FilterCoefficient;

  // Update for DiscreteIntegrator: '<S371>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_b +=
    Quadcopter_Controller_P.Filter_gainval_d * Quadcopter_Controller_B.Filter_f;

  // Update for Sin: '<S1>/x+'
  Quadcopter_Controller_B.FilterCoefficient = Quadcopter_Controller_DW.lastSin;
  Quadcopter_Controller_DW.lastSin = Quadcopter_Controller_DW.lastSin *
    Quadcopter_Controller_P.x_HCos + Quadcopter_Controller_DW.lastCos *
    Quadcopter_Controller_P.x_Hsin;
  Quadcopter_Controller_DW.lastCos = Quadcopter_Controller_DW.lastCos *
    Quadcopter_Controller_P.x_HCos - Quadcopter_Controller_B.FilterCoefficient *
    Quadcopter_Controller_P.x_Hsin;

  // Switch: '<S420>/Switch1' incorporates:
  //   Constant: '<S420>/Clamping_zero'
  //   Constant: '<S420>/Constant'
  //   Constant: '<S420>/Constant2'
  //   RelationalOperator: '<S420>/fix for DT propagation issue'

  if (Quadcopter_Controller_B.DeadZone_n >
      Quadcopter_Controller_P.Clamping_zero_Value_e) {
    tmp_0 = Quadcopter_Controller_P.Constant_Value_b;
  } else {
    tmp_0 = Quadcopter_Controller_P.Constant2_Value_j;
  }

  // Switch: '<S420>/Switch2' incorporates:
  //   Constant: '<S420>/Clamping_zero'
  //   Constant: '<S420>/Constant3'
  //   Constant: '<S420>/Constant4'
  //   RelationalOperator: '<S420>/fix for DT propagation issue1'

  if (Quadcopter_Controller_B.IntegralGain_j >
      Quadcopter_Controller_P.Clamping_zero_Value_e) {
    tmp_1 = Quadcopter_Controller_P.Constant3_Value_c;
  } else {
    tmp_1 = Quadcopter_Controller_P.Constant4_Value_g;
  }

  // Switch: '<S420>/Switch' incorporates:
  //   Constant: '<S420>/Clamping_zero'
  //   Constant: '<S420>/Constant1'
  //   Logic: '<S420>/AND3'
  //   RelationalOperator: '<S420>/Equal1'
  //   RelationalOperator: '<S420>/Relational Operator'
  //   Switch: '<S420>/Switch1'
  //   Switch: '<S420>/Switch2'

  if ((Quadcopter_Controller_P.Clamping_zero_Value_e !=
       Quadcopter_Controller_B.DeadZone_n) && (tmp_0 == tmp_1)) {
    Quadcopter_Controller_B.IntegralGain_j =
      Quadcopter_Controller_P.Constant1_Value_ck;
  }

  // Update for DiscreteIntegrator: '<S430>/Integrator' incorporates:
  //   Switch: '<S420>/Switch'

  Quadcopter_Controller_DW.Integrator_DSTATE_b +=
    Quadcopter_Controller_P.Integrator_gainval_lq *
    Quadcopter_Controller_B.IntegralGain_j;

  // Update for DiscreteIntegrator: '<S425>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_f +=
    Quadcopter_Controller_P.Filter_gainval_p *
    Quadcopter_Controller_B.Integrator_l;

  // Update for Sin: '<S1>/y+'
  Quadcopter_Controller_B.FilterCoefficient = Quadcopter_Controller_DW.lastSin_k;
  Quadcopter_Controller_DW.lastSin_k = Quadcopter_Controller_DW.lastSin_k *
    Quadcopter_Controller_P.y_HCos + Quadcopter_Controller_DW.lastCos_e *
    Quadcopter_Controller_P.y_Hsin;
  Quadcopter_Controller_DW.lastCos_e = Quadcopter_Controller_DW.lastCos_e *
    Quadcopter_Controller_P.y_HCos - Quadcopter_Controller_B.FilterCoefficient *
    Quadcopter_Controller_P.y_Hsin;

  // Switch: '<S474>/Switch1' incorporates:
  //   Constant: '<S474>/Clamping_zero'
  //   Constant: '<S474>/Constant'
  //   Constant: '<S474>/Constant2'
  //   RelationalOperator: '<S474>/fix for DT propagation issue'

  if (Quadcopter_Controller_B.DeadZone >
      Quadcopter_Controller_P.Clamping_zero_Value_d) {
    tmp_0 = Quadcopter_Controller_P.Constant_Value_b5;
  } else {
    tmp_0 = Quadcopter_Controller_P.Constant2_Value_a;
  }

  // Switch: '<S474>/Switch2' incorporates:
  //   Constant: '<S474>/Clamping_zero'
  //   Constant: '<S474>/Constant3'
  //   Constant: '<S474>/Constant4'
  //   RelationalOperator: '<S474>/fix for DT propagation issue1'

  if (Quadcopter_Controller_B.Filter_l >
      Quadcopter_Controller_P.Clamping_zero_Value_d) {
    tmp_1 = Quadcopter_Controller_P.Constant3_Value_k;
  } else {
    tmp_1 = Quadcopter_Controller_P.Constant4_Value_k;
  }

  // Switch: '<S474>/Switch' incorporates:
  //   Constant: '<S474>/Clamping_zero'
  //   Constant: '<S474>/Constant1'
  //   Logic: '<S474>/AND3'
  //   RelationalOperator: '<S474>/Equal1'
  //   RelationalOperator: '<S474>/Relational Operator'
  //   Switch: '<S474>/Switch1'
  //   Switch: '<S474>/Switch2'

  if ((Quadcopter_Controller_P.Clamping_zero_Value_d !=
       Quadcopter_Controller_B.DeadZone) && (tmp_0 == tmp_1)) {
    Quadcopter_Controller_B.Filter_l =
      Quadcopter_Controller_P.Constant1_Value_cm;
  }

  // Update for DiscreteIntegrator: '<S484>/Integrator' incorporates:
  //   Switch: '<S474>/Switch'

  Quadcopter_Controller_DW.Integrator_DSTATE_j +=
    Quadcopter_Controller_P.Integrator_gainval_d *
    Quadcopter_Controller_B.Filter_l;

  // Update for DiscreteIntegrator: '<S479>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_j +=
    Quadcopter_Controller_P.Filter_gainval_b *
    Quadcopter_Controller_B.FilterCoefficient_p;

  // Update for DiscreteIntegrator: '<S272>/Integrator' incorporates:
  //   Gain: '<S269>/Integral Gain'

  Quadcopter_Controller_DW.Integrator_DSTATE_f +=
    Quadcopter_Controller_P.PID_vx_I * rtb_MatrixMultiply_idx_0 *
    Quadcopter_Controller_P.Integrator_gainval_e;

  // Update for DiscreteIntegrator: '<S267>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_o +=
    Quadcopter_Controller_P.Filter_gainval_n *
    Quadcopter_Controller_B.FilterCoefficient_db;

  // Update for DiscreteIntegrator: '<S48>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_ox +=
    Quadcopter_Controller_P.Filter_gainval_k * rtb_Merge_idx_1;

  // Update for DiscreteIntegrator: '<S324>/Integrator' incorporates:
  //   Gain: '<S321>/Integral Gain'

  Quadcopter_Controller_DW.Integrator_DSTATE_jo +=
    Quadcopter_Controller_P.PID_vy_I * rtb_MatrixMultiply_idx_1 *
    Quadcopter_Controller_P.Integrator_gainval_o;

  // Update for DiscreteIntegrator: '<S319>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_oxe +=
    Quadcopter_Controller_P.Filter_gainval_l *
    Quadcopter_Controller_B.FilterCoefficient_f;

  // Update for DiscreteIntegrator: '<S100>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_d +=
    Quadcopter_Controller_P.Filter_gainval_j * rtb_Merge_idx_2;

  // Update for DiscreteIntegrator: '<S154>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_k +=
    Quadcopter_Controller_P.Filter_gainval_i * rtb_Merge_idx_0;

  // Update absolute time for base rate
  // The "clockTick0" counts the number of times the code of this task has
  //  been executed. The absolute time is the multiplication of "clockTick0"
  //  and "Timing.stepSize0". Size of "clockTick0" ensures timer will not
  //  overflow during the application lifespan selected.

  Quadcopter_Controller_M->Timing.taskTime0 =
    ((time_T)(++Quadcopter_Controller_M->Timing.clockTick0)) *
    Quadcopter_Controller_M->Timing.stepSize0;
}

// Model initialize function
void Quadcopter_Controller_initialize(void)
{
  // Registration code

  // initialize non-finites
  rt_InitInfAndNaN(sizeof(real_T));
  rtmSetTFinal(Quadcopter_Controller_M, -1);
  Quadcopter_Controller_M->Timing.stepSize0 = 0.01;

  // External mode info
  Quadcopter_Controller_M->Sizes.checksums[0] = (936938418U);
  Quadcopter_Controller_M->Sizes.checksums[1] = (3749294594U);
  Quadcopter_Controller_M->Sizes.checksums[2] = (2024649178U);
  Quadcopter_Controller_M->Sizes.checksums[3] = (1019815525U);

  {
    static const sysRanDType rtAlwaysEnabled = SUBSYS_RAN_BC_ENABLE;
    static RTWExtModeInfo rt_ExtModeInfo;
    static const sysRanDType *systemRan[41];
    Quadcopter_Controller_M->extModeInfo = (&rt_ExtModeInfo);
    rteiSetSubSystemActiveVectorAddresses(&rt_ExtModeInfo, systemRan);
    systemRan[0] = &rtAlwaysEnabled;
    systemRan[1] = &rtAlwaysEnabled;
    systemRan[2] = (sysRanDType *)
      &Quadcopter_Controller_DW.EnabledSubsystem_SubsysRanBC_n;
    systemRan[3] = &rtAlwaysEnabled;
    systemRan[4] = (sysRanDType *)
      &Quadcopter_Controller_DW.EnabledSubsystem_SubsysRanBC;
    systemRan[5] = &rtAlwaysEnabled;
    systemRan[6] = &rtAlwaysEnabled;
    systemRan[7] = &rtAlwaysEnabled;
    systemRan[8] = &rtAlwaysEnabled;
    systemRan[9] = &rtAlwaysEnabled;
    systemRan[10] = &rtAlwaysEnabled;
    systemRan[11] = &rtAlwaysEnabled;
    systemRan[12] = &rtAlwaysEnabled;
    systemRan[13] = &rtAlwaysEnabled;
    systemRan[14] = &rtAlwaysEnabled;
    systemRan[15] = &rtAlwaysEnabled;
    systemRan[16] = &rtAlwaysEnabled;
    systemRan[17] = &rtAlwaysEnabled;
    systemRan[18] = &rtAlwaysEnabled;
    systemRan[19] = &rtAlwaysEnabled;
    systemRan[20] = &rtAlwaysEnabled;
    systemRan[21] = &rtAlwaysEnabled;
    systemRan[22] = &rtAlwaysEnabled;
    systemRan[23] = (sysRanDType *)
      &Quadcopter_Controller_DW.IfActionSubsystem_SubsysRanBC;
    systemRan[24] = (sysRanDType *)
      &Quadcopter_Controller_DW.IfActionSubsystem1_SubsysRanBC;
    systemRan[25] = (sysRanDType *)
      &Quadcopter_Controller_DW.IfActionSubsystem2_SubsysRanBC;
    systemRan[26] = (sysRanDType *)
      &Quadcopter_Controller_DW.AxisRotDefault_SubsysRanBC;
    systemRan[27] = (sysRanDType *)
      &Quadcopter_Controller_DW.IfActionSubsystem_SubsysRanBC_g;
    systemRan[28] = (sysRanDType *)
      &Quadcopter_Controller_DW.IfActionSubsystem1_SubsysRanB_j;
    systemRan[29] = (sysRanDType *)
      &Quadcopter_Controller_DW.IfActionSubsystem2_SubsysRanB_g;
    systemRan[30] = (sysRanDType *)
      &Quadcopter_Controller_DW.AxisRotZeroR3_SubsysRanBC;
    systemRan[31] = (sysRanDType *)&Quadcopter_Controller_DW.Error_SubsysRanBC;
    systemRan[32] = (sysRanDType *)&Quadcopter_Controller_DW.None_SubsysRanBC;
    systemRan[33] = (sysRanDType *)&Quadcopter_Controller_DW.Warning_SubsysRanBC;
    systemRan[34] = (sysRanDType *)
      &Quadcopter_Controller_DW.ElseIfNotOrthogonal_SubsysRanBC;
    systemRan[35] = (sysRanDType *)
      &Quadcopter_Controller_DW.ElseNoAction_SubsysRanBC;
    systemRan[36] = (sysRanDType *)&Quadcopter_Controller_DW.Error_SubsysRanBC_f;
    systemRan[37] = (sysRanDType *)&Quadcopter_Controller_DW.None_SubsysRanBC_a;
    systemRan[38] = (sysRanDType *)
      &Quadcopter_Controller_DW.Warning_SubsysRanBC_f;
    systemRan[39] = (sysRanDType *)
      &Quadcopter_Controller_DW.IfNotProper_SubsysRanBC;
    systemRan[40] = (sysRanDType *)
      &Quadcopter_Controller_DW.IfWarningError_SubsysRanBC;
    rteiSetModelMappingInfoPtr(Quadcopter_Controller_M->extModeInfo,
      &Quadcopter_Controller_M->SpecialInfo.mappingInfo);
    rteiSetChecksumsPtr(Quadcopter_Controller_M->extModeInfo,
                        Quadcopter_Controller_M->Sizes.checksums);
    rteiSetTPtr(Quadcopter_Controller_M->extModeInfo, rtmGetTPtr
                (Quadcopter_Controller_M));
  }

  // InitializeConditions for DiscreteIntegrator: '<S215>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE =
    Quadcopter_Controller_P.PID_Altitude_InitialConditionFo;

  // InitializeConditions for DiscreteIntegrator: '<S220>/Integrator'
  Quadcopter_Controller_DW.Integrator_DSTATE =
    Quadcopter_Controller_P.PID_Altitude_InitialCondition_j;

  // InitializeConditions for DiscreteIntegrator: '<S376>/Integrator'
  Quadcopter_Controller_DW.Integrator_DSTATE_k =
    Quadcopter_Controller_P.PID_vz_InitialConditionForInteg;

  // InitializeConditions for DiscreteIntegrator: '<S371>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_b =
    Quadcopter_Controller_P.PID_vz_InitialConditionForFilte;

  // InitializeConditions for DiscreteIntegrator: '<S430>/Integrator'
  Quadcopter_Controller_DW.Integrator_DSTATE_b =
    Quadcopter_Controller_P.PID_x_InitialConditionForIntegr;

  // InitializeConditions for DiscreteIntegrator: '<S425>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_f =
    Quadcopter_Controller_P.PID_x_InitialConditionForFilter;

  // InitializeConditions for DiscreteIntegrator: '<S484>/Integrator'
  Quadcopter_Controller_DW.Integrator_DSTATE_j =
    Quadcopter_Controller_P.PID_y_InitialConditionForIntegr;

  // InitializeConditions for DiscreteIntegrator: '<S479>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_j =
    Quadcopter_Controller_P.PID_y_InitialConditionForFilter;

  // InitializeConditions for DiscreteIntegrator: '<S272>/Integrator'
  Quadcopter_Controller_DW.Integrator_DSTATE_f =
    Quadcopter_Controller_P.PID_vx_InitialConditionForInteg;

  // InitializeConditions for DiscreteIntegrator: '<S267>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_o =
    Quadcopter_Controller_P.PID_vx_InitialConditionForFilte;

  // InitializeConditions for DiscreteIntegrator: '<S53>/Integrator'
  Quadcopter_Controller_DW.Integrator_DSTATE_o =
    Quadcopter_Controller_P.PID_pitch_InitialConditionForIn;

  // InitializeConditions for DiscreteIntegrator: '<S48>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_ox =
    Quadcopter_Controller_P.PID_pitch_InitialConditionForFi;

  // InitializeConditions for DiscreteIntegrator: '<S324>/Integrator'
  Quadcopter_Controller_DW.Integrator_DSTATE_jo =
    Quadcopter_Controller_P.PID_vy_InitialConditionForInteg;

  // InitializeConditions for DiscreteIntegrator: '<S319>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_oxe =
    Quadcopter_Controller_P.PID_vy_InitialConditionForFilte;

  // InitializeConditions for DiscreteIntegrator: '<S105>/Integrator'
  Quadcopter_Controller_DW.Integrator_DSTATE_m =
    Quadcopter_Controller_P.PID_roll_InitialConditionForInt;

  // InitializeConditions for DiscreteIntegrator: '<S100>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_d =
    Quadcopter_Controller_P.PID_roll_InitialConditionForFil;

  // InitializeConditions for DiscreteIntegrator: '<S154>/Filter'
  Quadcopter_Controller_DW.Filter_DSTATE_k =
    Quadcopter_Controller_P.PID_yaw_InitialConditionForFilt;

  // InitializeConditions for DiscreteIntegrator: '<S159>/Integrator'
  Quadcopter_Controller_DW.Integrator_DSTATE_i =
    Quadcopter_Controller_P.PID_yaw_InitialConditionForInte;

  // SystemInitialize for Enabled SubSystem: '<S3>/Enabled Subsystem'
  // SystemInitialize for SignalConversion generated from: '<S6>/In1' incorporates:
  //   Outport: '<S6>/Out1'

  Quadcopter_Controller_B.In1 = Quadcopter_Controller_P.Out1_Y0;

  // End of SystemInitialize for SubSystem: '<S3>/Enabled Subsystem'

  // SystemInitialize for Enabled SubSystem: '<S2>/Enabled Subsystem'
  // SystemInitialize for SignalConversion generated from: '<S5>/In1' incorporates:
  //   Outport: '<S5>/Out1'

  Quadcopter_Controller_B.In1_b = Quadcopter_Controller_P.Out1_Y0_o;

  // End of SystemInitialize for SubSystem: '<S2>/Enabled Subsystem'

  // Start for MATLABSystem: '<S2>/SourceBlock'
  Quadcopter_Controller_DW.obj_m.matlabCodegenIsDeleted = false;
  Quadcopter_Controller_DW.obj_m.isSetupComplete = false;
  Quadcopter_Controller_DW.obj_m.isInitialized = 1;
  Quadcopter_Controller_DW.obj_m.orbMetadataObj = ORB_ID
    (vehicle_attitude_groundtruth);
  uORB_read_initialize(Quadcopter_Controller_DW.obj_m.orbMetadataObj,
                       &Quadcopter_Controller_DW.obj_m.eventStructObj);
  Quadcopter_Controller_DW.obj_m.isSetupComplete = true;

  // Start for MATLABSystem: '<S3>/SourceBlock'
  Quadcopter_Controller_DW.obj.matlabCodegenIsDeleted = false;
  Quadcopter_Controller_DW.obj.isSetupComplete = false;
  Quadcopter_Controller_DW.obj.isInitialized = 1;
  Quadcopter_Controller_DW.obj.orbMetadataObj = ORB_ID
    (vehicle_local_position_groundtruth);
  uORB_read_initialize(Quadcopter_Controller_DW.obj.orbMetadataObj,
                       &Quadcopter_Controller_DW.obj.eventStructObj);
  Quadcopter_Controller_DW.obj.isSetupComplete = true;

  // Start for MATLABSystem: '<Root>/PX4 PWM Output'
  Quadcopter_Controller_DW.obj_n.matlabCodegenIsDeleted = false;
  Quadcopter_Controller_DW.obj_n.isSetupComplete = false;
  Quadcopter_Controller_DW.obj_n.isInitialized = 1;
  Quadcopter_Contro_PWM_setupImpl(&Quadcopter_Controller_DW.obj_n, false, false);
  Quadcopter_Controller_DW.obj_n.isSetupComplete = true;

  // Enable for Sin: '<S1>/x+'
  Quadcopter_Controller_DW.systemEnable = 1;

  // Enable for Sin: '<S1>/y+'
  Quadcopter_Controller_DW.systemEnable_e = 1;
}

// Model terminate function
void Quadcopter_Controller_terminate(void)
{
  // Terminate for MATLABSystem: '<S2>/SourceBlock'
  if (!Quadcopter_Controller_DW.obj_m.matlabCodegenIsDeleted) {
    Quadcopter_Controller_DW.obj_m.matlabCodegenIsDeleted = true;
    if ((Quadcopter_Controller_DW.obj_m.isInitialized == 1) &&
        Quadcopter_Controller_DW.obj_m.isSetupComplete) {
      uORB_read_terminate(&Quadcopter_Controller_DW.obj_m.eventStructObj);
    }
  }

  // End of Terminate for MATLABSystem: '<S2>/SourceBlock'

  // Terminate for MATLABSystem: '<S3>/SourceBlock'
  if (!Quadcopter_Controller_DW.obj.matlabCodegenIsDeleted) {
    Quadcopter_Controller_DW.obj.matlabCodegenIsDeleted = true;
    if ((Quadcopter_Controller_DW.obj.isInitialized == 1) &&
        Quadcopter_Controller_DW.obj.isSetupComplete) {
      uORB_read_terminate(&Quadcopter_Controller_DW.obj.eventStructObj);
    }
  }

  // End of Terminate for MATLABSystem: '<S3>/SourceBlock'

  // Terminate for MATLABSystem: '<Root>/PX4 PWM Output'
  if (!Quadcopter_Controller_DW.obj_n.matlabCodegenIsDeleted) {
    Quadcopter_Controller_DW.obj_n.matlabCodegenIsDeleted = true;
    if ((Quadcopter_Controller_DW.obj_n.isInitialized == 1) &&
        Quadcopter_Controller_DW.obj_n.isSetupComplete) {
      pwm_disarm(&Quadcopter_Controller_DW.obj_n.armAdvertiseObj);
      pwm_resetServo(Quadcopter_Controller_DW.obj_n.servoCount,
                     Quadcopter_Controller_DW.obj_n.isMain,
                     &Quadcopter_Controller_DW.obj_n.actuatorAdvertiseObj);
      pwm_close(Quadcopter_Controller_DW.obj_n.servoCount,
                &Quadcopter_Controller_DW.obj_n.actuatorAdvertiseObj,
                &Quadcopter_Controller_DW.obj_n.armAdvertiseObj);
    }
  }

  // End of Terminate for MATLABSystem: '<Root>/PX4 PWM Output'
}

//
// File trailer for generated code.
//
// [EOF]
//
