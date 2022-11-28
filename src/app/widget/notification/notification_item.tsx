import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Column, Row } from "../generic";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import {
  Notification,
  subTypesEnum,
} from "@yper-script/react/data/entity/notification.entity";
import moment from "moment";
import { useRecoilCallback } from "recoil";
import { ReadNotificationNotifier } from "../../notifiers/notification/read_notification_notifier";
const alertIcon = "/img/react/icon/ic_alert_circle_full.svg";

export default function NotificationItem(props: {
  notificationInfo: Notification;
  isAllRead: boolean;
}) {
  const theme = useTheme();
  const formatedSentAt = moment(
    moment(props.notificationInfo.sentAt)
      .utc(true)
      .format()
  ).calendar({ sameDay: "[Aujourd'hui à] LT", sameElse: "DD/MM/YYYY [à] LT" });

  const readNotificationNotifier = useRecoilCallback(
    callback => async () => {
      return ReadNotificationNotifier.notifier(
        props.notificationInfo.recipient.userId,
        props.notificationInfo.id,
        callback
      );
    },
    []
  );

  const onClickNotification = () => {
    document.location.href = `/deliveries/${props.notificationInfo.about.id}`;
    !props.notificationInfo.read && readNotificationNotifier();
  };

  return (
    <Wrapper
      onClick={onClickNotification}
      padding={{ top: "8px", bottom: "8px", left: "18px", right: "18px" }}
    >
      <div>
        <SvgPicture
          src={alertIcon}
          color={
            props.notificationInfo.subType === subTypesEnum["deliveryCanceled"]
              ? theme.color.warning["400"]
              : theme.color.error["400"]
          }
        />
      </div>
      <Column padding={{ left: "16px", right: "16px" }}>
        <Text
          textStyle={theme.textTheme.title.small.copyWith({
            color: props.notificationInfo.read
              ? theme.color.primary[400]
              : theme.color.primary[700],
          })}
          margin={{ bottom: "6px" }}
        >
          {props.notificationInfo.title}
        </Text>
        <Text
          textStyle={theme.textTheme.body.medium.copyWith({
            color: props.notificationInfo.read
              ? theme.color.primary[400]
              : theme.color.primary[700],
          })}
          margin={{ bottom: "4px" }}
          dangerouslySetInnerHTML={{ __html: props.notificationInfo.message }}
        />
        <Text
          textStyle={theme.textTheme.body.medium.copyWith({
            color: theme.color.primary["200"],
          })}
        >
          {formatedSentAt}
        </Text>
      </Column>
      {!props.notificationInfo.read && <UnreadMarker />}
    </Wrapper>
  );
}

const Wrapper = styled(Row)`
  cursor: pointer;
  position: relative;
  width: 100%;
  &:hover {
    background-color: rgba(54, 80, 108, 0.05);
  }
`;

// TODO: Create widget
const UnreadMarker = styled.div`
  background-color: ${props => props.theme.color.warning["400"]};
  border-radius: 50%;
  width: 8px;
  height: 8px;
  position: absolute;
  right: 10px;
`;
