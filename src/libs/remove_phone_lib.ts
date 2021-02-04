import { UrlAjax } from "@yper-script/enums/GenericEnums";
import CallbackHelper from "@yper-script/helpers/callback_helper";
import { AbstractLib } from "@yper-script/libs/abstract_lib";

/**
 * RemovePhoneLib object
 */
export default class RemovePhoneLib extends AbstractLib {
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
     * remove phone by ajax call
     */
    public removePhoneNumber() {
        this._delete(UrlAjax.deleteUserPhone);
    }
}
