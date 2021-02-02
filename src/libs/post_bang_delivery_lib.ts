import { UrlAjax } from "@yper-script/enums/GenericEnums";
import { AbstractLib } from "@yper-script/libs/abstract_lib";

/**
 * PostBangDeliveryLib object
 */
export default class PostBangDeliveryLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * Bang delivery by ajax call
     */
    public async bangDelivery() {
        return this._postPromise(UrlAjax.postBangDelivery);
    }
}
