import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";
import CallbackHelper  from "../helpers/callback_helper";

/**
 * GetAdminInvoiceStatsLib object
 */
export default class GetAdminInvoiceStatsLib extends AbstractLib {
    /**
     *
     * @param $elem
     * @param callback
     */
    constructor(
        $elem: JQuery<HTMLElement> | null = null,
        callback: Function | null = null
    ) {
        super();
        this.setLoader($elem);
        this.cHelper = new CallbackHelper(callback);
    }

    /**
     * Get admin invoice stats
     */
    public async getAdminInvoiceStats() {
        return this._getPromise(UrlAjax.getAdminInvoiceStats);
    }
}
