import React, { FC } from "react";
import { Box, Grid, Stack } from "@mui/material";
import * as Yup from "yup";
import { Form, FormAutocomplete, FormInput } from "components/forms";
import { FormSubmitProps } from "types";
import messages from "config/i18n/messages";
import { ApiRoutes } from "config/api/apiRoutes";
import FilterByFooter from "components/Datatable/components/ToolbarCustomActions/components/FilterByPopper/components/FilterByFooter";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, IconButton } from "components";
import {
  AddToPhotosOutlined as AddToPhotosOutlinedIcon,
  BorderColorOutlined as BorderColorOutlinedIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import FormDropdown from "components/forms/FormDropdown";
import Dropdown from "components/Button/Dropdown";
import { isDefined, isNotDefined } from "utils/helper";
import FilterByHeader from "components/Datatable/components/ToolbarCustomActions/components/FilterByPopper/components/FilterByHeader";

interface DocumentFilterProps {
  column: any;
}

const validationSchema = Yup.object().shape({
  documents: Yup.array()
    .of(
      Yup.object().shape({
        typeDocument: Yup.object().required(),
        valeurDocument: Yup.string().required(),
      }),
    )
    .min(1, "need at least one")
    .required(),
});

const defaultValues = {
  documents: [{ typeDocument: null, valeurDocument: null }],
};

interface DocumentFilterItemProps {
  path: string;
  onRemove?: () => void;
}

const DocumentFilterItem: FC<DocumentFilterItemProps> = ({
  path,
  onRemove,
}) => {
  return (
    <Box sx={{ padding: "5px 10px" }}>
      <Grid container alignItems="center" spacing={2}>
        <FormAutocomplete
          // label={messages.documentType}
          name="typeDocument"
          nameProps={path}
          apiProps={{
            url: ApiRoutes.FETCH_DOCUMENT_TYPE,
          }}
          required
          size="small"
          xs={6}
        />
        <FormInput
          // label={messages.documentValue}
          name="valeurDocument"
          nameProps={path}
          size="small"
          xs
        />
        <Grid item xs={2}>
          <IconButton
            squared
            icon={DeleteIcon}
            onClick={onRemove}
            color="error"
            {...(isNotDefined(onRemove) && {
              disabled: true,
              sx: {
                "&.Mui-disabled": {
                  cursor: null,
                  bgcolor: "#f2f2f2",
                  // color: "error.main",
                  borderRadius: 1,
                },
              },
            })}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

interface DocumentFilterFormProps {
  name: string;
  column: any;
}

const DocumentFilterForm: FC<DocumentFilterFormProps> = ({ name, column }) => {
  const methods = useFormContext();

  const {
    fields: items,
    append: onAddItem,
    update: onUpdateItem,
    remove: onRemoveItem,
  } = useFieldArray({
    control: methods?.control,
    name,
  });

  const onAddHandler = () => {
    onAddItem({
      typeDocument: null,
      valeurDocument: null,
    });
  };

  return (
    <>
      <FilterByHeader column={column} onAdd={onAddHandler} />
      <Stack>
        {items.map((item, index) => (
          <DocumentFilterItem
            path={`${name}.${index}`}
            {...(items.length > 1 && { onRemove: () => onRemoveItem(index) })}
          />
        ))}
      </Stack>
      <FilterByFooter type="submit" />
    </>
  );
};

const DocumentFilter: FC<DocumentFilterProps> = ({ column }) => {
  const onSubmit = async ({ data }: FormSubmitProps) => {
    console.log("DocumentFilter data", data);
  };

  return (
    <Box sx={{ width: 400 }}>
      <Form
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        validator={validationSchema}
        stackProps={{ spacing: 2 }}
      >
        <DocumentFilterForm name="documents" column={column} />
      </Form>
    </Box>
  );
};

export default DocumentFilter;
