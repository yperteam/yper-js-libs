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

function RetailPointOpinionChart(props: {
  provider: RecoilValueReadOnly<ProRetailpointStats>;
  isProDash: boolean;
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
            {props.isProDash ? "Note des magasins" : "Note du magasin"}
          </Text>
        </Col>
        <Col size={1} justifyContent={"flex-end"}>
          <CustomTooltipIcon
            id="deliverer_opinion_chart-help"
            content={
              props.isProDash
                ? "Note moyenne que vos magasins ont reçus de la part des shoppers durant cette période"
                : "Note moyenne que votre magasin a reçu de la part des shoppers durant cette période"
            }
            image={infoIcon}
            textContentStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.grayscale["000"],
            })}
            place="bottom"
          />
        </Col>
      </Row>
      <ContentRetailPointOpinionChart loadableState={loadable} />
    </Graph>
  );
}

export default RetailPointOpinionChart;

// Todo : Use good interface with loadableState
function ContentRetailPointOpinionChart(loadableState: any) {
  const theme = useTheme();

  if (loadableState.loadableState.state == "loading") {
    return <CustomLoader />;
  }

  let stats = loadableState.loadableState.contents;

  /** Chart Configuration */
  const data = {
    datasets: [
      {
        label: formatDecimal(stats.retailpointOpinionAverage) + "/5",
        data: [
          formatDecimal(stats.retailpointOpinionAverage),
          formatDecimal(5 - stats.retailpointOpinionAverage),
        ],
        backgroundColor: getDoughnutColor(
          stats.retailpointOpinionAverage,
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
          noté par {stats.retailpointOpinionCount} Shoppers
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
