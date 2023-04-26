import CallableInstance from "callable-instance";
export declare class SignTerm extends CallableInstance<[string], Promise<string>> {
    private repository;
    private getUser;
    constructor();
    instanceMethod(termName: string): Promise<string>;
}
