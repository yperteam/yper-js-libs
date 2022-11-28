import React from "react";
import styled, { useTheme } from "styled-components";
import { Text } from "@yper-script/react/app/widget/mixins";
import { Col, Column, Row } from "@yper-script/react/app/widget/generic";
import CustomTooltipIcon from "@yper-script/react/app/widget/tooltip";

/** Images */
const nps = "/img/react/dashboard/nps.svg";
export const infoIcon = "/img/stats/information_icon.svg";

function NpsChart() {
  const theme = useTheme();

  return (
    <Graph>
      <Row justifyContent={"space-between"}>
        <Col size={4}>
          <Text
            textStyle={theme.textTheme.title.medium.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            NPS Yper
          </Text>
        </Col>
        <Col size={1} justifyContent={"flex-end"}>
          <CustomTooltipIcon
            id="nps-help"
            content="Net Promoter Score (indicateur de recommandation)"
            image={infoIcon}
            textContentStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.grayscale["000"],
            })}
            place="bottom"
          />
        </Col>
      </Row>
      <ContentDelivererOpinionChart />
    </Graph>
  );
}

export default NpsChart;

function ContentDelivererOpinionChart() {
  const theme = useTheme();

  return (
    <Column justifyContent={"center"}>
      <Col>
        <NpsContainer>
          <Text textStyle={theme.textTheme.title.large} className={"m-auto"}>
            80
          </Text>
        </NpsContainer>
      </Col>
      <Col>
        <img src={nps} alt={"yper_nps_stat"} />
      </Col>
    </Column>
  );
}

/** Styled Component */
const NpsContainer = styled.div`
  width: 64px;
  height: 64px;
  background-color: ${props => props.theme.color.primary["100"]};
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
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
