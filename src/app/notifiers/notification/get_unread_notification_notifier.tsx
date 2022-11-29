import { GetUnreadRetailpointNotification } from "../../../domain/usecase/notification/get_unread_retailpoint_notification";
import { interval } from "rxjs";
import { StreamNotifier } from "../stream_notifier";

export class GetUnreadNotificationNotifier {
  static provider = StreamNotifier.provider<number>({
    key: "unread-notification-number-provider",
    stream: new GetUnreadRetailpointNotification()(),
    interval: interval(60000),
  });
}
