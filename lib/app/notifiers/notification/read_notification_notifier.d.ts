import { CallbackInterface, Loadable } from "recoil";
export declare class ReadNotificationNotifier {
    static provider: import("recoil").RecoilState<Loadable<void>>;
    static notifier: (userId: string, notificationId: string, callback: CallbackInterface) => Promise<void>;
}
