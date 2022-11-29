import { CallbackInterface, Loadable } from "recoil";
export declare class PasswordLoginNotifier {
    static provider: import("recoil").RecoilState<Loadable<string>>;
    static notifier: (username: string, password: string, callback: CallbackInterface) => Promise<void>;
}
