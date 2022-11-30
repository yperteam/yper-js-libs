import React from "react";
import styled from "styled-components";
import { SvgPicture } from "./mixins";

interface RoundIconStyledProps {
  background?: string;
  shadow?: string;
}

export function RoundedIcon(props: {
  iconLink: string;
  background?: string;
  iconColor?: string;
  shadow?: string;
  size?: string;
}) {
  return (
    <RoundIcon background={props.background} shadow={props.shadow}>
      <SvgPicture
        src={props.iconLink}
        color={props.iconColor}
        width={props.size || "24px"}
        height={props.size || "24px"}
      />
    </RoundIcon>
  );
}

const RoundIcon = styled.div<RoundIconStyledProps>`
  background-color: ${props =>
    props.background || props.theme.color.primary["100"]};
  border-radius: 50%;
  padding: 10px;
  box-shadow: ${props =>
    props.shadow ? `0 2px 10px 0 ${props.shadow}` : "initial"};
`;
