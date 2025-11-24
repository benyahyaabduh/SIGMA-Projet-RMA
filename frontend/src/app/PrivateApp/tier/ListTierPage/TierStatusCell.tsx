import React, { FC } from "react";
import {
  CheckCircleOutlineOutlined as CheckCircleOutlineOutlinedIcon,
  HighlightOffOutlined as HighlightOffOutlinedIcon,
  ViewList as ViewListIcon,
} from "@mui/icons-material";
import { Icon, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { isDefined } from "utils/helper";
import RenderText from "components/RenderText";

interface TierStatusCellProps {
  cell?: any;
  status?: boolean;
}

const TierStatusCell: FC<TierStatusCellProps> = ({ cell }) => {
  // console.log("TierStatusCell original", cell.row.original);
  const status = cell.row.original.etatClient;
  // return (
  //   <Icon
  //     component={
  //       value ? CheckCircleOutlineOutlinedIcon : HighlightOffOutlinedIcon
  //     }
  //     sx={(theme) => ({
  //       backgroundColor: value
  //         ? theme.palette.success.dark
  //         : theme.palette.error.dark,
  //       borderRadius: "0.25rem",
  //       color: "#fff",
  //       maxWidth: "9ch",
  //       p: "0.25rem",
  //     })}
  //   />
  // );

  const isVerified = status?.code === "02";
  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemIcon sx={{ minWidth: 0, pr: 1, color: "inherit" }}>
        <Icon
          // fontSize="small"
          component={
            isVerified
              ? CheckCircleOutlineOutlinedIcon
              : HighlightOffOutlinedIcon
          }
          sx={(theme) => ({
            backgroundColor: isVerified
              ? theme.palette.success.dark
              : theme.palette.error.dark,
            borderRadius: "0.25rem",
            color: "#fff",
            maxWidth: "9ch",
            p: "0.25rem",
          })}
        />
      </ListItemIcon>
      <ListItemText
        // primary={<RenderText value={step.subTitle} />}
        primary={<RenderText value={status?.libelle || "N/A"} />}
        primaryTypographyProps={{
          sx: {
            fontWeight: 500,
            fontStretch: "normal",
            letterSpacing: "0.15px",
            lineHeight: 1.6,
            variant: "subtitle1",
            fontSize: 18,
            color: isVerified ? "success.dark" : "error.dark",
          },
        }}
      />
    </ListItem>
  );
};

export default TierStatusCell;
