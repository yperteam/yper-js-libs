import { Observable } from "rxjs";
export declare class AuthRepository {
    private api;
    private authStorage;
    getToken(): Observable<string>;
    passwordLogin(props: {
        username: string;
        password: string;
    }): Promise<string>;
}
