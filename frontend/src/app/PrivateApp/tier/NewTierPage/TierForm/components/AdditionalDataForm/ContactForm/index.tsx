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
  AddLinkOutlined as AddLinkOutlinedIcon,
} from "@mui/icons-material";
import useContact from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdditionalDataForm/ContactForm/ContactModal/services/useContact";
import { useFormContext, useWatch } from "react-hook-form";
import useConfirmation from "components/ConfirmModal/services/useConfirmation";
import { ColumnType } from "components/Datatable/services/columnType";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";

const ToolbarAction: FC<DatatableToolbarActionProps> = ({
  table,
  onAddItem,
}) => {
  const { onOpenModal } = useContact();

  const onOpenHandler = () => {
    onOpenModal({
      rows: table?.options?.data || [],
      onSave: onAddItem,
    });
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        label={messages.addContact}
        startIcon={AddLinkOutlinedIcon}
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
  const { onOpenModal } = useContact();
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

export const contactColumns = [
  {
    accessorKey: "estPrincipale",
    header: messages.main,
    columnType: ColumnType.Boolean,
    size: 50,
  },
  {
    accessorKey: "estActif",
    header: messages.active,
    columnType: ColumnType.Boolean,
    size: 50,
  },
  {
    accessorKey: "typeMoyenContact.libelle",
    header: messages.contactType,
  },
  {
    accessorKey: "moyenContact",
    header: messages.contact,
  },
];

const ContactForm = ({ name }: { name: string }) => {
  return (
    <DatatableForm
      name="moyenContacts"
      nameProps={name}
      title={messages.contact}
      icon={ContactMailOutlinedIcon}
      columns={contactColumns}
      rowActions={RowAction}
      toolbarActions={ToolbarAction}
      enableColumnFilters={false}
      enableColumnActions={false}
      enablePagination={false}
    />
  );
};

export default ContactForm;
