import { Loadable, CallbackInterface } from "recoil";
import { PaymentMethod } from "../../../data/entity/payment_method.entity";
export declare class AddPaymentMethodNotifier {
    static provider: import("recoil").RecoilState<Loadable<PaymentMethod>>;
    static cardNotifier: (callback: CallbackInterface) => Promise<void>;
    static ibanNotifier: (name: string, email: string, callback: CallbackInterface) => Promise<void>;
}
