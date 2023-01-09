/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
/// <reference types="datatables.net" />
/// <reference types="select2" />
import { AbstractLib } from "../libs/abstract_lib";
export default class OrderController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Add item(s) to the order
     */
    addItems(): Promise<any>;
    /**
     * Create a new order corresponding to mission(s)
     */
    createOrder(): Promise<any>;
    /**
     * Get an order
     */
    getOrder(): Promise<any>;
    /**
     * Validate Order
     */
    validateOrder(): Promise<any>;
    /**
     * Pay Order
     */
    payOrder(): Promise<any>;
    /**
     * Apply Voucher on Order
     */
    applyVoucher(): Promise<any>;
    /**
     * Delete Voucher from Order
     */
    deleteVoucher(): Promise<any>;
}
