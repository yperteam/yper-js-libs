import { PhoneCallRequest } from "../entity/phone_call_request.entity";
import { Observable } from "rxjs";
import { ContactReasonEntity } from "../entity/contact_reason.entity";
export declare class SupportRepository {
    private api;
    private proStorage;
    getContactReasons(userGroups: string[]): Promise<ContactReasonEntity[]>;
    getPhoneCallRequest(requestId: string): Promise<PhoneCallRequest>;
    getPhoneCallRequests(userId: string, callerType: string, status: string[]): Observable<PhoneCallRequest[]>;
    requestPhoneCall(props: {
        callerId: string;
        phoneNumber: string;
        reasonId: string;
        callerType: string;
        comment?: string;
    }): Promise<PhoneCallRequest>;
    cancelPhoneCallRequest(requestId: string): Promise<void>;
}
