import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";

/**
 * DeliveryCreateTicket object
 */
export default class UserCreateTicket extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * Create a ticket by ajax call
     */
    public async createTicket() {
        return this._postPromise(UrlAjax.userTicket);
    }
}
