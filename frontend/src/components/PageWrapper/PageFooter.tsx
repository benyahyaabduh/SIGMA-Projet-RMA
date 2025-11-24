import React, { PropsWithChildren } from "react";
import { Paper, Stack } from "@mui/material";

interface PageFooterProps {
  sx?: any;
}

const PageFooter = ({ sx, children }: PropsWithChildren<PageFooterProps>) => {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        zIndex: (theme) => theme.zIndex.fab,
        ...sx,
      }}
      elevation={3}
    >
      <Stack direction="row" justifyContent="end">
        {children}
      </Stack>
    </Paper>
  );
};

export default PageFooter;
