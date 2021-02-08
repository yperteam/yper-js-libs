/**
 * PostSendDeliveryCode object
 */
import CallbackHelper  from "../helpers/callback_helper";
import { AbstractLib } from "../libs/abstract_lib";
import { UrlAjax } from "../enums/GenericEnums";

export default class PostSendDeliveryCode extends AbstractLib {
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
     * Send Delivery Code
     */
    public async sendDeliveryCode() {
        return this._postPromise(UrlAjax.postSendDeliveryCode);
    }
}
