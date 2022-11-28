import { GetRetailpointNotification } from "@yper-script/react/domain/usecase/notification/get_retailpoint_notification";
import { ReadAllRetailpointNotifications } from "@yper-script/react/domain/usecase/notification/read_all_retailpoint_notifications";
import { atom, CallbackInterface, Loadable, RecoilLoadable } from "recoil";
import { firstValueFrom } from "rxjs";
import { CustomLoadable } from "../custom_loadable";
import { GetNotificationNotifier } from "./get_notification_notifier";
import { GetUnreadNotificationNotifier } from "./get_unread_notification_notifier";

export class ReadAllNotificationNotifier {
  static provider = atom<Loadable<void>>({
    key: "read-all-notifications-provider",
    default: null,
  });

  static notifier = async (callback: CallbackInterface) => {
    callback.set(ReadAllNotificationNotifier.provider, RecoilLoadable.loading);
    callback.set(
      ReadAllNotificationNotifier.provider,
      await CustomLoadable.guard(async () => {
        await new ReadAllRetailpointNotifications().call();
        callback.set(
          GetUnreadNotificationNotifier.provider,
          RecoilLoadable.of(0)
        );
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
