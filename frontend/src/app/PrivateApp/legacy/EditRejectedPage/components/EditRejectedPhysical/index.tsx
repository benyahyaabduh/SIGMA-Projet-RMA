import React from "react";
import messages from "config/i18n/messages";
import {
  ErrorOutlineOutlined as ErrorOutlineOutlinedIcon,
  PersonOutlined as PersonOutlinedIcon,
} from "@mui/icons-material";
import { CardWrapper } from "components";
import { FormInput } from "components/forms";

const EditRejectedPhysical = () => {
  return (
    <CardWrapper
      containerProps={{ spacing: 2 }}
      title={messages.maritalStatus}
      icon={PersonOutlinedIcon}
      collapsable
    >
      <FormInput label={messages.firstName} name="prenom" required xs={4} />
      <FormInput label={messages.lastName} name="nom" required xs={4} />
      <FormInput
        label={messages.dateOfBirth}
        name="dateNaissance"
        required
        xs={4}
      />
      <FormInput
        label={messages.placeOfBirth}
        name="lieuNaissance"
        required
        xs={4}
      />
      <FormInput label={messages.gender} name="sexe" required xs={4} />
      <FormInput
        label={messages.familySituation}
        name="situationFamille"
        required
        xs={4}
      />
      <FormInput
        label={messages.nationality}
        name="nationalite"
        required
        xs={4}
      />
      <FormInput label={messages.manager} name="responsable" required xs={4} />
      <FormInput label={messages.titleCivility} name="titre" required xs={4} />
      <FormInput
        label={messages.profession}
        name="profession"
        required
        xs={4}
      />
      <FormInput
        label={messages.countryOfBirth}
        name="paysNaissance"
        required
        xs={4}
      />
      <FormInput
        label={messages.cityOfBirth}
        name="villeNaissance"
        required
        xs={4}
      />
      <FormInput
        label={messages.numberOfChildren}
        name="nbrEnfant"
        required
        xs={4}
      />
      <FormInput label={messages.dateDeath} name="dateDeces" required xs={4} />
      <FormInput
        label={messages.deathStatus}
        name="statutDeces"
        required
        xs={4}
      />
    </CardWrapper>
  );
};

export default EditRejectedPhysical;
