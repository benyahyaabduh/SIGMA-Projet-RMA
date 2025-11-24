import React from "react";
import { Stack } from "@mui/material";
import { Button, CancelButton } from "components";
import messages from "config/i18n/messages";
import { BorderColorOutlined as BorderColorOutlinedIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "config/routes/path";
import SubmitButton from "components/Button/SubmitButton";

const ViewRejectedAction = ({ data }: { data: any }) => {
  const navigate = useNavigate();

  const onEditHandler = () => {
    navigate(RoutePath.TIER_LEGACY_EDIT, { state: data });
  };

  return (
    <Stack spacing={1}>
      <SubmitButton label={messages.sync} isLoading={true} />
      <Button
        label={messages.edit}
        endIcon={BorderColorOutlinedIcon}
        fullWidth
        onClick={onEditHandler}
      />
      <CancelButton label={messages.return} />
      {/*<Stack*/}
      {/*  direction="row"*/}
      {/*  alignItems="center"*/}
      {/*  justifyContent="space-evenly"*/}
      {/*  spacing={1}*/}
      {/*>*/}
      {/*  <Button*/}
      {/*    label={messages.edit}*/}
      {/*    startIcon={BorderColorOutlinedIcon}*/}
      {/*    fullWidth*/}
      {/*    onClick={onEditHandler}*/}
      {/*  />*/}
      {/*  <CancelButton label={messages.return} />*/}
      {/*</Stack>*/}
    </Stack>
  );
};

export default ViewRejectedAction;
