import { first, groupBy, orderBy, sumBy } from "lodash";
import { formatDate } from "utils/helper";

export const formatSummaryFromApi = ({ intl, data }: any) => {
  // console.log("formatSummaryFromApi data", data);
  return Object.entries(data).map(([key, value]) => ({
    label: intl.formatMessage({
      id: `app.rma.transverse.tiers360.${key}`,
      defaultMessage: key,
    }),
    value: intl.formatNumber(value, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: "standard",
    }),
  }));
};

export const formatCountTierFromApi = (data: any[]) => {
  const formattedData =
    orderBy(
      data
        ?.filter((item) => !(item.year === 2022 && item.month === 11))
        ?.map((item) => {
          const date = new Date(item.year, item.month - 1, item.day);
          // const formattedDate = formatDate({ value: date, format: "d MMM yy" });
          return {
            date,
            value: item.count,
            day: formatDate({ value: date, format: "d MMM" }),
            month: formatDate({ value: date, format: "MMM yy" }),
          };
        }),
      ["date"],
      ["asc"],
    ) || [];

  return Object.values(groupBy(formattedData, "month"))
    .map((values) => {
      const month = first(values)?.month;
      return {
        column: {
          drilldown: month,
          name: month,
          y: sumBy(values, "value"),
        },
        drilldown: {
          name: month,
          id: month,
          data: values.map((item) => ({
            name: item.day,
            y: item.value,
          })),
        },
      };
    })
    .reduce(
      (acc: any, cur) => {
        return {
          series: acc.series.concat([cur.column]),
          drilldown: acc.drilldown.concat([cur.drilldown]),
        };
      },
      { series: [], drilldown: [] },
    );
};
