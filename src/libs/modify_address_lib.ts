import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";
import CallbackHelper  from "../helpers/callback_helper";

/**
 * ModifyAddressLib object
 */
export default class ModifyAddressLib extends AbstractLib {
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
     * modify address by ajax call
     */
    public modifyAddress() {
        this._put(UrlAjax.putUserAddress);
    }
}
