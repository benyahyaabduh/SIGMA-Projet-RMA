import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { MRT_ShowHideColumnsMenuItems } from "./MRT_ShowHideColumnsMenuItems";
import { MenuList, Stack, Typography } from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { LinkButton, RenderText } from "components";
import messages from "config/i18n/messages";

const showExpandColumn = (props: any, grouping?: any) =>
  !!(
    props.enableExpanding ||
    (props.enableGrouping && (grouping === undefined || grouping?.length)) ||
    props.renderDetailPanel
  );

export const getColumnId = (columnDef: any) =>
  columnDef.id ?? columnDef.accessorKey?.toString?.() ?? columnDef.header;

const getTrailingDisplayColumnIds = (props: any) => [
  props.positionActionsColumn === "last" &&
    (props.enableRowActions ||
      (props.enableEditing &&
        ["row", "modal"].includes(props.editingMode ?? ""))) &&
    "mrt-row-actions",
  props.positionExpandColumn === "last" &&
    showExpandColumn(props) &&
    "mrt-row-expand",
];

export const getLeadingDisplayColumnIds = (props: any) =>
  [
    (props.enableRowDragging || props.enableRowOrdering) && "mrt-row-drag",
    props.positionActionsColumn === "first" &&
      (props.enableRowActions ||
        (props.enableEditing &&
          ["row", "modal"].includes(props.editingMode ?? ""))) &&
      "mrt-row-actions",
    props.positionExpandColumn === "first" &&
      showExpandColumn(props) &&
      "mrt-row-expand",
    props.enableRowSelection && "mrt-row-select",
    props.enableRowNumbers && "mrt-row-numbers",
  ].filter(Boolean);

export const getAllLeafColumnDefs = (columns: any) => {
  const allLeafColumnDefs: any[] = [];
  const getLeafColumns = (cols: any[]) => {
    cols.forEach((col) => {
      if (col.columns) {
        getLeafColumns(col.columns);
      } else {
        allLeafColumnDefs.push(col);
      }
    });
  };
  getLeafColumns(columns);
  return allLeafColumnDefs;
};

const getDefaultColumnOrderIds = (props: any) =>
  [
    ...getLeadingDisplayColumnIds(props),
    ...getAllLeafColumnDefs(props.columns).map((columnDef) =>
      getColumnId(columnDef),
    ),
    ...getTrailingDisplayColumnIds(props),
  ].filter(Boolean);

const StyledButton = styled((props: any) => (
  <Button fullWidth size="small" {...props} />
))(({ theme }) => ({
  //textTransform: "uppercase",
  padding: "5px",
  textTransform: "none",
  borderRadius: "5px",
  //background: `linear-gradient(to right, ${theme.palette.custom.yellow},${theme.palette.secondary.main})`,
  background: "linear-gradient(to right, #3a4b95 0%, #4359b8 100%)",
  color: "#e7e9f0",
}));

const MRT_ShowHideColumnsMenu = ({ isSubMenu, table }: any) => {
  const theme = useTheme();

  const {
    getAllColumns,
    getAllLeafColumns,
    getCenterLeafColumns,
    getIsAllColumnsVisible,
    getIsSomeColumnsPinned,
    getIsSomeColumnsVisible,
    getLeftLeafColumns,
    getRightLeafColumns,
    getState,
    toggleAllColumnsVisible,
    getVisibleFlatColumns,
    options: {
      enableColumnOrdering,
      enableHiding,
      enablePinning,
      localization,
    },
  } = table;
  const { density, columnOrder, columnPinning, columnVisibility } = getState();

  const hideAllColumns = () => {
    getAllLeafColumns()
      .filter((col: any) => col.columnDef.enableHiding !== false)
      .forEach((col: any) => col.toggleVisibility(false));
  };

  const allColumns = useMemo(() => {
    const columns = getAllColumns();
    if (
      columnOrder.length > 0 &&
      !columns.some((col: any) => col.columnDef.columnDefType === "group")
    ) {
      //console.log("MRT_ShowHideColumnsMenu useMemo 1", columns);

      const filteredColumns = [
        ...getLeftLeafColumns(),
        ...Array.from(new Set(columnOrder)).map((colId) =>
          getCenterLeafColumns().find((col: any) => col?.id === colId),
        ),
        ...getRightLeafColumns(),
      ].filter(Boolean);

      //console.log("filteredColumns", filteredColumns);
      //return filteredColumns;
      // Display the selected labels first.
      return [...(filteredColumns || [])]
        .filter((p) => !p.id.startsWith("mrt-row-"))
        .sort((a, b) => {
          const value = filteredColumns.filter((p) => columnVisibility[p.id]);
          let ai = value.indexOf(a);
          ai = ai === -1 ? value.length + filteredColumns?.indexOf(a) : ai;
          let bi = value.indexOf(b);
          bi = bi === -1 ? value.length + filteredColumns?.indexOf(b) : bi;
          return ai - bi;
        });
    }
    //console.log("MRT_ShowHideColumnsMenu useMemo 2", columns);
    return columns;
  }, [
    columnOrder,
    columnPinning,
    getAllColumns(),
    getCenterLeafColumns(),
    getLeftLeafColumns(),
    getRightLeafColumns(),
  ]);

  // console.log("MRT_ShowHideColumnsMenu allColumns", allColumns);

  const [hoveredColumn, setHoveredColumn] = useState(null);

  return (
    <>
      <Box
        sx={{
          borderBottom: `1px solid ${
            theme.palette.mode === "light" ? "#eaecef" : "#30363d"
          }`,
          padding: "8px 10px",
          fontWeight: 600,
        }}
      >
        <Stack direction="row" spacing={1}>
          <Typography sx={{ fontWeight: "bold" }}>
            <RenderText value={messages.allColumns} />
          </Typography>
        </Stack>
      </Box>
      <Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: isSubMenu ? "center" : "space-between",
            p: "0.5rem",
            gap: 0.5,
            //pt: 0,
          }}
        >
          {!isSubMenu && enableHiding && (
            <StyledButton
              disabled={!getIsSomeColumnsVisible()}
              onClick={hideAllColumns}
            >
              {localization.hideAll}
            </StyledButton>
          )}
          {!isSubMenu && (
            <StyledButton
              onClick={() =>
                table.setColumnOrder(getDefaultColumnOrderIds(table.options))
              }
            >
              {localization.resetOrder}
            </StyledButton>
          )}
          {!isSubMenu && enablePinning && (
            <StyledButton
              disabled={!getIsSomeColumnsPinned()}
              onClick={() => table.resetColumnPinning(true)}
            >
              {localization.unpinAll}
            </StyledButton>
          )}
          {enableHiding && (
            <StyledButton
              disabled={getIsAllColumnsVisible()}
              onClick={() => toggleAllColumnsVisible(true)}
            >
              {localization.showAll}
            </StyledButton>
          )}
        </Box>
        <Divider />
        <Box
          sx={{
            //bgcolor: "red",
            maxHeight: 300,
            overflowX: "auto",
            m: 0.5,
            "&::-webkit-scrollbar": {
              width: 5,
              height: 5,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: alpha("#a1a9d0", 0.2),
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#a1a9d0",
              borderRadius: "16px",
            },
          }}
        >
          <MenuList dense>
            {allColumns.map((column: any, index: number) => (
              <MRT_ShowHideColumnsMenuItems
                allColumns={allColumns}
                column={column}
                hoveredColumn={hoveredColumn}
                isSubMenu={isSubMenu}
                key={`${index}-${column.id}`}
                setHoveredColumn={setHoveredColumn}
                table={table}
              />
            ))}
          </MenuList>
        </Box>
      </Stack>
      <Divider />
      <Box sx={{ p: 1, pl: 2, pr: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <LinkButton label={messages.restoreDefaults} />
          <Typography>
            <RenderText
              value={`${Object.values(columnVisibility).reduce(
                (acc: any, cur) => acc + (cur ? 1 : 0),
                0,
              )} of ${allColumns.length}`}
            />
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default MRT_ShowHideColumnsMenu;
