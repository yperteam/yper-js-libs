import { CallbackInterface, Loadable } from "recoil";
export declare class OrderPaymentNotifier {
    static provider: (param: string) => import("recoil").RecoilState<Loadable<void>>;
    static notifier: (orderId: string, callback: CallbackInterface, paymentId?: string) => Promise<void>;
}
