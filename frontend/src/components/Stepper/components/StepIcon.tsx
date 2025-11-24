import React from "react";
import { Box, Grid } from "@mui/material";
import StepDivider from "components/Stepper/components/StepDivider";
import { StepStatus } from "components/Stepper/actions/StepStatus";

const StepIcon = ({
  borderColor,
  indicator,
  indicatorIcon,
  onClick,
  status,
}: {
  indicator: string;
  indicatorIcon: string;
  borderColor: string;
  status: string;
  onClick?: () => void;
}) => {
  return (
    <Box sx={{ mt: "-12px", zIndex: 1050 }}>
      <Grid container spacing={0}>
        <Grid item xs>
          <StepDivider color={borderColor} />
        </Grid>
        <Grid
          item
          {...(status === StepStatus.INACTIVE
            ? { onClick: undefined }
            : { onClick, sx: { cursor: "pointer" } })}
        >
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 30,
              height: 24,
              width: 24,
              background: indicator,
              padding: "4px",
            }}
          >
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: 30,
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "4px",
              }}
            >
              <Box
                sx={{
                  background: indicatorIcon,
                  borderRadius: 30,
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs>
          <StepDivider color={borderColor} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepIcon;
