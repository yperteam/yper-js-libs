import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";
import CallbackHelper from "../helpers/callback_helper";

/**
 * RemoveAddressLib object
 */
export default class RemoveAddressLib extends AbstractLib {
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
     * Remove an address from a user by ajax call
     */
    public removeAddress() {
        this._delete(UrlAjax.deleteUserAddress);
    }
}
