import { Society } from "../../../data/entity/society.entity";
import { SocietyRequestParams } from "../../../data/repository/society.repository";
import { CallbackInterface, Loadable } from "recoil";
export declare class EditSocietyNotifier {
    static provider: import("recoil").RecoilState<Loadable<Society>>;
    static notifier: (society: SocietyRequestParams, callback: CallbackInterface) => Promise<void>;
}
