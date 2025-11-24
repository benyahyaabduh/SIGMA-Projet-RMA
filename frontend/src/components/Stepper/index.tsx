import React from "react";
import { Wizard } from "react-use-wizard";

import StepperAction from "./StepperAction";
import StepperHeader from "./StepperHeader";
import { StepProps } from "components/Stepper/types/StepProps";
import { Box, Container } from "@mui/material";
import { ObjectSchema } from "yup";

export interface StepperProps {
  steps: StepProps[];
  allCompleted?: boolean;
}

//TODO add const Wrapper = () => <AnimatePresence exitBeforeEnter />;
const StepperWrapper = () => {
  return <Box sx={{ p: 2, bgcolor: "red" }} />;
};

const Stepper = ({ steps, allCompleted }: StepperProps) => {
  return (
    <Wizard
      startIndex={0}
      header={<StepperHeader allCompleted={allCompleted} steps={steps} />}
      footer={<StepperAction allCompleted={allCompleted} steps={steps} />}
      // wrapper={StepperWrapper}
    >
      {steps.map(({ component, ...props }) => (
        <Box sx={{ pt: 4, pb: 10 }}>
          <Container component={component} {...props} />
        </Box>
      ))}
    </Wizard>
  );
};

export default Stepper;
