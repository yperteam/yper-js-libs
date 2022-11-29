import { atomFamily, Loadable, CallbackInterface } from "recoil";
import { CustomLoadable } from "../custom_loadable";
import { SetPrimaryPaymentMethod } from "../../../domain/usecase/payment_methods/set_primary_payment_method";

export class PrimaryPaymentMethodNotifier {
  static provider = atomFamily<Loadable<void>, string>({
    key: "primary-payment-method-provider",
    default: null,
  });

  static notifier = async (methodId: string, callback: CallbackInterface) => {
    callback.set(
      PrimaryPaymentMethodNotifier.provider(methodId),
      CustomLoadable.loading
    );
    callback.set(
      PrimaryPaymentMethodNotifier.provider(methodId),
      await CustomLoadable.guard(async () => {
        await new SetPrimaryPaymentMethod().call(methodId);
      })
    );
  };
}
