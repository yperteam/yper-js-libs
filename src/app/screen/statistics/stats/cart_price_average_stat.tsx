import React from "react";
import { Text } from "@yper-script/react/app/widget/mixins";
import { useTheme } from "styled-components";
import { RecoilValueReadOnly, useRecoilValueLoadable } from "recoil";
import CustomLoader from "@yper-script/react/app/widget/loader";
import ErrorChart from "@yper-script/react/app/screen/statistics/charts/error_chart";
import { ProRetailpointStats } from "@yper-script/react/data/entity/pro_retailpoint_stats.entity";
import StatsCard from "@yper-script/react/app/screen/statistics/stats/stats_card";

/** Images */
const icon = "/img/stats/cart_price_average_icon.svg";

function CartPriceAverageStat(props: {
  provider: RecoilValueReadOnly<ProRetailpointStats>;
}) {
  const theme = useTheme();

  /** Recoil */
  const loadable = useRecoilValueLoadable(props.provider);

  if (loadable.state == "loading") {
    return <CustomLoader />;
  } else if (loadable.state == "hasError") {
    return <ErrorChart />;
  }

  let stats = loadable.contents;

  return (
    <StatsCard icon={icon} alt="Cart price average logo">
      <Text
        textStyle={theme.textTheme.body.medium.copyWith({
          color: theme.color.primary["300"],
        })}
      >
        Panier moyen
      </Text>
      <Text textStyle={theme.textTheme.title.large}>
        {stats.cartPriceAverage}€
      </Text>
    </StatsCard>
  );
}

export default CartPriceAverageStat;
