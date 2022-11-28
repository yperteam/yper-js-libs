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

export enum SubscriptionStatus {
  active,
  canceled,
  incomplete,
  incomplete_expired,
  not_started,
  past_due,
  trialing,
  unpaid,
}

export enum SubscriptionBillingPeriod {
  monthly = "monthly",
  annually = "annually",
}

export enum SubscriptionName {
  yper_start = "yper_start",
  yper_essential = "yper_essential",
  yper_premium = "yper_premium",
}
