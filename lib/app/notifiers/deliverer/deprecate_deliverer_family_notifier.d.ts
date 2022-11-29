import { CallbackInterface } from "recoil";
export declare class DeprecateDelivererNotifier {
    static provider: (param: any) => import("recoil").RecoilState<any>;
    static notifier: (deliverer: any, callback: CallbackInterface) => Promise<void>;
}
