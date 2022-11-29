import {
  SubscriptionBillingPeriod,
  SubscriptionName,
} from "../../../data/entity/subscription.entity";
import { SubscriptionPreview } from "../../../data/entity/subscription_preview.entity";
import { PreviewSubscriptionChange } from "../../../domain/usecase/subscription/preview_subscription_change";
import { selectorFamily } from "recoil";

export class PreviewSubscriptionNotifier {
  static provider = selectorFamily<
    SubscriptionPreview,
    { period: SubscriptionBillingPeriod; name: SubscriptionName }
  >({
    key: "preview-subscription-provider",
    get: subscription => () =>
      new PreviewSubscriptionChange().call(
        subscription.name,
        subscription.period
      ),
  });
}
