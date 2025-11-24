import React from "react";
import { Box } from "@mui/material";
import { useRecoilValue } from "recoil";
import { ValidationError } from "yup";
import messages from "config/i18n/messages";
import { Button, Dialog, RenderText } from "components";

import { confirmationData } from "./services/confirmationAtom";
import useConfirmation from "./services/useConfirmation";

const ConfirmModal = () => {
  const { isOpen, title, message, onConfirm, onConfirmProps, onCancel } =
    useRecoilValue(confirmationData);
  const { onCloseModal } = useConfirmation();

  const onConfirmHandler = () => {
    if (typeof onConfirm === "function") {
      onConfirm(onConfirmProps)
        .then((_response) => {
          // console.log('onConfirmHandler confirmed', response);
        })
        .catch((err: ValidationError) => {
          console.error("onConfirmHandler errors", err);
        })
        .finally(() => {
          onCloseModal();
        });
    }
  };

  const onCloseHandler = () => {
    onCloseModal();
    if (typeof onCancel === "function") {
      onCancel();
    }
  };

  return (
    <Dialog
      title={title || messages.confirmation}
      isOpen={isOpen}
      onClose={onCloseHandler}
      maxWidth="xs"
      actions={[
        <Button
          label={messages.confirm}
          onClick={onConfirmHandler}
          sx={{ bgcolor: "success.main" }}
        />,
      ]}
    >
      <Box sx={{ padding: "10px 5px", fontSize: 16, textAlign: "center" }}>
        <RenderText value={message || messages.deleteConfirmMessage} />
      </Box>
    </Dialog>
  );
};

export default ConfirmModal;
