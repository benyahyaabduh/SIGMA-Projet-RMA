import { Stack, Typography } from "@mui/material";
import { isString } from "lodash";
import React, { FC } from "react";

import { isDefined } from "utils/helper";

import HorizViewField from "./HorizViewField";
import VerticalViewField from "./VerticalViewField";
import { GridItem, RenderText } from "components";

export interface ViewFieldProps {
  direction?: "row" | "column";
  label?: string | object;
  display?: string;
  value: any;
  textAlign?: string;
  xs?: number | boolean;
  multiline?: boolean;
  [x: string]: any;
}

const ViewField: FC<ViewFieldProps> = ({
  direction,
  label,
  display,
  value,
  xs,
  ...rest
}) => {
  if (isDefined(direction)) {
    return direction === "row" ? (
      <HorizViewField
        label={label}
        display={display}
        value={value}
        xs={xs}
        {...rest}
      />
    ) : (
      <VerticalViewField
        label={label}
        display={display}
        value={value}
        xs={xs}
        {...rest}
      />
    );
  }

  return (
    <GridItem xs={xs}>
      <Stack spacing={0} justifyContent="center" sx={{ width: "100%" }}>
        <Typography
          sx={{
            fontSize: "12px",
            lineHeight: 1.6,
            letterSpacing: "1px",
          }}
        >
          <RenderText value={label} />
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            lineHeight: 1.6,
            letterSpacing: "1px",
          }}
        >
          <RenderText value={value} display={display} />
        </Typography>
      </Stack>
    </GridItem>
  );
};

export default ViewField;
