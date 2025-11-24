import React from "react";
import { useGetApi } from "config/api/useApi";
import { ApiRoutes } from "config/api/apiRoutes";
import { PageRenderer } from "components";
import { formatSummaryFromApi } from "app/PrivateApp/dashboard/services/dashboardFomatter";
import { Stack } from "@mui/material";
import DashboardCard from "app/PrivateApp/dashboard/components/DashboardCard";

const StatisticsSummary = () => {
  const { data, status } = useGetApi({
    url: ApiRoutes.STATISTICS_SUMMARY,
    intlFormatter: formatSummaryFromApi,
  });

  return (
    <PageRenderer status={status}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-evenly"
      >
        {data?.map((item: any) => <DashboardCard data={item} />)}
      </Stack>
    </PageRenderer>
  );
};

export default StatisticsSummary;
