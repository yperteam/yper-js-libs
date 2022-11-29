import { Observable } from "rxjs";
import CallableInstance from "callable-instance";
export declare class GetCurrentProId extends CallableInstance<[], Observable<string>> {
    private proRepository;
    constructor();
    instanceMethod(): Observable<string>;
}
