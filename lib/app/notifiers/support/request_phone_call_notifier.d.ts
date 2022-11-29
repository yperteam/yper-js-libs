import { CallbackInterface, Loadable } from "recoil";
import { PhoneCallRequest } from "../../../data/entity/phone_call_request.entity";
export declare class RequestPhoneCallNotifier {
    static provider: import("recoil").RecoilState<Loadable<PhoneCallRequest>>;
    static notifier: (reasonId: string, phoneNumber: string, callback: CallbackInterface, comment?: string) => Promise<void>;
}
