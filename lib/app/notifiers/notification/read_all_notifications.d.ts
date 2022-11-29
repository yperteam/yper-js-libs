import { CallbackInterface, Loadable } from "recoil";
export declare class ReadAllNotificationNotifier {
    static provider: import("recoil").RecoilState<Loadable<void>>;
    static notifier: (callback: CallbackInterface) => Promise<void>;
}
