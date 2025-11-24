import React from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import messages from "config/i18n/messages";
import { upperCase } from "lodash";
import { buildTierFullName } from "app/PrivateApp/tier/NewTierPage/TierForm/services/tierFormatter";
import { PageWrapper } from "components";
import { Box, Grid, Stack } from "@mui/material";
import ViewTierInfo from "app/PrivateApp/tier/ViewTierPage/components/ViewTierInfo";
import AddressInfo from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm/AddressInfo";
import ContractHistoryInfo from "app/PrivateApp/tier/ViewTierPage/components/ContractHistoryInfo";
import PolicyInfo from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm/PolicyInfo";

const ViewHistoryPage = () => {
  const intl = useIntl();
  const location = useLocation();

  const data = location?.state;
  console.log("ViewHistoryPage data", data);

  return (
    <PageWrapper
      title={`${intl.formatMessage(messages.viewTier)} ${upperCase(
        buildTierFullName(data),
      )}`}
    >
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ViewTierInfo data={data} />
          </Grid>
          <Grid item xs={8}>
            <Stack spacing={2}>
              <AddressInfo data={data?.adresses} />
              <PolicyInfo data={data?.polices} />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </PageWrapper>
  );
};

export default ViewHistoryPage;
