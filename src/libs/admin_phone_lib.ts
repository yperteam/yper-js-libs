import { CallbackHelper } from "@yper-script/helpers/callback_helper";
import { AbstractLib } from "@yper-script/libs/abstract_lib";
import { UrlAjax } from "@yper-script/enums/GenericEnums";

/**
 * AdminPhoneLib object
 */
export default class AdminPhoneLib extends AbstractLib {
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
     * phone function
     */
    public async adminCall() {
        return this._postPromise(UrlAjax.postAdminCall);
    }
}
