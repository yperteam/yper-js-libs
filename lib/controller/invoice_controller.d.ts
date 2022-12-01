/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
/// <reference types="datatables.net" />
/// <reference types="select2" />
import { AbstractLib } from "../libs/abstract_lib";
export default class InvoiceController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Create an invoice
     */
    invoiceCreate(): Promise<any>;
    /**
     * Update an invoice
     */
    invoiceUpdate(): Promise<any>;
    /**
     * Create an item
     */
    itemCreate(): Promise<any>;
    /**
     * Update an item
     */
    itemUpdate(): Promise<any>;
    /**
     * Delete an item
     */
    itemDelete(): Promise<any>;
}
