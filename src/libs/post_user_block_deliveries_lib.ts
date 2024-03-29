import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";

/**
 * PostUserBlockDeliveriesLib object
 */
export default class PostUserBlockDeliveriesLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    public async postUserBlockDeliveries() {
        return this._postPromise(UrlAjax.userBlockDeliveries);
    }
}
