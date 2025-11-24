import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import PageNotFound from "components/PageWrapper/PageNotFound";
import StatisticsSummary from "app/PrivateApp/dashboard/components/StatisticsSummary";
import StatisticsByNature from "app/PrivateApp/dashboard/components/StatisticsByNature";
import StatisticsByClientType from "app/PrivateApp/dashboard/components/StatisticsByClientType";
import CountTierGraph from "app/PrivateApp/dashboard/components/CountTierGraph";
import LastTierList from "app/PrivateApp/dashboard/components/LastTierList";

const DashboardPage = () => {
  return (
    <Stack spacing={2}>
      <StatisticsSummary />
      <Box>
        <Grid container spacing={2}>
          <Grid item container xs={3} spacing={2}>
            <StatisticsByNature xs={12} />
            <StatisticsByClientType xs={12} />
          </Grid>
          <Grid item xs={9}>
            <CountTierGraph />
          </Grid>
        </Grid>
      </Box>
      <LastTierList />
      {/*<PageNotFound />*/}
    </Stack>
  );
};

export default DashboardPage;
