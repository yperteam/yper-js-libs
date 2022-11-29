import { Observable } from "rxjs";
import CallableInstance from "callable-instance";
export declare class GetCurrentUserId extends CallableInstance<[], Observable<string>> {
    private userRepository;
    constructor();
    instanceMethod(): Observable<string>;
}
