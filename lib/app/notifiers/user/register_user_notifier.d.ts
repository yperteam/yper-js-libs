import { CallbackInterface, Loadable } from "recoil";
import { RegisterUserProps } from "../../../data/repository/user.repository";
export declare class RegisterUserNotifier {
    static provider: import("recoil").RecoilState<Loadable<void>>;
    static notifier: (props: RegisterUserProps, callback: CallbackInterface) => Promise<void>;
}
