import React, { FC } from "react";
import { lighten, Stack } from "@mui/material";
import StepHeader from "components/Stepper/components/StepHeader";
import { useWizard } from "react-use-wizard";
import { StepStatus } from "components/Stepper/actions/StepStatus";
import { StepperProps } from "components/Stepper/index";

const StepperHeader: FC<StepperProps> = ({ allCompleted = false, steps }) => {
  const { activeStep } = useWizard();

  const getStepStatus = (stepIndex: number) => {
    if (activeStep === stepIndex) {
      return {
        status: StepStatus.ACTIVE,
        color: "#D46D3B",
        backgroundColor: lighten("#faeee9", 0.7),
        indicator: "linear-gradient(to bottom, #D46D3B 50%, #ffa466 100%)",
        indicatorIcon: "linear-gradient(to bottom, #D46D3B 50%, #ffa466 100%)",
      };
    }

    if (allCompleted || activeStep > stepIndex) {
      return {
        status: StepStatus.COMPLETED,
        color: "#0aab45",
        backgroundColor: lighten("#e3f5f1", 0.7),
        indicator: "linear-gradient(to bottom, #0aab45 50%, #76d097 100%)",
        indicatorIcon: "linear-gradient(to bottom, #0aab45 50%, #76d097 100%)",
      };
    }

    return {
      status: StepStatus.INACTIVE,
      color: "#84858a", // "#234585",
      backgroundColor: "inherit",
      indicator: lighten("#84858a", 0.5),
      indicatorIcon: "#fff",
    };
  };

  return (
    <Stack direction="row">
      {steps.map((step, index) => (
        <StepHeader step={step} stepIndex={index} {...getStepStatus(index)} />
      ))}
    </Stack>
  );
};

export default StepperHeader;
