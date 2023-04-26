import { NotificationResponse } from "../../../data/entity/notification.entity";
import { Observable } from "rxjs";
export declare class GetRetailpointNotification {
    private repository;
    private watchCurrentUser;
    private getCurrentRetailPointId;
    call(skip: number, limit: number): Observable<NotificationResponse>;
}