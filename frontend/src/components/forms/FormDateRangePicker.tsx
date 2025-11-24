import React, { FC } from "react";
import { Grid } from "@mui/material";
import { addDays, isDate, endOfYear, startOfYear } from "date-fns";
import { isNull, isNumber, isUndefined } from "lodash";
import { useFormContext, useWatch } from "react-hook-form";
import { isDefined, isNotDefined } from "utils/helper";
import { FormDatePicker } from "components/forms/index";

type FormDateRangePickerProps = {
  name: string;
  fromLabel: string | object;
  toLabel: string | object;
  required?: boolean;
  xs?: number | boolean;
  onChange?: (value?: any) => void;
  disabled?: boolean;
  selectedDate?: number | Date;
  fromMaxDate?: number | Date;
  toMaxDate?: number | Date;
};

const FormDateRangePicker: FC<FormDateRangePickerProps> = ({
  name,
  fromLabel,
  toLabel,
  required = false,
  xs,
  disabled = false,
  selectedDate,
  fromMaxDate,
  toMaxDate,
  onChange,
}) => {
  const isDisabled = isUndefined(selectedDate) || isNull(selectedDate);
  const fromPath = `${name}.from`;
  const toPath = `${name}.to`;

  const { control, setValue } = useFormContext();
  const fromDate = useWatch({
    control,
    name: fromPath,
  });

  const startDateProps: any = {};
  const endDateProps: any = {};

  if (!isDisabled) {
    if (isDate(selectedDate)) {
      startDateProps.minDate = selectedDate;
      startDateProps.defaultCalendarMonth = selectedDate;
      endDateProps.minDate = selectedDate;
    }

    if (isNumber(selectedDate)) {
      startDateProps.minDate = startOfYear(selectedDate);
      startDateProps.maxDate = endOfYear(selectedDate);
      startDateProps.defaultCalendarMonth = startOfYear(selectedDate);
      endDateProps.minDate = startOfYear(selectedDate);
    }
  }

  if (isDefined(fromDate)) {
    const startFrom = addDays(fromDate, 1);
    endDateProps.minDate = startFrom;
    endDateProps.defaultCalendarMonth = startFrom;
  }

  const onChangeFromDate = () => {
    setValue(toPath, null);

    if (typeof onChange === "function") {
      onChange();
    }
  };
  return (
    <Grid item container xs={xs} spacing={2}>
      <FormDatePicker
        label={fromLabel}
        name={fromPath}
        required={required}
        disabled={disabled || isDisabled}
        xs={6}
        onChange={onChangeFromDate}
        maxDate={fromMaxDate}
        {...startDateProps}
      />
      <FormDatePicker
        label={toLabel}
        name={`${name}.to`}
        required={required}
        disabled={disabled || isDisabled || isNotDefined(fromDate)}
        {...endDateProps}
        xs={6}
        maxDate={toMaxDate}
      />
    </Grid>
  );
};

export default FormDateRangePicker;
