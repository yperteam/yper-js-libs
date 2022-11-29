import CallableInstance from "callable-instance";
import { Observable } from "rxjs";
export declare class GetCurrentRetailpointId extends CallableInstance<[
], Observable<string>> {
    private retailpointRepository;
    constructor();
    instanceMethod(): Observable<string>;
}
