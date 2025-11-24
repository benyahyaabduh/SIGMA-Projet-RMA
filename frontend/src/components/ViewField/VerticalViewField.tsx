import React, { FC } from "react";
import { alpha, Box, lighten, Stack, styled, Typography } from "@mui/material";

import { ViewFieldProps } from "./index";
import { GridItem, RenderText } from "components";

const LabelTypography = styled(Typography)(({ theme }) => ({
  color: lighten(theme.palette.primary.main, 0.2),
  fontSize: 14,
  fontWeight: 600,
}));

const ValueTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: lighten(theme.palette.primary.main, 0.2),
}));

const ValueBox = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "0px 15px",
  borderRadius: 2,
  fontWeight: 500,
  color: lighten(theme.palette.primary.main, 0.3),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  display: "flex",
  height: "46.69px",
  alignItems: "center",
  justifyContent: "flex-start",
  // wordWrap: "break-word",
}));

const VerticalViewField: FC<ViewFieldProps> = ({
  label,
  value,
  xs,
  multiline = false,
  ...rest
}) => (
  <GridItem xs={xs}>
    <Stack
      spacing={0.5}
      alignItems="flex-start"
      justifyContent="center"
      sx={{ width: "100%", height: "100%" }}
    >
      <LabelTypography>
        <RenderText value={label} />
      </LabelTypography>
      <ValueBox {...(multiline && { sx: { height: 1 } })}>
        <ValueTypography sx={{ wordWrap: "break-word" }}>
          <RenderText value={value} {...rest} />
        </ValueTypography>
      </ValueBox>
    </Stack>
  </GridItem>
);

export default VerticalViewField;
