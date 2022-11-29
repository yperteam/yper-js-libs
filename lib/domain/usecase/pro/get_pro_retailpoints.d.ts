import { Observable } from "rxjs";
import { ProRetailpointList } from "../../../data/entity/retailpoint.entity";
import CallableInstance from "callable-instance";
export declare class GetProRetailpoints extends CallableInstance<[
], Observable<ProRetailpointList>> {
    /** Repository */
    private proRepository;
    /** UseCase */
    private getCurrentProId;
    constructor();
    instanceMethod(): Observable<ProRetailpointList>;
}
