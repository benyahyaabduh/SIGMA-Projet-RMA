import React from "react";
import messages from "config/i18n/messages";
import { Datatable } from "components";
import { ApiRoutes } from "config/api/apiRoutes";
import { ColumnType } from "components/Datatable/services/columnType";

const defaultColumns = [
  // {
  //   accessorKey: "id",
  //   header: messages.id,
  //   size: 10,
  // },
  // {
  //   accessorKey: "version",
  //   header: messages.version,
  //   size: 10,
  // },
  {
    accessorKey: "contrat",
    header: messages.policy,
  },
  {
    accessorKey: "tauxChurn",
    header: messages.churnRate,
  },
  {
    accessorKey: "typeScore",
    header: messages.scoreType,
  },
  {
    accessorKey: "classeScore",
    header: messages.scoreClass,
  },
  {
    accessorKey: "dateChargement",
    header: messages.loadingDate,
  },
  {
    accessorKey: "ordreSas",
    header: messages.sasOrder,
    size: 10,
  },
  {
    accessorKey: "visible",
    header: messages.visible,
    columnType: ColumnType.Boolean,
  },
];

const AppetiteInfo = ({ data }: { data: any }) => {
  return (
    <Datatable
      title={messages.appetites}
      columns={defaultColumns}
      apiProps={{
        url: ApiRoutes.SEARCH_APPETITE,
        method: "POST",
        params: {
          codeClient: data?.codeClient,
        },
      }}
      displayColumnDefOptions={{ "mrt-row-actions": { size: 80 } }}
      initialState={{ columnPinning: { right: ["mrt-row-actions"] } }}
      enablePagination
    />
  );
};

export default AppetiteInfo;
