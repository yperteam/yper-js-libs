import { SubscriptionBillingPeriod, SubscriptionName } from "../../../data/entity/subscription.entity";
import { SubscriptionPreview } from "../../../data/entity/subscription_preview.entity";
export declare class PreviewSubscriptionChange {
    /** Repository */
    private proSubscriptionRepository;
    /** UseCase */
    private getCurrentProId;
    static basePrices: {
        yper_start: number;
        yper_essential: number;
        yper_premium: number;
    };
    call(subscription: SubscriptionName, billingPeriod: SubscriptionBillingPeriod): Promise<SubscriptionPreview>;
}
