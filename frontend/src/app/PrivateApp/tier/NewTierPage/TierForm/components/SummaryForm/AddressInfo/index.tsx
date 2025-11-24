import React from "react";
import messages from "config/i18n/messages";
import { Datatable } from "components";
import { addressColumns } from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdditionalDataForm/AddressForm";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";

const AddressInfo = ({ data }: { data: any[] }) => {
  return (
    <Datatable
      title={messages.address}
      icon={PersonPinCircleOutlinedIcon}
      rows={data}
      columns={addressColumns}
      displayColumnDefOptions={{ "mrt-row-actions": { size: 140 } }}
      enablePagination={false}
      enableColumnFilters={false}
      initialState={{
        density: "compact",
        columnPinning: { left: ["estPrincipale"] },
      }}
    />
  );
};

export default AddressInfo;
