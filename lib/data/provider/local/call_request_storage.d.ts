import { PhoneCallRequest } from "../../entity/phone_call_request.entity";
import { ObservableStorage } from "./observable_storage";
export declare class CallRequestStorage extends ObservableStorage<PhoneCallRequest[]> {
    constructor();
    static instance: CallRequestStorage;
}
