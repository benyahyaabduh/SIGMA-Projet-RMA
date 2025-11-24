import React from "react";
import messages from "config/i18n/messages";
import { InfoOutlined as InfoOutlinedIcon } from "@mui/icons-material";
import { CardWrapper } from "components";
import { FormInput } from "components/forms";

const EditRejectedMoreInfo = () => {
  return (
    <CardWrapper
      containerProps={{ spacing: 2 }}
      title={messages.infos}
      icon={InfoOutlinedIcon}
      collapsable
    >
      <FormInput label={messages.status} name="statut" required xs={4} />
      <FormInput
        label={messages.intermediate}
        name="codeIntermediaire"
        required
        xs={4}
      />
      <FormInput label={messages.codeScore} name="codeScore" xs={4} />
      <FormInput label={messages.segmentScore} name="segScore" xs={4} />
      <FormInput label={messages.sector} name="secteur" xs={4} />
      <FormInput label={messages.segment} name="codeSegment" xs={4} />
      <FormInput label={messages.activity} name="activite" xs={4} />
    </CardWrapper>
  );
};

export default EditRejectedMoreInfo;
