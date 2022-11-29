import { Loadable, SetterOrUpdater } from "recoil";
export declare class InvoiceDownloadNotifier {
    static provider: (param: string) => import("recoil").RecoilState<Loadable<Object>>;
    static multipleProvider: import("recoil").RecoilState<Loadable<Object>>;
    static multipleNotifier: (ids: string[], set: SetterOrUpdater<any>) => Promise<void>;
    static notifier: (id: string, set: SetterOrUpdater<any>) => Promise<void>;
}
