import { BlockedDeliverer } from "../../../data/entity/pro_deliverer.entity";
import { Observable } from "rxjs";
import CallableInstance from "callable-instance";
export declare class GetProBlockedDeliverers extends CallableInstance<[
], Observable<BlockedDeliverer[]>> {
    /** Repository */
    private proRepository;
    /** UseCase */
    private getCurrentProId;
    constructor();
    instanceMethod(): Observable<BlockedDeliverer[]>;
}
