import React, { FC } from "react";
import { ExitToAppOutlined as ExitToAppOutlinedIcon } from "@mui/icons-material";
import messages from "config/i18n/messages";
import { Button } from "components";
import { useNavigate } from "react-router-dom";

interface CancelButtonProps {
  label?: any;
  onClick?: () => void;
  fullWidth?: boolean;
}

const CancelButton: FC<CancelButtonProps> = ({
  label,
  onClick,
  fullWidth = false,
}) => {
  const navigate = useNavigate();

  const onCancel = () => {
    if (typeof onClick === "function") {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      size="large"
      label={label || messages.cancel}
      // startIcon={<CloseOutlinedIcon />}
      endIcon={ExitToAppOutlinedIcon}
      sx={{ bgcolor: "gray" }}
      onClick={onCancel}
      fullWidth={fullWidth}
    />
  );
};

export default CancelButton;
