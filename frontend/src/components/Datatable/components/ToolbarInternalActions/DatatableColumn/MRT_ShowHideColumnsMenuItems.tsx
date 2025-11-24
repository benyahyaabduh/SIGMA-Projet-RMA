import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { MRT_GrabHandleButton } from "material-react-table";
import { Checkbox } from "@mui/material";
import MRT_ColumnPinningButtons from "./MRT_ColumnPinningButtons";
import { BpCheckedIcon, BpIcon } from "components/Button/BpCheckbox";

export const reorderColumn = (
  draggedColumn: any,
  targetColumn: any,
  columnOrder: any,
) => {
  if (draggedColumn.getCanPin()) {
    draggedColumn.pin(targetColumn.getIsPinned());
  }
  columnOrder.splice(
    columnOrder.indexOf(targetColumn.id),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumn.id), 1)[0],
  );
  return [...columnOrder];
};

export const MRT_ShowHideColumnsMenuItems = ({
  allColumns,
  hoveredColumn,
  setHoveredColumn,
  column,
  isSubMenu,
  table,
}: any) => {
  const {
    getState,
    options: { enableHiding, enablePinning, localization },
    setColumnOrder,
  } = table;
  const { columnOrder } = getState();
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const switchChecked =
    (columnDefType !== "group" && column.getIsVisible()) ||
    (columnDefType === "group" &&
      column.getLeafColumns().some((col: any) => col.getIsVisible()));

  const handleToggleColumnHidden = (column: any) => {
    if (columnDefType === "group") {
      column?.columns?.forEach?.((childColumn: any) => {
        childColumn.toggleVisibility(!switchChecked);
      });
    } else {
      column.toggleVisibility();
    }
  };

  const menuItemRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: any) => {
    setIsDragging(true);
    e.dataTransfer.setDragImage(menuItemRef.current, 0, 0);
  };

  const handleDragEnd = (_e: any) => {
    setIsDragging(false);
    setHoveredColumn(null);
    if (hoveredColumn) {
      setColumnOrder(reorderColumn(column, hoveredColumn, columnOrder));
    }
  };

  const handleDragEnter = (_e: any) => {
    if (!isDragging) {
      setHoveredColumn(column);
    }
  };

  return (
    <>
      <MenuItem
        disableRipple
        ref={menuItemRef}
        onDragEnter={handleDragEnter}
        sx={(theme) => ({
          padding: "0px 5px",
          alignItems: "center",
          justifyContent: "flex-start",
          //my: 0,
          opacity: isDragging ? 0.5 : 1,
          outlineOffset: "-2px",
          outline: isDragging
            ? `2px dashed ${theme.palette.divider}`
            : hoveredColumn?.id === column.id
            ? `2px dashed ${theme.palette.primary.main}`
            : "none",
          //pl: `${(column.depth + 0.5) * 2}rem`,
          //py: "6px",
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            gap: "8px",
          }}
        >
          {!isSubMenu &&
            columnDefType !== "group" &&
            !allColumns.some(
              (col: any) => col.columnDef.columnDefType === "group",
            ) && (
              <MRT_GrabHandleButton
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                table={table}
              />
            )}
          {!isSubMenu &&
            enablePinning &&
            (column.getCanPin() ? (
              <MRT_ColumnPinningButtons column={column} table={table} />
            ) : (
              <Box sx={{ width: "70px" }} />
            ))}
          {enableHiding ? (
            <FormControlLabel
              componentsProps={{
                typography: {
                  sx: {
                    mb: 0,
                    opacity: columnDefType !== "display" ? 1 : 0.5,
                  },
                },
              }}
              checked={switchChecked}
              control={
                <Tooltip
                  arrow
                  enterDelay={1000}
                  enterNextDelay={1000}
                  title={localization.toggleVisibility}
                >
                  {/*<Switch />*/}
                  <Checkbox
                    checked={switchChecked}
                    onChange={() => handleToggleColumnHidden(column)}
                    //name="gilad"
                    checkedIcon={<BpCheckedIcon />}
                    icon={<BpIcon />}
                  />
                </Tooltip>
              }
              disabled={(isSubMenu && switchChecked) || !column.getCanHide()}
              label={columnDef.header}
              onChange={() => handleToggleColumnHidden(column)}
            />
          ) : (
            <Typography sx={{ alignSelf: "center" }}>
              {columnDef.header}
            </Typography>
          )}
        </Box>
      </MenuItem>
      {column.columns?.map((c: any, i: number) => (
        <MRT_ShowHideColumnsMenuItems
          allColumns={allColumns}
          column={c}
          hoveredColumn={hoveredColumn}
          isSubMenu={isSubMenu}
          key={`${i}-${c.id}`}
          setHoveredColumn={setHoveredColumn}
          table={table}
        />
      ))}
    </>
  );
};
