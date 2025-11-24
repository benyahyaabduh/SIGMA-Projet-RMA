import React from "react";
import { Box, Grid, Stack } from "@mui/material";
import TierTypeInfo from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm/TierTypeInfo";
import { useFormContext } from "react-hook-form";
import MaritalStatusInfo from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm/MaritalStatusInfo";
import CompanyInfo from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm/CompanyInfo";
import OtherInfo from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm/OtherInfo";
import AddressInfo from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm/AddressInfo";
import ContactInfo from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm/ContactInfo";
import PolicyInfo from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm/PolicyInfo";
import SupportingDocumentInfo from "app/PrivateApp/tier/NewTierPage/TierForm/components/SummaryForm/SupportingDocumentInfo";

export const SummaryInfo = ({ data }: any) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Stack spacing={2}>
            {data?.init?.natureClient?.code === "M" ? (
              <CompanyInfo data={data?.info} />
            ) : (
              <MaritalStatusInfo data={data?.info} />
            )}
            <TierTypeInfo data={data?.init} />
            <OtherInfo data={data?.info} />
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <SupportingDocumentInfo data={data?.identifications} />
            <AddressInfo data={data?.additional?.adresses} />
            <ContactInfo data={data?.additional?.moyenContacts} />
            <PolicyInfo data={data?.polices} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

const SummaryForm = () => {
  const { getValues } = useFormContext();
  return <SummaryInfo data={getValues()} />;
};

export default SummaryForm;
