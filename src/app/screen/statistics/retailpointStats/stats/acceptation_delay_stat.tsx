import React from "react";
import { Text } from "@yper-script/react/app/widget/mixins";
import { useTheme } from "styled-components";
import { useRecoilValueLoadable } from "recoil";
import { RetailpointStatsNotifier } from "@yper-script/react/app/notifiers/retailpoint_stats_notifier";
import CustomLoader from "@yper-script/react/app/widget/loader";
import ErrorChart from "@yper-script/react/app/screen/statistics/charts/error_chart";
import StatsCard from "@yper-script/react/app/screen/statistics/stats/stats_card";

/** Images */
const icon = "/img/stats/acceptation_delay_icon.svg";

function AcceptationDelayStat() {
  const theme = useTheme();

  /** Recoil */
  const loadable = useRecoilValueLoadable(RetailpointStatsNotifier.provider);

  if (loadable.state == "loading") {
    return <CustomLoader />;
  } else if (loadable.state == "hasError") {
    return <ErrorChart />;
  }
  let stats = loadable.contents;

  /** Datas */
  //Todo: migrate to helper ?
  let hourAverage = stats.acceptationDelayAverage / 3600;

  const hours = hourAverage >= 1 ? Math.floor(hourAverage) + " h" : "";
  const minutes =
    ((stats.acceptationDelayAverage % 3600) / 60).toFixed() + " mn";

  return (
    <StatsCard icon={icon} alt="Acceptation delay logo">
      <Text
        textStyle={theme.textTheme.body.medium.copyWith({
          color: theme.color.primary["300"],
        })}
      >
        Délai moyen d'acceptation
      </Text>
      <Text textStyle={theme.textTheme.title.large}>
        {hours} {minutes}
      </Text>
    </StatsCard>
  );
}

export default AcceptationDelayStat;
