import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";

/**
 * GetJourneyStatsLib object
 */
export default class GetJourneyStatsLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * get journey stats by ajax call
     */
    public async getJourneyStats() {
        return this._getPromise(UrlAjax.getAdminJourneyStats);
    }
}
