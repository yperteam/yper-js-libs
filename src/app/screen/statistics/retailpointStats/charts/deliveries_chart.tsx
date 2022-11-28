import React from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "styled-components";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import CustomLoader from "@yper-script/react/app/widget/loader";
import { Col } from "@yper-script/react/app/widget/generic";
import { RetailpointDeliveryDistributionNotifier } from "@yper-script/react/app/notifiers/retailpoint_delivery_distribution_notifier";
import { StatsDeliveriesIntervalNotifier } from "@yper-script/react/app/notifiers/stats_deliveries_interval_notifier";
import { StatsRangeNotifier } from "@yper-script/react/app/notifiers/stats_range_notifier";
import { dateDisplay } from "@yper-script/react/app/screen/statistics/helper/date_axis_helper";
import { getGradient } from "@yper-script/react/app/screen/statistics/charts/chart_config";

/** Chart Configuration */
const options = {
  responsive: true,
  maintainAspectRatio: false,

  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: false,
    },
    tooltip: {
      position: "nearest",
    },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      beginAtZero: true,
    },
  },
};

function DeliveriesChart() {
  const theme = useTheme();

  /** Recoil */
  const interval = useRecoilValue(StatsDeliveriesIntervalNotifier.provider);
  // const period = useRecoilState(StatsRangeNotifier.provider);
  const currentLoadable = useRecoilValueLoadable(
    RetailpointDeliveryDistributionNotifier.currentProvider
  );
  const previousLoadable = useRecoilValueLoadable(
    RetailpointDeliveryDistributionNotifier.previousProvider
  );

  if (
    currentLoadable.state == "loading" ||
    previousLoadable.state == "loading"
  ) {
    return <CustomLoader />;
  }

  const currentStats = currentLoadable.contents;
  const previousStats =
    previousLoadable.state == "hasError" ? [] : previousLoadable.contents;

  const data = {
    labels: currentStats.map(stat => dateDisplay(interval, stat)),
    datasets: [
      {
        label: "n-1",
        data: previousStats.map(stat => stat.value),
        borderColor: theme.color.information["700"],
        yAxisID: "y",
        lineTension: 0.3,
        pointRadius: 0,
        backgroundColor: theme.color.information["700"],
      },
      {
        label: "n",
        data: currentStats.map(stat => stat.value),
        borderColor: theme.color.information["400"],
        yAxisID: "y",
        lineTension: 0.3,
        fill: "start",
        backgroundColor: function(context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }
          return getGradient(ctx, chartArea);
        },
      },
    ],
  };

  return (
    <Col size={5}>
      {/* @ts-ignore */}
      <Line options={options} data={data} />
    </Col>
  );
}

export default DeliveriesChart;
