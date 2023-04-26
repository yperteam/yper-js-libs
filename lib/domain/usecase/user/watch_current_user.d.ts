import { Observable } from "rxjs";
import CallableInstance from "callable-instance";
import { User } from "../../../data/entity/user.entity";
export declare class WatchCurrentUser extends CallableInstance<[], Observable<User>> {
    private userRepository;
    constructor();
    instanceMethod(): Observable<User>;
}
