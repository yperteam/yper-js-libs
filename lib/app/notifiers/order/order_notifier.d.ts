import { Loadable } from "recoil";
import { Order } from "../../../data/entity/order.entity";
export declare class OrderNotifier {
    static provider: (param: string) => import("recoil").RecoilState<Loadable<Order>>;
}
