import { Loadable, CallbackInterface } from "recoil";
export declare class PrimaryPaymentMethodNotifier {
    static provider: (param: string) => import("recoil").RecoilState<Loadable<void>>;
    static notifier: (methodId: string, callback: CallbackInterface) => Promise<void>;
}
