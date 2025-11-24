import React from "react";
import { useLocation } from "react-router-dom";
import { buildTierFullName } from "app/PrivateApp/tier/NewTierPage/TierForm/services/tierFormatter";
import { Box, Grid, Stack } from "@mui/material";
import {
  RateReviewOutlined as RateReviewOutlinedIcon,
  ReviewsOutlined as ReviewsOutlinedIcon,
} from "@mui/icons-material";

import SupportingDocumentInfo from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm/SupportingDocumentInfo";
import AddressInfo from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm/AddressInfo";
import ContactInfo from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm/ContactInfo";
import PolicyInfo from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm/PolicyInfo";
import ViewTierInfo from "app/PrivateApp/tier/ViewTierPage/components/ViewTierInfo";
import messages from "config/i18n/messages";
import { PageWrapper } from "components";
import { useIntl } from "react-intl";
import CustomerProfileInfo from "app/PrivateApp/tier/ViewTierPage/components/CustomerProfileInfo";
import ContractHistoryInfo from "app/PrivateApp/tier/ViewTierPage/components/ContractHistoryInfo";
import { upperCase } from "lodash";
import AnnotationInfo from "app/PrivateApp/tier/ViewTierPage/components/AnnotationInfo";
import AppetiteInfo from "app/PrivateApp/tier/ViewTierPage/components/AppetiteInfo";
import { useGetById } from "config/api/useApi";
import { ApiRoutes } from "config/api/apiRoutes";

const ViewTierPage = () => {
  const intl = useIntl();
  const location = useLocation();

  console.log("ViewTierPage location", location?.state);
  const { data, isLoading, isError, isSuccess } = useGetById({
    url: ApiRoutes.GET_TIER,
    pathVariable: location?.state?.id,
  });

  return (
    <PageWrapper
      title={`${intl.formatMessage(messages.viewTier)} ${upperCase(
        buildTierFullName(data),
      )}`}
      isLoading={isLoading}
      isError={isError}
      isSuccess={isSuccess}
    >
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ViewTierInfo data={data} />
          </Grid>
          <Grid item xs={8}>
            <Stack spacing={2}>
              <CustomerProfileInfo data={data} />
              <AddressInfo data={data?.adresses} />
              <ContractHistoryInfo data={data} />
              {/*<SupportingDocumentInfo data={data?.identifications} />*/}
              {/*<ContactInfo data={data?.moyenContacts} />*/}
              <PolicyInfo data={data?.polices} />
              <AppetiteInfo data={data} />
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <AnnotationInfo
                      title={messages.recovery}
                      category="RECOUVREMENT"
                      data={data}
                      icon={RateReviewOutlinedIcon}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <AnnotationInfo
                      title={messages.sinister}
                      category="SINISTRE"
                      data={data}
                      icon={ReviewsOutlinedIcon}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </PageWrapper>
  );
};

export default ViewTierPage;
