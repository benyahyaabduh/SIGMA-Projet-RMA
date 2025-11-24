import React from "react";
import messages from "config/i18n/messages";
import PolicyIcon from "@mui/icons-material/Policy";
import { CardWrapper, ViewField } from "components";

const TierTypeInfo = ({ data }: { data: any }) => {
  return (
    <CardWrapper
      stackProps={{ spacing: 1 }}
      title={messages.tier}
      icon={PolicyIcon}
      collapsable
      isExpanded={false}
    >
      <ViewField
        direction="row"
        label={messages.tierType}
        value={data?.typeTier}
      />
      <ViewField
        direction="row"
        label={messages.customerType}
        value={data?.typeClient}
      />
      <ViewField
        direction="row"
        label={messages.natureCustomer}
        value={data?.natureClient}
      />
      <ViewField
        direction="row"
        label={messages.customerStatus}
        value={data?.etatClient}
      />
      <ViewField
        direction="row"
        label={messages.intermediate}
        value={data?.intermediaire}
        display="nom"
      />
    </CardWrapper>
  );
};

export default TierTypeInfo;
