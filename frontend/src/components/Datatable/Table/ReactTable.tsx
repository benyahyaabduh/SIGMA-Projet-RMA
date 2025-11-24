import React from "react";
import { ThemeProvider } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { theme } from "components/Datatable/Table/theme";

const ReactTable = ({ table }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <MaterialReactTable table={table} />
      {/*<DatatableExport table={table} />*/}
    </ThemeProvider>
  );
};

export default ReactTable;
