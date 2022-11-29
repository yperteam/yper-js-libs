import { Loadable, CallbackInterface } from "recoil";
import { SubscriptionBillingPeriod, SubscriptionName } from "../../../data/entity/subscription.entity";
export declare class ChangeSubscriptionNotifier {
    static provider: import("recoil").RecoilState<Loadable<void>>;
    static notifier: (subscription: SubscriptionName, billingPeriod: SubscriptionBillingPeriod, callback: CallbackInterface) => Promise<void>;
}
