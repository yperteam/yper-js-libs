import { CallbackInterface, Loadable } from "recoil";
import { MissionClient } from "../../../data/entity/mission.entity";
export declare class OrderAddressNotifier {
    static provider: (param: string) => import("recoil").RecoilState<Loadable<void>>;
    static previewProvider: (param: string) => import("recoil").RecoilState<Loadable<void>>;
    static notifier: (receiver: MissionClient, sender: MissionClient, setFavoriteReceiver: boolean, setFavoriteSender: boolean, prebookId: string, orderId: string, callback: CallbackInterface) => Promise<void>;
    static previewNotifier: (receiver: MissionClient, sender: MissionClient, prebookId: string, orderId: string, callback: CallbackInterface) => Promise<void>;
}
