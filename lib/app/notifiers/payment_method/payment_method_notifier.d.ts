import { PaymentMethod } from "../../../data/entity/payment_method.entity";
export declare class PaymentMethodNotifier {
    static provider: import("recoil").RecoilState<import("recoil").Loadable<PaymentMethod[]>>;
    static withTypeProvider: (param: string) => import("recoil").RecoilState<import("recoil").Loadable<PaymentMethod[]>>;
}
