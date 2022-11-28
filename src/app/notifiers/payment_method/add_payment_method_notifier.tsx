import { StripePaymentNotifier } from "@yper-script/react/app/notifiers/stripe_payment_notifier";
import { atom, Loadable, CallbackInterface } from "recoil";
import { CustomLoadable } from "../custom_loadable";
import { CardElement, IbanElement } from "@stripe/react-stripe-js";
import { firstValueFrom } from "rxjs";
import { GetPaymentMethods } from "@yper-script/react/domain/usecase/payment_methods/get_payment_methods";
import { PaymentMethod } from "@yper-script/react/data/entity/payment_method.entity";
import { PaymentNotifier } from "../subscription/payment_notifier";

async function paymentSetup(
  paymentMethod: any,
  clientSecret: string,
  callback: (clientSecret: string, payload: any) => any
) {
  const useCase = new GetPaymentMethods();
  const oldMethods = await firstValueFrom(useCase());
  const { error } = await callback(clientSecret, {
    payment_method: paymentMethod,
  });
  if (error !== undefined) throw error;
  for (let i = 0; i < 10; i++) {
    const methods = await firstValueFrom(useCase());
    if (methods.length > oldMethods.length) {
      return methods[methods.length - 1];
    }
    await new Promise(resolve => setTimeout(resolve, 400));
  }
  return null;
}

export class AddPaymentMethodNotifier {
  static provider = atom<Loadable<PaymentMethod>>({
    key: "add-payment-method-provider",
    default: null,
  });

  static cardNotifier = async (callback: CallbackInterface) => {
    callback.set(AddPaymentMethodNotifier.provider, CustomLoadable.loading);
    callback.set(
      AddPaymentMethodNotifier.provider,
      await CustomLoadable.guard(async () => {
        const selected = await callback.snapshot.getPromise(
          StripePaymentNotifier.selectedMethodProvider
        );
        const card = await callback.snapshot.getPromise(
          StripePaymentNotifier.cardProvider
        );
        const method = await paymentSetup(
          {
            card: selected.elements.getElement(CardElement),
          },
          card.clientSecret,
          selected.stripe.confirmCardSetup
        );
        callback.set(PaymentNotifier.dialogProvider, false);
        // TODO remove this, without we cant get cardProvider to reset on dialog close
        callback.refresh(StripePaymentNotifier.cardProvider);
        return method;
      })
    );
  };

  static ibanNotifier = async (
    name: string,
    email: string,
    callback: CallbackInterface
  ) => {
    callback.set(AddPaymentMethodNotifier.provider, CustomLoadable.loading);
    callback.set(
      AddPaymentMethodNotifier.provider,
      await CustomLoadable.guard(async () => {
        const selected = await callback.snapshot.getPromise(
          StripePaymentNotifier.selectedMethodProvider
        );
        const iban = await callback.snapshot.getPromise(
          StripePaymentNotifier.ibanProvider
        );
        const method = await paymentSetup(
          {
            sepa_debit: selected.elements.getElement(IbanElement),
            billing_details: {
              name: name,
              email: email,
            },
          },
          iban.clientSecret,
          selected.stripe.confirmSepaDebitSetup
        );
        callback.set(PaymentNotifier.dialogProvider, false);
        // TODO remove this, without we cant get ibanProvider to reset on dialog close
        callback.refresh(StripePaymentNotifier.ibanProvider);
        return method;
      })
    );
  };
}
