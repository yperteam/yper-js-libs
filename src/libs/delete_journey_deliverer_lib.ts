import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";

/**
 * DeleteJourneyDelivererLib object
 */
export default class DeleteJourneyDelivererLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * Remove the deliverer of the journey
     */
    public async deleteDeliverer() {
        return this._deletePromise(UrlAjax.deleteJourneyDeliverer);
    }
}
