import {
  NotificationResponse,
  Notification,
} from "@yper-script/react/data/entity/notification.entity";
import { GetRetailpointNotification } from "@yper-script/react/domain/usecase/notification/get_retailpoint_notification";
import { CallbackInterface, noWait, selector } from "recoil";
import { firstValueFrom } from "rxjs";

import { CustomLoadable } from "../custom_loadable";
import { StreamNotifier } from "../stream_notifier";

export class GetNotificationNotifier {
  static LIMIT = 10;
  static LOADED_NUMBER = this.LIMIT;
  static SKIP = 0;

  static streamProvider = StreamNotifier.provider<NotificationResponse>({
    key: "get-notification-stream-provider",
    stream: new GetRetailpointNotification().call(this.SKIP, this.LIMIT),
  });

  static provider = selector<Notification[]>({
    key: "get-notification-provider",
    get: ({ get }) =>
      get(noWait(this.streamProvider)).map(r => r.contents?.data ?? []),
  });

  static totalItemProvider = selector<number>({
    key: "total-page-notification-provider",
    get: ({ get }) =>
      get(noWait(this.streamProvider)).map(r => r.contents?.count.total ?? 0),
  });

  static loadMoreNotifier = async (callback: CallbackInterface) => {
    const prevNotifications: Notification[] = callback.snapshot.getLoadable(
      GetNotificationNotifier.provider
    ).contents;
    const totalItemValue: number = callback.snapshot.getLoadable(
      GetNotificationNotifier.totalItemProvider
    ).contents;
    GetNotificationNotifier.LOADED_NUMBER = prevNotifications.length;
    if (GetNotificationNotifier.LOADED_NUMBER <= totalItemValue) {
      callback.set(
        GetNotificationNotifier.streamProvider,
        await CustomLoadable.guard(async () => {
          const notificationResponse = await firstValueFrom(
            new GetRetailpointNotification().call(
              prevNotifications.length,
              GetNotificationNotifier.LIMIT
            )
          );
          if (prevNotifications === null) {
            return notificationResponse;
          }
          return {
            data: [...prevNotifications, ...notificationResponse.data],
            count: notificationResponse.count,
          };
        })
      );
    }
  };

  static reloadNotifier = async (callback: CallbackInterface) => {
    callback.set(
      GetNotificationNotifier.streamProvider,
      await CustomLoadable.guard(async () => {
        const notificationResponse = await firstValueFrom(
          new GetRetailpointNotification().call(
            0,
            GetNotificationNotifier.LIMIT
          )
        );
        return {
          data: notificationResponse.data,
          count: notificationResponse.count,
        };
      })
    );
  };
}
