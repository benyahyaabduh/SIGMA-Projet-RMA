import React from "react";
import messages from "config/i18n/messages";
import { ErrorOutlineOutlined as ErrorOutlineOutlinedIcon } from "@mui/icons-material";
import { CardWrapper, ViewField } from "components";
import { Stack } from "@mui/material";
import ViewRejectedAction from "app/PrivateApp/legacy/ViewRejectedPage/components/ViewRejectedAction";
import { formatCreatedAudit, formatUpdatedAudit } from "utils/helper";

const ViewRejectedInfo = ({ data }: { data: any }) => {
  return (
    <CardWrapper
      stackProps={{ spacing: 5 }}
      title={messages.customerInfo}
      icon={ErrorOutlineOutlinedIcon}
    >
      <Stack spacing={1}>
        <ViewField
          direction="row"
          label={messages.codeClient}
          value={data?.codeClient}
          // hasBorder={false}
        />
        <ViewField
          direction="row"
          label={messages.tierType}
          value={data?.typeTiers}
          // hasBorder={false}
        />
        <ViewField
          direction="row"
          label={messages.image}
          value={data?.image}
          // hasBorder={false}
        />
        <ViewField
          direction="row"
          label={messages.intermediate}
          value={data?.codeIntermediaire}
          // hasBorder={false}
        />
        <ViewField
          direction="row"
          label={messages.user}
          value={data?.codeUtilisateur}
          // hasBorder={false}
        />
        <ViewField
          direction="row"
          label={messages.dateUpdated}
          value={data?.dateMajScr}
          // hasBorder={false}
        />
        <ViewField
          direction="row"
          label={messages.codeScore}
          value={data?.codeScore}
          // hasBorder={false}
        />
        <ViewField
          direction="row"
          label={messages.created}
          value={formatCreatedAudit(data)}
          // hasBorder={false}
        />
        <ViewField
          direction="row"
          label={messages.updated}
          value={formatUpdatedAudit(data)}
          // hasBorder={false}
        />
      </Stack>
    </CardWrapper>
  );
};

export default ViewRejectedInfo;
