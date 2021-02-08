import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";

/**
 * DeleteBlockDeliveriesLib object
 */
export default class DeleteBlockDeliveriesLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    public async deleteBlockDeliveries() {
        return this._deletePromise(UrlAjax.deleteBlockDeliveries);
    }
}
