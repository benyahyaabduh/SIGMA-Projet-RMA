import React, { FC } from "react";
import { Stack } from "@mui/material";
import {
  AddOutlined as AddOutlinedIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  Edit as EditIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from "@mui/icons-material";
import { Button, Datatable, PageWrapper } from "components";
import messages from "config/i18n/messages";
import { DatatableToolbarActionProps } from "types/DatatableProps";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "config/routes/path";
import { ApiRoutes } from "config/api/apiRoutes";
import { ColumnType } from "components/Datatable/services/columnType";
import { toast } from "react-toastify";
import { formatCreatedAudit, formatUpdatedAudit } from "utils/helper";
import TierNameCell from "components/Datatable/components/TierNameCell";
import TierStatusCell from "app/PrivateApp/tier/ListTierPage/TierStatusCell";
import DocumentFilter from "app/PrivateApp/tier/ListTierPage/DocumentFilter";

const defaultColumns = [
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
    accessorKey: "nombreEnfants",
    header: messages.numberOfChildren,
    columnType: ColumnType.Number,
  },
  {
    accessorKey: "dateNaissance",
    header: messages.dateOfBirth,
    columnType: ColumnType.Date,
  },
  {
    accessorKey: "etatClient.libelle",
    header: messages.customerStatus,
    columnType: ColumnType.DTO,
    apiUrl: ApiRoutes.FETCH_CUSTOMER_STATUS,
    Cell: TierStatusCell,
  },
  {
    accessorKey: "createdBy",
    header: messages.createdBy,
    columnType: ColumnType.Text,
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

export const TierToolbarAction: FC<DatatableToolbarActionProps> = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(RoutePath.TIER_NEW);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        label={messages.newTier}
        color="secondary"
        fullWidth
        onClick={onClickHandler}
        startIcon={AddOutlinedIcon}
        sx={{ minWidth: 150 }}
      />
    </Stack>
  );
};

const ListTierPage = () => {
  const navigate = useNavigate();


  const handleAddTier = () => {
    navigate(RoutePath.TIER_NEW);
  };

  return (
    <PageWrapper title={messages.tierList}>
      <Datatable
        title={messages.tierList}
        columns={defaultColumns}
        apiProps={{
          url: ApiRoutes.SEARCH_TIER,
          method: "POST",
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
        }}
        initialState={{
          columnPinning: {
            right: ["mrt-row-actions"],
          },
        }}
        enablePagination
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
          {
            label: messages.delete,
            icon: DeleteOutlineOutlinedIcon,
            onClick: (row) => {
              toast.warning("Pending...");
            },
          },
        ]}
      />
    </PageWrapper>
  );
};

export default ListTierPage;
