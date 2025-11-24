import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Grid } from "@mui/material";
import { isArray } from "lodash";
import FilterByWrapper from "components/Datatable/components/ToolbarCustomActions/components/FilterByWrapper";
import { RenderText } from "components";
import messages from "config/i18n/messages";

const FilterByDate = ({ value, onChange, isWrapped = false }: any) => {
  const onChangeHandler = (newValue: any) => {
    if (typeof onChange === "function") {
      onChange(newValue);
    }
  };

  const getView = () => (
    <DatePicker
      label={null}
      value={!isArray(value) ? value : null}
      onChange={onChangeHandler}
      format="dd/MM/yyyy"
      views={["month", "year", "day"]}
      showDaysOutsideCurrentMonth
      slotProps={{
        textField: {
          fullWidth: true,
          required: false,
          size: "small",
          InputProps: {
            disableUnderline: false,
          },
          variant: "standard",
        },
      }}
    />
  );

  if (isWrapped) {
    return <FilterByWrapper>{getView()}</FilterByWrapper>;
  }

  return getView();
};

export const FilterByDateRange = ({ value, onChange }: any) => {
  return (
    <FilterByWrapper>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs>
          <FilterByDate
            value={value[0]}
            onChange={(newValue: any) => {
              onChange([newValue, value[1]]);
            }}
          />
        </Grid>
        <Grid item>
          <RenderText value={messages.and} />
        </Grid>
        <Grid item xs>
          <FilterByDate
            value={value[1]}
            onChange={(newValue: any) => {
              onChange([value[0], newValue]);
            }}
          />
        </Grid>
      </Grid>
    </FilterByWrapper>
  );
};

export default FilterByDate;
