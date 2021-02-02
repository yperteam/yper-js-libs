import { UrlAjax } from "@yper-script/enums/GenericEnums";
import { AbstractLib } from "@yper-script/libs/abstract_lib";

/**
 * PostImpersonateLib object
 */
export default class PostImpersonateLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * Add your password an user by ajax call
     */
    public async postImpersonate() {
        return this._postPromise(UrlAjax.postUserImpersonate);
    }
}
