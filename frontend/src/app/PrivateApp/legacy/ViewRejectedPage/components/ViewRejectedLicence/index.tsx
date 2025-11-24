import React from "react";
import messages from "config/i18n/messages";
import { ContactMailOutlined as ContactMailOutlinedIcon } from "@mui/icons-material";
import { CardWrapper, ViewField } from "components";

const ViewRejectedLicence = ({ data }: { data: any }) => {
  return (
    <CardWrapper
      cardProps={{ sx: { width: 1 } }}
      stackProps={{ spacing: 1 }}
      title={messages.license}
      icon={ContactMailOutlinedIcon}
      // collapsable
    >
      <ViewField
        direction="row"
        label={messages.licenseNumber}
        value={data?.numPermis}
        hasBorder={false}
      />
      <ViewField
        direction="row"
        label={messages.dateOfIssueOfPermit}
        value={data?.dateDelivrancePermis}
        hasBorder={false}
      />
      <ViewField
        direction="row"
        label={messages.cityIssuePermit}
        value={data?.villeDelivrancePermis}
        hasBorder={false}
      />
      <ViewField
        direction="row"
        label={messages.countryIssueOfPermit}
        value={data?.paysDelivrancePermis}
        hasBorder={false}
      />
      <ViewField
        direction="row"
        label={messages.licenceCategories}
        value={data?.categoriesPermis?.join(",")}
        hasBorder={false}
      />
    </CardWrapper>
  );
};

export default ViewRejectedLicence;
