import { Loadable, CallbackInterface } from "recoil";
export declare class DeletePaymentMethodNotifier {
    static provider: (param: string) => import("recoil").RecoilState<Loadable<void>>;
    static notifier: (methodId: string, callback: CallbackInterface) => Promise<void>;
}
