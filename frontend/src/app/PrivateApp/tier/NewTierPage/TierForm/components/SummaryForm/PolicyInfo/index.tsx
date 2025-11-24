import React from "react";
import messages from "config/i18n/messages";
import { Datatable } from "components";
import { policyColumns } from "app/PrivateApp/tier/NewTierPage/TierForm/components/PolicyForm";
import PolicyIcon from "@mui/icons-material/Policy";

const PolicyInfo = ({ data }: { data: any[] }) => {
  return (
    <Datatable
      title={messages.policies}
      icon={PolicyIcon}
      rows={data}
      columns={policyColumns}
      displayColumnDefOptions={{
        "mrt-row-actions": { size: 100, minSize: 100, maxSize: 100 },
      }}
      initialState={{ density: "compact" }}
      enablePagination={false}
      enableColumnFilters={false}
    />
  );
};

export default PolicyInfo;
