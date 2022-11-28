import React, { Suspense, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { CardAction, CardFooter, CardHeader, MainCard } from "../card";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import { Column, Row } from "../generic";
import NotificationItem from "./notification_item";
import { ButtonSecondary } from "../button";
import {
  atom,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { GetNotificationNotifier } from "@yper-script/react/app/notifiers/notification/get_notification_notifier";
import { Notification } from "@yper-script/react/data/entity/notification.entity";
import { ReadAllNotificationNotifier } from "../../notifiers/notification/read_all_notifications";
import { GetUnreadNotificationNotifier } from "../../notifiers/notification/get_unread_notification_notifier";
import InfiniteScroll from "react-infinite-scroller";
import NotificationEmpty from "./notification_empty";
import CustomLoader from "@yper-script/react/app/widget/loader";
import { sideBarProvider } from "../app_bar";

const closeIcon = "/img/react/icon/close_icon.svg";

export default function NotificationCenter() {
  const theme = useTheme();
  const notifications = useRecoilValue(GetNotificationNotifier.provider);
  let setOpened = useSetRecoilState(sideBarProvider);
  const totalItemValue = useRecoilValue(
    GetNotificationNotifier.totalItemProvider
  );

  const readAllNotifications = useRecoilCallback(
    callback => async () => {
      return ReadAllNotificationNotifier.notifier(callback);
    },
    []
  );

  const unreadNotificationLoadable = useRecoilValue(
    GetUnreadNotificationNotifier.provider
  );

  const loadMoreNotifier = useRecoilCallback(callback => async () => {
    return GetNotificationNotifier.loadMoreNotifier(callback);
  });

  const isAllRead = unreadNotificationLoadable?.contents === 0;

  const onClickReadAllNotifications = () => {
    !isAllRead && readAllNotifications();
  };

  return (
    <NotifCard>
      <CardHeader>
        <Column>
          <Text textStyle={theme.textTheme.title.large}>Notifications</Text>
          {!isAllRead && (
            <Text textStyle={theme.textTheme.title.small}>
              {unreadNotificationLoadable?.state == "hasValue"
                ? `${unreadNotificationLoadable?.contents} non lue(s)`
                : ""}
            </Text>
          )}
        </Column>
        <Row alignItems="center" justifyContent="space-between" size="1">
          <CardAction onClick={() => setOpened(false)}>
            <SvgPicture src={closeIcon} />
          </CardAction>
        </Row>
      </CardHeader>
      <NotificationCardBody
        alignItems={notifications.length > 0 ? "normal" : "center"}
        justifyContent="center"
      >
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={loadMoreNotifier}
          hasMore={notifications.length === totalItemValue ? false : true}
          useWindow={false}
          loader={<CustomLoader />}
        >
          <NotificationList
            notificationList={notifications ?? []}
            isAllRead={isAllRead}
          />
        </InfiniteScroll>
      </NotificationCardBody>
      <CardFooter
        justifyContent="center"
        alignItems="center"
        padding={{ top: "8px", bottom: "8px" }}
      >
        {" "}
        <ReadAllButton
          isAllRead={isAllRead}
          onClick={onClickReadAllNotifications}
        >
          <Text
            textStyle={theme.textTheme.label.large.copyWith({
              color: isAllRead
                ? theme.color.primary[200]
                : theme.color.primary[400],
            })}
          >
            Tout marquer comme lu
          </Text>
        </ReadAllButton>
      </CardFooter>
    </NotifCard>
  );
}

function NotificationList(props: {
  notificationList: Notification[];
  isAllRead: boolean;
}) {
  const listSize = props.notificationList.length;

  return (
    <>
      {listSize > 0 ? (
        <ul>
          {props.notificationList.map(notification => (
            <li key={notification.id}>
              <NotificationItem
                notificationInfo={notification}
                isAllRead={props.isAllRead}
              />
            </li>
          ))}
        </ul>
      ) : (
        <NotificationEmpty />
      )}
    </>
  );
}

interface ReadAllButtonProps {
  isAllRead: Boolean;
}

const NotificationCardBody = styled(Row)`
  overflow-y: scroll;
  flex: auto;
`;

const ReadAllButton = styled(ButtonSecondary)<ReadAllButtonProps>`
  pointer-events: ${(props: ReadAllButtonProps) =>
    props.isAllRead ? "none" : "auto"};
`;

const NotifCard = styled(Column)`
  height: calc(100vh - 90px);
  flex-flow: column nowrap;
`;
