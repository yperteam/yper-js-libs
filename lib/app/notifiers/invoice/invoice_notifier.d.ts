import { Invoice } from "../../../data/entity/invoice.entity";
export declare enum InvoiceDateFilter {
    THIS_MONTH = 0,
    LAST_MONTH = 1,
    LAST_3_MONTH = 2,
    LAST_6_MONTH = 3,
    LAST_12_MONTH = 4,
    ALL = 5
}
export declare class InvoiceNotifier {
    static dateFilterProvider: import("recoil").RecoilState<InvoiceDateFilter>;
    static selectedProvider: import("recoil").RecoilState<string[]>;
    static selectedInvoicesProvider: import("recoil").RecoilValueReadOnly<Invoice[]>;
    static provider: import("recoil").RecoilValueReadOnly<Invoice[]>;
}
