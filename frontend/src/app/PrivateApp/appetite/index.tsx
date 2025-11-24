import React from "react";
import messages from "config/i18n/messages";
import { Datatable, PageWrapper } from "components";
import { ApiRoutes } from "config/api/apiRoutes";
import { ColumnType } from "components/Datatable/services/columnType";

const defaultColumns = [
  {
    accessorKey: "id",
    header: messages.id,
    size: 10,
  },
  {
    accessorKey: "version",
    header: messages.version,
    size: 10,
  },
  {
    accessorKey: "ordreSas",
    header: messages.sasOrder,
    size: 10,
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
    accessorKey: "contrat",
    header: messages.policy,
  },
  {
    accessorKey: "codeClient",
    header: messages.codeClient,
  },
  {
    accessorKey: "visible",
    header: messages.visible,
    columnType: ColumnType.Boolean,
  },
];

const AppetiteListPage = () => {
  return (
    <PageWrapper title={messages.appetites}>
      <Datatable
        title={messages.appetiteList}
        columns={defaultColumns}
        apiProps={{
          url: ApiRoutes.SEARCH_APPETITE,
          method: "POST",
        }}
        displayColumnDefOptions={{ "mrt-row-actions": { size: 80 } }}
        initialState={{ columnPinning: { right: ["mrt-row-actions"] } }}
        enablePagination
      />
    </PageWrapper>
  );
};

export default AppetiteListPage;
