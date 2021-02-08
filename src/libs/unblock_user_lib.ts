import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";

/**
 * UnblockUserLib object
 */
export default class UnblockUserLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * Ajax Call
     */
    public async unblockUser() {
        return this._postPromise(UrlAjax.postUnblockUser);
    }
}
