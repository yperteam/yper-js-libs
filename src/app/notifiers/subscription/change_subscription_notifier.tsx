import { AddProSubscription } from "../../../domain/usecase/subscription/add_pro_subscription";
import { atom, Loadable, CallbackInterface } from "recoil";
import { CustomLoadable } from "../custom_loadable";
import {
  SubscriptionBillingPeriod,
  SubscriptionName,
} from "../../../data/entity/subscription.entity";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { StripePaymentNotifier } from "../stripe_payment_notifier";

export class ChangeSubscriptionNotifier {
  static provider = atom<Loadable<void>>({
    key: "change-subscription-provider",
    default: null,
  });

  static notifier = async (
    subscription: SubscriptionName,
    billingPeriod: SubscriptionBillingPeriod,
    callback: CallbackInterface
  ) => {
    callback.set(ChangeSubscriptionNotifier.provider, CustomLoadable.loading);
    callback.set(
      ChangeSubscriptionNotifier.provider,
      await CustomLoadable.guard(async () => {
        await new AddProSubscription().call(subscription, billingPeriod);
      })
    );
  };
}
