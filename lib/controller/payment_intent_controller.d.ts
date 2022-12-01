/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
/// <reference types="datatables.net" />
/// <reference types="select2" />
import { AbstractLib } from "../libs/abstract_lib";
export default class PaymentIntentController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Get a specific payment intent
     */
    getPaymentIntent(): Promise<any>;
}
