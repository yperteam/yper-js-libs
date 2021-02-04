import { UrlAjax } from "@yper-script/enums/GenericEnums";
import { AbstractLib } from "@yper-script/libs/abstract_lib";
import CallbackHelper  from "@yper-script/helpers/callback_helper";

/**
 * CreateEmailLib object
 */
export default class CreateEmailLib extends AbstractLib {
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
     * create email by ajax call
     */
    public async createEmail() {
        return this._putPromise(UrlAjax.postUserEmail);
    }
}
