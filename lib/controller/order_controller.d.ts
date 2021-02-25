/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
import { AbstractLib } from "../libs/abstract_lib";
export default class OrderController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Create a new order corresponding to mission(s)
     */
    createOrder(): Promise<any>;
    /**
     * Add item(s) to the order
     */
    addItems(): Promise<any>;
    /**
     * Validate Order
     */
    validateOrder(): Promise<any>;
    /**
     * Pay Order
     */
    payOrder(): Promise<any>;
}
