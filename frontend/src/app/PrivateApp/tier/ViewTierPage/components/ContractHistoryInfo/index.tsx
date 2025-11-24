import React from "react";
import messages from "config/i18n/messages";
import { WorkHistoryOutlined as WorkHistoryOutlinedIcon } from "@mui/icons-material";
import { Datatable } from "components";
import { ApiRoutes } from "config/api/apiRoutes";
import { isDefined } from "utils/helper";
import { ColumnType } from "components/Datatable/services/columnType";

const defaultColumns = [
  {
    accessorKey: "id",
    header: messages.id,
    size: 50,
  },
  {
    accessorKey: "version",
    header: messages.version,
    size: 50,
  },
  {
    accessorKey: "numeroPolice",
    header: messages.policyNumber,
    enableClickToCopy: true,
  },
  {
    accessorKey: "branche.libelle",
    header: messages.branch,
  },
  {
    accessorKey: "etat.libelle",
    header: messages.policyState,
    size: 50,
  },
  {
    accessorKey: "montantTotal",
    header: messages.totalAmount,
    columnType: ColumnType.Number,
    size: 50,
  },
  {
    accessorKey: "dateEcheance",
    header: messages.deadlineDate,
    columnType: ColumnType.Date,
    size: 50,
  },
  {
    accessorKey: "dateEffet",
    header: messages.effectiveDate,
    columnType: ColumnType.Date,
    size: 50,
  },
  {
    accessorKey: "initialDate",
    header: messages.initialDate,
    columnType: ColumnType.Date,
    size: 50,
  },
  {
    accessorKey: "dateEtat",
    header: messages.statusDate,
    columnType: ColumnType.Date,
    size: 50,
  },
  {
    accessorKey: "dateExpiration",
    header: messages.expirationDate,
    columnType: ColumnType.Date,
    size: 50,
  },
  {
    accessorKey: "naturePolice",
    header: messages.policyNature,
    size: 50,
  },
  {
    accessorKey: "riskResiliation",
    header: messages.riskTermination,
    size: 50,
  },
];

const ContractHistoryInfo = ({ data }: { data: any }) => {
  return (
    <Datatable
      title={messages.contractHistory}
      icon={WorkHistoryOutlinedIcon}
      columns={defaultColumns}
      apiProps={{
        url: ApiRoutes.POLICY_HISTORY,
        enabled: isDefined(data),
        method: "POST",
        params: {
          codeClient: data?.codeClient,
          intermediaires: [data?.intermediaire?.code],
          typeUtilisateur: "SIEGE",
        },
      }}
      // toolbarActions={TierToolbarAction}
      // displayColumnDefOptions={{ "mrt-row-actions": { size: 80 } }}
      initialState={{ density: "compact" }}
      enablePagination
      enableColumnFilters={false}
    />
  );
};

export default ContractHistoryInfo;
