import { Mission } from "../../../data/entity/mission.entity";
import CallableInstance from "callable-instance";
import { Observable } from "rxjs";
export declare class GetPrebook extends CallableInstance<[
    string
], Observable<Mission>> {
    /** Repository */
    private orderRepository;
    /** UseCase */
    private getCurrentProId;
    constructor();
    instanceMethod(prebookId: string): Observable<Mission>;
}
