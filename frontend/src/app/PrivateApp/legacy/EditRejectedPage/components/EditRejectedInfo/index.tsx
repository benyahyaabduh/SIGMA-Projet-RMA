import React from "react";
import messages from "config/i18n/messages";
import { SettingsOutlined as SettingsOutlinedIcon } from "@mui/icons-material";
import { CardWrapper, ViewField } from "components";
import { useLocation } from "react-router-dom";
import EditRejectedAction from "app/PrivateApp/legacy/EditRejectedPage/components/EditRejectedAction";

const EditRejectedInfo = () => {
  const location = useLocation();
  const data = location?.state;

  return (
    <CardWrapper
      containerProps={{ spacing: 2 }}
      title={messages.details}
      icon={SettingsOutlinedIcon}
    >
      <ViewField
        direction="column"
        label={messages.id}
        value={data?.id}
        xs={6}
      />
      <ViewField
        direction="column"
        label={messages.image}
        value={data?.image}
        xs={6}
      />
      <ViewField
        direction="column"
        label={messages.codeApplication}
        value={data?.codeApplication}
        xs={6}
      />
      <ViewField
        direction="column"
        label={messages.codeClient}
        value={data?.codeClient}
        xs={6}
      />
      <ViewField
        direction="column"
        label={messages.user}
        value={data?.codeUtilisateur}
        xs={6}
      />
      <ViewField
        direction="column"
        label={messages.dateUpdated}
        value={data?.dateMajScr}
        xs={6}
      />
      <ViewField
        direction="column"
        label={messages.rejectCode}
        value={data?.rejectCode}
        xs={12}
      />
      <ViewField
        direction="column"
        label={messages.rejectReason}
        value={data?.rejectReason}
        multiline
        xs={12}
      />
      <EditRejectedAction xs={12} />
    </CardWrapper>
  );
};

export default EditRejectedInfo;
