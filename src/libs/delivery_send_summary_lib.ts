import { UrlAjax } from "@yper-script/enums/GenericEnums";
import { AbstractLib } from "@yper-script/libs/abstract_lib";

/**
 * DeliverySendSummaryLib object
 */
export default class DeliverySendSummaryLib extends AbstractLib {
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
    public async sendSummary() {
        return this._postPromise(UrlAjax.pathSendDeliverySummary);
    }
}
