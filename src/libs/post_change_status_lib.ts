import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";
import CallbackHelper  from "../helpers/callback_helper";

/**
 * PostChangeStatusLib object
 */
export default class PostChangeStatusLib extends AbstractLib {
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
     * Change status by ajax call
     */
    public async changeStatus() {
        return this._postPromise(UrlAjax.postStatusChange);
    }
}
