import React from "react";
import { Box, Stack, styled } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";

import messages from "config/i18n/messages";
import { isDefined } from "utils/helper";
import { RenderText } from "components";

const StyledTypography = styled(Box)({
  color: "#4fa94d",
  fontSize: "20px",
  fontWeight: 600,
});

const PageLoader = ({
  height,
  vHeight, // = 200,
}: {
  height?: number;
  vHeight?: number;
}) => {
  const color = "#e98927";
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        // height: isDefined(height) ? height : `calc(100vh - ${vHeight}px)`,
        ...(isDefined(height) && { height }),
        ...(isDefined(vHeight) && { height: `calc(100vh - ${vHeight}px)` }),
      }}
    >
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color={color}
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible
      />
      <StyledTypography sx={{ color }}>
        <RenderText value={messages.isLoading} />
      </StyledTypography>
    </Stack>
  );
};

export default PageLoader;
