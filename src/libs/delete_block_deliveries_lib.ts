import { UrlAjax } from "@yper-script/enums/GenericEnums";
import { AbstractLib } from "@yper-script/libs/abstract_lib";

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
