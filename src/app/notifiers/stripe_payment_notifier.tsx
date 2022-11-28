import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import { AddProCard } from "@yper-script/react/domain/usecase/payment_methods/add_pro_card";
import { AddProIban } from "@yper-script/react/domain/usecase/payment_methods/add_pro_iban";
import { atom, selector, DefaultValue } from "recoil";

export class StripePaymentNotifier {
  static apiKey = process.env.STRIPE_PUBLIC_KEY;

  static selectedMethodProvider = atom<{
    stripe: Stripe;
    elements: StripeElements;
  }>({
    key: "stripe-method-provider",
    default: null,
    dangerouslyAllowMutability: true,
  });

  static ibanProvider = selector<{
    stripe: Promise<Stripe>;
    clientSecret: string;
  }>({
    key: "stripe-iban-provider",
    get: async () => {
      const details = await new AddProIban().call();
      return {
        stripe: loadStripe(this.apiKey),
        clientSecret: details.stripeDetails.clientPrivateKey,
      };
    },

    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });

  static cardProvider = selector<{
    stripe: Promise<Stripe>;
    clientSecret: string;
  }>({
    key: "stripe-card-provider",
    get: async () => {
      const details = await new AddProCard().call();
      return {
        stripe: loadStripe(this.apiKey),
        clientSecret: details.stripeDetails.clientPrivateKey,
      };
    },
    cachePolicy_UNSTABLE: { eviction: "most-recent" },
  });
}
