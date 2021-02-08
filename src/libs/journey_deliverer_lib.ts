import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";

/**
 * JourneyDelivererLib object
 */
export default class JourneyDelivererLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    public async postJourneyDeliverer() {
        return this._postPromise(UrlAjax.postJourneyDeliverer);
    }
}
