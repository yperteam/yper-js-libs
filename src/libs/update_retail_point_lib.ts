import { UrlAjax } from "@yper-script/enums/GenericEnums";
import { AbstractLib } from "@yper-script/libs/abstract_lib";

/**
 * UpdateRetailPointLib object
 */
export default class UpdateRetailPointLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * Update rp information
     */
    public async update() {
        return this._putPromise(UrlAjax.putRetailPoint);
    }
}
