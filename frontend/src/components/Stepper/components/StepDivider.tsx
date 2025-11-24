import React from "react";
import { Divider } from "@mui/material";

const StepDivider = ({ sx, color }: { sx?: any; color: string }) => {
  return (
    <Divider
      sx={{
        mt: "12px",
        bgcolor: color,
        height: "1px",
        width: "100%",
        ...sx,
      }}
    />
  );
};

export default StepDivider;
