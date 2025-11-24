import React, { FC } from "react";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { GridItem, RenderText } from "components/index";

type FormCheckboxProps = {
  name: string;
  label: string | object;
  xs?: number;
  required?: boolean;
  disabled?: boolean;
  checked?: boolean;
}; // & TextFieldProps;

const FormCheckbox: FC<FormCheckboxProps> = ({
  name,
  label,
  xs,
  required,
  disabled,
  checked,
  ...rest
}) => {
  const methods = useFormContext();

  return (
    <GridItem xs={xs}>
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            aria-label="trust this device checkbox"
            required={required}
            disabled={disabled}
            checked={checked}
            {...methods.register(name)}
            {...rest}
          />
        }
        label={
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.8rem",
              fontWeight: 400,
              color: "#5e5b5d",
            }}
          >
            <RenderText value={label} />
          </Typography>
        }
      />
    </GridItem>
  );
};

export default FormCheckbox;
