import { UrlAjax } from "@yper-script/enums/GenericEnums";
import { AbstractLib } from "@yper-script/libs/abstract_lib";
import { CallbackHelper } from "@yper-script/helpers/callback_helper";

/**
 * CreateAddress object
 */
export default class UpdateDeliveryLib extends AbstractLib {
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
     * Update mission information
     */
    public async patchDelivery() {
        return this._putPromise(UrlAjax.patchDelivery);
    }
}
