import React, { FC, useMemo, useState } from "react";
import {
  alpha,
  Container,
  createTheme,
  Icon,
  lighten,
  ListItemIcon,
  MenuItem,
  styled,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { frFR } from "@mui/material/locale";
import { RowSelectionState } from "@tanstack/react-table";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
} from "material-react-table";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useIntl } from "react-intl";

import { useFetchApi } from "config/api/useApi";
import {
  buildName,
  isDefined,
  isDefinedAndNotEmpty,
  isFormattedMessage,
  isNotDefinedOrEmpty,
} from "utils/helper";

import RenderText from "../RenderText";

import DateCellFormat from "./components/DateCellFormat";
import NumberCellFormat from "./components/NumberCellFormat";
import PercentCellFormat from "./components/PercentCellFormat";
import PriceCellFormat from "./components/PriceCellFormat";
import StatusCellFormat from "./components/StatusCellFormat";
import { DatatableProps } from "types/DatatableProps";
import {
  ColumnType,
  ColumnTypeModes,
} from "components/Datatable/services/columnType";
import RenderCell from "components/Datatable/components/RenderCell";
import ToolbarCustomActions from "components/Datatable/components/ToolbarCustomActions";
import ToolbarInternalActions from "components/Datatable/components/ToolbarInternalActions";

export {
  DateCellFormat,
  NumberCellFormat,
  PercentCellFormat,
  PriceCellFormat,
  StatusCellFormat,
};

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontStretch: "normal",
  letterSpacing: "0.15px",
  lineHeight: 1.6,
  variant: "subtitle1",
  color: theme.palette.secondary.main,
  fontSize: 18,
}));

const buildColumnCell = ({ columnType }: any) => {
  switch (columnType) {
    case ColumnType.Date:
      return { Cell: DateCellFormat };
    case ColumnType.Datetime:
      return {
        Cell: ({ cell }: any) => (
          <DateCellFormat cell={cell} format="dd/MM/yyyy à HH:mm:ss" />
        ),
      };
    case ColumnType.Number:
      return { Cell: NumberCellFormat };
    case ColumnType.PERCENT:
      return { Cell: PercentCellFormat };
    case ColumnType.Boolean:
      return { Cell: StatusCellFormat };
    default:
      return {
        Cell: RenderCell,
      };
  }
};

const formatColumnsHeader = ({
  intl,
  columns,
}: {
  intl: any;
  columns: any[];
}) =>
  columns?.map((column) => {
    const { header, ...rest } = column;

    return {
      ...buildColumnCell(column),
      ...rest,
      ...(isFormattedMessage(header)
        ? {
            header: intl.formatMessage(header),
            Header: () => <RenderText value={header} />,
          }
        : { header }),
      columnFilterModeOptions: ColumnTypeModes[column.columnType],
      // columnFilterModeOptions: ["between", "lessThan", "greaterThan"],
    };
  }) || [];

export const DatatableForm = (props: any) => {
  const { name: fieldName, nameProps } = props;
  const methods = useFormContext();
  const name = buildName({ name: fieldName, prefix: nameProps });

  const {
    fields: items,
    append: onAddItem,
    update: onUpdateItem,
    remove: onRemoveItem,
  } = useFieldArray({
    control: methods?.control,
    name,
  });

  // const { onDelete } = useDelete();

  const markAsDirty = () => {
    methods.setValue(`${name}_isDirty`, true, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onAddHandler = (item: any) => {
    onAddItem(item);
    markAsDirty();
  };

  const onRemoveHandler = (item: any) => {
    onRemoveItem(item);
    markAsDirty();
  };

  const onUpdateHandler = (index: number, item: any) => {
    onUpdateItem(index, item);
    markAsDirty();
  };

  return (
    <Datatable
      {...props}
      data={items}
      formProps={{
        name,
        onAddItem: onAddHandler,
        onRemoveItem: onRemoveHandler,
        onUpdateItem: onUpdateHandler,
      }}
    />
  );
};

const Datatable: FC<DatatableProps> = ({
  rows = [],
  apiProps,
  title,
  icon,
  columns,
  backgroundColor = "#ffffff",
  renderDetailPanel,
  onRowSelect,
  enableColumnFilters = true,
  rowActionMenu,
  rowActions,
  toolbarActions,
  formProps,
  enableDivider = true,
  viewMode = false,
  enablePagination = true,
  ...rest
}) => {
  const mainColor = "#1D2A5C";
  const theme = useTheme();
  const intl = useIntl();

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );
  const [columnFilterFns, setColumnFilterFns] = useState({});
  const [sorting, setSorting] = useState([
    {
      id: "id",
      desc: true,
    },
  ]);

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const memoisedColumns = useMemo<MRT_ColumnDef<any>[]>(
    () => formatColumnsHeader({ intl, columns }),
    [intl, columns],
  );

  const onSelectHandler = (original: any) => {
    if (typeof onRowSelect === "function") {
      onRowSelect(original);
    }
  };

  const apiCallEnabled = isDefinedAndNotEmpty(apiProps);

  // ("Datatable apiCallEnabled", apiCallEnabled);

  const onFilterChange = ({ accessorKey, filterValue, filterFn }: any) => {
    // ("Table onFilterChange", accessorKey, filterValue);
    if (isNotDefinedOrEmpty(accessorKey)) {
      return;
    }

    const filterIndex = columnFilters.findIndex(
      (item) => item.id === accessorKey,
    );

    const filter = { id: accessorKey, value: filterValue };

    const updatedFilters =
      filterIndex === -1
        ? columnFilters.concat([filter])
        : columnFilters.map((item) => (item.id === filter.id ? filter : item));

    // ("Table onFilterChange updatedFilters", updatedFilters);

    setColumnFilters(updatedFilters);

    if (isDefinedAndNotEmpty(filterFn)) {
      setColumnFilterFns({
        ...columnFilterFns,
        [accessorKey]: filterFn,
      });
    }
  };

  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch: onRefresh,
  } = useFetchApi({
    enabled: apiCallEnabled,
    url: apiProps?.url || "",
    columnFilters,
    columnFilterFns,
    sorting,
    pagination: enablePagination ? pagination : undefined,
    ...apiProps,
  });

  // ("Datatable", { data });

  return (
    <ThemeProvider theme={createTheme(theme, frFR)}>
      <MaterialReactTable
        localization={MRT_Localization_FR}
        columns={memoisedColumns}
        data={(apiCallEnabled ? data?.rows : rows) || []}
        enablePinning
        enableStickyHeader
        enableTopToolbar
        enableBottomToolbar={enablePagination}
        enableToolbarInternalActions
        enableColumnFilters={false}
        enableColumnOrdering={false}
        enablePagination={enablePagination}
        renderDetailPanel={renderDetailPanel}
        enableRowSelection={isDefined(onRowSelect)}
        enableMultiRowSelection={false}
        getRowId={(row) => row?.id}
        onRowSelectionChange={setRowSelection}
        positionActionsColumn="last"
        columnFilterModeOptions={null}
        manualFiltering
        onColumnFiltersChange={setColumnFilters}
        onColumnFilterFnsChange={setColumnFilterFns}
        onSortingChange={setSorting}
        initialState={{
          columnPinning: { right: ["mrt-row-actions"] },
          showColumnFilters: true,
          // sorting: [
          //     {
          //         id: 'id',
          //         desc: false
          //     }
          // ],
          ...rest?.initialState,
        }}
        state={{
          rowSelection,
          columnFilters,
          pagination,
          columnVisibility: {
            "mrt-row-select": false,
          },
          ...(isDefined(pagination) ? { pagination } : {}),
          ...(apiCallEnabled && {
            showAlertBanner: isError,
            showProgressBars: isFetching,
            isLoading,
          }),
        }}
        enableRowActions={
          !viewMode && (isDefined(rowActions) || isDefined(rowActionMenu))
        }
        onPaginationChange={(newPagination) => {
          setPagination(newPagination);
        }}
        muiTableHeadCellProps={{
          sx: {
            // backgroundColor: "#d3d9e6",
            backgroundColor: "#f6f7fa",
            color: "#234585",
            fontWeight: 500,
          },
        }}
        muiTableFooterCellProps={{
          sx: {
            backgroundColor: lighten("#d3d9e6", 0.5), // '#d3d9e6',
            color: "#234585",
            fontWeight: 500,
          },
        }}
        muiTableBodyCellProps={({ cell, column, row, table }) => ({
          // onClick: (event) => {
          //   if (
          //     column.id !== "mrt-row-actions" &&
          //     isDefined(rowActions?.onRowClick)
          //   ) {
          //     rowActions?.onRowClick(row.original);
          //   }
          // },
          sx: {
            color: "#234585",
            fontWeight: 700,
            ...(!enableDivider && { borderBottom: 0 }),
          },
        })}
        muiBottomToolbarProps={{
          sx: {
            bgcolor: "transparent",
          },
        }}
        muiTopToolbarProps={{
          sx: {
            bgcolor: "transparent",
          },
        }}
        muiTablePaperProps={{
          elevation: 1,
          sx: {
            padding: "10px 15px",
            borderRadius: "8px",
            boxShadow: "rgb(0 0 0 / 8%) 0px 10px 30px",
            border: "1px solid rgba(168, 188, 197, 0.4)",
            backgroundColor: "#fff",
            "& tr:last-child td": {
              borderBottom: 0,
            },
          },
        }}
        muiTableContainerProps={{
          sx: {
            borderRadius: 2,
            maxWidth: "100%",
            maxHeight: "100%",
            backgroundColor,
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: 3,
              height: 6,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: alpha(mainColor, 0.2),
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: lighten(mainColor, 0.4),
              borderRadius: "16px",
            },
          },
        }}
        muiTableBodyProps={{
          sx: () => ({
            "& tr:nth-of-type(odd)": {
              backgroundColor: "#f6f7fa",
            },
          }),
        }}
        muiTableBodyRowProps={({ row }) => ({
          selected: rowSelection[row?.id],
          onClick: () => onSelectHandler(row.original),
          sx: {
            cursor: "pointer",
            bgcolor: "transparent",
          },
        })}
        displayColumnDefOptions={{
          "mrt-row-actions": {
            // header: "",
            size: 80,
          },
        }}
        manualPagination
        rowCount={data?.meta?.totalElements ?? 0}
        renderTopToolbarCustomActions={({ table }) => (
          <ToolbarCustomActions
            table={table}
            onFilterChange={onFilterChange}
          />
        )}
        renderToolbarInternalActions={({ table }) => (
          <ToolbarInternalActions
            table={table}
            viewMode={viewMode}
            formProps={formProps}
            toolbarActions={toolbarActions}
          />
        )}
        {...(isDefined(rowActionMenu) && {
          renderRowActionMenuItems: ({ closeMenu, row }) =>
            rowActionMenu?.map((action, index) => {
              const { icon, label } = action;
              return (
                <MenuItem
                  key={`row-action-${index}`}
                  onClick={() => {
                    action.onClick(row.original);
                    closeMenu();
                  }}
                  sx={{ m: 0 }}
                >
                  {isDefined(icon) && (
                    <ListItemIcon>
                      <Icon component={icon} />
                    </ListItemIcon>
                  )}
                  <RenderText value={label} />
                </MenuItem>
              );
            }) || [],
        })}
        {...(isDefined(rowActions) && {
          renderRowActions: (props) => {
            const { row, table } = props;
            const totalSize = table?.options?.data?.length;

            return (
              rowActions && (
                <Container
                  {...props}
                  component={rowActions}
                  index={row.index}
                  data={row.original}
                  table={table}
                  {...(isDefined(formProps)
                    ? {
                        name: formProps?.name,
                        onAddItem: formProps?.onAddItem,
                        onRemoveItem: () => formProps?.onRemoveItem(row.index),
                        onUpdateItem: (item: any) =>
                          formProps?.onUpdateItem(row.index, item),
                        isLast: totalSize === row.index + 1,
                      }
                    : {})}
                />
              )
            );
          },
        })}
        {...rest}
      />
    </ThemeProvider>
  );
};

export default Datatable;
