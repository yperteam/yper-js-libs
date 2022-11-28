import React from "react";
import { Column, Expanded, Row } from "@yper-script/react/app/widget/generic";
import styled from "styled-components";

function StatsCard(props: {
  children: React.ReactNode;
  icon: string;
  alt: string;
}) {
  return (
    <Stats alignItems={"center"} justifyContent="start">
      <StatImg src={props.icon} alt={props.alt} />
      <Expanded>
        <Column margin={{ left: "8px" }}>{props.children}</Column>
      </Expanded>
    </Stats>
  );
}

export default StatsCard;

/**  Styled Component */

const StatImg = styled.img`
  width: 32px;
`;

const Stats = styled(Row)`
  min-height: 96px;
  width: 100%;
  padding: 12px;
  background-color: ${props => props.theme.color.grayscale["000"]};
  box-shadow: 0 2px 20px rgba(54, 80, 108, 0.1);
  border-radius: 6px;
`;
