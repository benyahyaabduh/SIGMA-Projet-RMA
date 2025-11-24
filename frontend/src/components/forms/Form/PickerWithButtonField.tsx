import * as React from "react";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { UseDateFieldProps } from "@mui/x-date-pickers/DateField";
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from "@mui/x-date-pickers/models";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { AdapterFormats } from "@mui/x-date-pickers/models/adapters";

interface ButtonFieldProps
  extends UseDateFieldProps<AdapterDateFns>,
    BaseSingleInputFieldProps<
      AdapterDateFns | null,
      AdapterDateFns,
      FieldSection,
      DateValidationError
    > {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ButtonField(props: ButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
    >
      {label ? `Current date: ${label}` : "Pick a date"}
    </Button>
  );
}

function ButtonDatePicker(
  props: Omit<DatePickerProps<AdapterDateFns>, "open" | "onOpen" | "onClose">,
) {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } as any }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
}

export default function PickerWithButtonField() {
  const [value, setValue] = React.useState<AdapterDateFns | null>(null);
  console.log("PickerWithButtonField value", value);

  return (
    <ButtonDatePicker
      // label={value == null ? null : value.format("MM/DD/YYYY")}
      // label={value == null ? null : format(value.,"MM/DD/YYYY")}
      label={value == null ? null : format(new Date(), "dd/MM/yyyy")}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
}
