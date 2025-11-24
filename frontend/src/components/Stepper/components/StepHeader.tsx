import React, { FC } from "react";
import { StepProps } from "components/Stepper/types/StepProps";
import { Box, Button, Icon, lighten, Stack, Typography } from "@mui/material";
import { isNull, isUndefined } from "lodash";
import { RenderText } from "components";
import StepIcon from "components/Stepper/components/StepIcon";
import { useWizard } from "react-use-wizard";
import { StepStatus } from "components/Stepper/actions/StepStatus";

interface StepHeaderProps {
  step: StepProps;
  stepIndex: number;
  status: string;
  color: string;
  backgroundColor: string;
  indicator: string;
  indicatorIcon: string;
}

const StepHeader: FC<StepHeaderProps> = ({
  step,
  stepIndex,
  status,
  color,
  backgroundColor,
  indicator,
  indicatorIcon,
}) => {
  const { goToStep } = useWizard();
  const { label, icon, disabled } = step;
  const borderColor = lighten(color, 0.8);

  const onClickHandler = () => {
    goToStep(stepIndex);
  };

  return (
    <Stack sx={{ width: "100%" }}>
      <Button
        disabled={disabled}
        sx={{
          borderRadius: 0,
          height: 65,
          bgcolor: backgroundColor,
          color,
          fontSize: 16,
          border: `1px solid ${borderColor}`,
          borderBottom: "none",
          lineHeight: 1.3,
        }}
        startIcon={icon && <Icon component={icon} />}
        onClick={onClickHandler}
        {...(status === StepStatus.INACTIVE && {
          // onClick: undefined,
          disableTouchRipple: true,
          disableRipple: true,
          disableFocusRipple: true,
          disableElevation: true,
        })}
      >
        <Box sx={{ pl: 3, pr: 3 }}>
          <RenderText value={label} />
        </Box>
      </Button>
      <StepIcon
        borderColor={borderColor}
        indicator={indicator}
        indicatorIcon={indicatorIcon}
        onClick={onClickHandler}
        status={status}
      />
    </Stack>
  );
};

export default StepHeader;
