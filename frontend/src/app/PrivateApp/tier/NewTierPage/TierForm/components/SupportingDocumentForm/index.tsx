import React, { FC } from "react";
import { Stack } from "@mui/material";
import messages from "config/i18n/messages";
import {
  DatatableRowActionProps,
  DatatableToolbarActionProps,
} from "types/DatatableProps";
import useSupportingDocument from "app/PrivateApp/tier/NewTierPage/TierForm/components/SupportingDocumentForm/SupportingDocumentModal/services/useSupportingDocument";
import { Button, DatatableForm, IconButton } from "components";
import { useFormContext, useWatch } from "react-hook-form";
import {
  BorderColorOutlined as BorderColorOutlinedIcon,
  Delete as DeleteIcon,
  PostAddOutlined as PostAddOutlinedIcon,
} from "@mui/icons-material";
import { ColumnType } from "components/Datatable/services/columnType";
import useConfirmation from "components/ConfirmModal/services/useConfirmation";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";

const ToolbarAction: FC<DatatableToolbarActionProps> = ({
  table,
  onAddItem,
}) => {
  const { onOpenModal } = useSupportingDocument();

  const onOpenHandler = () => {
    onOpenModal({
      rows: table?.options?.data || [],
      onSave: onAddItem,
    });
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        label={messages.addDocument}
        startIcon={PostAddOutlinedIcon}
        color="secondary"
        fullWidth
        onClick={() => onOpenHandler()}
        sx={{ minWidth: 220 }}
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
  const { onOpenModal } = useSupportingDocument();
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

export const documentColumns = [
  {
    accessorKey: "typeDocument.libelle",
    header: messages.documentType,
  },
  {
    accessorKey: "valeurDocument",
    header: messages.documentValue,
  },
  {
    accessorKey: "dateDelivrance",
    header: messages.deliveryDate,
    columnType: ColumnType.Date,
  },
  {
    accessorKey: "dateExpiration",
    header: messages.expirationDate,
    columnType: ColumnType.Date,
  },
  {
    accessorKey: "lieuDelivrance.libelle",
    header: messages.placeOfIssue,
  },
  {
    accessorKey: "paysDelivrance.libelle",
    header: messages.countryOfIssue,
  },
];

const SupportingDocumentForm = () => {
  return (
    <DatatableForm
      name="identifications"
      title={messages.supportingDocument}
      icon={ContactsOutlinedIcon}
      columns={documentColumns}
      rowActions={RowAction}
      toolbarActions={ToolbarAction}
      enableColumnFilters={false}
      enableColumnActions={false}
      enablePagination={false}
    />
  );
};

export default SupportingDocumentForm;
