import React from "react";
import { Text } from "@yper-script/react/app/widget/mixins";
import { useTheme } from "styled-components";
import { useRecoilValueLoadable } from "recoil";
import { RetailpointStatsNotifier } from "@yper-script/react/app/notifiers/retailpoint_stats_notifier";
import CustomLoader from "@yper-script/react/app/widget/loader";
import ErrorChart from "@yper-script/react/app/screen/statistics/charts/error_chart";
import StatsCard from "@yper-script/react/app/screen/statistics/stats/stats_card";

/** Images */
const icon = "/img/stats/delivery_price_average_icon.svg";

function DeliveryPriceAverageStat() {
  const theme = useTheme();

  /** Recoil */
  const loadable = useRecoilValueLoadable(RetailpointStatsNotifier.provider);

  if (loadable.state == "loading") {
    return <CustomLoader />;
  } else if (loadable.state == "hasError") {
    return <ErrorChart />;
  }

  let stats = loadable.contents;

  return (
    <StatsCard icon={icon} alt="Delivery Price Average logo">
      <Text
        textStyle={theme.textTheme.body.medium.copyWith({
          color: theme.color.primary["300"],
        })}
      >
        Coût moyen d'une livraison
      </Text>
      <Text textStyle={theme.textTheme.title.large}>
        {stats.deliveryPriceHtAverage}€
      </Text>
    </StatsCard>
  );
}

export default DeliveryPriceAverageStat;
