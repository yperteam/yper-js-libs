import { selector, selectorFamily } from "recoil";
import { GetMissionTemplates } from "../../../domain/usecase/mission/get_mission_templates";
import { MissionTemplate } from "../../../data/entity/mission_template.entity";

export class MissionTemplateNotifier {
  static provider = selector<MissionTemplate[]>({
    key: "mission_template_provider",
    get: async ({ }) => {
      return await new GetMissionTemplates().call();
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });

  static templateProvider = selectorFamily({
    key: "mission_template_provider_family",
    get: (id: string) => ({ get }) => {
      const templates = get(MissionTemplateNotifier.provider);
      return templates.find(t => t.id == id) ?? templates[0];
    },
    //Todo: To change cache handle policy update
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });
}
