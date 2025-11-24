import React, { FC } from "react";
import Highcharts, { Options } from "highcharts";
import drilldown from "highcharts/modules/drilldown.js";
import HighchartsReact from "highcharts-react-official";
drilldown(Highcharts);

interface BarChartProps {
  data: any;
  height?: number;
}

const BarChart: FC<BarChartProps> = ({ data, height = 300 }) => {
  const { series, drilldown } = data;

  const options = {
    chart: {
      type: "column",
      height: height,
    },
    xAxis: {
      title: {
        text: "",
        style: {
          fontSize: "16px",
        },
      },
      type: "category",
      labels: {
        style: {
          fontSize: "15px",
        },
      },
    },
    yAxis: {
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: "white",
          fontSize: "16px",
        },
        verticalAlign: "middle",
        align: "center",
      },
      title: {
        text: "Total ",
        style: {
          fontSize: "16px",
        },
      },
      labels: {
        style: {
          fontSize: "15px",
        },
      },
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
      align: "center",
    },
    tooltip: {
      useHTML: true,
      // formatter: function () {
      //   return " <b>" + this.y + "</b>";
      // },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        cursor: "pointer",
      },
    },
    series: [
      {
        data: series,
        // data: [
        //   {
        //     name: "Chrome",
        //     y: 62.74,
        //     drilldown: "Chrome",
        //   },
        //   {
        //     name: "Firefox",
        //     y: 10.57,
        //     drilldown: "Firefox",
        //   },
        // ],
        stacking: "normal",
      },
    ],
    drilldown: {
      series: drilldown,
      // series: [
      //   {
      //     name: "Chrome",
      //     id: "Chrome",
      //     data: [
      //       // ["v65.0", 0.1],
      //       // ["v64.0", 1.3],
      //       {
      //         name: "v65.0",
      //         y: 0.1,
      //       },
      //       {
      //         name: "v64.0",
      //         y: 1.3,
      //       },
      //     ],
      //   },
      //   {
      //     name: "Firefox",
      //     id: "Firefox",
      //     data: [
      //       // ["v58.0", 1.02],
      //       // ["v57.0", 7.36],
      //       {
      //         name: "v58.0",
      //         y: 1.02,
      //       },
      //       {
      //         name: "v57.0",
      //         y: 7.36,
      //       },
      //     ],
      //   },
      // ],
      stacking: "normal",
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
