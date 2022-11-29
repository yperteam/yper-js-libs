export interface ProSubscription {
    id: string;
    autoRenew: boolean;
    createdAt?: Date;
    startDate?: Date;
    endDate?: Date;
    status: SubscriptionStatus;
    billingPeriod: SubscriptionBillingPeriod;
    name: SubscriptionName;
}
export declare enum SubscriptionStatus {
    active = 0,
    canceled = 1,
    incomplete = 2,
    incomplete_expired = 3,
    not_started = 4,
    past_due = 5,
    trialing = 6,
    unpaid = 7
}
export declare enum SubscriptionBillingPeriod {
    monthly = "monthly",
    annually = "annually"
}
export declare enum SubscriptionName {
    yper_start = "yper_start",
    yper_essential = "yper_essential",
    yper_premium = "yper_premium"
}
