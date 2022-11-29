/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="datatables.net" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
/// <reference types="select2" />
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
    /**
     * Validate a Sponsorship
     */
    validateSponsorship(): Promise<any>;
    /**
     * Refuse a sponsorship
     */
    refuseSponsorship(): Promise<any>;
}
