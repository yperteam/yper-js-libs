import React from "react";
import styled, { css, useTheme } from "styled-components";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  Col,
  Column,
  Expanded,
  Row,
} from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";
import { StatsRangeNotifier } from "@yper-script/react/app/notifiers/stats_range_notifier";
import CartPriceChart from "@yper-script/react/app/screen/statistics/retailpointStats/charts/cart_price_chart";
import { RetailpointCartPriceNotifier } from "@yper-script/react/app/notifiers/retailpoint_cart_price_notifier";
import ErrorChart from "@yper-script/react/app/screen/statistics/charts/error_chart";
import moment from "moment";

function CartPriceChartContainer() {
  const theme = useTheme();

  /** Recoil */
  const period = useRecoilState(StatsRangeNotifier.provider);
  const currentLoadable = useRecoilValueLoadable(
    RetailpointCartPriceNotifier.currentProvider
  );

  if (currentLoadable.state == "hasError") {
    return <ErrorChart />;
  }

  let start = moment(period[0].begin);
  let end = moment(period[0].end);

  return (
    <>
      <ChartContainer>
        <Column width={"100%"}>
          <ChartHeader>
            <Row>
              <Text textStyle={theme.textTheme.title.medium}>Panier Moyen</Text>
              <Expanded>
                <Row>
                  <Row alignItems={"center"}>
                    <Dot color={theme.color.information["400"]} />
                    <Text textStyle={theme.textTheme.body.small}>
                      {start.format("DD-MM-YYYY")} au {end.format("DD-MM-YYYY")}
                    </Text>
                  </Row>
                  <Row margin={{ left: "2.5rem" }} alignItems={"center"}>
                    <Dot color={theme.color.primary["400"]} />
                    <Text textStyle={theme.textTheme.body.small}>n-1</Text>
                  </Row>
                </Row>
              </Expanded>
              {/*<PeriodContainer>*/}
              {/*    <Row direction={"row"} alignItems={"center"} height={"100%"}>*/}
              {/*        <Col>*/}
              {/*            <Period onClick={() => setInterval(StatsIntervalEnum.day)} active={interval === StatsIntervalEnum.day}>*/}
              {/*                <Text textStyle={theme.textTheme.body.small}>Jour</Text>*/}
              {/*            </Period>*/}
              {/*        </Col>*/}
              {/*        <Col>*/}
              {/*            <Period onClick={() => setInterval(StatsIntervalEnum.week)} active={interval === StatsIntervalEnum.week}>*/}
              {/*                <Text textStyle={theme.textTheme.body.small}>Semaine</Text>*/}
              {/*            </Period>*/}
              {/*        </Col>*/}
              {/*        <Col>*/}
              {/*            <Period onClick={() => setInterval(StatsIntervalEnum.month)} active={interval === StatsIntervalEnum.month}>*/}
              {/*                <Text textStyle={theme.textTheme.body.small}>Mois</Text>*/}
              {/*            </Period>*/}
              {/*        </Col>*/}
              {/*        <Col>*/}
              {/*            <Period onClick={() => setInterval(StatsIntervalEnum.year)} active={interval === StatsIntervalEnum.year}>*/}
              {/*                <Text textStyle={theme.textTheme.body.small}>Année</Text>*/}
              {/*            </Period>*/}
              {/*        </Col>*/}
              {/*    </Row>*/}
              {/*</PeriodContainer>*/}
            </Row>
          </ChartHeader>
          <CartPriceChart />
        </Column>
      </ChartContainer>
    </>
  );
}

export default CartPriceChartContainer;

/** Styled Component */
const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  max-height: 1000px;
  display: flex;
  padding: 12px;
  background-color: ${props => props.theme.color.grayscale["000"]};
  box-shadow: 0 2px 20px rgba(54, 80, 108, 0.1);
  border-radius: 6px;
`;

const ChartHeader = styled.div`
  height: 32px;
`;

const Dot = styled.div<any>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 5px;
`;

const PeriodContainer = styled.div`
  background-color: ${props => props.theme.color.primary["100"]};
  border-radius: 345px;
  padding: 4px;
`;

const Period = styled.button<any>`
  background-color: ${props => props.theme.color.primary["100"]};
  border-radius: 15px;
  padding: 4px 8px;
  border: none;
  p {
    color: ${props => props.theme.color.primary["300"]};
  }

  ${props =>
    props.active &&
    css`
      background-color: ${props => props.theme.color.grayscale["000"]};
      box-shadow: 0 0 9px rgba(54, 80, 108, 0.1);
    `}
`;
