import { selector } from "recoil";
import { ProDeliverer } from "../../../data/entity/pro_deliverer.entity";
import { DelivererFilterNotifier } from "../../../app/notifiers/deliverer/deliverer_filter_notifier";
import { GetProDeliverer } from "../../../domain/usecase/deliverer/get_pro_deliverer";

export class ProDelivererNotifier {
  static provider = selector<ProDeliverer[]>({
    key: "current-proDeliverer",
    get: async ({ get }) => {
      let filter = get(DelivererFilterNotifier.provider);
      let proSubscription = await new GetProDeliverer().call(filter);

      return proSubscription;
    },
  });
}
