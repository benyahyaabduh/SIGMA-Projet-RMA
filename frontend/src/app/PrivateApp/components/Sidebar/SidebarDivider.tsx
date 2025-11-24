import React from "react";
import { Divider } from "@mui/material";

const SidebarDivider = ({ sx }: any) => {
  return (
    <Divider
      sx={{
        mt: "12px",
        bgcolor: "#fff", // "common.separationLine",
        opacity: 0.1,
        height: "1px",
        ...sx,
      }}
    />
  );
};

export default SidebarDivider;
