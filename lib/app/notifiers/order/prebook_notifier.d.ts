import { Mission } from "../../../data/entity/mission.entity";
export declare class PrebookNotifier {
    static provider: (param: string) => import("recoil").RecoilState<import("recoil").Loadable<Mission>>;
    static templateProvider: (param: string) => import("recoil").RecoilValueReadOnly<import("../../..").MissionTemplate>;
}
