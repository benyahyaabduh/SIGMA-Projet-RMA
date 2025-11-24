import React from "react";
import {
  MRT_ShowHideColumnsButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleGlobalFilterButton as MRTToggleGlobalFilterButton,
} from "material-react-table";
import { Box, Container, Stack } from "@mui/material";
import DatatableColumn from "./DatatableColumn";
import DatatableOptions from "./DatatableOptions";
import ToolbarAddButton from "components/Datatable/components/ToolbarCustomActions/components/ToolbarAddButton";

const ToolbarInternalActions = ({
  table,
  params,
  viewMode,
  toolbarActions,
  formProps,
}: any) => {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      {!viewMode && toolbarActions && (
        <>
          <Box sx={{ width: 10 }} />
          <Container table={table} {...formProps} component={toolbarActions} />
        </>
      )}
      <MRTToggleGlobalFilterButton table={table} />
      <MRT_ToggleFullScreenButton table={table} />
      <MRT_ShowHideColumnsButton table={table} />
      {/*<DatatableColumn table={table} />*/}
      {params?.onNew && (
        <ToolbarAddButton
        //onClick={tableOptions?.onAddClick}
        />
      )}
      <DatatableOptions table={table} />
    </Stack>
  );
};

export default ToolbarInternalActions;
