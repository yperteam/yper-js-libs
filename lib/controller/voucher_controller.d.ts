/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
import { AbstractLib } from "../libs/abstract_lib";
export default class VoucherController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Create a Voucher
     */
    create(): Promise<any>;
    /**
     * Update a Voucher
     */
    update(): Promise<any>;
    /**
     * Get a Voucher
     */
    get(): Promise<any>;
    /**
     * Deactivate a Voucher
     */
    deactivate(): Promise<any>;
}
