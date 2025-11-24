import React from "react";
import { Box } from "@mui/material";
import { isNotDefined } from "utils/helper";
import { RenderText } from "components";

const RenderCell = ({ cell }: any) => {
  const data = cell.getValue();
  if (isNotDefined(data)) {
    return <Box />;
  }

  return <RenderText value={data} />;
};

export default RenderCell;
