import {
  ProSubscription,
  SubscriptionBillingPeriod,
  SubscriptionName,
} from "../entity/subscription.entity";
import { Api } from "../provider/http/api";
import { stringFromEnum } from "../../utils";

export class ProSubscriptionRepository {
  private api = new Api();

  public getSubscriptions(id: string): Promise<ProSubscription[]> {
    return this.api.getProSubscription(id, true);
  }

  public addSubscription(
    id: string,
    subscription: SubscriptionName,
    billingPeriod: SubscriptionBillingPeriod
  ) {
    return this.api.addProSubscription(
      id,
      stringFromEnum(SubscriptionName, subscription),
      stringFromEnum(SubscriptionBillingPeriod, billingPeriod)
    );
  }

  public editSubscription(
    id: string,
    subscription: SubscriptionName,
    billingPeriod: SubscriptionBillingPeriod
  ) {
    return this.api.editProSubscription(
      id,
      stringFromEnum(SubscriptionName, subscription),
      stringFromEnum(SubscriptionBillingPeriod, billingPeriod)
    );
  }

  public previewSubscription(
    id: string,
    subscription: SubscriptionName,
    billingPeriod: SubscriptionBillingPeriod
  ) {
    return this.api.previewProSubscription(
      id,
      stringFromEnum(SubscriptionName, subscription),
      stringFromEnum(SubscriptionBillingPeriod, billingPeriod)
    );
  }

  public cancelSubscription(id: string) {
    return this.api.cancelProSubscription(id);
  }
}
