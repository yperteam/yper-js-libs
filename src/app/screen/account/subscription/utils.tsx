import {
  ProSubscription,
  SubscriptionBillingPeriod,
  SubscriptionName,
} from "@yper-script/react/data/entity/subscription.entity";
import { enumFromString } from "@yper-script/react/utils";
import moment, { Moment } from "moment";

export function getSubscriptionEnd(subscription: ProSubscription): Moment {
  const now = moment();
  let start = moment(subscription.startDate);

  if (subscription.billingPeriod == SubscriptionBillingPeriod.annually) {
    start = start.add(1 + now.diff(start, "years"), "year");
  } else {
    start = start.add(1 + now.diff(start, "month"), "month");
  }

  return start;
}

export function getSubscriptionName(): SubscriptionName {
  const match = window.location.pathname.match(/[^/?]*[^/?]/g);

  return (
    enumFromString<SubscriptionName>(
      SubscriptionName,
      match[match.length - 1]
    ) ?? SubscriptionName.yper_essential
  );
}

export function getBillingPeriod(): SubscriptionBillingPeriod {
  const query = new URLSearchParams(window.location.search);
  return (
    enumFromString(SubscriptionBillingPeriod, query.get("billing_period")) ??
    SubscriptionBillingPeriod.annually
  );
}
