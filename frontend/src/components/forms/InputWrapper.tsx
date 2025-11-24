import React, { FC, ReactNode } from "react";
import { Box, FormControl, Stack, styled, Typography } from "@mui/material";
import { isDefinedAndNotEmpty, isNotDefined } from "utils/helper";
import { RenderText, Condition } from "components/index";

const LabelTypography = styled(Typography)({
  color: "#234585",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: 1.57,
});

interface InputWrapperProps {
  label?: any;
  comment?: any;
  required?: boolean;
  children: ReactNode;
}

interface FormInputLabelProps {
  label?: any;
  comment?: any;
  required?: boolean;
}

export const FormInputLabel: FC<FormInputLabelProps> = ({
  label,
  comment,
  required = false,
}) => (
  <Stack direction="row" spacing={0.5} alignItems="baseline">
    <Stack direction="row" spacing={0.5}>
      <Condition
        isValid={isDefinedAndNotEmpty(label)}
        fallback={<Box sx={{ height: "21px" }} />}
      >
        <LabelTypography>
          <RenderText value={label} />
        </LabelTypography>
      </Condition>
      {required && (
        <Typography sx={{ fontSize: 12, color: "red" }}>*</Typography>
      )}
    </Stack>
    <Condition isValid={isDefinedAndNotEmpty(comment)}>
      <LabelTypography sx={{ fontStyle: "italic", fontSize: "10px" }}>
        <RenderText value={comment} />
      </LabelTypography>
    </Condition>
  </Stack>
);

const InputWrapper: FC<InputWrapperProps> = ({
  label,
  comment,
  required = false,
  children,
}) => {
  if (isNotDefined(label)) {
    return <FormControl sx={{ width: 1 }}>{children}</FormControl>;
  }

  return (
    <Stack spacing={0.5}>
      <FormInputLabel label={label} comment={comment} required={required} />
      <FormControl sx={{ width: 1 }}>{children}</FormControl>
    </Stack>
  );
};

export default InputWrapper;
