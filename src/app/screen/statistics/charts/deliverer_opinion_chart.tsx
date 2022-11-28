import React from "react";
import { Doughnut } from "react-chartjs-2";
import styled, { useTheme } from "styled-components";
import { RecoilValueReadOnly, useRecoilValueLoadable } from "recoil";
import CustomLoader from "@yper-script/react/app/widget/loader";
import { Text } from "@yper-script/react/app/widget/mixins";
import { Col, Column, Row } from "@yper-script/react/app/widget/generic";
import {
  getDoughnutColor,
  insideTextCounter,
} from "@yper-script/react/app/screen/statistics/retailpointStats/charts/chart_config";
import ErrorChart from "@yper-script/react/app/screen/statistics/charts/error_chart";
import CustomTooltipIcon from "@yper-script/react/app/widget/tooltip";
import { ProRetailpointStats } from "@yper-script/react/data/entity/pro_retailpoint_stats.entity";
import { formatDecimal } from "@yper-script/react/app/helpers/generic_helper";

/** Images */
export const infoIcon = "/img/stats/information_icon.svg";

function DelivererOpinionChart(props: {
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
      <Row justifyContent={"space-between"}>
        <Col size={4}>
          <Text
            textStyle={theme.textTheme.title.medium.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            Note des shoppers
          </Text>
        </Col>
        <Col size={1} justifyContent={"flex-end"}>
          <CustomTooltipIcon
            id="retailpoint_opinion_chart-help"
            content="Note moyenne que les shoppers Yper ont reçu de la part des clients livrés durant cette période"
            image={infoIcon}
            textContentStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.grayscale["000"],
            })}
            place="bottom"
          />
        </Col>
      </Row>
      <ContentDelivererOpinionChart loadableState={loadable} />
    </Graph>
  );
}

export default DelivererOpinionChart;

//Todo: Use good interface with loadableState
function ContentDelivererOpinionChart(loadableState: any) {
  const theme = useTheme();

  if (loadableState.loadableState.state == "loading") {
    return <CustomLoader />;
  }

  let stats = loadableState.loadableState.contents;

  /** Chart Configuration */
  const data = {
    datasets: [
      {
        label: formatDecimal(stats.delivererOpinionAverage) + "/5",
        data: [
          formatDecimal(stats.delivererOpinionAverage),
          formatDecimal(5 - stats.delivererOpinionAverage),
        ],
        backgroundColor: getDoughnutColor(
          stats.delivererOpinionAverage,
          [4, 3, 2],
          theme
        ),
        borderWidth: 0,
        cutout: "80%",
        color: theme.color.primary["400"],
        font: "Roboto, sans-serif",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: Math.PI * 80,
    circumference: 70 * Math.PI,
    hover: {
      mode: null,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <Column>
      <Col>
        <DoughnutContainer>
          <Doughnut
            data={data}
            options={options}
            plugins={[insideTextCounter]}
          />
        </DoughnutContainer>
      </Col>
      <Col justifyContent={"center"}>
        <Text textStyle={theme.textTheme.body.small}>
          noté par {stats.delivererOpinionCount} clients
        </Text>
      </Col>
    </Column>
  );
}

/** Styled Component */
const DoughnutContainer = styled.div`
  width: 120px;
  height: 110px;
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
