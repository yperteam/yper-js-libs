import { SetupIntent, Stripe, StripeCardElement, StripeCardElementOptions, StripeElements, StripeElementStyle, StripeError, StripeIbanElement, StripeIbanElementOptions } from '@stripe/stripe-js';
export default class StripeHelper {
    /** Stripe clients */
    protected stripe: Stripe;
    protected stripeElements: StripeElements;
    protected stripeCardElement: StripeCardElement;
    protected stripeIbanElement: StripeIbanElement;
    protected stripeElementStyle: StripeElementStyle;
    /** Private keys */
    protected stripeCardElementPrivateKey: string;
    protected stripeIbanElementPrivateKey: string;
    constructor();
    /**
     *
     * @param publishableKey
     */
    setStripeClient(publishableKey: string): Promise<void>;
    /**
     *
     * @param stripeIbanElementOptions
     */
    createIban(stripeIbanElementOptions?: StripeIbanElementOptions): void;
    /**
     *
     * @param stripeCardElementOptions
     */
    createCard(stripeCardElementOptions?: StripeCardElementOptions): void;
    /**
     *
     * @param clientSecret
     */
    setStripeCardElementPrivateKey(clientSecret: string): void;
    /**
     *
     * @param clientSecret
     */
    setStripeIbanElementPrivateKey(clientSecret: string): void;
    /**
     *
     * @param domElement
     */
    mountStripeCardElement(domElement: string | HTMLElement): void;
    /**
     *
     * @param domElement
     */
    mountStripeIbanElement(domElement: string | HTMLElement): void;
    /**
     *
     -     */
    unmountStripeCardElement(): void;
    /**
     *
     */
    unmountStripeIbanElement(): void;
    /**
     *
     */
    clearStripeCardElement(): void;
    /**
     *
     */
    clearStripeIbanElement(): void;
    /**
     *
     * @param stripeElementStyle
     */
    setStripeElementStyle(stripeElementStyle: StripeElementStyle): void;
    /**
     * submit event to add a card
     */
    pushCard(name: string): Promise<{
        setupIntent?: SetupIntent;
        error?: StripeError;
    }>;
    /**
     * submit event to add an IBAN
     */
    pushIban(name: string, email: string): Promise<{
        setupIntent?: SetupIntent;
        error?: StripeError;
    }>;
    /**
     *
     * @param onChangeFunction
     */
    onChangeStripeCardElement(onChangeFunction: Function): void;
}
