import React, { FC } from "react";
import { ReportProblemOutlined as ReportProblemOutlinedIcon } from "@mui/icons-material";
import { lighten, Stack, styled, Typography } from "@mui/material";

import { RenderText } from "components";
import { isDefined } from "utils/helper";
import messages from "config/i18n/messages";

const StyledTypography = styled(Typography)({
  color: "#4fa94d",
  fontSize: "20px",
  fontWeight: 600,
});

interface PageErrorProps {
  message?: any;
  height?: number;
  vHeight?: number;
}

const PageError: FC<PageErrorProps> = ({ message, height, vHeight = 200 }) => {
  const color = "#e98927";

  return (
    <Stack
      spacing={1}
      alignItems="center"
      justifyContent="center"
      sx={{
        borderRadius: 5,
        height: isDefined(height) ? height : `calc(100vh - ${vHeight}px)`,
        backgroundColor: lighten(color, 0.9),
      }}
    >
      <ReportProblemOutlinedIcon sx={{ fontSize: 60, color }} />
      <StyledTypography sx={{ color }}>
        <RenderText value={message || messages.errorLoadingPage} />
      </StyledTypography>
    </Stack>
  );
};

export default PageError;
