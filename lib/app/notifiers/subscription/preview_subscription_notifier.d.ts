import { SubscriptionBillingPeriod, SubscriptionName } from "../../../data/entity/subscription.entity";
import { SubscriptionPreview } from "../../../data/entity/subscription_preview.entity";
export declare class PreviewSubscriptionNotifier {
    static provider: (param: {
        period: SubscriptionBillingPeriod;
        name: SubscriptionName;
    }) => import("recoil").RecoilValueReadOnly<SubscriptionPreview>;
}
