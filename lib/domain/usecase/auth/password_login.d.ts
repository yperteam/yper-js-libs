import CallableInstance from "callable-instance";
export declare class PasswordLogin extends CallableInstance<[
    string,
    string
], Promise<string>> {
    private repository;
    constructor();
    instanceMethod(username: string, password: string): Promise<string>;
}
