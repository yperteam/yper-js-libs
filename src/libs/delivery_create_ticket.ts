import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";
import CallbackHelper  from "../helpers/callback_helper";

/**
 * DeliveryCreateTicket object
 */
export default class DeliveryCreateTicket extends AbstractLib {
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
     * Create a ticket by ajax call
     */
    public async createTicket() {
        return this._postPromise(UrlAjax.pathDeliveryTicket);
    }
}
