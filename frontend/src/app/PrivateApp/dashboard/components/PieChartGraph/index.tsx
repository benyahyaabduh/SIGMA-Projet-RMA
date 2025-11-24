import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";
import HC_more from "highcharts/highcharts-more";
import { Box } from "@mui/material";

HC_more(Highcharts);
highcharts3d(Highcharts);

const PieChartGraph = ({ id = "graph", data, height = 150 }: any) => {
  const textColor = "#000";

  const options = {
    credits: { enabled: false },
    chart: {
      type: "pie",
      //backgroundColor: "rgba(0,0,0,0)",
      backgroundColor: "transparent",
      // width: 200,
      height: height,
      //width: "100%",
      margin: 0,
      padding: 0,
      spacing: 0,
      options3d: {
        enabled: true,
        alpha: 65,
        beta: 0,
      },
    },
    title: null,
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        showInLegend: true,
        //allowPointSelect: true,
        cursor: "pointer",
        depth: 40,
        shadow: true,
        startAngle: 180,
        size: "160%",
        //center: ["50%", "40%"],
        //center: ["15%", "40%"],
        center: ["30%", "35%"],
        dataLabels: {
          enabled: false,
          format: "{point.name}",
        },
      },
    },
    legend: {
      //labelFormat: "{percentage:.1f}% {name}",
      labelFormat: `<span style="color:{color}">{percentage:.0f}%</span> <span style="color:${textColor}"> {name}</span>`,
      shadow: false,
      floating: true,
      /*labelFormatter: function () {
        return <p style={{ color: "red" }}>{this.name}</p>;
      },*/
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
      itemMarginTop: 5,
      itemMarginBottom: 5,
      itemStyle: {
        color: "{color}", // "#333333",
        fontSize: 10,
      },
    },
    series: [
      {
        type: "pie",
        name: "Share",
        innerSize: 100,
        data: data, // defaultSeries, // series,
      },
    ],
  };

  return (
    <Box sx={{ height: "100%" }}>
      <HighchartsReact
        id={`default-3d-chart-${id}`}
        highcharts={Highcharts}
        allowChartUpdate={true}
        options={options}
        containerProps={{
          id: `default-3d-chart-${id}`,
        }}
      />
    </Box>
  );
};

export default PieChartGraph;
