import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";
import CallbackHelper from "../helpers/callback_helper";

/**
 * ResetUserEmailLib object
 */
export default class ResetUserPasswordLib extends AbstractLib {
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
     * Send an email to change the password by ajax call
     */
    public resetEmail() {
        this._post(UrlAjax.postSendPasswordResetLink);
    }
}
