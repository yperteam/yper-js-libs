import { UrlAjax } from "@yper-script/enums/GenericEnums";
import { AbstractLib } from "@yper-script/libs/abstract_lib";

/**
 * GetUserBlockDeliveriesLib object
 */
export default class GetUserBlockDeliveriesLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    public async getUserBlockDeliveries() {
        return this._postPromise(UrlAjax.userBlockDeliveries);
    }
}
