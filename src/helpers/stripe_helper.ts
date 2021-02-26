import {
    loadStripe, SetupIntent,
    Stripe,
    StripeCardElement, StripeCardElementOptions,
    StripeElements,
    StripeElementStyle, StripeError,
    StripeIbanElement, StripeIbanElementOptions
} from '@stripe/stripe-js';

export default class StripeHelper {
    /** Stripe clients */
    protected stripe: Stripe;
    protected stripeElements: StripeElements;
    protected stripeCardElement: StripeCardElement;
    protected stripeIbanElement: StripeIbanElement;
    protected stripeElementStyle: StripeElementStyle = {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    };


    /** Private keys */
    protected stripeCardElementPrivateKey: string
    protected stripeIbanElementPrivateKey: string


    constructor() {
    }

    /**
     *
     * @param publishableKey
     */
    public async setStripeClient(publishableKey: string) {
        // TODO: LOADER IF WE WANT
        // 'pk_test_TYooMQauvdEDq54NiTphI7jx'
        this.stripe = await loadStripe(publishableKey);
        this.stripeElements = this.stripe.elements();
    }

    /**
     *
     * @param stripeIbanElementOptions
     */
    public createIban(stripeIbanElementOptions: StripeIbanElementOptions = {}) {
        this.stripeIbanElement = this.stripeElements.create("iban", {
            style: this.stripeElementStyle,
            supportedCountries: ["SEPA"],
            placeholderCountry: "FR",
            ...stripeIbanElementOptions
        });
    }

    /**
     *
     * @param stripeCardElementOptions
     */
    public createCard(stripeCardElementOptions: StripeCardElementOptions = {}) {
        this.stripeCardElement = this.stripeElements.create("card", {
            style: this.stripeElementStyle,
            hidePostalCode: true,
            ...stripeCardElementOptions
        });
    }

    /**
     *
     * @param clientSecret
     */
    public setStripeCardElementPrivateKey(clientSecret: string) {
        this.stripeCardElementPrivateKey = clientSecret;
    }

    /**
     *
     * @param clientSecret
     */
    public setStripeIbanElementPrivateKey(clientSecret: string) {
        this.stripeIbanElementPrivateKey = clientSecret;
    }

    /**
     *
     * @param domElement
     */
    public mountStripeCardElement(domElement: string | HTMLElement) {
        this.stripeCardElement.mount(domElement);
    }

    /**
     *
     * @param domElement
     */
    public mountStripeIbanElement(domElement: string | HTMLElement) {
        this.stripeIbanElement.mount(domElement);
    }

    /**
     *
     -     */
    public unmountStripeCardElement() {
        this.stripeCardElement.unmount();
    }

    /**
     *
     */
    public unmountStripeIbanElement() {
        this.stripeIbanElement.unmount();
    }

    /**
     *
     */
    public clearStripeCardElement() {
        this.stripeCardElement.clear();
    }

    /**
     *
     */
    public clearStripeIbanElement() {
        this.stripeIbanElement.clear();
    }

    /**
     *
     * @param stripeElementStyle
     */
    public setStripeElementStyle(stripeElementStyle: StripeElementStyle) {
        this.stripeElementStyle = stripeElementStyle;
    }

    /**
     * submit event to add a card
     */
    public async pushCard(name: string): Promise<{ setupIntent?: SetupIntent; error?: StripeError }> {
        return this.stripe.confirmCardSetup(this.stripeCardElementPrivateKey, {
            payment_method: {
                card: this.stripeCardElement,
                billing_details: {
                    name: name,
                },
            },
        });
    }

    /**
     * submit event to add an IBAN
     */
    public async pushIban(name: string, email: string): Promise<{ setupIntent?: SetupIntent; error?: StripeError }> {
        return this.stripe.confirmSepaDebitSetup(this.stripeIbanElementPrivateKey, {
            payment_method: {
                sepa_debit: this.stripeIbanElement,
                billing_details: {
                    name: name,
                    email: email,
                },
            },
        })
    }

    /**
     *
     * @param onChangeFunction
     */
    public onChangeStripeCardElement(onChangeFunction: Function) {
        // Handle real-time validation errors from the card Element.
        this.stripeCardElement.on("change", event => {
            return onChangeFunction(event);
        });
        //     const displayError = document.getElementById("card-errors");
        //     if (event.error) {
        //         displayError.textContent = event.error.message;
        //     } else if (event.complete) {
        //         displayError.textContent = "";
        //     } else {
        //         displayError.textContent = "";
        //     }
        // });
    }
}
