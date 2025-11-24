import React from "react";
import messages from "config/i18n/messages";
import { CardWrapper, ViewField } from "components";
import { PersonOutlined as PersonOutlinedIcon } from "@mui/icons-material";

const MaritalStatusInfo = ({ data }: { data: any }) => {
  return (
    <CardWrapper
      stackProps={{ spacing: 1 }}
      title={messages.maritalStatus}
      icon={PersonOutlinedIcon}
      collapsable
      isExpanded
    >
      <ViewField
        direction="row"
        label={messages.titleCivility}
        value={data?.titreCivilite}
      />
      <ViewField
        direction="row"
        label={messages.firstName}
        value={data?.prenom}
      />
      <ViewField direction="row" label={messages.lastName} value={data?.nom} />
      <ViewField direction="row" label={messages.gender} value={data?.genre} />
      <ViewField
        direction="row"
        label={messages.familySituation}
        value={data?.situationFamiliale}
      />
      <ViewField
        direction="row"
        label={messages.dateOfBirth}
        value={data?.dateNaissance}
      />
      <ViewField
        direction="row"
        label={messages.placeOfBirth}
        value={data?.lieuNaissance}
      />
      <ViewField
        direction="row"
        label={messages.cityOfBirth}
        value={data?.villeNaissance}
      />
      <ViewField
        direction="row"
        label={messages.nationality}
        value={data?.nationnalite}
      />
      <ViewField
        direction="row"
        label={messages.profession}
        value={data?.profession}
      />
      <ViewField
        direction="row"
        label={messages.numberOfChildren}
        value={data?.nombreEnfants}
      />
      <ViewField
        direction="row"
        label={messages.salaryBracket}
        value={data?.trancheSalaire}
      />
      <ViewField
        direction="row"
        label={messages.manager}
        value={data?.responsable}
      />
    </CardWrapper>
  );
};

export default MaritalStatusInfo;
