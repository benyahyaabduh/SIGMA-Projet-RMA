import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { ColumnType } from "components/Datatable/services/columnType";
import FilterAutocomplete from "components/Datatable/components/ToolbarCustomActions/components/FilterAutocomplete";
import FilterByNumber, {
  FilterByNumberRange,
} from "components/Datatable/components/ToolbarCustomActions/components/FilterByNumber";
import FilterByDate, {
  FilterByDateRange,
} from "components/Datatable/components/ToolbarCustomActions/components/FilterByDate";
import FilterByBoolean from "components/Datatable/components/ToolbarCustomActions/components/FilterByBoolean";
import FilterByText from "components/Datatable/components/ToolbarCustomActions/components/FilterByText";

const FilterByContent = ({
  mode,
  column,
  value,
  onChangeValue,
  isLoading,
  options = [],
}: any) => {
  const { columnDef } = column;
  // console.log("FilterByContent value", columnDef.accessorKey, value);
  // column.getFilterFn

  if (isLoading) {
    return (
      <ThreeDots
        height="50"
        width="50"
        radius="6"
        color="#3a4b95"
        ariaLabel="three-dots-loading"
        wrapperStyle={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        visible
      />
    );
  }

  if ([ColumnType.Numeric, ColumnType.Number].includes(columnDef.columnType)) {
    if (mode?.isMultiple === true) {
      return (
        <FilterByNumberRange
          value={value || [null, null]}
          onChange={onChangeValue}
        />
      );
    }
    return <FilterByNumber value={value} onChange={onChangeValue} isWrapped />;
  }

  if (columnDef.columnType === ColumnType.Date) {
    if (mode?.isMultiple === true) {
      return (
        <FilterByDateRange
          value={value || [null, null]}
          onChange={onChangeValue}
        />
      );
    }
    return <FilterByDate value={value} onChange={onChangeValue} isWrapped />;
  }

  if (columnDef.columnType === ColumnType.Boolean) {
    return (
      <FilterByBoolean value={value} onChange={onChangeValue} column={column} />
    );
  }

  if (columnDef.columnType === ColumnType.DTO) {
    return (
      <FilterAutocomplete
        value={value}
        mode={mode}
        optionKey="id"
        optionLabel="libelle"
        onChange={(event: any, newValue: any, reason: any) => {
          if (
            event.type === "keydown" &&
            event.key === "Backspace" &&
            reason === "removeOption"
          ) {
            return;
          }

          onChangeValue(newValue);
        }}
        options={options}
        {...columnDef?.filterProps}
      />
    );
  }

  return <FilterByText value={value} onChange={onChangeValue} isWrapped />;
};

export default FilterByContent;
