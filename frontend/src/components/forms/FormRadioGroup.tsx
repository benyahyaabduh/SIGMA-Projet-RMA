import React, { FC } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextFieldProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { Option } from "types";
import { GridItem } from "components";
import { InputWrapper } from "components/forms/index";

type FormRadioGroupProps = {
  label?: any;
  name: string;
  options: Option[];
  xs?: number | boolean;
  row?: boolean;
  required?: boolean;
} & TextFieldProps;

const FormRadioGroup: FC<FormRadioGroupProps> = ({
  label,
  name,
  options,
  xs,
  row = false,
  required = false,
}) => {
  const { control, setValue } = useFormContext();

  return (
    <GridItem xs={xs}>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field }) => (
          <InputWrapper label={label} required={required}>
            <RadioGroup
              row={row}
              {...field}
              // value={getSelectedValue(field)}
              onChange={(e, value) => {
                field.onChange(value);
                const selected = options.find((p) => p.value === value);
                setValue(`${name}Option`, selected);
              }}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={`radio-${option.id}`}
                  value={option.value}
                  // value={option}
                  control={<Radio />}
                  label={option.label}
                  // value={getSelectedValue(field)}
                />
              ))}
            </RadioGroup>
          </InputWrapper>
        )}
      />
    </GridItem>
  );
};

export default FormRadioGroup;
