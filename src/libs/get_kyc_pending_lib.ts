import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";

/**
 * GetKycPendingLib object
 */
export default class GetKycPendingLib extends AbstractLib {
    /**
     * @constructor
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * getKycPending by ajax call
     */
    public async getKycPending() {
        return this._getPromise(UrlAjax.getKycPending);
    }
}
