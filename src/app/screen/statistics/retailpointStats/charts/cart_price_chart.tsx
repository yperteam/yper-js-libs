import React from "react";
import { Bar } from "react-chartjs-2";
import { useTheme } from "styled-components";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import CustomLoader from "@yper-script/react/app/widget/loader";
import { Col } from "@yper-script/react/app/widget/generic";
import { StatsDeliveriesIntervalNotifier } from "@yper-script/react/app/notifiers/stats_deliveries_interval_notifier";
import { RetailpointCartPriceNotifier } from "@yper-script/react/app/notifiers/retailpoint_cart_price_notifier";
import { dateDisplay } from "@yper-script/react/app/screen/statistics/helper/date_axis_helper";

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
    legend: {
      display: false,
    },
    tooltip: {
      position: "nearest",
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

function CartPriceChart() {
  const theme = useTheme();

  /** Recoil */
  const interval = useRecoilValue(StatsDeliveriesIntervalNotifier.provider);
  const currentLoadable = useRecoilValueLoadable(
    RetailpointCartPriceNotifier.currentProvider
  );
  const previousLoadable = useRecoilValueLoadable(
    RetailpointCartPriceNotifier.previousProvider
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

  /** Chart Configuration */
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
        barThickness: 8,
      },
      {
        label: "n",
        data: currentStats.map(stat => stat.value),
        borderColor: theme.color.information["400"],
        yAxisID: "y",
        lineTension: 0.3,
        fill: "start",
        backgroundColor: theme.color.information["400"],
        barThickness: 8,
      },
    ],
  };

  return (
    <Col size={5}>
      {/* @ts-ignore */}
      <Bar options={options} data={data} />
    </Col>
  );
}

export default CartPriceChart;
