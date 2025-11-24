import React from "react";
import messages from "config/i18n/messages";
import PolicyIcon from "@mui/icons-material/Policy";
import {
  FormAutocomplete,
  FormInput,
  FormNumberField,
  FormSwitch,
} from "components/forms";
import { ApiRoutes } from "config/api/apiRoutes";
import { CardWrapper } from "components";

const OtherInfoForm = ({ name }: { name: string }) => {
  return (
    <CardWrapper
      containerProps={{ spacing: 2 }}
      title={messages.additionalData}
      icon={PolicyIcon}
      collapsable
    >
      <FormAutocomplete
        label={messages.segments}
        name="segments"
        nameProps={name}
        multiple
        apiProps={{
          url: ApiRoutes.FETCH_SEGMENTS,
        }}
        xs={4}
      />
      <FormAutocomplete
        label={messages.activities}
        name="activites"
        nameProps={name}
        multiple
        apiProps={{
          url: ApiRoutes.FETCH_ACTIVITIES,
        }}
        xs={4}
      />
      <FormAutocomplete
        label={messages.language}
        name="langue"
        nameProps={name}
        apiProps={{
          url: ApiRoutes.FETCH_LANGUAGES,
        }}
        xs={4}
      />
      <FormSwitch
        label={messages.isVerified}
        name="isVerified"
        nameProps={name}
        xs={4}
      />
    </CardWrapper>
  );
};

export default OtherInfoForm;
