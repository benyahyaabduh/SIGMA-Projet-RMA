import React from "react";
import { isArray, toNumber } from "lodash";
import { Grid, TextField } from "@mui/material";
import NumericFormatCustom from "components/Datatable/components/ToolbarCustomActions/components/FilterByNumber/NumericFormatCustom";
import FilterByWrapper from "../FilterByWrapper";
import { RenderText } from "components";
import messages from "config/i18n/messages";

const FilterByNumber = ({ value, onChange, isWrapped = false }: any) => {
  // console.log("FilterByNumber value", value);
  const onChangeHandler = (newValue: any) => {
    if (typeof onChange === "function") {
      onChange(newValue);
    }
  };

  const getView = () => (
    <TextField
      label={null}
      fullWidth
      required={false}
      value={!isArray(value) ? value : null}
      variant="standard"
      size="small"
      aria-describedby="outlined-weight-helper-text"
      inputProps={{
        "aria-label": "weight",
      }}
      InputProps={{
        inputComponent: NumericFormatCustom as any,
        // isAllowed: isAllowed,
        // sx: {
        //   inputTextAlign: "center",
        // },
      }}
      onBlur={(event) => {
        const newValue = event.target.value || "";
        onChangeHandler(toNumber(newValue.replace(/,/g, "")));
      }}
    />
  );

  if (isWrapped) {
    return <FilterByWrapper>{getView()}</FilterByWrapper>;
  }

  return getView();
};

export const FilterByNumberRange = ({ value, onChange }: any) => {
  // console.log("FilterByNumberRange value", value);
  return (
    <FilterByWrapper>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs>
          <FilterByNumber
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
          <FilterByNumber
            // value={value?.lessThan || null}
            value={value[1]}
            onChange={(newValue: any) => {
              // onChange({ ...value, lessThan: newValue });
              onChange([value[0], newValue]);
            }}
          />
        </Grid>
      </Grid>
    </FilterByWrapper>
  );
};

export default FilterByNumber;
