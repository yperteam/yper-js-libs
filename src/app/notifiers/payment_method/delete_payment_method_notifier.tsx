import { atomFamily, Loadable, CallbackInterface } from "recoil";
import { CustomLoadable } from "../custom_loadable";
import { DeletePaymentMethod } from "../../../domain/usecase/payment_methods/delete_payment_method";
import { PaymentNotifier } from "../subscription/payment_notifier";

export class DeletePaymentMethodNotifier {
  static provider = atomFamily<Loadable<void>, string>({
    key: "delete-payment-method-provider",
    default: null,
  });

  static notifier = async (methodId: string, callback: CallbackInterface) => {
    callback.set(
      DeletePaymentMethodNotifier.provider(methodId),
      CustomLoadable.loading
    );
    callback.set(
      DeletePaymentMethodNotifier.provider(methodId),
      await CustomLoadable.guard(async () => {
        await new DeletePaymentMethod().call(methodId);
        callback.set(PaymentNotifier.deleteDialogProvider, false);
      })
    );
  };
}
