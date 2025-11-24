import React, { ComponentType } from "react";
import { Icon, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ViewList as ViewListIcon } from "@mui/icons-material";
import RenderText from "components/RenderText";

interface DatatableTitleProps {
  title: string | object;
  icon?: ComponentType;
}

const DatatableTitle = ({ title, icon }: DatatableTitleProps) => {
  return (
    <ListItem sx={{ p: 0, color: "secondary.main" }}>
      <ListItemIcon sx={{ minWidth: 0, pr: 1, color: "inherit" }}>
        <Icon component={icon || ViewListIcon} fontSize="small" />
      </ListItemIcon>
      <ListItemText
        // primary={<RenderText value={step.subTitle} />}
        primary={<RenderText value={title || ""} />}
        primaryTypographyProps={{
          sx: {
            fontWeight: 500,
            fontStretch: "normal",
            letterSpacing: "0.15px",
            lineHeight: 1.6,
            variant: "subtitle1",
            fontSize: 18,
          },
        }}
      />
    </ListItem>
  );
};

export default DatatableTitle;
