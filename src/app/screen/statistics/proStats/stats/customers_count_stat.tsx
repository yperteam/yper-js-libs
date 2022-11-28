import React from "react";
import { Col, Column, Row } from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";
import styled, { useTheme } from "styled-components";
import { RecoilValueReadOnly, useRecoilValueLoadable } from "recoil";
import CustomLoader from "@yper-script/react/app/widget/loader";
import ErrorChart from "@yper-script/react/app/screen/statistics/charts/error_chart";
import StatsCard from "@yper-script/react/app/screen/statistics/stats/stats_card";

/** Images */
const icon = "/img/stats/customers_icon.svg";

function CustomerCountStat(props: { provider: RecoilValueReadOnly<any> }) {
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
        Nombre de clients
      </Text>
      <Text textStyle={theme.textTheme.title.large}>{stats.receiverCount}</Text>
    </StatsCard>
  );
}

export default CustomerCountStat;
