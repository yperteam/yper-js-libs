import React from "react";
import { Doughnut } from "react-chartjs-2";
import styled, { useTheme } from "styled-components";
import { RecoilValueReadOnly, useRecoilValueLoadable } from "recoil";
import CustomLoader from "@yper-script/react/app/widget/loader";
import {
  getDoughnutColor,
  insideTextCircle,
  options,
} from "@yper-script/react/app/screen/statistics/retailpointStats/charts/chart_config";
import { Col, Row } from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";
import CustomTooltipIcon from "@yper-script/react/app/widget/tooltip";
import ErrorChart from "@yper-script/react/app/screen/statistics/charts/error_chart";
import { ProRetailpointStats } from "@yper-script/react/data/entity/pro_retailpoint_stats.entity";

/** Images */
export const infoIcon = "/img/stats/information_icon.svg";

function SuccessRateChart(props: {
  provider: RecoilValueReadOnly<ProRetailpointStats>;
}) {
  const theme = useTheme();

  /** Recoil */
  const loadable = useRecoilValueLoadable(props.provider);

  if (loadable.state == "hasError") {
    return <ErrorChart />;
  }

  return (
    <Graph>
      <Row direction={"row"} justifyContent={"space-between"}>
        <Col size={4}>
          <Text
            textStyle={theme.textTheme.title.medium.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            Taux de succès
          </Text>
        </Col>
        <Col size={1} justifyContent={"flex-end"}>
          <CustomTooltipIcon
            id="success_rate_chart-help"
            content="C'est le pourcentage de livraisons arrivées à bon port durant cette période"
            image={infoIcon}
            textContentStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.grayscale["000"],
            })}
            place="bottom"
          />
        </Col>
      </Row>
      <Col className={"mt-2"}>
        <ContentSuccessChart loadableState={loadable} />
      </Col>
    </Graph>
  );
}

export default SuccessRateChart;

// Todo : Use good interface with loadableState
function ContentSuccessChart(loadableState: any) {
  /** Data */
  const theme = useTheme();

  if (loadableState.loadableState.state == "loading") {
    return <CustomLoader />;
  }

  let stats = loadableState.loadableState.contents;
  // TODO: this should be in a usecase or notifier
  let doneDeliveries =
    stats.totalDoneDeliveries + stats.totalCanceledWithDelivererDeliveries;
  let sum =
    stats.totalDoneDeliveries > 0
      ? (doneDeliveries / stats.totalDeliveries) * 100
      : 0;
  let values = stats.totalDoneDeliveries
    ? [doneDeliveries, stats.totalDeliveries - doneDeliveries]
    : [0, 1];

  /** Chart Config */
  const data = {
    datasets: [
      {
        label: sum.toFixed(2) + "%",
        data: values,
        backgroundColor: getDoughnutColor(sum, [75, 50, 25], theme),
        borderWidth: 0,
        cutout: "80%",
        color: theme.color.primary["400"],
        font: "Roboto, sans-serif",
      },
    ],
  };

  return (
    <DoughnutContainer>
      <Doughnut data={data} options={options} plugins={[insideTextCircle]} />
    </DoughnutContainer>
  );
}

/** Styled Component */
const DoughnutContainer = styled.div`
  width: 100%;
  height: 120px;
`;

const Graph = styled.div`
  min-height: 200px;
  height: 100%;
  max-width: 265px;
  width: 100%;
  padding: 12px;
  background-color: ${props => props.theme.color.grayscale["000"]};
  box-shadow: 0 2px 20px rgba(54, 80, 108, 0.1);
  border-radius: 6px;
`;
