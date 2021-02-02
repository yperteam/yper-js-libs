import { UrlAjax } from "@yper-script/enums/GenericEnums";
import { CallbackHelper } from "@yper-script/helpers/callback_helper";
import { AbstractLib } from "@yper-script/libs/abstract_lib";

/**
 * RemoveEmailLib object
 */
export default class RemoveEmailLib extends AbstractLib {
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
     * Remove email by ajax call
     */
    public removeEmail() {
        this._delete(UrlAjax.deleteUserEmail);
    }
}
