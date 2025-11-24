import React from "react";
import messages from "config/i18n/messages";
import PolicyIcon from "@mui/icons-material/Policy";
import { CardWrapper, ViewField } from "components";

const CompanyInfo = ({ data }: { data: any }) => {
  return (
    <CardWrapper
      stackProps={{ spacing: 2 }}
      title={messages.companyInformation}
      icon={PolicyIcon}
      collapsable
      isExpanded
    >
      <ViewField
        direction="row"
        label={messages.socialReason}
        value={data?.raisonSociale}
      />
      <ViewField
        direction="row"
        label={messages.legalForm}
        value={data?.formeJuridique}
      />
      <ViewField
        direction="row"
        label={messages.legalCapacity}
        value={data?.capaciteJuridique}
      />
      <ViewField
        direction="row"
        label={messages.urlSiteWeb}
        value={data?.urlSiteWeb}
      />
      <ViewField direction="row" label={messages.acronym} value={data?.sigle} />
      <ViewField
        direction="row"
        label={messages.legalCreationDate}
        value={data?.dateCreationLegale}
      />
      <ViewField
        direction="row"
        label={messages.activityStartDate}
        value={data?.dateDebutActivite}
      />
      <ViewField
        direction="row"
        label={messages.activityEndDate}
        value={data?.dateFinActivite}
      />
      <ViewField
        direction="row"
        label={messages.capital}
        value={data?.capital}
      />
      <ViewField
        direction="row"
        label={messages.numberOfEmployees}
        value={data?.nombreSalarie}
      />
      <ViewField direction="row" label={messages.income} value={data?.revenu} />
    </CardWrapper>
  );
};

export default CompanyInfo;
