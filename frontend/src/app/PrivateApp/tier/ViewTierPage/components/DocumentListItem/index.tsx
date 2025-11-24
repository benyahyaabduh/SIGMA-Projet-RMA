import React, { FC } from "react";
import { Box, Stack } from "@mui/material";
import { RenderText, ViewField } from "components";
import ViewInfoItem from "app/PrivateApp/tier/ViewTierPage/components/ViewInfoItem";
import messages from "config/i18n/messages";
import { isDefined } from "utils/helper";

interface DocumentListItemProps {
  data: any;
}

const DocumentListItem: FC<DocumentListItemProps> = ({ data }) => {
  return (
    <ViewInfoItem
      label={data?.typeDocument}
      value={data?.valeurDocument}
      items={[
        { label: messages.deliveryDate, value: data?.dateDelivrance },
        { label: messages.expirationDate, value: data?.dateExpiration },
        { label: messages.placeOfIssue, value: data?.lieuDelivrance },
        { label: messages.countryOfIssue, value: data?.paysDelivrance },
        { label: messages.gedLink, value: data?.lienGed },
      ].filter((item) => isDefined(item.value))}
      child={({ data: item }) => (
        <ViewField direction="row" hasBorder={false} {...item} />
      )}
    />
  );
};

export default DocumentListItem;
