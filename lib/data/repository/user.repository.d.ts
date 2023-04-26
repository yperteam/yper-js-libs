import { Observable } from "rxjs";
import { User, UserSex } from "../entity/user.entity";
export declare class UserRepository {
    private api;
    private userLock;
    private _getCurrentUser;
    getCurrentUser(): Observable<User>;
    watchCurrentUser(): Observable<User>;
    registerUser(props: RegisterUserProps): Promise<any>;
}
export interface RegisterUserProps {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    birthDate: Date;
    password: string;
    sex: UserSex;
}
