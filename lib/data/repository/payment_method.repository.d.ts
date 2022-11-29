import { ClientDetails } from "../provider/http/api";
import { PaymentMethod } from "../entity/payment_method.entity";
import { Observable } from "rxjs";
export declare class PaymentMethodRepository {
    private api;
    getPaymentMethods(proId: string, paymentType?: string): Observable<PaymentMethod[]>;
    setPrimary(proId: string, methodId: string): Promise<void>;
    delete(proId: string, methodId: string): Promise<void>;
    addProCard(proId: string): Promise<ClientDetails>;
    addProIban(proId: string): Promise<ClientDetails>;
}
