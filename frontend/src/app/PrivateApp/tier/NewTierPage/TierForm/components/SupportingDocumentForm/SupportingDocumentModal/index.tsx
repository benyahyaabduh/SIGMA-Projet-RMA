import React, { FC } from "react";
import * as Yup from "yup";
import { supportingDocumentData } from "app/PrivateApp/tier/NewTierPage/TierForm/components/SupportingDocumentForm/SupportingDocumentModal/services/supportingDocumentAtom";
import { useRecoilValue } from "recoil";
import useSupportingDocument from "app/PrivateApp/tier/NewTierPage/TierForm/components/SupportingDocumentForm/SupportingDocumentModal/services/useSupportingDocument";
import { Button, DialogForm } from "components";
import messages from "config/i18n/messages";
import { Box, Grid } from "@mui/material";
import { FormAutocomplete, FormDatePicker, FormInput } from "components/forms";
import { ApiRoutes } from "config/api/apiRoutes";

const validationSchema = Yup.object().shape({
  typeDocument: Yup.object().required(),
  valeurDocument: Yup.string().required(),
  numeroDocument: Yup.string().nullable(),
  dateDelivrance: Yup.date().required(),
  dateExpiration: Yup.date().required(),
  lieuDelivrance: Yup.object().required(),
  paysDelivrance: Yup.object().required(),
  lienGed: Yup.string().nullable(),
});

const defaultValues = {
  typeDocument: null,
  valeurDocument: null,
  numeroDocument: null,
  dateDelivrance: null,
  dateExpiration: null,
  lieuDelivrance: null,
  paysDelivrance: null,
  lienGed: null,
};

const SupportingDocumentModal = () => {
  const { isOpen, params } = useRecoilValue(supportingDocumentData);
  const { onCloseModal } = useSupportingDocument();

  const onSubmit = async (data: any) => {
    params?.onSave(data);
    onCloseModal();
  };

  return (
    <DialogForm
      title={messages.addDocument}
      isOpen={isOpen}
      maxWidth="md"
      onClose={onCloseModal}
      actions={[<Button label={messages.confirm} type="submit" />]}
      schema={validationSchema}
      defaultValues={{ ...defaultValues, ...params?.current }}
      onSubmit={onSubmit}
    >
      <Box>
        <Grid container spacing={2}>
          <FormAutocomplete
            label={messages.documentType}
            name="typeDocument"
            apiProps={{
              url: ApiRoutes.FETCH_DOCUMENT_TYPE,
            }}
            required
            xs={4}
          />
          <FormInput
            label={messages.documentValue}
            name="valeurDocument"
            required
            xs={4}
          />
          <FormInput
            label={messages.documentNumber}
            name="numeroDocument"
            xs={4}
          />
          <FormDatePicker
            label={messages.deliveryDate}
            name="dateDelivrance"
            required
            xs={4}
          />
          <FormDatePicker
            label={messages.expirationDate}
            name="dateExpiration"
            required
            xs={4}
          />
          <FormAutocomplete
            label={messages.placeOfIssue}
            name="lieuDelivrance"
            apiProps={{
              url: ApiRoutes.FETCH_PLACE_OF_ISSUE,
            }}
            required
            xs={4}
          />
          <FormAutocomplete
            label={messages.countryOfIssue}
            name="paysDelivrance"
            apiProps={{
              url: ApiRoutes.FETCH_COUNTRIES,
            }}
            required
            xs={4}
          />
          <FormInput
            label={messages.gedLink}
            name="lienGed"
            xs={4}
            inputProps={{ maxLength: 2 }}
          />
        </Grid>
      </Box>
    </DialogForm>
  );
};

export default SupportingDocumentModal;
