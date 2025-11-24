import React from "react";
import messages from "config/i18n/messages";
import { upperCase } from "lodash";
import { buildTierFullName } from "app/PrivateApp/tier/NewTierPage/TierForm/services/tierFormatter";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import { PageWrapper } from "components";
import { Grid, Stack } from "@mui/material";
import ViewRejectedInfo from "app/PrivateApp/legacy/ViewRejectedPage/components/ViewRejectedInfo";
import ViewRejectedDocs from "app/PrivateApp/legacy/ViewRejectedPage/components/ViewRejectedDocs";
import ViewRejectedPhysical from "app/PrivateApp/legacy/ViewRejectedPage/components/ViewRejectedPhysical";
import ViewRejectedContact from "app/PrivateApp/legacy/ViewRejectedPage/components/ViewRejectedContact";
import ViewRejectedLicence from "app/PrivateApp/legacy/ViewRejectedPage/components/ViewRejectedLicence";
import ViewRejectedMoral from "app/PrivateApp/legacy/ViewRejectedPage/components/ViewRejectedMoral";
import RejectedReasonInfo from "app/PrivateApp/legacy/ViewRejectedPage/components/ViewRejectedInfo/RejectedReasonInfo";

const ViewRejectedPage = () => {
  const intl = useIntl();
  const location = useLocation();
  const data = location?.state;

  return (
    <PageWrapper
      containerProps={{
        sx: {
          spacing: 2,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        },
      }}
      title={`${intl.formatMessage(messages.viewTier)} ${upperCase(
        buildTierFullName(data),
      )}`}
    >
      <Grid item xs={4}>
        <Stack spacing={2}>
          <RejectedReasonInfo data={data} />
          <ViewRejectedInfo data={data} />
        </Stack>
      </Grid>
      <Grid item xs={8}>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row" justifyContent="space-evenly">
            <ViewRejectedLicence data={data} />
            <ViewRejectedContact data={data} />
          </Stack>
          <ViewRejectedDocs data={data} />
          {data?.typeTiers === "M" ? (
            <ViewRejectedMoral data={data} />
          ) : (
            <ViewRejectedPhysical data={data} />
          )}
        </Stack>
      </Grid>
    </PageWrapper>
  );
};

export default ViewRejectedPage;
