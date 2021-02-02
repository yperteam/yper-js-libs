import { AbstractLib } from "@yper-script/libs/abstract_lib";
import { UrlAjax } from "@yper-script/enums/GenericEnums";

/**
 * RemoveLikeLib object
 */
export default class RemoveLikeLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * Remove like function
     */
    public async removeLike() {
        return this._deletePromise(UrlAjax.deleteRemoveLike);
    }
}
