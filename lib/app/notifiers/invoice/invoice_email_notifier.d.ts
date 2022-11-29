import { CallbackInterface, Loadable } from "recoil";
export declare class InvoiceEmailNotifier {
    static provider: import("recoil").RecoilState<Loadable<void>>;
    static dialogProvider: import("recoil").RecoilState<boolean>;
    static notifier: (email: string, ids: string[], callback: CallbackInterface) => Promise<void>;
}
