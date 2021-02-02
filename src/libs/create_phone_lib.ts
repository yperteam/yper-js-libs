import { UrlAjax } from "@yper-script/enums/GenericEnums";
import { AbstractLib } from "@yper-script/libs/abstract_lib";
import { CallbackHelper } from "@yper-script/helpers/callback_helper";

/**
 * CreatePhoneLib object
 */
export default class CreatePhoneLib extends AbstractLib {
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
     * create phone by ajax call
     */
    public async createPhoneNumber() {
        return this._putPromise(UrlAjax.postUserPhone);
    }
}
