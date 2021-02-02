/**
 * Refuse Document object
 */
import { CallbackHelper } from "@yper-script/helpers/callback_helper";
import { AbstractLib } from "@yper-script/libs/abstract_lib";
import { UrlAjax } from "@yper-script/enums/GenericEnums";

export default class RefuseDocumentRefuseLib extends AbstractLib {
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
     * postDocumentRefuse
     */
    public async postDocumentRefuse() {
        return this._postPromise(UrlAjax.postDocumentRefuse);
    }
}
