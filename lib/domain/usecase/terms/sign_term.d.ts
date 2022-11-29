import CallableInstance from "callable-instance";
export declare class SignTerm extends CallableInstance<[string], Promise<string>> {
    private repository;
    private getUserId;
    constructor();
    instanceMethod(termName: string): Promise<string>;
}
