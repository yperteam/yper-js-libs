import { Loadable } from "recoil";
import { Retailpoint } from "../../../data/entity/retailpoint.entity";
export declare class CurrentRetailpointNotifier {
    static idProvider: import("recoil").RecoilState<Loadable<string>>;
    static provider: import("recoil").RecoilValueReadOnly<Retailpoint>;
}
