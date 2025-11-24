import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { RenderText } from "components";
import { isDefined } from "utils/helper";
import messages from "config/i18n/messages";

const ToolbarAddButton = ({
  label,
  onClick,
  disabled = false,
  variant = "outlined",
}: any) => {
  return (
    <Button
      variant={variant}
      // variant="outlined"
      size="small"
      startIcon={<AddIcon fontSize="small" />}
      onClick={onClick}
      disabled={disabled}
      sx={{
        textTransform: "none",
        borderRadius: 10,
        ...(variant !== "text" && {
          background: "linear-gradient(to right, #1e84e5,#2e67e2)",
          color: "#fff",
          "& span": {
            margin: 0,
            marginRight: "2px",
            //padding: 0,
          },
          "&.Mui-disabled": {
            background: "unset",
          },
        }),
      }}
    >
      <RenderText value={isDefined(label) ? label : messages.new} />
    </Button>
  );
};

export default ToolbarAddButton;
