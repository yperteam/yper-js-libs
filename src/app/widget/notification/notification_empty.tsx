import React from "react";
import styled, { useTheme } from "styled-components";
import { Column, Row } from "../generic";
import { SvgPicture, Text } from "../mixins";
const mailboxIcon = "/img/react/icon/ic_mailbox_in.svg";

export function NotificationEmpty() {
  const theme = useTheme();

  return (
    <Column alignItems="center">
      <IconBackground
        alignItems="center"
        width="118px"
        height="118px"
        margin={{ bottom: "24px" }}
      >
        <SvgPicture src={mailboxIcon} />
      </IconBackground>
      <Text
        textStyle={theme.textTheme.body.large.copyWith({
          color: theme.color.primary["300"],
        })}
      >
        Aucune notification à lire
      </Text>
    </Column>
  );
}

const IconBackground = styled(Row)`
  border-radius: 50%;
  background-color: ${props => props.theme.color.primary["100"]};
`;
