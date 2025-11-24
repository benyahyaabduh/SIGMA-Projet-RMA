import React, { FC } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";
import { buildName, formatDate, getErrorBy, toDate } from "utils/helper";
import { GridItem } from "components/index";
import InputWrapper from "components/forms/InputWrapper";

export enum DatePickerView {
  YEAR = "year",
  MONTH = "month",
  DAY = "day",
}

type FormDatePickerProps = {
  name: string;
  nameProps?: string;
  label: string | object;
  required?: boolean;
  disabled?: boolean;
  xs?: number | boolean;
  onChange?: (value: any) => void;
  views?: DatePickerView[];
  inputFormat?: string;
  [x: string]: any;
}; // & TextFieldProps;

const FormDatePicker: FC<FormDatePickerProps> = ({
  label,
  name: fieldName,
  nameProps,
  required = false,
  disabled = false,
  onChange,
  xs,
  views = ["year", "month", "day"],
  inputFormat = "dd/MM/yyyy",
  ...rest
}) => {
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const name = buildName({ name: fieldName, prefix: nameProps });

  return (
    <GridItem xs={xs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, onBlur, name, ...field }, fieldState }) => {
          // console.log("DatePicker render", field);
          // const error = getErrorBy({ name, errors });
          return (
            <InputWrapper label={label} required={required}>
              <DatePicker
                {...field}
                name={name}
                // value={toDate(field.value)}
                views={views}
                disabled={disabled || isSubmitting}
                showDaysOutsideCurrentMonth
                // disableHighlightToday
                format={inputFormat}
                inputRef={ref}
                // timezone={}
                onChange={(value) => {
                  if (value) {
                    // field.onChange(formatDate({ value: new Date() }));
                    field.onChange(value);
                    if (typeof onChange === "function") {
                      onChange(value);
                    }
                    // const providedDate = new Date(value);
                    // field.onChange(providedDate);
                    // if (typeof onChange === "function") {
                    //   onChange(providedDate);
                    // }
                  }
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: false,
                    size: "small",
                    InputProps: {
                      disableUnderline: false,
                    },
                    // variant: "standard",
                    // error: !!error,
                    // helperText: !!error && error.message,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                    onBlur: onBlur,
                  },
                }}
                {...rest}
              />
            </InputWrapper>
          );
        }}
      />
    </GridItem>
  );
};

export default FormDatePicker;
