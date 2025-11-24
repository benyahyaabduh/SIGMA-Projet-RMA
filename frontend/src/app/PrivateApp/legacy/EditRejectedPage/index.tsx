import React from "react";
import messages from "config/i18n/messages";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import { PageWrapper } from "components";
import { Form } from "components/forms";
import * as Yup from "yup";
import { FormSubmitProps } from "types";
import { Grid, Stack } from "@mui/material";
import EditRejectedInfo from "app/PrivateApp/legacy/EditRejectedPage/components/EditRejectedInfo";
import EditRejectedContacts from "app/PrivateApp/legacy/EditRejectedPage/components/EditRejectedContacts";
import EditRejectedPhysical from "app/PrivateApp/legacy/EditRejectedPage/components/EditRejectedPhysical";
import EditRejectedMoral from "app/PrivateApp/legacy/EditRejectedPage/components/EditRejectedMoral";
import EditRejectedMoreInfo from "app/PrivateApp/legacy/EditRejectedPage/components/EditRejectedMoreInfo";

const validationSchema = Yup.object().shape({
  id: Yup.number().nullable(),
  version: Yup.number().nullable(),
  codeClient: Yup.number().nullable(),
});

const defaultValues = {
  id: null,
  version: null,
  codeClient: null,
};

const EditRejectedPage = () => {
  const intl = useIntl();
  const location = useLocation();
  const data = location?.state;

  const onSubmit = async ({ data }: FormSubmitProps) => {
    console.log("EditRejectedPage onSubmit", data);
  };

  return (
    <PageWrapper
      title={`${intl.formatMessage(
        messages.editRejectedClient,
      )} ${data?.codeClient}`}
    >
      <Form
        onSubmit={onSubmit}
        defaultValues={{ ...defaultValues, ...data }}
        validator={validationSchema}
        containerProps={{ spacing: 2 }}
        // resetType={resetType}
        // validateManually={true}
      >
        <Grid item xs={4}>
          <EditRejectedInfo />
        </Grid>
        <Grid item xs>
          <Stack spacing={2}>
            <EditRejectedMoreInfo />
            {data?.typeTiers === "M" ? (
              <EditRejectedMoral />
            ) : (
              <EditRejectedPhysical />
            )}
            <EditRejectedContacts />
          </Stack>
        </Grid>
      </Form>
    </PageWrapper>
  );
};

export default EditRejectedPage;
