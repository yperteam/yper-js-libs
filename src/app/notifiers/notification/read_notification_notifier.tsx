import { GetRetailpointNotification } from "../../../domain/usecase/notification/get_retailpoint_notification";
import { ReadNotification } from "../../../domain/usecase/notification/read_notification";
import { atom, CallbackInterface, Loadable, RecoilLoadable } from "recoil";
import { firstValueFrom } from "rxjs";
import { CustomLoadable } from "../custom_loadable";
import { GetNotificationNotifier } from "./get_notification_notifier";
import { GetUnreadNotificationNotifier } from "./get_unread_notification_notifier";

export class ReadNotificationNotifier {
  static provider = atom<Loadable<void>>({
    key: "read-notification-provider",
    default: null,
  });

  static notifier = async (
    userId: string,
    notificationId: string,
    callback: CallbackInterface
  ) => {
    const currentNumber: number = callback.snapshot.getLoadable(
      GetUnreadNotificationNotifier.provider
    ).contents;
    callback.set(ReadNotificationNotifier.provider, RecoilLoadable.loading);
    callback.set(
      ReadNotificationNotifier.provider,
      await CustomLoadable.guard(async () => {
        callback.set(
          GetUnreadNotificationNotifier.provider,
          RecoilLoadable.of(currentNumber - 1)
        );
        await new ReadNotification().call(userId, notificationId);
        callback.set(
          GetNotificationNotifier.streamProvider,
          await CustomLoadable.guard(async () => {
            return await firstValueFrom(
              new GetRetailpointNotification().call(
                0,
                GetNotificationNotifier.LOADED_NUMBER
              )
            );
          })
        );
      })
    );
  };
}
