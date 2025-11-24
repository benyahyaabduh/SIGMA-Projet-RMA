import React, { forwardRef, useEffect, useState } from "react";
import { isArray, isNull, isNumber } from "lodash";
import { isDefined } from "utils/helper";
import { FilterMode } from "components/Datatable/services/modeOptions";
import { isAfter } from "date-fns";
import { ColumnType } from "components/Datatable/services/columnType";
import FilterByButton from "components/Datatable/components/ToolbarCustomActions/components/FilterByButton";
import FilterByPopper from "components/Datatable/components/ToolbarCustomActions/components/FilterByPopper";
import { useFetchApi } from "config/api/useApi";

const FilterBy = forwardRef(
  ({ column, onChangeFilter, onDeleteFilter, filterFn }: any, ref) => {
    // console.log("FilterBy column", column);

    const { columnDef } = column;
    const { accessorKey, filterPinning = false } = columnDef;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [mode, setMode] = useState<any>(null);
    // console.log("FilterBy mode", mode);

    const [isError, setIsError] = useState(false);

    const [value, setValue] = useState(null);
    // console.log("FilterBy value", value);

    const [pendingValue, setPendingValue] = useState<any>(null);
    // console.log("FilterBy pendingValue", pendingValue);

    const { data, isLoading } = useFetchApi({
      url: columnDef.apiUrl,
      enabled: isDefined(columnDef.apiUrl),
    });
    // console.log("FilterBy data", data);

    const onOpenHandler = (event: any) => {
      setPendingValue(value);
      setAnchorEl(event.currentTarget);
    };

    const onCloseHandler = () => {
      if (anchorEl) {
        anchorEl.focus();
      }
      setAnchorEl(null);
      setIsError(false);
    };

    const onApplyHandler = () => {
      console.log("onApplyHandler pendingValue", pendingValue);
      const columnType = column.columnDef.columnType;
      const filterFn = mode?.code;
      if (filterFn.startsWith(FilterMode.Between)) {
        const minValue = pendingValue[0];
        const maxValue = pendingValue[1];

        if (columnType === ColumnType.Date && isAfter(minValue, maxValue)) {
          setIsError(true);
          return;
        }

        if (columnType === ColumnType.Number && minValue > maxValue) {
          setIsError(true);
          return;
        }
      }

      const newValue = ![FilterMode.NotEmpty, FilterMode.Empty].includes(
        mode?.code,
      )
        ? pendingValue
        : true;

      // console.log("onApplyHandler pendingValue", pendingValue);
      setValue(newValue);
      onChangeFilter({
        accessorKey,
        filterValue: newValue,
        filterFn: mode?.code,
      });

      onCloseHandler();
    };

    useEffect(() => {
      if (!isNull(value)) {
        return;
      }

      const columnType = column.columnDef.columnType;
      // console.log("FilterBy useEffect 1", columnType);

      if (columnType !== ColumnType.DTO) {
        setValue(column.value);
        return;
      }

      if (isDefined(data)) {
        // console.log("FilterBy useEffect 2 -1", column.value);

        if (
          isArray(column.value) &&
          column.value.every((p: any) => isNumber(p))
        ) {
          // console.log("FilterBy useEffect 3", column.value);
          setValue(data.filter((item: any) => column.value.includes(item.id)));
        } else {
          setValue(column.value);
        }
      }
    }, [value, data, column]);

    return (
      <React.Fragment>
        <FilterByButton
          ref={ref}
          value={value}
          mode={mode}
          column={column}
          anchorEl={anchorEl}
          onClick={onOpenHandler}
          {...(!filterPinning && {
            onDelete: onDeleteFilter,
          })}
        />
        <FilterByPopper
          column={column}
          isLoading={isLoading}
          options={data}
          anchorEl={anchorEl}
          mode={mode}
          isError={isError}
          onChangeMode={setMode}
          value={pendingValue}
          // pinned={filterPinning}
          // onChangePinned={setPinned}
          onChangeValue={setPendingValue}
          onApplyHandler={onApplyHandler}
          onCloseHandler={onCloseHandler}
        />
      </React.Fragment>
    );
  },
);

export default FilterBy;
