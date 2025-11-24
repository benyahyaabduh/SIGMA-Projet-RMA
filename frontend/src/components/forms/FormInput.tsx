import React, { FC } from "react";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { buildName, getErrorBy, getErrorByFieldName } from "utils/helper";
import { GridItem } from "components/index";
import InputWrapper from "components/forms/InputWrapper";
import { TextFieldVariants } from "@mui/material/TextField/TextField";

type FormInputProps = {
  name: string;
  nameProps?: string;
  label?: any;
  focused?: boolean;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  isCellMode?: boolean;
  xs?: boolean | number;
  multiline?: boolean;
  rows?: string | number;
  inputProps?: any;
  comment?: any;
  variant?: TextFieldVariants;
  onChange?: (value: any) => void;
  [x: string]: any;
};

const FormInput: FC<FormInputProps> = ({
  name: fieldName,
  nameProps,
  label,
  xs,
  multiline = false,
  rows,
  required,
  disabled = false,
  inputProps,
  variant = "outlined",
  comment,
  onChange,
  ...otherProps
}) => {
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const name = buildName({ name: fieldName, prefix: nameProps });

  return (
    <GridItem xs={xs}>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field }) => {
          const error = getErrorBy({ name, errors });
          return (
            <InputWrapper label={label} comment={comment} required={required}>
              <TextField
                {...field}
                {...otherProps}
                disabled={disabled || isSubmitting}
                variant={variant}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                  ...inputProps,
                }}
                multiline={multiline}
                required={required}
                rows={rows}
                onChange={(event) => {
                  field.onChange(event);
                  if (typeof onChange === "function") {
                    onChange(event.target.value);
                  }
                }}
                error={!!error}
                helperText={!!error && error.message}
              />
            </InputWrapper>
          );
        }}
      />
    </GridItem>
  );
};

export default FormInput;
