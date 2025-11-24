import React, { FC } from "react";
import { Box, Paper, Stack } from "@mui/material";
import { useWizard } from "react-use-wizard";

import StepActionItem from "components/Stepper/StepperAction/StepActionItem";
import messages from "config/i18n/messages";
import { useFormContext } from "react-hook-form";
import { isEmpty, isUndefined } from "lodash";
import { useRecoilValue } from "recoil";
import { isDrawerOpenAtom } from "app/PrivateApp/components/Sidebar/actions/drawerAtom";
import { DRAWER_WIDTH } from "utils/constants";
import SubmitFormButton from "components/forms/SubmitFormButton";
import { CancelButton } from "components";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "config/routes/path";
import { StepperProps } from "components/Stepper/index";

const StepperAction: FC<StepperProps> = ({ steps, allCompleted }) => {
  const navigate = useNavigate();
  const isOpen = useRecoilValue(isDrawerOpenAtom);

  const { isFirstStep, isLastStep, previousStep, nextStep, activeStep } =
    useWizard();

  const { handleSubmit, getValues, formState, trigger, setValue } =
    useFormContext();

  const onNextHandler = () => {
    const { defaultValues } = formState;

    const keys = !allCompleted ? steps.map((step) => step.code) : [];

    console.log("StepperAction onNextHandler defaultValues", keys);

    keys.forEach((key, index) => {
      if (index > activeStep) {
        setValue(key, null);
      }
    });

    return handleSubmit(
      (data) => {
        // console.log("StepperAction onNextHandler onValid", data);
        if (!isEmpty(keys) && !isUndefined(defaultValues)) {
          const nextStepKey = keys[activeStep + 1];
          setValue(nextStepKey, defaultValues[nextStepKey]);
        }
        return nextStep();
      },
      (errors, e) => {
        console.error("DatatableView onErrorHandler", errors, e);
        // Object.entries(errors).forEach(([key, item]) => {
        //   toast.error(`Error: ${item?.message}`);
        // });
      },
    )();
  };

  const onCancel = () => {
    navigate(RoutePath.TIER_LIST);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: isOpen ? DRAWER_WIDTH + 24 : 89,
        right: 24,
        p: 1,
        pb: 0,
        zIndex: 999,
        // backgroundColor: "inherit",
        // border: 5,
        borderColor: "secondary.main",
        borderBottom: 0,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        // borderRadius: "16px",
        // padding: "12px",
        // bgcolor: "rgba(242, 244, 250, 0.1)",
        bgcolor: "#f2f2f2",
      }}
      elevation={3}
    >
      <Box
        sx={
          {
            // p: 1,
            // borderRadius: "16px",
            // padding: "12px",
            // bgcolor: "rgba(242, 244, 250, 0.1)",
          }
        }
      >
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{
            p: 1,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            bgcolor: "background.paper",
          }}
        >
          <CancelButton onClick={onCancel} />
          {!isFirstStep && (
            <StepActionItem label={messages.previous} onClick={previousStep} />
          )}
          {!isLastStep && (
            <StepActionItem
              label={messages.next}
              onClick={onNextHandler}
              // onClick={nextStep}
              // type="submit"
              isNext
            />
          )}
          {isLastStep && <SubmitFormButton label={messages.save} />}
        </Stack>
      </Box>
    </Paper>
  );
};

export default StepperAction;
