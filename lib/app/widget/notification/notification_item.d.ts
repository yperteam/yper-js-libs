/// <reference types="react" />
import { Notification } from "../../../data/entity/notification.entity";
export default function NotificationItem(props: {
    notificationInfo: Notification;
    isAllRead: boolean;
}): JSX.Element;
