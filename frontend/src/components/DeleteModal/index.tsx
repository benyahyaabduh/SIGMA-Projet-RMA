import React from "react";
import { Button, Dialog, RenderText } from "components/index";
import messages from "config/i18n/messages";
import { Box } from "@mui/material";
import { useRecoilValue } from "recoil";
import { deleteData } from "components/DeleteModal/services/deleteAtom";
import useDelete from "components/DeleteModal/services/useDelete";

const DeleteModal = () => {
  const { isOpen, data } = useRecoilValue(deleteData);
  // console.log("DeleteModal data", data);
  const { onClose, onSubmit } = useDelete();

  return (
    <Dialog
      title={messages.delete}
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xs"
      actions={[
        <Button
          label={messages.confirm}
          onClick={() => onSubmit(data)}
          sx={{ bgcolor: "success.main" }}
        />,
      ]}
    >
      <Box sx={{ padding: "10px 5px", fontSize: 16, textAlign: "center" }}>
        <RenderText value={messages.deleteConfirmMessage} />
      </Box>
    </Dialog>
  );
};

export default DeleteModal;
