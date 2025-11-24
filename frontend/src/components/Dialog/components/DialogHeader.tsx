import React from "react";
import {
  Close as CloseIcon,
  ViewList as ViewListIcon,
  RoomPreferencesOutlined as RoomPreferencesOutlinedIcon,
  FeedOutlined as FeedOutlinedIcon,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { isDefined } from "utils/helper";
import { RenderText } from "components";

export interface DialogTitleProps {
  id: string;
  title?: any;
  height?: number;
  children?: React.ReactNode;
  onClose?: () => void;
}

const DialogHeader = ({
  id,
  title,
  height = 45,
  onClose,
  children,
}: DialogTitleProps) => {
  return (
    <Stack
      id={id}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      style={{ cursor: "move" }}
      sx={{
        height,
        // p: 2,
        borderRadius: "16px 16px 0 0",
        backgroundColor: "primary.main", // "#3a4b95", // "#586395",
        fontSize: 16,
        fontWeight: "bold",
        padding: "25px 15px",
        color: "#fff",
        // ...headerProps,
      }}
    >
      <ListItem sx={{ p: 0 }}>
        <ListItemIcon sx={{ minWidth: 0, pr: 1, color: "inherit" }}>
          <FeedOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primary={<RenderText value={title || ""} />}
          primaryTypographyProps={{
            sx: {
              fontWeight: 500,
              fontStretch: "normal",
              letterSpacing: "0.15px",
              lineHeight: 1.6,
              variant: "subtitle1",
            },
          }}
        />
      </ListItem>
      {/*<Box>*/}
      {/*  {isDefined(title) ? <RenderText value={title} /> : undefined}*/}
      {/*  {children}*/}
      {/*</Box>*/}
      <Stack direction="row" alignItems="center" spacing={1}>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default DialogHeader;
