import { Observable } from "rxjs";
import CallableInstance from "callable-instance";
export declare class IsLoggedIn extends CallableInstance<[], Observable<boolean>> {
    private repository;
    constructor();
    instanceMethod(): Observable<boolean>;
}
