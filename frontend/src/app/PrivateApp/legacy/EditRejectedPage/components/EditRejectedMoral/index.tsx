import React from "react";
import messages from "config/i18n/messages";
import { StoreOutlined as StoreOutlinedIcon } from "@mui/icons-material";
import { CardWrapper } from "components";
import { FormInput } from "components/forms";

const EditRejectedMoral = () => {
  return (
    <CardWrapper
      containerProps={{ spacing: 2 }}
      title={messages.companyInformation}
      icon={StoreOutlinedIcon}
      collapsable
    >
      <FormInput
        label={messages.socialReason}
        name="raisonSociale"
        required
        xs={4}
      />
      <FormInput label={messages.urlSiteWeb} name="siteWeb" xs={4} />
      <FormInput label={messages.legalForm} name="formeJuridique" xs={4} />
      <FormInput label={messages.groupSubsidiary} name="filialeGroupe" xs={4} />
      <FormInput label={messages.acronym} name="sigleCommercial" xs={4} />
      <FormInput
        label={messages.legalCreationDate}
        name="dateCreationLegale"
        xs={4}
      />
      <FormInput
        label={messages.activityStartDate}
        name="dateDebutActivite"
        xs={4}
      />
      <FormInput
        label={messages.activityEndDate}
        name="dateFinActivite"
        xs={4}
      />
      <FormInput label={messages.capital} name="capital" xs={4} />
      <FormInput label={messages.numberOfEmployees} name="nbrSalarie" xs={4} />
      <FormInput
        label={messages.legalCapacity}
        name="capaciteJuridique"
        xs={4}
      />
      <FormInput label={messages.income} name="revenu" xs={4} />
    </CardWrapper>
  );
};

export default EditRejectedMoral;
