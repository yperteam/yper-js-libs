import CallableInstance from "callable-instance";
import { PhoneCallRequest } from "../../../data/entity/phone_call_request.entity";
export declare class RequestPhoneCall extends CallableInstance<[
    string,
    string,
    string
], Promise<PhoneCallRequest>> {
    private repository;
    constructor();
    private getCallerId;
    private getCallerType;
    instanceMethod(reasonId: string, phoneNumber: string, comment?: string): Promise<PhoneCallRequest>;
}
