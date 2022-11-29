import { Stripe, StripeElements } from "@stripe/stripe-js";
export declare class StripePaymentNotifier {
    static apiKey: string;
    static selectedMethodProvider: import("recoil").RecoilState<{
        stripe: Stripe | null;
        elements: StripeElements | null;
    }>;
    static ibanProvider: import("recoil").RecoilValueReadOnly<{
        stripe: Promise<Stripe>;
        clientSecret: string;
    }>;
    static cardProvider: import("recoil").RecoilValueReadOnly<{
        stripe: Promise<Stripe>;
        clientSecret: string;
    }>;
}
