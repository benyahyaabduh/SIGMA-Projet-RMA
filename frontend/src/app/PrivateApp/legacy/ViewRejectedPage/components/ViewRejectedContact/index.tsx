import React from "react";
import messages from "config/i18n/messages";
import { ContactMailOutlined as ContactMailOutlinedIcon } from "@mui/icons-material";
import { CardWrapper, ViewField } from "components";

const ViewRejectedContact = ({ data }: { data: any }) => {
  return (
    <CardWrapper
      cardProps={{ sx: { width: 1 } }}
      stackProps={{ spacing: 1 }}
      title={messages.contacts}
      icon={ContactMailOutlinedIcon}
      // collapsable
    >
      <ViewField
        direction="row"
        label={messages.telephone}
        value={data?.telephone}
        hasBorder={false}
      />
      <ViewField
        direction="row"
        label={messages.fax}
        value={data?.fax}
        hasBorder={false}
      />
      <ViewField
        direction="row"
        label={messages.telex}
        value={data?.telex}
        hasBorder={false}
      />
      <ViewField
        direction="row"
        label={messages.contact}
        value={data?.codeMoyenContact}
        hasBorder={false}
      />
      <ViewField
        direction="row"
        label={messages.mobilePhone}
        value={data?.gsm}
        hasBorder={false}
      />
      <ViewField
        direction="row"
        label={messages.email}
        value={data?.email}
        hasBorder={false}
      />
      <ViewField
        direction="row"
        label={messages.addressType}
        value={data?.typeAdresse}
        hasBorder={false}
      />
    </CardWrapper>
  );
};

export default ViewRejectedContact;
