import React from "react";
import messages from "config/i18n/messages";
import { ApiRoutes } from "config/api/apiRoutes";
import { isUndefined } from "lodash";
import { FormAutocomplete } from "components/forms";
import { useFormContext, useWatch } from "react-hook-form";
import { isDefined } from "utils/helper";

const TierSelect = () => {
  const { control } = useFormContext();

  const intermediate = useWatch({
    control,
    name: "intermediate",
  });

  return (
    <FormAutocomplete
      label={messages.client}
      name="clientInstance"
      optionLabel="label"
      // optionKey="code"
      apiProps={{
        url: ApiRoutes.FETCH_CLIENT_LOOKUPS,
        enabled: isDefined(intermediate),
        params: {
          intermediaire: intermediate?.code,
          // page: 1,
          // size: 200,
        },
        formatter: (rows) =>
          rows.map(({ codeClient, raisonSociale, prenom, nom, ...rest }) => {
            const label = isDefined(raisonSociale)
              ? raisonSociale
              : `${prenom} ${nom}`;

            return {
              ...rest,
              label: `${codeClient} - ${label}`,
            };
          }),
      }}
      required
      xs={12}
    />
  );
};

export default TierSelect;
