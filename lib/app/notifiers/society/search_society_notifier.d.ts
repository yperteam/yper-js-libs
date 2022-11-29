import { SocietyRegistry } from "../../../data/entity/society_registry.entity";
import { CallbackInterface, Loadable } from "recoil";
export declare class SearchSocietyNotifier {
    static provider: import("recoil").RecoilState<Loadable<SocietyRegistry>>;
    static notifier: (registryNumber: string, callback: CallbackInterface) => Promise<void>;
}
