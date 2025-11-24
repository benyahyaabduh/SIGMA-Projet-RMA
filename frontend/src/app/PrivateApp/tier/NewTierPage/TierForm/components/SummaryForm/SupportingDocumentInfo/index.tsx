import React from "react";
import messages from "config/i18n/messages";
import { Datatable } from "components";
import { documentColumns } from "app/PrivateApp/tier/NewTierPage/TierForm/components/SupportingDocumentForm";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";

const SupportingDocumentInfo = ({
  data,
  columns,
}: {
  data: any[];
  columns?: any[];
}) => {
  return (
    <Datatable
      title={messages.supportingDocument}
      icon={ContactsOutlinedIcon}
      rows={data}
      columns={columns || documentColumns}
      displayColumnDefOptions={{ "mrt-row-actions": { size: 140 } }}
      initialState={{ density: "compact" }}
      enablePagination={false}
      enableColumnFilters={false}
    />
  );
};

export default SupportingDocumentInfo;
