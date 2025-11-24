import React, { FC } from "react";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { Option } from "types";
import { RenderText } from "components/index";
import { useGetApi } from "config/api/useApi";

type FormDropdownProps = {
  name: string;
  label: string;
  options: Option[];
} & TextFieldProps;

// const FormDropdown: FC<FormDropdownProps> = ({ label, name, options }) => {
//   const { data, isLoading } = useGetApi(apiProps);
// }

const FormDropdown: FC<FormDropdownProps> = ({ label, name, options }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      render={({ field }) => (
        <TextField
          {...field}
          id="standard-select-currency"
          select
          fullWidth
          size="small"
          label={<RenderText value={label} />}
          inputProps={{ name, id: name }}
          SelectProps={{
            displayEmpty: true,
            defaultValue: null,
          }}
          variant="outlined"
        >
          <MenuItem value="" hidden />
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <RenderText value={option.label} />
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default FormDropdown;
