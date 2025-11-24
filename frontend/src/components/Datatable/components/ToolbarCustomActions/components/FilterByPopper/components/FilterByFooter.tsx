import React from "react";
import { Box, Button, Stack, useTheme } from "@mui/material";
import { RenderText } from "components";
import messages from "config/i18n/messages";

const FilterByFooter = ({ onCancel, onApply, type = "button" }: any) => {
  const theme = useTheme();

  const onCancelHandler = () => {
    if (typeof onCancel === "function") {
      onCancel();
    }
  };

  const onApplyHandler = () => {
    if (typeof onApply === "function") {
      onApply();
    }
  };

  return (
    <Box
      sx={{
        borderTop: `1px solid ${
          theme.palette.mode === "light" ? "#eaecef" : "#30363d"
        }`,
        padding: "8px 10px",
        fontWeight: 600,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Button
          variant="text"
          size="small"
          sx={{ textTransform: "none" }}
          onClick={onCancelHandler}
        >
          <RenderText value={messages.cancel} />
        </Button>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            size="small"
            variant="contained"
            disableElevation
            color="success"
            sx={{ textTransform: "none" }}
            onClick={onApplyHandler}
            type={type}
          >
            <RenderText value={messages.apply} />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default FilterByFooter;
