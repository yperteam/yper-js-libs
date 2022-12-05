import { Loadable } from "recoil";
import { ProRetailpointList } from "../../../data/entity/retailpoint.entity";
export declare class ProRetailpointsNotifier {
    static provider: import("recoil").RecoilState<Loadable<ProRetailpointList>>;
    static retailPointList: import("recoil").RecoilState<string[]>;
    static retailpointListProvider: import("recoil").RecoilState<any>;
    static getRetailpointInfos: (param: string) => import("recoil").RecoilValueReadOnly<import("../../../data/entity/retailpoint.entity").Retailpoint>;
}
