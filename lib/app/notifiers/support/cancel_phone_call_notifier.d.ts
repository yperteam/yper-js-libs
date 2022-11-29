import { CallbackInterface, Loadable } from "recoil";
export declare class CancelPhoneCallNotifier {
    static provider: import("recoil").RecoilState<Loadable<void>>;
    static notifier: (callId: string, callback: CallbackInterface) => Promise<void>;
}
