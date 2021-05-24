/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
import { AbstractLib } from "../libs/abstract_lib";
export default class UserPaymentMethodController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * List all payment method(s)
     */
    list(): Promise<any>;
    /**
     * List all payment method(s)
     */
    getPaymentMethod(): Promise<any>;
    /**
     * Delete Payment Method
     */
    deletePaymentMethod(): Promise<any>;
    /**
     * Set a payment method as primary
     */
    primary(): Promise<any>;
}
