import { ProFavoriteDeliverer } from "../../../data/entity/pro_deliverer.entity";
import { Observable } from "rxjs";
import CallableInstance from "callable-instance";
export declare class GetProFavoriteDeliverers extends CallableInstance<[
], Observable<ProFavoriteDeliverer[]>> {
    /** Repository */
    private proRepository;
    /** UseCase */
    private getCurrentRetailPoint;
    private getCurrentProId;
    constructor();
    instanceMethod(): Observable<ProFavoriteDeliverer[]>;
}
