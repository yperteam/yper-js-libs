import React from "react";
import {
  Col,
  Column,
  Expanded,
  Row,
} from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";
import styled, { useTheme } from "styled-components";
import { RecoilValueReadOnly, useRecoilValueLoadable } from "recoil";
import CustomLoader from "@yper-script/react/app/widget/loader";
import ErrorChart from "@yper-script/react/app/screen/statistics/charts/error_chart";
import { ProRetailpointStats } from "@yper-script/react/data/entity/pro_retailpoint_stats.entity";
import StatsCard from "@yper-script/react/app/screen/statistics/stats/stats_card";

/** Images */
const icon = "/img/stats/total_delivery_icon.svg";

function TotalDeliveryStat(props: {
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
    <StatsCard icon={icon} alt="Total delivery logo">
      <Text
        textStyle={theme.textTheme.body.medium.copyWith({
          color: theme.color.primary["300"],
        })}
      >
        Total de livraisons
      </Text>
      <Text textStyle={theme.textTheme.title.large}>
        {stats.totalDeliveries}
      </Text>
      {stats.receiverCount != 0 && stats.totalDeliveries != 0 && (
        <Text textStyle={theme.textTheme.body.small}>
          Soit {(stats.totalDeliveries / stats.receiverCount).toFixed(0)}{" "}
          livraisons par client
        </Text>
      )}
    </StatsCard>
  );
}

export default TotalDeliveryStat;
