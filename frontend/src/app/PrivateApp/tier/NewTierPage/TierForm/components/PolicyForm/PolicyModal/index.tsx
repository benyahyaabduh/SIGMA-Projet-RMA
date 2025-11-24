import React from "react";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Button, DialogForm } from "components";
import messages from "config/i18n/messages";
import { Box, Grid } from "@mui/material";
import {
  FormAutocomplete,
  FormDatePicker,
  FormInput,
  FormNumberField,
} from "components/forms";
import { ApiRoutes } from "config/api/apiRoutes";
import { policyData } from "app/PrivateApp/tier/NewTierPage/TierForm/components/PolicyForm/PolicyModal/services/policyAtom";
import usePolicy from "app/PrivateApp/tier/NewTierPage/TierForm/components/PolicyForm/PolicyModal/services/usePolicy";

const validationSchema = Yup.object().shape({
  branche: Yup.object().required(),
  etatPolice: Yup.object().required(),
  numeroPolice: Yup.number().required(),
  naturePolice: Yup.string().nullable(),
  montantTotal: Yup.number().required(),
  riskResiliation: Yup.string().nullable(),
  dateEcheance: Yup.date().nullable(),
  dateEffet: Yup.date().nullable(),
  initialDate: Yup.date().nullable(),
  dateExpiration: Yup.date().nullable(),
  dateEtat: Yup.date().nullable(),
});

const defaultValues = {
  branche: null,
  etatPolice: null,
  numeroPolice: null,
  naturePolice: null,
  montantTotal: null,
  riskResiliation: null,
  dateEcheance: null,
  dateEffet: null,
  initialDate: null,
  dateExpiration: null,
  dateEtat: null,
};

const PolicyModal = () => {
  const { isOpen, params } = useRecoilValue(policyData);
  const { onCloseModal } = usePolicy();

  const onSubmit = async (data: any) => {
    params?.onSave(data);
    onCloseModal();
  };

  return (
    <DialogForm
      title={messages.addPolicy}
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
            label={messages.branch}
            name="branche"
            apiProps={{
              url: ApiRoutes.FETCH_BRANCHES,
            }}
            required
            xs={4}
          />
          <FormAutocomplete
            label={messages.policyState}
            name="etatPolice"
            apiProps={{
              url: ApiRoutes.FETCH_POLICY_STATES,
            }}
            required
            xs={4}
          />
          <FormNumberField
            label={messages.policyNumber}
            name="numeroPolice"
            required
            xs={4}
          />
          <FormInput label={messages.policyNature} name="naturePolice" xs={4} />
          <FormNumberField
            label={messages.totalAmount}
            name="montantTotal"
            required
            xs={4}
          />
          <FormInput
            label={messages.riskTermination}
            name="riskResiliation"
            xs={4}
          />
          <FormDatePicker
            label={messages.deadlineDate}
            name="dateEcheance"
            xs={4}
          />
          <FormDatePicker
            label={messages.effectiveDate}
            name="dateEffet"
            xs={4}
          />
          <FormDatePicker
            label={messages.initialDate}
            name="initialDate"
            xs={4}
          />
          <FormDatePicker
            label={messages.expirationDate}
            name="dateExpiration"
            xs={4}
          />
          <FormDatePicker label={messages.statusDate} name="dateEtat" xs={4} />
        </Grid>
      </Box>
    </DialogForm>
  );
};

export default PolicyModal;
