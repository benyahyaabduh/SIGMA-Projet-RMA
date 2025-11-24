import React, { ReactNode } from "react";
import { Box, Stack } from "@mui/material";
import messages from "config/i18n/messages";
import { LinkButton } from "components";

interface DialogFooterProps {
  onClose: () => void;
  actions?: ReactNode[];
}

const DialogFooter = ({ onClose, actions }: DialogFooterProps) => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.paper",
        borderColor: "red",
      }}
      spacing={1}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ width: "100%", pr: 2 }}
      >
        <LinkButton label={messages.cancel} onClick={onClose} />
        <Stack direction="row">
          {actions?.map((action, index) => (
            <Box key={`action-${index}`}>{action}</Box>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DialogFooter;
