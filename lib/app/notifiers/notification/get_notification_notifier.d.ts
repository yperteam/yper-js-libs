import { NotificationResponse, Notification } from "../../../data/entity/notification.entity";
import { CallbackInterface } from "recoil";
export declare class GetNotificationNotifier {
    static LIMIT: number;
    static LOADED_NUMBER: number;
    static SKIP: number;
    static streamProvider: import("recoil").RecoilState<import("recoil").Loadable<NotificationResponse>>;
    static provider: import("recoil").RecoilValueReadOnly<Notification[]>;
    static totalItemProvider: import("recoil").RecoilValueReadOnly<number>;
    static loadMoreNotifier: (callback: CallbackInterface) => Promise<void>;
    static reloadNotifier: (callback: CallbackInterface) => Promise<void>;
}
