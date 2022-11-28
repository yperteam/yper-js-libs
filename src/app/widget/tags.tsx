import React from "react";
import styled, { useTheme } from "styled-components";
import { Row, Spacing } from "./generic";
import { Text } from "@yper-script/react/app/widget/mixins";

export function PrimaryTag(props: { children: React.ReactChild }) {
  const theme = useTheme();
  return (
    <Row alignItems="center">
      <GreenDot margin={{ right: "10px" }} />
      <Text
        textStyle={theme.textTheme.body.small.copyWith({
          color: theme.color.grayscale["500"],
        })}
      >
        {props.children}
      </Text>
    </Row>
  );
}

// TODO: Create widget
const GreenDot = styled(Spacing)`
  background-color: ${props => props.theme.color.success["400"]};
  border-radius: 50%;
  width: 10px;
  height: 10px;
`;
