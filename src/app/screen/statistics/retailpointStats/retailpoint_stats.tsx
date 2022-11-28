import React from "react";
import { Col, Row, Spacing } from "@yper-script/react/app/widget/generic";
import SuccessRateChart from "@yper-script/react/app/screen/statistics/charts/success_rate_chart";
import CatchmentAreaChart from "@yper-script/react/app/screen/statistics/retailpointStats/charts/catchment_area_chart";
import RetailPointOpinionChart from "@yper-script/react/app/screen/statistics/charts/retailpoint_opinion_chart";
import DelivererOpinionChart from "@yper-script/react/app/screen/statistics/charts/deliverer_opinion_chart";
import TotalDeliveryStat from "@yper-script/react/app/screen/statistics/stats/total_delivery_stat";
import CartPriceAverageStat from "@yper-script/react/app/screen/statistics/stats/cart_price_average_stat";
import DeliveryPriceAverageStat from "@yper-script/react/app/screen/statistics/retailpointStats/stats/delivery_price_average_stat";
import AcceptationDelayStat from "@yper-script/react/app/screen/statistics/retailpointStats/stats/acceptation_delay_stat";
import DeliveriesChartContainer from "@yper-script/react/app/screen/statistics/retailpointStats/charts/deliveries_chart_container";
import CartPriceChartContainer from "@yper-script/react/app/screen/statistics/retailpointStats/charts/cart_price_chart_container";
import { RetailpointStatsNotifier } from "@yper-script/react/app/notifiers/retailpoint_stats_notifier";

function RetailpointStats() {
  return (
    <>
      <Row className={"mt-4"}>
        <Col size={1}>
          <SuccessRateChart provider={RetailpointStatsNotifier.provider} />
        </Col>
        <Col size={1} className={"ml-3"}>
          <CatchmentAreaChart />
        </Col>
        <Col size={1} className={"ml-3"}>
          <DelivererOpinionChart provider={RetailpointStatsNotifier.provider} />
        </Col>
        <Col size={1} className={"ml-3"}>
          <RetailPointOpinionChart
            provider={RetailpointStatsNotifier.provider}
            isProDash={false}
          />
        </Col>
      </Row>
      <Row className={"mt-3"}>
        <TotalDeliveryStat provider={RetailpointStatsNotifier.provider} />
        <Spacing margin={{ right: "0.5rem", left: "0.5rem" }} />
        <CartPriceAverageStat provider={RetailpointStatsNotifier.provider} />
        <Spacing margin={{ right: "0.5rem", left: "0.5rem" }} />
        <DeliveryPriceAverageStat />
        <Spacing margin={{ right: "0.5rem", left: "0.5rem" }} />
        <AcceptationDelayStat />
      </Row>
      <Row className={"mt-3"}>
        <Col>
          <DeliveriesChartContainer />
        </Col>
      </Row>
      <Row className={"mt-3"}>
        <Col>
          <CartPriceChartContainer />
        </Col>
      </Row>
    </>
  );
}

export default RetailpointStats;
