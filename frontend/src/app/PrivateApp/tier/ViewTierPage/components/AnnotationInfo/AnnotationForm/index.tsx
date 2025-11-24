import React from "react";
import * as Yup from "yup";
import { Box, Grid } from "@mui/material";
import messages from "config/i18n/messages";
import { Form, FormInput } from "components/forms";
import { FormSubmitProps } from "types";
import FormRating from "components/forms/FormRating";
import SubmitButton from "components/Button/SubmitButton";
import useAnnotation from "app/PrivateApp/annotation/services/useAnnotation";

const validationSchema = Yup.object().shape({
  id: Yup.number().nullable(),
  score: Yup.number().nullable(),
  texte: Yup.string().nullable(),
});

const defaultValues = {
  id: null,
  score: null,
  texte: null,
  // category: "RECOUVREMENT" | "SINISTRE";
};

const AnnotationForm = ({
  category,
  data,
}: {
  data: any;
  category: "RECOUVREMENT" | "SINISTRE";
}) => {
  const { onSave } = useAnnotation();
  const onSubmit = async ({ data: values }: FormSubmitProps) => {
    console.log("AnnotationForm onSubmit", values);
    return onSave({
      data: {
        ...values,
        typeAnnotation: { value: category === "SINISTRE" ? "TEXTE" : "SCORE" },
        nomAuteur: "Admin",
        codeAuteur: "ADMIN",
        categorieAnnotation: {
          id: category === "SINISTRE" ? 1 : 2,
        },
        clientInstance: {
          id: data.id,
          code: data.codeClient,
        },
      },
    });
  };

  return (
    <Box sx={{ p: 1, bgcolor: "#f6f7fa", borderRadius: 3 }}>
      <Form
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        validator={validationSchema}
        containerProps={{
          spacing: 2,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        // resetType={resetType}
        // validateManually={true}
      >
        {category === "SINISTRE" && (
          <FormInput
            name="texte"
            size="small"
            variant="standard"
            placeholder="Saisissez votre note"
            xs
          />
        )}
        <FormRating name="score" xs={2} max={3} />
        <Grid item>
          <SubmitButton label={messages.submit} size="small" fullWidth />
        </Grid>
      </Form>
    </Box>
  );
};

export default AnnotationForm;
