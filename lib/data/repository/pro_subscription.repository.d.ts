import { ProSubscription, SubscriptionBillingPeriod, SubscriptionName } from "../entity/subscription.entity";
export declare class ProSubscriptionRepository {
    private api;
    getSubscriptions(id: string): Promise<ProSubscription[]>;
    addSubscription(id: string, subscription: SubscriptionName, billingPeriod: SubscriptionBillingPeriod): Promise<any>;
    editSubscription(id: string, subscription: SubscriptionName, billingPeriod: SubscriptionBillingPeriod): Promise<import("../entity/subscription_preview.entity").SubscriptionPreview>;
    previewSubscription(id: string, subscription: SubscriptionName, billingPeriod: SubscriptionBillingPeriod): Promise<import("../entity/subscription_preview.entity").SubscriptionPreview>;
    cancelSubscription(id: string): Promise<import("../entity/subscription_preview.entity").SubscriptionPreview>;
}
