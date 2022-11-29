import CallableInstance from "callable-instance";
import { RegisterUserProps } from "../../../data/repository/user.repository";
export declare class RegisterUser extends CallableInstance<[
    RegisterUserProps
], Promise<void>> {
    private repository;
    private signTerm;
    constructor();
    instanceMethod(props: RegisterUserProps): Promise<void>;
}
