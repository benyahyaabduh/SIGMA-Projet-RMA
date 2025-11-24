import React, { FC } from "react";
import { Stack } from "@mui/material";
import {
  BorderColorOutlined as BorderColorOutlinedIcon,
  Delete as DeleteIcon,
  AddHomeWorkOutlined as AddHomeWorkOutlinedIcon,
  AddLocationAltOutlined as AddLocationAltOutlinedIcon,
} from "@mui/icons-material";

import {
  DatatableRowActionProps,
  DatatableToolbarActionProps,
} from "types/DatatableProps";
import { Button, DatatableForm, IconButton } from "components";
import messages from "config/i18n/messages";
import useAddress from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdditionalDataForm/AddressForm/AddressModal/services/useAddress";
import { useFormContext, useWatch } from "react-hook-form";
import useConfirmation from "components/ConfirmModal/services/useConfirmation";
import { ColumnType } from "components/Datatable/services/columnType";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";

const ToolbarAction: FC<DatatableToolbarActionProps> = ({
  table,
  onAddItem,
}) => {
  const { onOpenModal } = useAddress();

  const onOpenHandler = () => {
    onOpenModal({
      rows: table?.options?.data || [],
      onSave: onAddItem,
    });
  };

  return (
    <Button
      label={messages.addAddress}
      startIcon={AddLocationAltOutlinedIcon}
      color="secondary"
      fullWidth
      onClick={() => onOpenHandler()}
      sx={{ minWidth: 220 }}
    />
  );
};

const RowAction: FC<DatatableRowActionProps> = ({
  index,
  name,
  onRemoveItem,
  onUpdateItem,
}) => {
  const { onOpenModal } = useAddress();
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

export const addressColumns = [
  {
    accessorKey: "estPrincipale",
    header: messages.main,
    columnType: ColumnType.Boolean,
    size: 40,
    minSize: 40,
  },
  {
    accessorKey: "typeAdresse.libelle",
    header: messages.addressType,
    size: 50,
  },
  {
    accessorKey: "codePostal",
    header: messages.zipCode,
    size: 50,
  },
  {
    accessorKey: "ligne1",
    header: messages.address,
    size: 350,
  },
  {
    accessorKey: "ville.libelle",
    header: messages.city,
    size: 50,
  },
  {
    accessorKey: "pays.libelle",
    header: messages.country,
    size: 50,
  },
];

const AddressForm = ({ name }: { name: string }) => {
  return (
    <DatatableForm
      name="adresses"
      nameProps={name}
      title={messages.address}
      icon={PersonPinCircleOutlinedIcon}
      columns={addressColumns}
      rowActions={RowAction}
      toolbarActions={ToolbarAction}
      enableColumnFilters={false}
      enableColumnActions={false}
      enablePagination={false}
    />
  );
};

export default AddressForm;
