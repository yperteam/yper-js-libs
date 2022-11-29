import { GetProBlockedDeliverers } from "../../../domain/usecase/deliverer/get_pro_blocked_deliverers";
import { StreamNotifier } from "../stream_notifier";

export class ProBlockedDelivererNotifier {
  static provider = StreamNotifier.provider({
    key: "pro_blocked_deliverers_provider",
    stream: new GetProBlockedDeliverers()(),
  });
}
