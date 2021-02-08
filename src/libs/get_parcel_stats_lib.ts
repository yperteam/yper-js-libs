import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";

/**
 * GetParcelStatsLib object
 */
export default class GetParcelStatsLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * get parcel stats by ajax call
     */
    public async getParcelStats() {
        return this._getPromise(UrlAjax.getAdminParcelStats);
    }
}
