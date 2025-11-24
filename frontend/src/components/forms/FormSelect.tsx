import React, { FC } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextFieldProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const priorityList = [
  { value: 1, label: "high" },
  { value: 2, label: "middle" },
  { value: 3, label: "low" },
];

type FormSelectProps = {
  name: string;
} & TextFieldProps;

const FormSelect: FC<FormSelectProps> = ({ name }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={!!fieldState.error?.message}>
          <InputLabel id="area-label">Priority</InputLabel>
          <Select {...field} labelId="area-label" label="Priority">
            {priorityList.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormSelect;
