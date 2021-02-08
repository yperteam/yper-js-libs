import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";
import CallbackHelper  from "../helpers/callback_helper";

/**
 * GetDeliveriesStatsLib object
 */
export default class GetDeliveriesStatsLib extends AbstractLib {
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
     * get deliveries stats by ajax call
     */
    public async getDeliveriesStats() {
        return this._getPromise(UrlAjax.getDeliveriesStats);
    }
}
