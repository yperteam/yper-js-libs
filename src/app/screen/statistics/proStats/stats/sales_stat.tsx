import React from "react";
import { Text } from "@yper-script/react/app/widget/mixins";
import { useTheme } from "styled-components";
import { RecoilValueReadOnly, useRecoilValueLoadable } from "recoil";
import CustomLoader from "@yper-script/react/app/widget/loader";
import ErrorChart from "@yper-script/react/app/screen/statistics/charts/error_chart";
import StatsCard from "@yper-script/react/app/screen/statistics/stats/stats_card";

/** Images */
const icon = "/img/stats/sales_icon.svg";

function SalesStat(props: { provider: RecoilValueReadOnly<any> }) {
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
    <StatsCard icon={icon} alt="Sales Icon">
      <Text
        textStyle={theme.textTheme.body.medium.copyWith({
          color: theme.color.primary["300"],
        })}
      >
        C.A. estimé
      </Text>
      <Text textStyle={theme.textTheme.title.large}>
        {Math.round(stats.cartPriceAverage * stats.totalDeliveries)}€
      </Text>
    </StatsCard>
  );
}

export default SalesStat;
