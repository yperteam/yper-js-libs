import React from "react";
import { Doughnut } from "react-chartjs-2";
import styled, { css, useTheme } from "styled-components";
import { useRecoilValueLoadable } from "recoil";
import CustomLoader from "@yper-script/react/app/widget/loader";
import { ProRetailpointStatCatchmentAreasNotifier } from "@yper-script/react/app/notifiers/retailpoint_catchment_area_notifier";
import { Text } from "@yper-script/react/app/widget/mixins";
import ErrorChart from "@yper-script/react/app/screen/statistics/charts/error_chart";
import { Col, Row } from "@yper-script/react/app/widget/generic";
import CustomTooltipIcon from "@yper-script/react/app/widget/tooltip";

/** Images */
export const infoIcon = "/img/stats/information_icon.svg";

function CatchmentAreaChart() {
  const theme = useTheme();

  /** Recoil */
  const loadable = useRecoilValueLoadable(
    ProRetailpointStatCatchmentAreasNotifier.provider
  );

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
            Zone de chalandise
          </Text>
        </Col>
        <Col size={1} justifyContent={"flex-end"}>
          <CustomTooltipIcon
            id="catchment_area_chart-help"
            content="C'est la répartition de vos livraisons en fonction de la distance depuis votre magasin durant cette période"
            image={infoIcon}
            textContentStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.grayscale["000"],
            })}
            place="bottom"
          />
        </Col>
      </Row>
      <Col className={"mt-2"}>
        <ContentCatchmentAreaChart loadableState={loadable} />
      </Col>
    </Graph>
  );
}

export default CatchmentAreaChart;

// Todo : Use good interface with loadableState
function ContentCatchmentAreaChart(loadableState: any) {
  /** Datas */
  const theme = useTheme();

  if (loadableState.loadableState.state == "loading") {
    return <CustomLoader />;
  }

  const stats = loadableState.loadableState.contents;

  /** Chart Values */
  const sum = stats.reduce((a, b) => {
    return a + b;
  }, 0);
  let values =
    stats.length > 0
      ? [stats[0] + stats[1], stats[2], stats[3], stats[4]]
      : [1];

  /** Function */
  function getColor() {
    if (stats.length > 0) {
      return [
        theme.color.information["100"],
        theme.color.information["400"],
        theme.color.information["700"],
        theme.color.primary["600"],
      ];
    }

    return [theme.color.grayscale["200"]];
  }

  /** Chart configuration */
  const data = {
    datasets: [
      {
        labels: ["0-5 km", "5-10 km", "10-15 km", "+15 km"],
        data: values,
        backgroundColor: getColor(),
        borderWidth: 0,
        cutout: "70%",
        color: theme.color.primary["400"],
        font: "Roboto, sans-serif",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
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
    <DoughnutContainer>
      <Doughnut data={data} options={options} />
      <LabelContainer
        top={"0"}
        right={"0"}
        color={theme.color.information["100"]}
      >
        <Label>
          <Text
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            {data.datasets[0].labels[0]}
          </Text>
          <Text
            textStyle={theme.textTheme.body.medium.copyWith({
              color: theme.color.primary["500"],
            })}
          >
            {stats.length > 0
              ? Math.round((data.datasets[0].data[0] / sum) * 100) + "%"
              : 0}
          </Text>
        </Label>
      </LabelContainer>
      <LabelContainer
        bottom={"0"}
        right={"0"}
        color={theme.color.information["400"]}
      >
        <Label>
          <Text
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            {data.datasets[0].labels[1]}
          </Text>
          <Text
            textStyle={theme.textTheme.body.medium.copyWith({
              color: theme.color.primary["500"],
            })}
          >
            {stats.length > 0
              ? Math.round((data.datasets[0].data[1] / sum) * 100) + "%"
              : 0}
          </Text>
        </Label>
      </LabelContainer>
      <LabelContainer
        bottom={"0"}
        left={"0"}
        color={theme.color.information["700"]}
      >
        <Label>
          <Text
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            {data.datasets[0].labels[2]}
          </Text>
          <Text
            textStyle={theme.textTheme.body.medium.copyWith({
              color: theme.color.primary["500"],
            })}
          >
            {stats.length > 0
              ? Math.round((data.datasets[0].data[2] / sum) * 100) + "%"
              : 0}
          </Text>
        </Label>
      </LabelContainer>
      <LabelContainer top={"0"} left={"0"} color={theme.color.primary["600"]}>
        <Label>
          <Text
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            {data.datasets[0].labels[3]}
          </Text>
          <Text
            textStyle={theme.textTheme.body.medium.copyWith({
              color: theme.color.primary["500"],
            })}
          >
            {stats.length > 0
              ? Math.round((data.datasets[0].data[3] / sum) * 100) + "%"
              : 0}
          </Text>
        </Label>
      </LabelContainer>
    </DoughnutContainer>
  );
}

/** Styled Component */
const DoughnutContainer = styled.div`
  width: 100%;
  height: 120px;
  position: relative;
`;

const LabelContainer = styled.div<any>`
  position: absolute;
  border: 1px solid ${props => props.theme.color.grayscale["000"]};
  border-radius: 5px;
  box-shadow: 0 2px 20px rgba(54, 80, 108, 0.1);
  top: ${props => (props.top ? props.top : "auto")};
  right: ${props => (props.right ? props.right : "auto")};
  bottom: ${props => (props.bottom ? props.bottom : "auto")};
  left: ${props => (props.left ? props.left : "auto")};
  ${props =>
    props.right &&
    css`
      border-right: 5px solid
        ${(props: any) =>
          props.color ? props.color : props.theme.color.transparent};
    `}
  ${props =>
    props.left &&
    css`
      border-left: 5px solid
        ${(props: any) =>
          props.color ? props.color : props.theme.color.transparent};
    `}
`;

const Label = styled.div`
  height: 40px;
  width: 60px;
  background-color: ${props => props.theme.color.grayscale["000"]};
  text-align: center;
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
