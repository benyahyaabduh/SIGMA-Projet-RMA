import React, { FC } from "react";
import { Box, styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ToggleButtonGroupProps as MuiToggleButtonGroupProps } from "@mui/material/ToggleButtonGroup";
import { isUndefined } from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import { Option } from "types";
import { useGetApi } from "config/api/useApi";
import { isDefined, isDefinedAndNotEmpty, isNotDefined } from "utils/helper";
import { GridItem } from "components/index";

import InputWrapper from "components/forms/InputWrapper";
import FormFieldProps from "types/FormFieldProps";

interface ToggleButtonGroupProps extends MuiToggleButtonGroupProps {
  isSecondary?: boolean;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup, {
  shouldForwardProp: (prop) => prop !== "open",
})<ToggleButtonGroupProps>(({ theme, isSecondary }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    textTransform: "none",
    color: isSecondary
      ? theme.palette.secondary.main
      : theme.palette.primary.main,
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: 1.36,
    borderRadius: 5,
    "&.Mui-selected": {
      backgroundColor: isSecondary
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
      color: "white",
    },
  },
}));

const FormToggleButtonGroup: FC<FormFieldProps> = ({
  label,
  name,
  options,
  exclusive = true,
  required,
  disabled = false,
  isSecondary,
  defaultValue,
  xs,
  apiProps,
}) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  const { data } = useGetApi(apiProps);

  const formattedOptions = isDefined(data)
    ? data
    : isDefinedAndNotEmpty(options)
    ? options
    : [];

  const getSelectedValue = (field: any) => {
    const { id, value } = field;
    if (isNotDefined(value) && isNotDefined(id)) {
      return null;
    }

    return formattedOptions?.find(
      (p: Option) => p.value === field.value?.value || p.id === field.value?.id,
    );
  };

  if (isUndefined(name)) {
    return <Box>NONE</Box>;
  }

  // TODO add loading indicator
  return (
    <GridItem xs={xs}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputWrapper label={label} required={required}>
            <StyledToggleButtonGroup
              {...field}
              exclusive={exclusive}
              aria-label="text alignment"
              fullWidth
              isSecondary={isSecondary}
              disabled={disabled || isSubmitting}
              value={getSelectedValue(field)}
              onChange={(e, value) => {
                field.onChange(value);
              }}
            >
              {formattedOptions?.map((option: Option) => (
                <ToggleButton key={`toggle-${option.id}`} value={option}>
                  {option.label || option.name}
                </ToggleButton>
              )) || []}
            </StyledToggleButtonGroup>
          </InputWrapper>
        )}
      />
    </GridItem>
  );
};

export default FormToggleButtonGroup;
