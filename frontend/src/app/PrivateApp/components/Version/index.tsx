import { Box, styled, Typography } from "@mui/material";
import React from "react";

const StyledTypography = styled(Typography)({
  color: "rgba(255, 255, 255, 0.4)",
  fontSize: "14px",
  fontWeight: "bold",
});

const Version = ({ open }: any) => {
  return (
    open && (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "10px 0px",
        }}
      >
        <StyledTypography>v.0.0.1</StyledTypography>
      </Box>
    )
  );
};

export default Version;
