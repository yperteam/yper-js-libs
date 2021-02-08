import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";
import CallbackHelper  from "../helpers/callback_helper";

/**
 * GetInvoiceLib object
 */
export default class GetInvoiceLib extends AbstractLib {
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
     * get invoice by ajax call
     *
     * @return Promise
     */
    public async getInvoice() {
        return this._getPromise(UrlAjax.getInvoice);
    }
}
