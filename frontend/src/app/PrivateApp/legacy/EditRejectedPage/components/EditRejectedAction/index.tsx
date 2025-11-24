import React from "react";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "config/routes/path";
import { Stack } from "@mui/material";
import { Button, CancelButton, GridItem } from "components";
import messages from "config/i18n/messages";
import { BorderColorOutlined as BorderColorOutlinedIcon } from "@mui/icons-material";
import { SubmitFormButton } from "components/forms";

const EditRejectedAction = ({ xs }: { xs: number }) => {
  const navigate = useNavigate();

  const onSaveHandler = () => {
    // navigate(RoutePath.TIER_LEGACY_EDIT, { state: data });
  };

  return (
    <GridItem xs={xs}>
      <Stack spacing={1}>
        <SubmitFormButton onClick={onSaveHandler} />
        <CancelButton label={messages.return} />
      </Stack>
    </GridItem>
  );
};

export default EditRejectedAction;
