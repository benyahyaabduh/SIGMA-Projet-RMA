import React, { FC } from "react";
import messages from "config/i18n/messages";
import { ApiRoutes } from "config/api/apiRoutes";
import { orderBy } from "lodash";
import { FormAutocomplete } from "components/forms";

interface IntermediateSelectProps {
  name?: string;
  xs?: boolean;
  required?: boolean;
}

const IntermediateSelect: FC<IntermediateSelectProps> = ({
  name = "intermediate",
  xs = 12,
  required = true,
}) => {
  return (
    <FormAutocomplete
      label={messages.intermediate}
      name={name}
      optionLabel="label"
      // optionKey="code"
      apiProps={{
        url: ApiRoutes.FETCH_LINKED_AGENT,
        formatter: (rows) =>
          orderBy(
            rows.map((row) => ({
              ...row,
              label: `${row.code}${row.type} - ${row.nom}`,
            })),
            ["label"],
            ["asc"],
          ),
      }}
      required={required}
      xs={xs}
    />
  );
};

export default IntermediateSelect;
