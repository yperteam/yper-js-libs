import { GetProFavoriteDeliverers } from "../../../domain/usecase/deliverer/get_pro_favorite_deliverers";
import { StreamNotifier } from "../stream_notifier";

export class ProFavoriteDeliverersNotifier {
  static provider = StreamNotifier.provider({
    key: "pro_favorite_deliverers_provider",
    stream: new GetProFavoriteDeliverers()(),
  });
}
