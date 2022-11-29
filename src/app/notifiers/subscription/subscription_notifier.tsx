import { selector, atom } from "recoil";
import { GetProSubscriptions } from "../../../domain/usecase/subscription/get_pro_subscriptions";
import { ProSubscription } from "../../../data/entity/subscription.entity";

export class ProSubscriptionsNotifier {
  static provider = selector<ProSubscription[]>({
    key: "current-proSubscription",
    get: async () => new GetProSubscriptions().call(),
  });

  static dialogProvider = atom<boolean>({
    key: "subscription-dialog-provider",
    default: false,
  });
}
