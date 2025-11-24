import React from "react";
import { CardWrapper } from "components";
import messages from "config/i18n/messages";
import PolicyIcon from "@mui/icons-material/Policy";
import { FormAutocomplete } from "components/forms";
import { ApiRoutes } from "config/api/apiRoutes";

const TierTypeForm = ({ name = "init" }: { name?: string }) => {
  return (
    <CardWrapper
      containerProps={{ spacing: 2 }}
      title={messages.tier}
      icon={PolicyIcon}
    >
      <FormAutocomplete
        label={messages.tierType}
        name="typeTier"
        nameProps={name}
        apiProps={{
          url: ApiRoutes.FETCH_TYPE_TIER,
        }}
        required
        xs={4}
      />
      <FormAutocomplete
        label={messages.customerType}
        name="typeClient"
        nameProps={name}
        apiProps={{
          url: ApiRoutes.FETCH_CUSTOMER_TYPE,
        }}
        required
        xs={4}
      />
      <FormAutocomplete
        label={messages.natureCustomer}
        name="natureClient"
        nameProps={name}
        apiProps={{
          url: ApiRoutes.FETCH_NATURE_CUSTOMER,
        }}
        required
        xs={4}
      />
      <FormAutocomplete
        label={messages.customerStatus}
        name="etatClient"
        nameProps={name}
        apiProps={{
          url: ApiRoutes.FETCH_CUSTOMER_STATUS,
        }}
        required
        xs={4}
      />
      {/*<FormNumberField*/}
      {/*  label={messages.agentType}*/}
      {/*  name="typeIntermediaire"*/}
      {/*  required*/}
      {/*  xs={4}*/}
      {/*/>*/}
      <FormAutocomplete
        label={messages.intermediate}
        name="intermediaire"
        nameProps={name}
        optionLabel="nom"
        optionKey="code"
        apiProps={{
          url: ApiRoutes.FETCH_AGENT,
        }}
        required
        xs={4}
      />
    </CardWrapper>
  );
};

export default TierTypeForm;
