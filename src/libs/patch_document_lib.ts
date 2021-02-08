import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";

/**
 * Patch Document object
 */
export default class PatchDocumentLib extends AbstractLib {
    /**
     * @constructor
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * patch Document by ajax call
     */
    public async patchDocument() {
        return this._postPromise(UrlAjax.patchDocument);
    }
}
