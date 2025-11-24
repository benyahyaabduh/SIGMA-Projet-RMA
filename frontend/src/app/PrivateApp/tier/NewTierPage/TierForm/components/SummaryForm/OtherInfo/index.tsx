import React from "react";
import messages from "config/i18n/messages";
import PolicyIcon from "@mui/icons-material/Policy";
import { CardWrapper, ViewField } from "components";

const OtherInfo = ({ data }: { data: any }) => {
  return (
    <CardWrapper
      stackProps={{ spacing: 2 }}
      title={messages.additionalData}
      icon={PolicyIcon}
      collapsable
      isExpanded={false}
    >
      <ViewField
        direction="row"
        label={messages.segments}
        value={data?.segments}
      />
      <ViewField
        direction="row"
        label={messages.activities}
        value={data?.activites}
      />
      <ViewField
        direction="row"
        label={messages.language}
        value={data?.langue}
      />
      <ViewField
        direction="row"
        label={messages.isVerified}
        value={data?.isVerified}
      />
    </CardWrapper>
  );
};

export default OtherInfo;
