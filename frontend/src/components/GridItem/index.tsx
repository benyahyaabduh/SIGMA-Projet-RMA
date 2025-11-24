import React, { FC } from "react";
import { Grid } from "@mui/material";

import { isDefined } from "utils/helper";

interface GridItemProps {
  children: any;
  xs?: boolean | number;

  [x: string]: any;
}

const GridItem: FC<GridItemProps> = ({ xs, children, ...rest }) =>
  isDefined(xs) ? (
    <Grid item xs={xs} {...rest}>
      {children}
    </Grid>
  ) : (
    children
  );

export default GridItem;
