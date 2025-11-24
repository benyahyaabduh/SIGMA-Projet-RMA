import React, { ReactNode } from "react";
import {
  alpha,
  Box,
  Breakpoint,
  DialogActions,
  DialogContent,
} from "@mui/material";
import MuiDialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { ObjectSchema } from "yup";

import DialogPaperForm from "./DialogPaperForm";
import DialogHeader from "../components/DialogHeader";
import DialogFooter from "../components/DialogFooter";

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "0px",
  paddingBottom: "10px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: 7,
    height: 7,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: alpha("#3a4b95", 0.2),
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: alpha("#3a4b95", 0.6), // "#3a4b95",
    borderRadius: "16px",
  },
}));

interface DialogProps {
  isOpen: boolean | undefined;
  title: any;
  children: ReactNode;
  onClose: () => void;
  actions?: ReactNode[];
  toolbar?: ReactNode;
  schema: ObjectSchema<any>;
  defaultValues: any;
  onSubmit: any;
  maxWidth?: false | Breakpoint | undefined;
  onSubmitHandler?: SubmitHandler<any>;
  onErrorHandler?: SubmitErrorHandler<any>;
}

const DialogForm = ({
  isOpen = false,
  title,
  onClose,
  actions,
  children,
  maxWidth,
  toolbar,
  schema,
  defaultValues,
  onSubmit,
}: DialogProps) => {
  const onCloseHandler = (event: any, reason: string) => {
    if (reason && reason === "backdropClick" && "escapeKeyDown") return;

    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={onCloseHandler}
      maxWidth={maxWidth || "sm"}
      fullWidth={false}
      scroll="paper"
      PaperComponent={(props) => (
        <DialogPaperForm
          {...props}
          onClose={onClose}
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        />
      )}
      aria-labelledby="draggable-dialog-from-title"
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
        },
      }}
    >
      <DialogHeader id="draggable-dialog-from-title" title={title} />
      <Box sx={{ bgcolor: "white" }}>{toolbar}</Box>
      <StyledDialogContent dividers sx={{ bgcolor: "white" }}>
        {children}
      </StyledDialogContent>
      <DialogActions
        sx={{ bgcolor: "white", borderRadius: "0px 0px 16px 16px" }}
      >
        <DialogFooter onClose={onClose} actions={actions} />
      </DialogActions>
    </StyledDialog>
  );
};

export default DialogForm;
