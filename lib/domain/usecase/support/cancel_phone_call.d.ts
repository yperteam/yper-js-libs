import CallableInstance from "callable-instance";
export declare class CancelPhoneCall extends CallableInstance<[string], Promise<void>> {
    private repository;
    constructor();
    instanceMethod(callId: string): Promise<void>;
}
