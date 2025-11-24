import React from "react";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Button, DialogForm } from "components";
import messages from "config/i18n/messages";
import { Box, Grid } from "@mui/material";
import {
  FormAutocomplete,
  FormInput,
  FormNumberField,
  FormSwitch,
  FormTextArea,
} from "components/forms";
import { ApiRoutes } from "config/api/apiRoutes";
import { addressData } from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdditionalDataForm/AddressForm/AddressModal/services/addressAtom";
import useAddress from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdditionalDataForm/AddressForm/AddressModal/services/useAddress";

const validationSchema = Yup.object().shape({
  typeAdresse: Yup.object().required(),
  numeroRue: Yup.string().nullable(),
  numeroImmeuble: Yup.string().nullable(),
  numeroEtage: Yup.number().nullable(),
  codePostal: Yup.number().required(),
  pays: Yup.object().required(),
  ville: Yup.object().required(),
  ligne1: Yup.string().nullable(),
  estPrincipale: Yup.boolean().required(),
});

const defaultValues = {
  typeAdresse: null,
  numeroRue: null,
  numeroImmeuble: null,
  numeroEtage: null,
  codePostal: null,
  pays: null,
  ville: null,
  ligne1: null,
  estPrincipale: false,
};

const AddressModal = () => {
  const { isOpen, params } = useRecoilValue(addressData);
  const { onCloseModal } = useAddress();

  const onSubmit = async (data: any) => {
    params?.onSave(data);
    onCloseModal();
  };

  return (
    <DialogForm
      title={messages.addAddress}
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
            label={messages.addressType}
            name="typeAdresse"
            apiProps={{
              url: ApiRoutes.FETCH_ADDRESS_TYPES,
            }}
            required
            xs={4}
          />
          <FormInput label={messages.streetNumber} name="numeroRue" xs={4} />
          <FormInput
            label={messages.buildingNumber}
            name="numeroImmeuble"
            xs={4}
          />
          <FormNumberField
            label={messages.floorNumber}
            name="numeroEtage"
            xs={4}
          />
          <FormNumberField
            label={messages.zipCode}
            name="codePostal"
            required
            xs={4}
          />
          <FormAutocomplete
            label={messages.country}
            name="pays"
            apiProps={{
              url: ApiRoutes.FETCH_COUNTRIES,
            }}
            required
            xs={4}
          />
          <FormAutocomplete
            label={messages.city}
            name="ville"
            apiProps={{
              url: ApiRoutes.FETCH_CITIES,
            }}
            required
            xs={4}
          />
          <FormSwitch
            label={messages.isMain}
            name="estPrincipale"
            required
            xs={4}
          />
          <FormTextArea
            label={messages.address}
            name="ligne1"
            xs={12}
            rows={3}
          />
        </Grid>
      </Box>
    </DialogForm>
  );
};

export default AddressModal;
