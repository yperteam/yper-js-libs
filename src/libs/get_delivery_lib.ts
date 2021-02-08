import { UrlAjax } from "../enums/GenericEnums";
import CallbackHelper  from "../helpers/callback_helper";
import { AbstractLib } from "../libs/abstract_lib";

/**
 * GetDeliveryLib object
 */
export default class GetDeliveryLib extends AbstractLib {
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
     * Get delivery details
     */
    public async getDelivery() {
        return this._getPromise(UrlAjax.getDelivery);
    }
}
