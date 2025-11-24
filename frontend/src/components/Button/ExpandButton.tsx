import React, { FC } from "react";
import { Tooltip } from "@mui/material";
import { IconButton, RenderText } from "components/index";
import messages from "config/i18n/messages";
import {
  AddOutlined as AddOutlinedIcon,
  RemoveOutlined as RemoveOutlinedIcon,
} from "@mui/icons-material";

interface ExpandButtonProps {
  open: boolean;
  disabled?: boolean;
  onClick: (data: any) => void;
}

const ExpandButton: FC<ExpandButtonProps> = ({
  open,
  disabled = false,
  onClick,
}) => {
  return (
    <Tooltip
      title={<RenderText value={open ? messages.hide : messages.show} />}
      placement="bottom"
      arrow
    >
      <IconButton
        icon={open ? RemoveOutlinedIcon : AddOutlinedIcon}
        aria-label="settings-expand"
        onClick={onClick}
        fontSize="small"
        disabled={disabled}
      />
    </Tooltip>
  );
};

export default ExpandButton;
