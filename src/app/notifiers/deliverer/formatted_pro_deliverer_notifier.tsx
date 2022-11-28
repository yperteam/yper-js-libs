import { selector } from "recoil";
import { ProFavoriteDeliverersNotifier } from "@yper-script/react/app/notifiers/deliverer/pro_favorite_deliverers_notifier";
import { ProDelivererNotifier } from "@yper-script/react/app/notifiers/deliverer/pro_deliverer_notifier";
import { FormattedProDeliverer } from "@yper-script/react/domain/model/formated_deliverer.model";
import { ProBlockedDelivererNotifier } from "@yper-script/react/app/notifiers/deliverer/pro_blocked_deliverer_notifier";
import {
  DelivererFilterEnum,
  DelivererFilterNotifier,
} from "@yper-script/react/app/notifiers/deliverer/deliverer_filter_notifier";

export class FormattedProDelivererNotifier {
  static provider = selector({
    key: "formatted_pro_deliverers_provider",
    get: async ({ get }) => {
      let favorites = get(ProFavoriteDeliverersNotifier.provider);
      let deliverers = get(ProDelivererNotifier.provider);
      let filter = get(DelivererFilterNotifier.provider);
      let blockedDeliverers = get(ProBlockedDelivererNotifier.provider);
      if (
        favorites.state != "hasValue" ||
        blockedDeliverers.state != "hasValue"
      )
        return []; // TODO
      let formattedDeliverers = [];
      deliverers.map(deliverer => {
        formattedDeliverers.push(new FormattedProDeliverer(deliverer));
      });
      formattedDeliverers.forEach(deliverer => {
        favorites.contents.forEach(favorite => {
          if (favorite.recipient.shopper === deliverer.id) {
            deliverer.favorite = true;
            deliverer.favoriteId = favorite.id;
          }
        });
        blockedDeliverers.contents.forEach(blockedInfos => {
          if (blockedInfos.recipient.id === deliverer.id) {
            deliverer.blocked = true;
          }
        });
      });

      return filter !== DelivererFilterEnum.favorite
        ? formattedDeliverers
        : formattedDeliverers.filter(deliverer => deliverer.favorite);
    },
  });
}
