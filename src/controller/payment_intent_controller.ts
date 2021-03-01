import {AbstractLib} from "../libs/abstract_lib";
import {ApiPaymentIntentUrlEnum} from "../enums/api_url_enum";

export default class PaymentIntentController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor(
        $elem: JQuery<HTMLElement> | null = null
    ) {
        super();
        this.setLoader($elem);
    }

    /**
     * Get a specific payment intent
     */
    public async getPaymentIntent(): Promise<any> {
        return this._getPromise(ApiPaymentIntentUrlEnum.e_root_payment_intent);
    }
}