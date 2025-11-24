import React, { FC } from "react";
import {
  CheckCircleOutlineOutlined as CheckCircleOutlineOutlinedIcon,
  HighlightOffOutlined as HighlightOffOutlinedIcon,
} from "@mui/icons-material";
import { Icon } from "@mui/material";
import { isDefined } from "utils/helper";

interface StatusCellFormatProps {
  cell?: any;
  status?: boolean;
}

const StatusCellFormat: FC<StatusCellFormatProps> = ({ cell, status }) => {
  const value = isDefined(status) ? status : cell.getValue();
  return (
    <Icon
      component={
        value ? CheckCircleOutlineOutlinedIcon : HighlightOffOutlinedIcon
      }
      sx={(theme) => ({
        backgroundColor: value
          ? theme.palette.success.dark
          : theme.palette.error.dark,
        borderRadius: "0.25rem",
        color: "#fff",
        maxWidth: "9ch",
        p: "0.25rem",
      })}
    />
  );
};

export default StatusCellFormat;
