import React from "react";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Button, DialogForm } from "components";
import messages from "config/i18n/messages";
import { Box, Grid } from "@mui/material";
import { FormAutocomplete, FormInput } from "components/forms";
import { ApiRoutes } from "config/api/apiRoutes";
import { annotationData } from "app/PrivateApp/annotation/services/annotationAtom";
import useAnnotation, {
  typeAnnotations,
} from "app/PrivateApp/annotation/services/useAnnotation";
import TierSelect from "app/PrivateApp/annotation/annotationModal/TierSelect";
import FormRating from "components/forms/FormRating";
import FormToggleButtonGroup from "components/forms/FormToggleButtonGroup";
import IntermediateSelect from "app/PrivateApp/annotation/annotationModal/IntermediateSelect";

const validationSchema = Yup.object().shape({
  clientInstance: Yup.object().required(),
  typeAnnotation: Yup.object().required(),
  categorieAnnotation: Yup.object().required(),
  nomAuteur: Yup.string().nullable(),
  codeAuteur: Yup.string().nullable(),
  texte: Yup.string().nullable(),
  score: Yup.number().nullable(),
});

const defaultValues = {
  clientInstance: null,
  typeAnnotation: null,
  categorieAnnotation: null,
  nomAuteur: null,
  codeAuteur: null,
  texte: null,
  score: null,
};

const AnnotationModal = () => {
  const { isOpen, params } = useRecoilValue(annotationData);
  const { onCloseModal } = useAnnotation();

  const onSubmit = async (data: any) => {
    params?.onSave(data);
    onCloseModal();
  };

  return (
    <DialogForm
      title={messages.addAnnotation}
      isOpen={isOpen}
      maxWidth="sm"
      onClose={onCloseModal}
      actions={[<Button label={messages.confirm} type="submit" />]}
      schema={validationSchema}
      defaultValues={{ ...defaultValues, ...params?.current }}
      onSubmit={onSubmit}
    >
      <Box>
        <Grid container spacing={2}>
          <IntermediateSelect />
          <TierSelect />
          <FormAutocomplete
            label={messages.categoryAnnotation}
            name="categorieAnnotation"
            apiProps={{
              url: ApiRoutes.FETCH_ANNOTATION_CATEGORIES,
            }}
            required
            xs={6}
          />
          <FormToggleButtonGroup
            label={messages.annotationType}
            name="typeAnnotation"
            xs={6}
            required
            options={typeAnnotations}
          />
          <FormRating
            name="score"
            label={messages.score}
            xs={12}
            required={false}
          />
          <FormInput
            label={messages.text}
            name="texte"
            multiline
            required={false}
            xs={12}
          />
          <FormInput
            label={messages.authorName}
            name="nomAuteur"
            required={false}
            xs={6}
          />
          <FormInput
            label={messages.authorCode}
            name="codeAuteur"
            required={false}
            xs={6}
          />
        </Grid>
      </Box>
    </DialogForm>
  );
};

export default AnnotationModal;
