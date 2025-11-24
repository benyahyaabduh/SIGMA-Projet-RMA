import React from "react";
import { styled, Typography } from "@mui/material";
import { CardWrapper, RenderText } from "components";
import messages from "config/i18n/messages";

const StyledTypography = styled(Typography)({
  color: "#234585",
  fontSize: "20px",
  fontWeight: 600,
});

const PageNoData = ({ title }: any) => {
  const color = "#e98927";

  return (
    <CardWrapper
      title={title}
      cardProps={{ sx: { height: 1 } }}
      contentProps={{
        sx: {
          // bgcolor: color,
          height: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 0,
        },
      }}
    >
      <StyledTypography>
        <RenderText value={messages.noDataFound} />
      </StyledTypography>
    </CardWrapper>
  );
};

export default PageNoData;
