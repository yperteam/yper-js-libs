import React from "react";
import { Text } from "@yper-script/react/app/widget/mixins";
import { useTheme } from "styled-components";
import { RecoilValueReadOnly, useRecoilValueLoadable } from "recoil";
import CustomLoader from "@yper-script/react/app/widget/loader";
import ErrorChart from "@yper-script/react/app/screen/statistics/charts/error_chart";
import StatsCard from "@yper-script/react/app/screen/statistics/stats/stats_card";

/** Images */
const icon = "/img/stats/shop_delivery_icon.svg";

//@Todo = typeHinting
function DeliveriesByRetailpointStat(props: {
  provider: RecoilValueReadOnly<any>;
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
        Livraisons par magasin
      </Text>
      <Text textStyle={theme.textTheme.title.large}>
        {stats.totalDeliveries > 0
          ? Math.round(stats.totalDeliveries / stats.count)
          : 0}
      </Text>
    </StatsCard>
  );
}

export default DeliveriesByRetailpointStat;
