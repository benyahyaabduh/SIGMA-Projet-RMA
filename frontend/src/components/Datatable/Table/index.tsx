import React, { useEffect, useState } from "react";
import { useMaterialReactTable } from "material-react-table";
import { isNotDefined } from "utils/helper";
import { useFetchApi } from "config/api/useApi";
import { Box } from "@mui/material";

const Table = ({
  title,
  rows,
  columns = [],
  apiProps,
  rowActions,
  paperBackground = "inherit",
  maxHeight,
  vhHeight,
  height,
  enablePagination = false,
  toolbarInternalActions,
  initialState,
  detailPanel,
  ...rest
}: any) => {
  // const { options, state } = useTable({ columns, rowActions });
  // const { columnFilters, columnFilterFns, sorting, pagination } = state;
  //
  // const {
  //   data,
  //   isLoading,
  //   isError,
  //   isRefetching,
  //   refetch: onRefresh,
  // } = useFetchApi({
  //   url: apiProps?.url,
  //   columnFilters,
  //   columnFilterFns,
  //   sorting,
  //   pagination: enablePagination ? pagination : null,
  //   enabled: isNotDefined(rows),
  // });

  // console.log("Table data", data, rows);
  //
  // const table = useMaterialReactTable({
  //   ...options,
  //   data: data?.rows || rows || [],
  //   enablePagination,
  //   enableBottomToolbar: enablePagination, //hide the bottom toolbar as well if you want
  //   initialState: {
  //     paperBackground,
  //     height,
  //     maxHeight,
  //     vhHeight,
  //     density: "compact",
  //     showColumnFilters: false,
  //     title: title,
  //     onRefresh,
  //     ...initialState,
  //     columnVisibility: {
  //       loadingPeriodStartDate: false,
  //       loadingPeriodEndDate: false,
  //       "currency.code": false,
  //       "productType.code": false,
  //       "coProduct.code": false,
  //       "mrt-row-expand": false,
  //       ...initialState?.columnVisibility,
  //     },
  //     columnPinning: { right: ["mrt-row-actions"] },
  //   },
  //   state: {
  //     ...state,
  //     isLoading,
  //     showAlertBanner: isError,
  //     showProgressBars: isRefetching,
  //   },
  //   //TODO to be replaced by ToolbarAlertBanner
  //   muiToolbarAlertBannerProps: isError
  //     ? {
  //         color: "error",
  //         children: "Error loading data",
  //       }
  //     : undefined,
  //   ...(isDefined(detailPanel) && {
  //     renderDetailPanel: (props) => (
  //       <Container component={detailPanel} {...props} />
  //     ),
  //   }),
  //   ...rest,
  // });
  //
  // return <ReactTable table={table} />;

  return <Box>ddd</Box>;
};

export default Table;
