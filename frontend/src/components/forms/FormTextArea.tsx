import React, { FC } from "react";
import FormInput from "components/forms/FormInput";

interface FormTextAreaProps {
  name: string;
  label: any;
  required?: boolean;
  disabled?: boolean;
  xs?: number;
  rows?: string | number;
  [x: string]: any;
}

const FormTextArea: FC<FormTextAreaProps> = ({
  name,
  label,
  required = false,
  disabled = false,
  rows = 3,
  xs,
}) => (
  <FormInput
    name={name}
    label={label}
    xs={xs}
    required={required}
    disabled={disabled}
    rows={rows}
    multiline
    sx={{ "& .MuiOutlinedInput-root": { p: 0 } }}
  />
);

export default FormTextArea;
