import { Observable } from "rxjs";
import { UserSex } from "../entity/user.entity";
export declare class UserRepository {
    private api;
    getCurrentUserId(): Observable<string>;
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
