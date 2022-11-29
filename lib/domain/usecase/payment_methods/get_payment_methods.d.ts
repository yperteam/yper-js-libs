import { PaymentMethod } from "../../../data/entity/payment_method.entity";
import { Observable } from "rxjs";
import CallableInstance from "callable-instance";
export declare class GetPaymentMethods extends CallableInstance<[
], Observable<PaymentMethod[]>> {
    private repository;
    private getCurrentProId;
    constructor();
    instanceMethod(): Observable<PaymentMethod[]>;
    call(paymentType: string): Observable<PaymentMethod[]>;
}
