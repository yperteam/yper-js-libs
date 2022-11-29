import { atom, AtomEffect, atomFamily, Loadable, SetterOrUpdater } from "recoil";
import { CustomLoadable } from "../../../app/notifiers/custom_loadable";
import { GetDownloadInvoices } from "../../../domain/usecase/invoice/get_download_invoices";
import { GetDownloadInvoice } from "../../../domain/usecase/invoice/get_download_invoice";

const redirectEffect: (key: string) => AtomEffect<Loadable<Object>> = key => ({ onSet }) => {
  onSet(newValue => {
    if (newValue?.state === "hasValue") {
      window.open(String(newValue.contents));
    }
  });
};

export class InvoiceDownloadNotifier {
  static provider = atomFamily<Loadable<Object>, string>({
    key: "invoice-download-provider",
    default: null,
    effects_UNSTABLE: [redirectEffect("download_effect")],
  });

  static multipleProvider = atom<Loadable<Object>>({
    key: "invoice-multiple-download-provider",
    default: null,
    effects_UNSTABLE: [redirectEffect("download_effect")],
  });

  static multipleNotifier = async (
    ids: string[],
    set: SetterOrUpdater<any>
  ) => {
    set(CustomLoadable.loading);
    set(await CustomLoadable.guard(() => new GetDownloadInvoices().call(ids)));
  };

  static notifier = async (id: string, set: SetterOrUpdater<any>) => {
    set(CustomLoadable.loading);
    set(await CustomLoadable.guard(() => new GetDownloadInvoice().call(id)));
  };
}
