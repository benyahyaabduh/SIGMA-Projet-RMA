import React from "react";
import FilterByWrapper from "components/Datatable/components/ToolbarCustomActions/components/FilterByWrapper";
import Switcher from "components/Datatable/components/ToolbarCustomActions/components/Switcher";

const FilterByBoolean = ({ value, onChange, column }: any) => {
  const onChangeHandler = (newValue: any) => {
    if (typeof onChange === "function") {
      onChange(newValue);
    }
  };

  return (
    <FilterByWrapper>
      <Switcher
        isChecked={value}
        rightLabel={column.columnDef.header}
        fullWidth
        onChange={onChangeHandler}
      />
    </FilterByWrapper>
  );
};

export default FilterByBoolean;
