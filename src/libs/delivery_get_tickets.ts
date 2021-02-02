import { UrlAjax } from "@yper-script/enums/GenericEnums";
import { AbstractLib } from "@yper-script/libs/abstract_lib";

/**
 * DeliveryGetTickets object
 */
export default class DeliveryGetTickets extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * get delivery tickets by ajax call
     */
    public async getDeliveryTickets() {
        return this._getPromise(UrlAjax.pathDeliveryTicket);
    }
}
