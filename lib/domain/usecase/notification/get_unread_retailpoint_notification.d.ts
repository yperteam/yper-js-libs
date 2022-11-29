import CallableInstance from "callable-instance";
import { Observable } from "rxjs";
export declare class GetUnreadRetailpointNotification extends CallableInstance<[
], Observable<number>> {
    private repository;
    private getCurrentRetailPointId;
    private getCurrentUserId;
    constructor();
    instanceMethod(): Observable<number>;
}
