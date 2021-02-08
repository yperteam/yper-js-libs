import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";

/**
 * GetKycStatsLib object
 */
export default class GetKycStatsLib extends AbstractLib {
    /**
     * @constructor
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * getKycStats by ajax call
     */
    public async getKycStats() {
        return this._getPromise(UrlAjax.getKycStats);
    }
}
