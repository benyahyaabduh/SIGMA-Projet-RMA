import React from "react";
import { Paper, PaperProps } from "@mui/material";
import Draggable from "react-draggable";

const DialogPaperComponent = (props: PaperProps) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper
        {...props}
        sx={{
          borderRadius: "16px",
          padding: "12px",
          bgcolor: "rgba(242, 244, 250, 0.1)",
        }}
      />
    </Draggable>
  );
};

export default DialogPaperComponent;
