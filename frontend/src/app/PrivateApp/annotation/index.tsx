import React, { FC } from "react";
import messages from "config/i18n/messages";
import { ColumnType } from "components/Datatable/services/columnType";
import { DatatableToolbarActionProps } from "types/DatatableProps";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { Button, Datatable, PageWrapper } from "components";
import {
  AddOutlined as AddOutlinedIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from "@mui/icons-material";
import { ApiRoutes } from "config/api/apiRoutes";
import useAnnotation, {
  typeAnnotations,
} from "app/PrivateApp/annotation/services/useAnnotation";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import useDelete from "components/DeleteModal/services/useDelete";

const defaultColumns = [
  {
    accessorKey: "id",
    header: messages.id,
    size: 80,
  },
  {
    accessorKey: "version",
    header: messages.version,
    size: 80,
  },
  {
    accessorKey: "texte",
    header: messages.text,
  },
  {
    accessorKey: "dateCreation",
    header: messages.creationDate,
    columnType: ColumnType.Datetime,
    size: 200,
  },
  {
    accessorKey: "score",
    header: messages.score,
    size: 80,
  },
  {
    accessorKey: "typeAnnotation.label",
    header: messages.annotationType,
  },
  {
    accessorKey: "nomAuteur",
    header: messages.authorName,
  },
  {
    accessorKey: "codeAuteur",
    header: messages.authorCode,
    size: 80,
  },
  {
    accessorKey: "categorieAnnotation.libelle",
    header: messages.category,
  },
  {
    accessorKey: "client.codeClient",
    header: messages.client,
  },
  {
    accessorKey: "client.codeIntermediaire",
    header: messages.intermediate,
  },
  {
    accessorKey: "createdBy",
    header: messages.createdBy,
  },
  {
    accessorKey: "createdAt",
    header: messages.createdAt,
    columnType: ColumnType.Date,
  },
];

const TableToolbarAction: FC<DatatableToolbarActionProps> = () => {
  const navigate = useNavigate();
  const { onOpenModal, onSave } = useAnnotation();

  const onClickHandler = () => {
    onOpenModal({
      onSave: (data) => {
        console.log("Annotation onSave", data);
        return onSave({ data });
      },
    });
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        label={messages.addAnnotation}
        color="secondary"
        fullWidth
        onClick={onClickHandler}
        startIcon={AddOutlinedIcon}
        sx={{ minWidth: 230 }}
      />
    </Stack>
  );
};

const AnnotationListPage = () => {
  const navigate = useNavigate();
  const { onOpenModal } = useAnnotation();
  const { onDelete } = useDelete();

  return (
    <PageWrapper title={messages.annotations}>
      <Datatable
        title={messages.annotationList}
        columns={defaultColumns}
        apiProps={{
          url: ApiRoutes.SEARCH_ANNOTATIONS,
          method: "POST",
          params: {
            // codeClient: 200505263,
            // nom: "Bouba",
          },
          formatter: (rows) =>
            rows.map((row) => ({
              ...row,
              intermediate: {
                id: row.idIntermediaire,
                code: row.codeIntermediaire,
                type: row.typeIntermediaire,
              },
              typeAnnotation: typeAnnotations.find(
                (p) => p.value === row.typeAnnotation,
              ),
            })),
        }}
        toolbarActions={TableToolbarAction}
        initialState={{ columnPinning: { right: ["mrt-row-actions"] } }}
        enablePagination
        rowActionMenu={[
          {
            label: messages.view,
            icon: VisibilityOutlinedIcon,
            onClick: (row) => {
              // navigate(RoutePath.TIER_VIEW, {
              //   state: row,
              // });
              onOpenModal({
                current: row,
                onSave: (data) => {
                  console.log("Annotation onSave", data);
                },
              });
            },
          },
          {
            label: messages.edit,
            icon: EditIcon,
            onClick: (row) => {
              onOpenModal({
                current: row,
                onSave: (data) => {
                  console.log("Annotation onSave", data);
                },
              });
            },
          },
          {
            label: messages.delete,
            icon: DeleteOutlineOutlinedIcon,
            onClick: (row) =>
              onDelete({
                data: row,
                deleteUrl: ApiRoutes.DELETE_ANNOTATION,
                fetchUrl: ApiRoutes.SEARCH_ANNOTATIONS,
              }),
          },
        ]}
      />
    </PageWrapper>
  );
};

export default AnnotationListPage;
