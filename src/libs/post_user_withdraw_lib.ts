import { UrlAjax } from "@yper-script/enums/GenericEnums";
import { AbstractLib } from "@yper-script/libs/abstract_lib";

/**
 * PostUserWithdrawLib object
 */
export default class PostUserWithdrawLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * withdraw user amount by ajax call
     */
    public async withdraw() {
        return this._postPromise(UrlAjax.postUserWithdraw);
    }
}
