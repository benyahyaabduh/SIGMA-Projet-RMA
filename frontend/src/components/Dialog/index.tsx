import React, { ReactNode } from "react";
import { Breakpoint, DialogActions, DialogContent } from "@mui/material";
import MuiDialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";

import DialogHeader from "components/Dialog/components/DialogHeader";
import DialogPaperComponent from "components/Dialog/components/DialogPaperComponent";
import DialogFooter from "components/Dialog/components/DialogFooter";

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface DialogProps {
  isOpen: boolean | undefined;
  title: string | object;
  maxWidth?: false | Breakpoint | undefined;
  children: ReactNode;
  onClose: () => void;
  actions?: ReactNode[];
}

const Dialog = ({
  isOpen = false,
  title,
  onClose,
  actions,
  maxWidth = "sm",
  children,
}: DialogProps) => {
  return (
    <StyledDialog
      open={isOpen}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={false}
      scroll="paper"
      PaperComponent={DialogPaperComponent}
      aria-labelledby="draggable-dialog-title"
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
        },
      }}
    >
      <DialogHeader
        id="draggable-dialog-title"
        title={title}
        onClose={onClose}
      />
      <DialogContent dividers sx={{ bgcolor: "white" }}>
        {children}
      </DialogContent>
      <DialogActions
        sx={{ bgcolor: "white", borderRadius: "0px 0px 16px 16px" }}
      >
        <DialogFooter onClose={onClose} actions={actions} />
      </DialogActions>
    </StyledDialog>
  );
};

export default Dialog;
