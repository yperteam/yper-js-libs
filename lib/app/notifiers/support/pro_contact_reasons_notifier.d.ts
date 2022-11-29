import { ContactReason } from "../../../domain/usecase/support/get_pro_contact_reasons";
import { Loadable } from "recoil";
export declare class ProContactReasonsNotifier {
    static provider: import("recoil").RecoilState<Loadable<ContactReason[]>>;
    static byCategoryProvider: import("recoil").RecoilValueReadOnly<ContactReason[]>;
}
