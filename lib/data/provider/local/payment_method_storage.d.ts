import { PaymentMethod } from "../../entity/payment_method.entity";
import { ObservableStorage } from "./observable_storage";
export declare class PaymentMethodStorage extends ObservableStorage<PaymentMethod[]> {
    constructor();
    byId(id: string): PaymentMethod | undefined;
    remove(id: string): void;
    static instance: PaymentMethodStorage;
}
