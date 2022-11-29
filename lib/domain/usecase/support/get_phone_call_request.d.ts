import CallableInstance from "callable-instance";
import { Observable } from "rxjs";
import { PhoneCallRequest } from "../../../data/entity/phone_call_request.entity";
export declare class GetPhoneCallRequest extends CallableInstance<[
], Observable<PhoneCallRequest[]>> {
    private repository;
    private userRepository;
    constructor();
    getCallerType(): string;
    instanceMethod(): Observable<PhoneCallRequest[]>;
}
