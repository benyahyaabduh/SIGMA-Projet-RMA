import React from "react";
import messages from "config/i18n/messages";
import PolicyIcon from "@mui/icons-material/Policy";
import { CardWrapper, ViewField } from "components";

const ViewRejectedMoral = ({ data }: { data: any }) => {
  return (
    <CardWrapper
      containerProps={{ spacing: 1 }}
      title={messages.companyInformation}
      icon={PolicyIcon}
      collapsable
      isExpanded
    >
      <ViewField
        direction="row"
        label={messages.socialReason}
        value={data?.raisonSociale}
        xs={4}
      />
      <ViewField
        direction="row"
        label={messages.legalForm}
        value={data?.formeJuridique}
        xs={4}
      />
      <ViewField
        direction="row"
        label={messages.groupSubsidiary}
        value={data?.filialeGroupe}
        xs={4}
      />
      <ViewField
        direction="row"
        label={messages.activity}
        value={data?.activite}
        xs={4}
      />
      <ViewField
        direction="row"
        label={messages.urlSiteWeb}
        value={data?.siteWeb}
        xs={4}
      />
      <ViewField
        direction="row"
        label={messages.acronym}
        value={data?.sigleCommercial}
        xs={4}
      />
      <ViewField
        direction="row"
        label={messages.legalCreationDate}
        value={data?.dateCreationLegale}
        xs={4}
      />
      <ViewField
        direction="row"
        label={messages.activityStartDate}
        value={data?.dateDebutActivite}
        xs={4}
      />
      <ViewField
        direction="row"
        label={messages.activityEndDate}
        value={data?.dateFinActivite}
        xs={4}
      />
      <ViewField
        direction="row"
        label={messages.capital}
        value={data?.capital}
        xs={4}
      />
      <ViewField
        direction="row"
        label={messages.numberOfEmployees}
        value={data?.nbrSalarie}
        xs={4}
      />
      <ViewField
        direction="row"
        label={messages.legalCapacity}
        value={data?.capaciteJuridique}
        xs={4}
      />
      <ViewField
        direction="row"
        label={messages.income}
        value={data?.revenu}
        xs={4}
      />
    </CardWrapper>
  );
};

export default ViewRejectedMoral;
