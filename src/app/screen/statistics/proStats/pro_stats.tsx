import React from "react";
import { Col, Row } from "@yper-script/react/app/widget/generic";
import SuccessRateChart from "@yper-script/react/app/screen/statistics/charts/success_rate_chart";
import { ProStatsNotifier } from "@yper-script/react/app/notifiers/pro_stats_notifier";
import DelivererOpinionChart from "@yper-script/react/app/screen/statistics/charts/deliverer_opinion_chart";
import RetailPointOpinionChart from "@yper-script/react/app/screen/statistics/charts/retailpoint_opinion_chart";
import TotalDeliveryStat from "@yper-script/react/app/screen/statistics/stats/total_delivery_stat";
import CartPriceAverageStat from "@yper-script/react/app/screen/statistics/stats/cart_price_average_stat";
import NpsChart from "@yper-script/react/app/screen/statistics/proStats/charts/nps_chart";
import SalesStat from "@yper-script/react/app/screen/statistics/proStats/stats/sales_stat";
import CustomerCountStat from "@yper-script/react/app/screen/statistics/proStats/stats/customers_count_stat";
import RetailPointCountStat from "@yper-script/react/app/screen/statistics/proStats/stats/retailpoints_count_stat";
import DeliveriesByRetailpointStat from "@yper-script/react/app/screen/statistics/proStats/stats/deliveries_by_retailpoint_stat";
import YpershopDeliveriesStat from "@yper-script/react/app/screen/statistics/proStats/stats/ypershop_deliveries_stat";
import ApiDeliveriesStat from "@yper-script/react/app/screen/statistics/proStats/stats/api_deliveries_stat";
import RetailPointList from "@yper-script/react/app/screen/statistics/proStats/list/retailpoint_list";
import Searchbar from "@yper-script/react/app/screen/statistics/proStats/searchbar";

function ProStats() {
  return (
    <>
      <Searchbar />
      <Row direction={"row"} className={"mt-3"}>
        <Col size={1}>
          <SuccessRateChart provider={ProStatsNotifier.provider} />
        </Col>
        <Col size={1} className={"ml-3"}>
          <DelivererOpinionChart provider={ProStatsNotifier.provider} />
        </Col>
        <Col size={1} className={"ml-3"}>
          <RetailPointOpinionChart
            provider={ProStatsNotifier.provider}
            isProDash={true}
          />
        </Col>
        <Col size={1} className={"ml-3"}>
          <NpsChart />
        </Col>
      </Row>
      <Row direction={"row"} className={"mt-3"}>
        <Col size={1}>
          <SalesStat provider={ProStatsNotifier.provider} />
        </Col>
        <Col size={1} className={"ml-3"}>
          <TotalDeliveryStat provider={ProStatsNotifier.provider} />
        </Col>
        <Col size={1} className={"ml-3"}>
          <CustomerCountStat provider={ProStatsNotifier.provider} />
        </Col>
        <Col size={1} className={"ml-3"}>
          <CartPriceAverageStat provider={ProStatsNotifier.provider} />
        </Col>
      </Row>
      <Row direction={"row"} className={"mt-3"}>
        <Col size={1}>
          <RetailPointCountStat provider={ProStatsNotifier.provider} />
        </Col>
        <Col size={1} className={"ml-3"}>
          <DeliveriesByRetailpointStat provider={ProStatsNotifier.provider} />
        </Col>
        <Col size={1} className={"ml-3"}>
          <YpershopDeliveriesStat provider={ProStatsNotifier.provider} />
        </Col>
        <Col size={1} className={"ml-3"}>
          <ApiDeliveriesStat provider={ProStatsNotifier.provider} />
        </Col>
      </Row>
      <div className={"mt-4"}>
        <RetailPointList />
      </div>
    </>
  );
}

export default ProStats;
