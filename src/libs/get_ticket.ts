import { UrlAjax } from "@yper-script/enums/GenericEnums";
import { AbstractLib } from "@yper-script/libs/abstract_lib";
import { CallbackHelper } from "@yper-script/helpers/callback_helper";

/**
 * GetTicket object
 */
export default class GetTicket extends AbstractLib {
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
     * get ticket by ajax call
     */
    public async getTicket() {
        return this._getPromise(UrlAjax.pathTicket);
    }
}
