import React from "react";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Box, Grid } from "@mui/material";
import { FormAutocomplete, FormInput, FormSwitch } from "components/forms";
import { ApiRoutes } from "config/api/apiRoutes";
import { contactData } from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdditionalDataForm/ContactForm/ContactModal/services/contactAtom";
import useContact from "app/PrivateApp/tier/NewTierPage/TierForm/components/AdditionalDataForm/ContactForm/ContactModal/services/useContact";
import { DialogForm, Button } from "components";
import messages from "config/i18n/messages";

interface ContactType {
  code: string;
  [key: string]: any;
}

const validationSchema = Yup.object().shape({
  typeMoyenContact: Yup.object().required("Le type de contact est obligatoire"),
  moyenContact: Yup.string()
    .nullable()
    .when("typeMoyenContact", {
      is: (type: ContactType) => type?.code === "EMAIL",
      then: (schema) =>
        schema.required("L'email est obligatoire").email("Email invalide"),
    })
    .when("typeMoyenContact", {
      is: (type: ContactType) => type?.code === "TEL",
      then: (schema) =>
        schema
          .required("Le numéro est obligatoire")
          .matches(/^0[5-7]\d{8}$/, "Numéro de téléphone marocain invalide"),
    })
    .when("typeMoyenContact", {
      is: (type: ContactType) => type?.code === "FAX",
      then: (schema) =>
        schema
          .required("Le fax est obligatoire")
          .matches(/^0\d{9}$/, "Fax invalide"),
    }),
  estPrincipale: Yup.boolean().required(),
  estActif: Yup.boolean().required(),
});

const defaultValues = {
  typeMoyenContact: null,
  moyenContact: null,
  estPrincipale: false,
  estActif: true,
};

const ContactModal = () => {
  const { isOpen, params } = useRecoilValue(contactData);
  const { onCloseModal } = useContact();

  const onSubmitHandler = (data: any) => {
    params?.onSave(data);
    onCloseModal();
  };

  return (
    <DialogForm
      title={messages.addContact}
      isOpen={isOpen}
      maxWidth="xs"
      onClose={onCloseModal}
      schema={validationSchema}
      defaultValues={{ ...defaultValues, ...params?.current }}
      onSubmit={onSubmitHandler}
      actions={[
        <Button
          key="confirm"
          label={messages.confirm.defaultMessage} // utiliser defaultMessage
          type="submit"
        />,
      ]}
    >
      <Box>
        <Grid container spacing={2}>
          <FormAutocomplete
            label={messages.contactType}
            name="typeMoyenContact"
            apiProps={{ url: ApiRoutes.FETCH_CONTACT_TYPES }}
            required
            xs={12}
          />
          <FormInput label={messages.contact} name="moyenContact" required xs={12} />
          <FormSwitch label={messages.isMain} name="estPrincipale" xs={6} />
          <FormSwitch label={messages.isActive} name="estActif" xs={6} />
        </Grid>
      </Box>
    </DialogForm>
  );
};

export default ContactModal;
