import { Loadable, SetterOrUpdater } from "recoil";
import { Order } from "../../../data/entity/order.entity";
export declare class InvoiceOrderNotifier {
    static provider: import("recoil").RecoilState<Loadable<Order>>;
    static notifier: (ids: string[], set: SetterOrUpdater<any>) => Promise<void>;
}
