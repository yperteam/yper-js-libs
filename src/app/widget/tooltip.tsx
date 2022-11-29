import ReactTooltip, { Place } from "react-tooltip";
import React from "react";
import styled from "styled-components";
import { Icon, Text } from "./mixins";
import { TextStyleClass } from "./theme";

const CustomTooltip = styled.div`
  .__react_component_tooltip {
    padding: 8px;
    max-width: 200px;
    text-align: center;
  }
  cursor: help;
`;

interface TooltipInterface {
  id: string;
  content: string;
  icon?: string;
  image?: string;
  textContentStyle?: TextStyleClass;
  place?: Place;
  text?: string;
  textStyle?: TextStyleClass;
  custom?: boolean;
}

function CustomTooltipIcon(data: TooltipInterface) {
  return (
    <CustomTooltip>
      {data.icon && (
        <Icon data-tip data-for={data.id} className={"material-icons"}>
          {data.icon}
        </Icon>
      )}
      {data.image &&
        (data.custom ? (
          <DelivererIcon
            data-tip
            data-for={data.id}
            src={data.image}
            alt={data.image}
          />
        ) : (
          <Img data-tip data-for={data.id} src={data.image} alt={data.image} />
        ))}
      {data.text && (
        <Text data-tip data-for={data.id} textStyle={data.textStyle}>
          {data.text}
        </Text>
      )}
      <ReactTooltip id={data.id} place={data.place} offset={{ top: 0 }}>
        <Text textStyle={data.textContentStyle}>{data.content}</Text>
      </ReactTooltip>
    </CustomTooltip>
  );
}

const StyledTooltip = styled(ReactTooltip) <{ maxWidth?: string }>`
  padding: 8px;
  max-width: ${props => props.maxWidth ?? "200px"};
  text-align: center;
`;

export const Tooltip = ({ ...props }) => (
  <StyledTooltip effect="solid" multiline {...props} />
);

export default CustomTooltipIcon;

/** StyledComponent */
const Img = styled.img<any>`
  cursor: pointer;
`;

const DelivererIcon = styled.img<any>`
  position: absolute;
  bottom: 3px;
  right: 3px;
`;
