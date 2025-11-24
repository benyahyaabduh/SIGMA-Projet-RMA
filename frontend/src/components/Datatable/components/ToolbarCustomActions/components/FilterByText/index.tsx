import React from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { isDefined } from "utils/helper";
import FilterByWrapper from "components/Datatable/components/ToolbarCustomActions/components/FilterByWrapper";

const FilterByText = ({ value, onChange, isWrapped }: any) => {
  const onChangeHandler = (event: any) => {
    if (typeof onChange === "function") {
      onChange(event.target.value);
    }
  };

  const getView = () => (
    <Box>
      <TextField
        id="outlined-controlled"
        value={isDefined(value) ? value : ""}
        fullWidth
        variant="standard"
        onChange={onChangeHandler}
      />
    </Box>
  );

  if (isWrapped) {
    return <FilterByWrapper>{getView()}</FilterByWrapper>;
  }

  return getView();
};

export default FilterByText;
