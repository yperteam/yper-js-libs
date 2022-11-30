import { ProSubscription, SubscriptionBillingPeriod, SubscriptionName } from "../entity/subscription.entity";
export declare class ProSubscriptionRepository {
    private api;
    getSubscriptions(id: string): Promise<ProSubscription[]>;
    addSubscription(id: string, subscription: SubscriptionName, billingPeriod: SubscriptionBillingPeriod): Promise<any>;
    editSubscription(id: string, subscription: SubscriptionName, billingPeriod: SubscriptionBillingPeriod): Promise<import("../..").SubscriptionPreview>;
    previewSubscription(id: string, subscription: SubscriptionName, billingPeriod: SubscriptionBillingPeriod): Promise<import("../..").SubscriptionPreview>;
    cancelSubscription(id: string): Promise<import("../..").SubscriptionPreview>;
}
