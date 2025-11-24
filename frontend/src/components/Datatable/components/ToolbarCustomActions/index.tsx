import { MRT_TableInstance } from "material-react-table";
import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import AddFilterButton from "components/Datatable/components/ToolbarCustomActions/components/AddFilterButton";
import { isDefined } from "utils/helper";
import { isNull } from "lodash";
import { modeOptions } from "components/Datatable/services/modeOptions";
import FilterBy from "components/Datatable/components/ToolbarCustomActions/components/FilterBy";

const ToolbarCustomActions = ({
  table,
  onFilterChange,
  toolbarInternalActions,
}: {
  table: MRT_TableInstance<any>;
  onFilterChange: any;
  toolbarInternalActions?: any;
}) => {
  const filterRefs = useRef<any>({});
  // console.log("ToolbarCustomActions filterRefs", filterRefs);

  const [lastFilter, setLastFilter] = useState<string | null>(null);
  // console.log("ToolbarCustomActions lastFilter", lastFilter);

  const state = table.getState();

  const columns = table.getAllColumns();

  const onAddFilter = (accessorKey: any) => {
    // console.log("ToolbarCustomActions onAddFilter", accessorKey);
    onFilterChange({ accessorKey, filterValue: null });
    setLastFilter(accessorKey);
  };

  // const onChangeFilter = ({ accessorKey, filterValue, filterFn }) => {
  //   console.log("onChangeFilter", accessorKey, filterValue);
  //   onFilterChange({ filter: { id: accessorKey, value: filterValue } });
  // };

  const onDeleteFilter = (accessorKey: any) => {
    table.setColumnFilters((prev) => prev.filter((p) => p.id !== accessorKey));
    // setSelectedFilters(selectedFilters.filter((item) => item !== accessorKey));
  };

  const onResetFilters = () => {
    table.resetColumnFilters(true);
  };

  useEffect(() => {
    if (!isNull(lastFilter)) {
      if (isDefined(filterRefs.current[lastFilter])) {
        filterRefs.current[lastFilter].click();
      }
    }
  }, [lastFilter]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 1,
      }}
    >
      {toolbarInternalActions?.actions}
      {state.columnFilters
        .map((item) => ({
          columnDef: columns.find(
            ({ columnDef }) => columnDef.accessorKey === item.id,
          )?.columnDef,
          mode: modeOptions.find(
            (p) => p.code === state.columnFilterFns[item.id],
          ),
          value: item.value,
        }))
        .map((column) => {
          const { columnDef } = column;
          const accessorKey = columnDef?.accessorKey || "";
          return (
            <FilterBy
              key={`filterBy-${accessorKey}`}
              column={column}
              onChangeFilter={onFilterChange}
              onDeleteFilter={onDeleteFilter}
              ref={(element) => {
                filterRefs.current[accessorKey] = element;
              }}
            />
          );
        })}
      <AddFilterButton columns={columns} data={[]} onChange={onAddFilter} />
    </Box>
  );
};

export default ToolbarCustomActions;
