import React from "react";
import styled, { css, useTheme } from "styled-components";
import { Col, Column } from "@yper-script/react/app/widget/generic";
import { Text } from "@yper-script/react/app/widget/mixins";

/** Images */
const icon = "/img/stats/chart_error.svg";

function ErrorChart(props?) {
  const theme = useTheme();

  return (
    <ChartError minHeight={props.minHeight}>
      <Column height={"100%"} alignItems={"center"} justifyContent={"center"}>
        <Col alignItems={"end"}>
          <Img src={icon} alt="Cart price average logo" />
        </Col>
        <Col className={"mt-3"} alignItems={"center"} justifyContent={"center"}>
          <CustomText
            textStyle={theme.textTheme.body.medium.copyWith({
              color: theme.color.primary["500"],
            })}
          >
            Suite à une erreur, nous ne pouvons pas afficher ces données.
          </CustomText>
        </Col>
      </Column>
    </ChartError>
  );
}

export default ErrorChart;

/** Styled Component */
const Img = styled.img`
  height: 21px;
  width: 21px;
`;

const CustomText = styled(Text)`
  text-align: center;
`;

const ChartError = styled.div<any>`
  background-color: ${props => props.theme.color.primary["200"]};
  min-height: 200px;
  width: 100%;
  box-shadow: 0 2px 20px rgba(54, 80, 108, 0.1);
  border-radius: 6px;
  padding: 12px;

  ${props =>
    props.minHeight &&
    css`
      min-height: ${props.minHeight};
    `}
`;
