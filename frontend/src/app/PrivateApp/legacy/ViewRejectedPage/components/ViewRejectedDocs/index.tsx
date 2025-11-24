import React, { FC } from "react";
import messages from "config/i18n/messages";
import {
  ContactsOutlined as ContactsOutlinedIcon,
  PostAddOutlined as PostAddOutlinedIcon,
} from "@mui/icons-material";
import { CardWrapper, ViewField } from "components";
import ViewInfoItem from "app/PrivateApp/tier/ViewTierPage/components/ViewInfoItem";
import SupportingDocumentInfo from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm/SupportingDocumentInfo";
import { ColumnType } from "components/Datatable/services/columnType";

const DocumentListItem = ({ data }: { data: any }) => {
  return (
    <ViewInfoItem
      expanded
      label={data?.codeDocument}
      value={data?.valeurDocument}
      items={[
        { label: messages.deliveryDate, value: data?.dateDelivrance },
        { label: messages.expirationDate, value: data?.dateExpiration },
      ]}
      child={({ data: item }) => (
        <ViewField direction="row" hasBorder={false} {...item} />
      )}
    />
  );
};

const columns = [
  {
    accessorKey: "codeDocument",
    header: messages.documentType,
  },
  {
    accessorKey: "valeurDocument",
    header: messages.documentValue,
  },
  {
    accessorKey: "codePays",
    header: messages.countryOfIssue,
  },
  {
    accessorKey: "dateDelivrance",
    header: messages.deliveryDate,
  },
  {
    accessorKey: "dateExpiration",
    header: messages.expirationDate,
  },
  {
    accessorKey: "lieuDelivrance",
    header: messages.placeOfIssue,
  },
];

const ViewRejectedDocs = ({ data }: { data: any }) => {
  return <SupportingDocumentInfo data={data?.listDocument} columns={columns} />;
  // return (
  //   <CardWrapper
  //     stackProps={{ spacing: 5 }}
  //     title={messages.supportingDocument}
  //     icon={ContactsOutlinedIcon}
  //   >
  //     <ViewField
  //       direction="row"
  //       label={messages.documentType}
  //       value={data?.codeDocument}
  //       hasBorder={false}
  //     />
  //     <ViewField
  //       direction="row"
  //       label={messages.documentValue}
  //       value={data?.valeurDocument}
  //       hasBorder={false}
  //     />
  //     <ViewField
  //       direction="row"
  //       label={messages.placeOfIssue}
  //       value={data?.lieuDelivrance}
  //       hasBorder={false}
  //     />
  //     <ViewField
  //       direction="row"
  //       label={messages.countryOfIssue}
  //       value={data?.codePays}
  //       hasBorder={false}
  //     />
  //     <ViewField
  //       direction="row"
  //       label={messages.deliveryDate}
  //       value={data?.dateDelivrance}
  //       hasBorder={false}
  //     />
  //     <ViewField
  //       direction="row"
  //       label={messages.expirationDate}
  //       value={data?.dateExpiration}
  //       hasBorder={false}
  //     />
  //   </CardWrapper>
  // );
};

export default ViewRejectedDocs;
