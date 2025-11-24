import React from "react";
import { useGetApi } from "config/api/useApi";
import { ApiRoutes } from "config/api/apiRoutes";
import { formatCountTierFromApi } from "app/PrivateApp/dashboard/services/dashboardFomatter";
import { CardWrapper, PageRenderer } from "components";
import BarChart from "app/PrivateApp/dashboard/components/BarChart";
import messages from "config/i18n/messages";

const CountTierGraph = () => {
  const { data, status } = useGetApi({
    url: ApiRoutes.STATISTICS_COUNT_TIERS,
    params: { type: "DAILY" },
    formatter: formatCountTierFromApi,
  });

  return (
    <CardWrapper title={messages.dailyCountTiers}>
      <PageRenderer status={status}>
        <BarChart data={data} />
      </PageRenderer>
    </CardWrapper>
  );
};

export default CountTierGraph;
