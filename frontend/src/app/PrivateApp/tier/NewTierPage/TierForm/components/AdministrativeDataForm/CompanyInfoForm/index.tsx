import React from "react";
import messages from "config/i18n/messages";
import { StoreOutlined as StoreOutlinedIcon } from "@mui/icons-material";
import { CardWrapper } from "components";
import {
  FormAutocomplete,
  FormDatePicker,
  FormInput,
  FormNumberField,
} from "components/forms";
import { ApiRoutes } from "config/api/apiRoutes";

const CompanyInfoForm = ({ name }: { name: string }) => {
  return (
    <CardWrapper
      containerProps={{ spacing: 2 }}
      title={messages.companyInformation}
      icon={StoreOutlinedIcon}
      // collapsable
    >
      <FormInput
        label={messages.socialReason}
        name="raisonSociale"
        nameProps={name}
        required
        xs={4}
      />
      <FormAutocomplete
        label={messages.legalForm}
        name="formeJuridique"
        nameProps={name}
        apiProps={{
          url: ApiRoutes.FETCH_LEGAL_FORM,
        }}
        xs={4}
      />
      <FormInput
        label={messages.legalCapacity}
        name="capaciteJuridique"
        nameProps={name}
        xs={4}
      />
      <FormInput
        label={messages.urlSiteWeb}
        name="urlSiteWeb"
        nameProps={name}
        xs={4}
      />
      <FormInput
        label={messages.acronym}
        name="sigle"
        nameProps={name}
        xs={4}
      />
      <FormDatePicker
        label={messages.legalCreationDate}
        name="dateCreationLegale"
        nameProps={name}
        required
        xs={4}
      />
      <FormDatePicker
        label={messages.activityStartDate}
        name="dateDebutActivite"
        nameProps={name}
        required
        xs={4}
      />
      <FormDatePicker
        label={messages.activityEndDate}
        name="dateFinActivite"
        nameProps={name}
        required
        xs={4}
      />
      <FormNumberField
        label={messages.capital}
        name="capital"
        nameProps={name}
        required
        xs={4}
      />
      <FormNumberField
        label={messages.numberOfEmployees}
        name="nombreSalarie"
        nameProps={name}
        xs={4}
      />
      <FormNumberField label={messages.income} name="revenu" required xs={4} />
    </CardWrapper>
  );
};

export default CompanyInfoForm;
