import { selector } from "recoil";
import { ProFavoriteDeliverersNotifier } from "../../../app/notifiers/deliverer/pro_favorite_deliverers_notifier";
import { ProDelivererNotifier } from "../../../app/notifiers/deliverer/pro_deliverer_notifier";
import { FormattedProDeliverer } from "../../../domain/model/formated_deliverer.model";
import { ProBlockedDelivererNotifier } from "../../../app/notifiers/deliverer/pro_blocked_deliverer_notifier";
import {
  DelivererFilterEnum,
  DelivererFilterNotifier,
} from "../../../app/notifiers/deliverer/deliverer_filter_notifier";
import { BlockedDeliverer, ProFavoriteDeliverer } from "../../../data/entity/pro_deliverer.entity";

export class FormattedProDelivererNotifier {
  static provider = selector({
    key: "formatted_pro_deliverers_provider",
    get: async ({ get }) => {
      let favorites = get(ProFavoriteDeliverersNotifier.provider);
      let deliverers = get(ProDelivererNotifier.provider);
      let filter = get(DelivererFilterNotifier.provider);
      let blockedDeliverers = get(ProBlockedDelivererNotifier.provider);
      if (favorites.state != "hasValue" || blockedDeliverers.state != "hasValue")
        return []; // TODO
      let formattedDeliverers: FormattedProDeliverer[] = [];
      deliverers.map(deliverer => {
        let newDeliverer = new FormattedProDeliverer(deliverer);
        let favorite = (favorites.contents as ProFavoriteDeliverer[]).find((f) => f.recipient.shopper == newDeliverer.id);
        let blocked = (blockedDeliverers.contents as BlockedDeliverer[]).find((f) => f.recipient.id == newDeliverer.id);
        formattedDeliverers.push({
          ...newDeliverer,
          favorite: favorite != null,
          favoriteId: favorite?.id,
          blocked: blocked != null,
        });
      });

      return filter !== DelivererFilterEnum.favorite
        ? formattedDeliverers
        : formattedDeliverers.filter(deliverer => deliverer.favorite);
    },
  });
}
