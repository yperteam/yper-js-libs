import { Society } from "../../../data/entity/society.entity";
import { GetSociety } from "../../../domain/usecase/society/get_society";
import { StreamNotifier } from "../../../app/notifiers/stream_notifier";

export class GetSocietyNotifier {
  static provider = StreamNotifier.provider<Society>({
    key: "get-society",
    stream: new GetSociety().call(),
  });
}
