import { atom, selector } from "recoil";
import moment from "moment";
import { Invoice } from "../../../data/entity/invoice.entity";
import { GetProInvoice } from "../../../domain/usecase/invoice/get_pro_invoice";

export enum InvoiceDateFilter {
  THIS_MONTH,
  LAST_MONTH,
  LAST_3_MONTH,
  LAST_6_MONTH,
  LAST_12_MONTH,
  ALL,
}

function getDates(dateFilter: InvoiceDateFilter): Date[] {
  let now = moment.utc();
  let lastMonth = moment.utc().add(-1, "month");

  switch (dateFilter) {
    case InvoiceDateFilter.THIS_MONTH:
      return [now.startOf("month").toDate(), now.endOf("month").toDate()];
    case InvoiceDateFilter.LAST_MONTH:
      return [
        lastMonth.startOf("month").toDate(),
        lastMonth.endOf("month").toDate(),
      ];
    case InvoiceDateFilter.LAST_3_MONTH:
      now.add(-4, "month");
      return [now.startOf("month").toDate(), lastMonth.endOf("month").toDate()];
    case InvoiceDateFilter.LAST_6_MONTH:
      now.add(-7, "month");
      return [now.startOf("month").toDate(), lastMonth.endOf("month").toDate()];
    case InvoiceDateFilter.LAST_12_MONTH:
      now.add(-13, "month");
      return [now.startOf("month").toDate(), lastMonth.endOf("month").toDate()];
    case InvoiceDateFilter.ALL:
      return [null, null];
  }
}

export class InvoiceNotifier {
  static dateFilterProvider = atom<InvoiceDateFilter>({
    key: "invoice-state-filter-provider",
    default: InvoiceDateFilter.THIS_MONTH,
  });

  static selectedProvider = atom<string[]>({
    key: "selected-invoice-provider",
    default: [],
  });

  static selectedInvoicesProvider = selector<Invoice[]>({
    key: "selected-invoice-list-provider",
    get: ({ get }) => {
      const list = get(InvoiceNotifier.provider);
      const selected = get(InvoiceNotifier.selectedProvider);
      return list.filter(i => selected.includes(i.id));
    },
  });

  static provider = selector<Invoice[]>({
    key: "invoice-list-provider",
    get: async ({ get }) => {
      const dateFilter = get(InvoiceNotifier.dateFilterProvider);
      let [startDate, endDate] = getDates(dateFilter);
      let res = await new GetProInvoice().call(startDate, endDate);
      return res.data;
    },
  });
}
