import React, { FC } from "react";
import { Rating, Stack, styled, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { isDefined } from "utils/helper";
import { GridItem, RenderText } from "components/index";
import { InputWrapper } from "components/forms/index";

interface FormInputProps {
  name: string;
  label?: any;
  focused?: boolean;
  required?: boolean;
  type?: string;
  xs?: number;
  [x: string]: any;
}

const FormRating: FC<FormInputProps> = ({
  name,
  label,
  required = false,
  xs,
  ...otherProps
}) => {
  const { control } = useFormContext();

  return (
    <GridItem xs={xs}>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field }) => (
          <Stack alignItems="flex-start" justifyContent="center">
            <InputWrapper label={label} required={required}>
              <Rating {...field} {...otherProps} />
            </InputWrapper>
          </Stack>
        )}
      />
    </GridItem>
  );
};

export default FormRating;
