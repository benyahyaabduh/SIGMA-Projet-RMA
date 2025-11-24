import React from "react";
import messages from "config/i18n/messages";
import { ApiRoutes } from "config/api/apiRoutes";
import { formatCreatedAudit, formatUpdatedAudit } from "utils/helper";
import {
  Edit as EditIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from "@mui/icons-material";
import { RoutePath } from "config/routes/path";
import { Datatable } from "components";
import { ColumnType } from "components/Datatable/services/columnType";
import TierNameCell from "components/Datatable/components/TierNameCell";
import TierStatusCell from "app/PrivateApp/tier/ListTierPage/TierStatusCell";
import DocumentFilter from "app/PrivateApp/tier/ListTierPage/DocumentFilter";
import { TierToolbarAction } from "app/PrivateApp/tier/ListTierPage";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    accessorKey: "codeClient",
    header: messages.codeClient,
    enableClickToCopy: true,
    size: 40,
    minSize: 40,
  },
  {
    accessorKey: "version",
    header: messages.version,
    size: 50,
    enableColumnFilter: false,
  },
  {
    accessorKey: "natureClient.libelle",
    header: messages.natureCustomer,
    size: 50,
    columnType: ColumnType.DTO,
    apiUrl: ApiRoutes.FETCH_NATURE_CUSTOMER,
  },
  {
    accessorKey: "nom",
    header: messages.tier,
    Cell: TierNameCell,
    minSize: 200,
    columnType: ColumnType.Text,
  },
  {
    accessorKey: "createdBy",
    header: messages.createdBy,
    columnType: ColumnType.Text,
  },
  {
    accessorKey: "intermediaire.nom",
    header: messages.intermediate,
    minSize: 200,
    columnType: ColumnType.DTO,
    apiUrl: ApiRoutes.FETCH_AGENT,
    filterProps: {
      optionLabel: "nom",
    },
  },
  {
    accessorKey: "etatClient.libelle",
    header: messages.customerStatus,
    columnType: ColumnType.DTO,
    apiUrl: ApiRoutes.FETCH_CUSTOMER_STATUS,
    Cell: TierStatusCell,
  },
  {
    accessorKey: "createdAt",
    header: messages.createdAt,
    columnType: ColumnType.Datetime,
    size: 200,
  },
  {
    accessorKey: "updatedAt",
    header: messages.updatedAt,
    columnType: ColumnType.Datetime,
    size: 200,
  },
];

const LastTierList = () => {
  const navigate = useNavigate();

  return (
    <Datatable
      title={messages.lastTiers}
      columns={columns}
      enablePagination={false}
      apiProps={{
        url: ApiRoutes.SEARCH_TIER,
        method: "POST",
        params: {
          page: 1,
          pageSize: 5,
          // codeClient: 200505263,
          // nom: "Bouba",
        },
        formatter: (rows) =>
          rows.map((row) => ({
            ...row,
            updated: formatUpdatedAudit(row),
            created: formatCreatedAudit(row),
          })),
      }}
      toolbarActions={TierToolbarAction}
      displayColumnDefOptions={{
        "mrt-row-actions": { size: 80 },
        // "etatClient.libelle": { size: 80 },
      }}
      initialState={{
        columnPinning: {
          // left: ["etatClient.libelle"],
          right: ["mrt-row-actions"],
        },
      }}
      rowActionMenu={[
        {
          label: messages.view,
          icon: VisibilityOutlinedIcon,
          onClick: (row) => {
            navigate(RoutePath.TIER_VIEW, {
              state: row,
            });
          },
        },
        {
          label: messages.edit,
          icon: EditIcon,
          onClick: (row) => {
            navigate(RoutePath.TIER_EDIT, {
              state: row,
            });
          },
        },
      ]}
    />
  );
};

export default LastTierList;
