import { GetPrebook } from "../../../domain/usecase/order/get_prebook";
import { StreamNotifier } from "../../../app/notifiers/stream_notifier";
import { Mission } from "../../../data/entity/mission.entity";
import { selectorFamily } from "recoil";
import { MissionTemplateNotifier } from "./mission_template_notifier";

export class PrebookNotifier {
  static provider = StreamNotifier.providerFamily<Mission, string>({
    key: "prebook_provider",
    stream: prebookId => new GetPrebook()(prebookId),
  });

  static templateProvider = selectorFamily({
    key: "prebook_template_provider",
    get: (id: string) => ({ get }) => {
      const prebook = get(PrebookNotifier.provider(id));
      if (prebook?.state != "hasValue") return null;
      const templates = get(MissionTemplateNotifier.provider);
      return templates.find(t => t.id == prebook.contents.missionTemplate.id);
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });
}
