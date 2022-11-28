import { atom, CallbackInterface, Loadable } from "recoil";
import { CustomLoadable } from "../custom_loadable";
import { EmailInvoices } from "@yper-script/react/domain/usecase/invoice/email_invoices";

export class InvoiceEmailNotifier {
  static provider = atom<Loadable<void>>({
    key: "invoice-email-provider",
    default: null,
  });

  static dialogProvider = atom<boolean>({
    key: "invoice-email-dialog-provider",
    default: false,
  });

  static notifier = async (
    email: string,
    ids: string[],
    callback: CallbackInterface
  ) => {
    callback.set(InvoiceEmailNotifier.provider, CustomLoadable.loading);
    callback.set(
      InvoiceEmailNotifier.provider,
      await CustomLoadable.guard(async () => {
        await new EmailInvoices().call(email, ids);
        callback.set(InvoiceEmailNotifier.dialogProvider, false);
      })
    );
  };
}
