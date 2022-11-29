import { MissionTemplate } from "../../../data/entity/mission_template.entity";
export declare class MissionTemplateNotifier {
    static provider: import("recoil").RecoilValueReadOnly<MissionTemplate[]>;
    static templateProvider: (param: string) => import("recoil").RecoilValueReadOnly<MissionTemplate>;
}
