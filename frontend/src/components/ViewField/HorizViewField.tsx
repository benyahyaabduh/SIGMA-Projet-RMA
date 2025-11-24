import React, { FC } from "react";
import { lighten, Stack, styled, Box, useTheme } from "@mui/material";
import { isDefined } from "utils/helper";
import { Condition, GridItem, RenderText } from "components";
import { ViewFieldProps } from "./index";

export const HLabelTypography = styled(Box)(({ theme }) => ({
  color: lighten(theme.palette.primary.main, 0.3),
  fontSize: 14,
  fontWeight: 500,
  textAlign: "left",
}));

export const HValueTypography = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  textAlign: "right",
}));

const HorizViewField: FC<ViewFieldProps> = ({
  label,
  value,
  xs,
  percent = false,
  hasBorder = true,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <GridItem xs={xs}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: "100%",
          ...(hasBorder && {
            padding: 1,
            borderRadius: 2,
            border: `1px solid ${lighten(theme.palette.primary.main, 0.8)}`,
          }),
        }}
      >
        <Condition isValid={isDefined(label)}>
          <HLabelTypography>
            <RenderText value={label} />
          </HLabelTypography>
        </Condition>
        <HValueTypography>
          <RenderText value={percent ? `${value}%` : value} {...rest} />
        </HValueTypography>
      </Stack>
    </GridItem>
  );
};

export default HorizViewField;
