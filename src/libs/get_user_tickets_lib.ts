import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";

/**
 * GetUserTicketsLib object
 */
export default class GetUserTicketsLib extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem: JQuery<HTMLElement> | null = null) {
        super();
        this.setLoader($elem);
    }

    /**
     * get user tickets by ajax call
     */
    public async getUserTickets() {
        return this._getPromise(UrlAjax.userTicket);
    }
}
