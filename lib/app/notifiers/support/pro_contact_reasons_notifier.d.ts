import { ContactReason } from "../../../domain/usecase/support/get_contact_reasons";
export declare class ContactReasonsNotifier {
    static provider: import("recoil").RecoilState<import("recoil").Loadable<ContactReason[]>>;
    static byCategoryProvider: import("recoil").RecoilValueReadOnly<ContactReason[]>;
}
