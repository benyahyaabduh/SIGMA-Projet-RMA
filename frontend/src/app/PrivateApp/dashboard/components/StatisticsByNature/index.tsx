import React from "react";
import { useGetApi } from "config/api/useApi";
import { ApiRoutes } from "config/api/apiRoutes";
import { CardWrapper, GridItem, PageRenderer } from "components";
import PieChartGraph from "app/PrivateApp/dashboard/components/PieChartGraph";

const StatisticsByNature = ({ xs }: { xs: any }) => {
  const { data, status } = useGetApi({
    url: ApiRoutes.STATISTICS_BY_NATURE,
    formatter: (rows) =>
      rows.map((item) => ({
        name: item.type.libelle,
        y: item.total,
      })),
  });

  return (
    <GridItem xs={xs}>
      <CardWrapper
      //cardProps={{ sx: { height: 1 } }}
      >
        <PageRenderer status={status}>
          <PieChartGraph id="byNature" data={data} />
        </PageRenderer>
      </CardWrapper>
    </GridItem>
  );
};

export default StatisticsByNature;
