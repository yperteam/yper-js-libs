import React from "react";
import { CompareSubscriptionDialog } from "@yper-script/react/app/widget/subscription/compare_subscription_dialog";
import { useRecoilValue } from "recoil";
import { ProSubscriptionsNotifier } from "@yper-script/react/app/notifiers/subscription/subscription_notifier";
import { stringFromEnum } from "@yper-script/react/utils";
import {
  SubscriptionBillingPeriod,
  SubscriptionName,
} from "@yper-script/react/data/entity/subscription.entity";

export function CompareCurrentSubscriptionDialog() {
  const subscriptions = useRecoilValue(ProSubscriptionsNotifier.provider);

  const onOfferSelected = offer => {
    window.location.href = `/subscription/${stringFromEnum(
      SubscriptionName,
      offer.name
    )}\?billing_period=${stringFromEnum(
      SubscriptionBillingPeriod,
      offer.period
    )}`;
  };

  return (
    <CompareSubscriptionDialog
      callback={onOfferSelected}
      currentOffer={{
        name: subscriptions[0].name,
        period: subscriptions[0].billingPeriod,
      }}
    />
  );
}
