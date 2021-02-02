import { UrlAjax } from "@yper-script/enums/GenericEnums";
import { AbstractLib } from "@yper-script/libs/abstract_lib";

/**
 * BlockUser object
 */
export default class BlockUserLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * Send the delivery summary
     */
    public async blockUser() {
        return this._postPromise(UrlAjax.postBlockUser);
    }
}
