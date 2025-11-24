import React, { FC } from "react";
import {
  DatatableRowActionProps,
  DatatableToolbarActionProps,
} from "types/DatatableProps";
import { Stack } from "@mui/material";
import { Button, DatatableForm, IconButton } from "components";
import messages from "config/i18n/messages";
import {
  BorderColorOutlined as BorderColorOutlinedIcon,
  Delete as DeleteIcon,
  AddModeratorOutlined as AddModeratorOutlinedIcon,
} from "@mui/icons-material";
import usePolicy from "app/PrivateApp/tier/NewTierPage/TierForm/components/PolicyForm/PolicyModal/services/usePolicy";
import { useFormContext, useWatch } from "react-hook-form";
import useConfirmation from "components/ConfirmModal/services/useConfirmation";
import PolicyIcon from "@mui/icons-material/Policy";
import { ColumnType } from "components/Datatable/services/columnType";

const ToolbarAction: FC<DatatableToolbarActionProps> = ({
  table,
  onAddItem,
}) => {
  const { onOpenModal } = usePolicy();

  const onOpenHandler = () => {
    onOpenModal({
      rows: table?.options?.data || [],
      onSave: onAddItem,
    });
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        label={messages.addPolicy}
        startIcon={AddModeratorOutlinedIcon}
        color="secondary"
        fullWidth
        onClick={() => onOpenHandler()}
        sx={{ minWidth: 200 }}
      />
    </Stack>
  );
};

const RowAction: FC<DatatableRowActionProps> = ({
  index,
  name,
  onRemoveItem,
  onUpdateItem,
}) => {
  const { onOpenModal } = usePolicy();
  const { onOpenModal: onConfirmModal } = useConfirmation();

  const { control } = useFormContext();

  const currentRow = useWatch({
    control,
    name: `${name}.${index}`,
  });

  const onEditHandler = () => {
    onOpenModal({
      current: currentRow,
      onSave: onUpdateItem,
    });
  };

  const onDeleteHandler = () => {
    onConfirmModal({
      onConfirm: async () => {
        onRemoveItem();
      },
    });
  };
  return (
    <Stack direction="row" spacing={1} sx={{ pt: 1, pb: 1 }}>
      <IconButton
        squared
        icon={BorderColorOutlinedIcon}
        onClick={onEditHandler}
      />
      <IconButton
        squared
        icon={DeleteIcon}
        color="error"
        onClick={onDeleteHandler}
      />
    </Stack>
  );
};

export const policyColumns = [
  {
    accessorKey: "numeroPolice",
    header: messages.policyNumber,
  },
  {
    accessorKey: "branche.libelle",
    header: messages.branch,
  },
  {
    accessorKey: "montantTotal",
    header: messages.totalAmount,
    columnType: ColumnType.Number,
  },
  {
    accessorKey: "dateEtat",
    header: messages.statusDate,
  },
  {
    accessorKey: "etatPolice.libelle",
    header: messages.policyState,
  },
];

const PolicyForm = () => {
  return (
    <DatatableForm
      name="polices"
      title={messages.policies}
      icon={PolicyIcon}
      columns={policyColumns}
      rowActions={RowAction}
      toolbarActions={ToolbarAction}
      enableColumnFilters={false}
      enableColumnActions={false}
      enablePagination={false}
    />
  );
};

export default PolicyForm;
