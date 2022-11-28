import { Society } from "@yper-script/react/data/entity/society.entity";
import { GetSociety } from "@yper-script/react/domain/usecase/society/get_society";
import { StreamNotifier } from "@yper-script/react/app/notifiers/stream_notifier";

export class GetSocietyNotifier {
  static provider = StreamNotifier.provider<Society>({
    key: "get-society",
    stream: new GetSociety().call(),
  });
}
