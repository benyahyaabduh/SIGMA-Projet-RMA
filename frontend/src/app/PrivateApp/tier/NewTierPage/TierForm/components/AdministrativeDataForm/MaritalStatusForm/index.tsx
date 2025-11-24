import React from "react";
import messages from "config/i18n/messages";
import PolicyIcon from "@mui/icons-material/Policy";
import {
  FormAutocomplete,
  FormDatePicker,
  FormInput,
  FormNumberField,
} from "components/forms";
import { CardWrapper } from "components";
import { ApiRoutes } from "config/api/apiRoutes";
import { PersonOutlined as PersonOutlinedIcon } from "@mui/icons-material";

const MaritalStatusForm = ({ name }: { name: string }) => {
  return (
    <CardWrapper
      containerProps={{ spacing: 2 }}
      title={messages.maritalStatus}
      icon={PersonOutlinedIcon}
      collapsable
    >
      <FormAutocomplete
        label={messages.titleCivility}
        name="titreCivilite"
        nameProps={name}
        apiProps={{
          url: ApiRoutes.FETCH_TITLE_CIVILITY,
        }}
        required
        xs={4}
      />
      <FormInput
        label={messages.firstName}
        name="prenom"
        nameProps={name}
        required
        xs={4}
      />
      <FormInput
        label={messages.lastName}
        name="nom"
        nameProps={name}
        required
        xs={4}
      />
      <FormAutocomplete
        label={messages.gender}
        name="genre"
        nameProps={name}
        apiProps={{
          url: ApiRoutes.FETCH_GENDER,
        }}
        required
        xs={4}
      />
      <FormAutocomplete
        label={messages.familySituation}
        name="situationFamiliale"
        nameProps={name}
        apiProps={{
          url: ApiRoutes.FETCH_FAMILY_SITUATION,
        }}
        xs={4}
      />
      <FormDatePicker
        label={messages.dateOfBirth}
        name="dateNaissance"
        nameProps={name}
        xs={4}
      />
      <FormInput
        label={messages.placeOfBirth}
        name="lieuNaissance"
        nameProps={name}
        xs={4}
      />
      <FormAutocomplete
        label={messages.cityOfBirth}
        name="villeNaissance"
        nameProps={name}
        apiProps={{
          url: ApiRoutes.FETCH_CITIES,
        }}
        xs={4}
      />
      <FormAutocomplete
        label={messages.nationality}
        name="nationnalite"
        nameProps={name}
        apiProps={{
          url: ApiRoutes.FETCH_NATIONALITIES,
        }}
        xs={4}
      />
      <FormAutocomplete
        label={messages.profession}
        name="profession"
        nameProps={name}
        apiProps={{
          url: ApiRoutes.FETCH_PROFESSION,
        }}
        xs={4}
      />
      <FormNumberField
        label={messages.numberOfChildren}
        name="nombreEnfants"
        nameProps={name}
        xs={4}
      />
      <FormNumberField
        label={messages.salaryBracket}
        name="trancheSalaire"
        nameProps={name}
        xs={4}
      />
      <FormInput
        label={messages.manager}
        name="responsable"
        nameProps={name}
        xs={4}
      />
    </CardWrapper>
  );
};

export default MaritalStatusForm;
