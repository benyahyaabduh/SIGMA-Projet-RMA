import React from "react";
import messages from "config/i18n/messages";
import { Datatable } from "components";
import { contactColumns } from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdditionalDataForm/ContactForm";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";

const ContactInfo = ({ data }: { data: any[] }) => {
  return (
    <Datatable
      title={messages.contact}
      icon={ContactMailOutlinedIcon}
      rows={data}
      columns={contactColumns}
      displayColumnDefOptions={{ "mrt-row-actions": { size: 140 } }}
      enablePagination={false}
      enableColumnFilters={false}
    />
  );
};

export default ContactInfo;
