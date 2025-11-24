import React, { FC, useMemo, useState } from "react";
import { isNotDefinedOrEmpty } from "utils/helper";
import {
  Box,
  Icon,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, RenderText } from "components";
import messages from "config/i18n/messages";

const RowActionMenu = ({
  row,
  allowedRowActions,
  onDeleteHandler,
  apiProps,
}: any) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        tooltip={messages.actions}
        icon={EditIcon}
        size="small"
        //sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          "&:hover": {
            color: "#fff",
            //backgroundColor: "red",
            background: "linear-gradient(to left, #5e84ff 100%, #6743e3)",
          },
        }}
      />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          "& .MuiPaper-root": {
            elevation: 0,
            border: 0,
            borderRadius: "5px",
            minWidth: 160,
          },
        }}
      >
        {allowedRowActions?.map((action: any, index: number) => {
          const item = row.original;
          return (
            <MenuItem
              key={`row-${action.code}.${index}`}
              onClick={() => {
                handleClose();
                // if (action.code === "remove") {
                //   onDeleteHandler({ ...apiProps, data: item });
                // } else {
                //   action?.onClick(item);
                // }
              }}
            >
              <ListItemIcon>
                <Icon component={action.icon} />
              </ListItemIcon>
              <RenderText value={action.label} />
            </MenuItem>
          );
        })}
      </Menu>
    </React.Fragment>
  );
};

export default RowActionMenu;
