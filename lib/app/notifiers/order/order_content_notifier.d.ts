import { CallbackInterface, Loadable } from "recoil";
export declare class OrderContentNotifier {
    static provider: (param: string) => import("recoil").RecoilState<Loadable<void>>;
    static notifier: (orderId: string, prebookId: string, product: string, options: string[], itemsNb: number, price: number, callback: CallbackInterface) => Promise<void>;
}
