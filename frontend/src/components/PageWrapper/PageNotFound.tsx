import React, { FC } from "react";
import { Container, Stack, styled, Typography } from "@mui/material";
import { ReactComponent as RMALogo } from "assets/icons/rma-icon.svg";
import messages from "config/i18n/messages";
import { RenderText } from "components";

const StyledTypography = styled(Typography)({
  color: "#4fa94d",
  fontSize: "20px",
  fontWeight: 600,
});

interface PageNotFoundProps {
  message?: string | object;
}

const PageNotFound: FC<PageNotFoundProps> = ({
  message = messages.notFoundPage,
}) => {
  const color = "#3a4b95";
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{
        borderRadius: 5,
        height: `calc(100vh - ${200}px)`,
        // backgroundColor: lighten(color, 0.92),
      }}
    >
      <Container component={RMALogo} sx={{ height: 120 }} />
      <StyledTypography sx={{ color, maxWidth: 500, textAlign: "center" }}>
        <RenderText value={message} />
      </StyledTypography>
    </Stack>
  );
};

export default PageNotFound;
