import { UrlAjax } from "../enums/GenericEnums";
import { AbstractLib } from "../libs/abstract_lib";
import CallbackHelper  from "../helpers/callback_helper";

/**
 * GetTicketMessage object
 */
export default class GetTicketMessage extends AbstractLib {
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
     * get ticket messages by ajax call
     *
     * @return TicketMessageEntity[]
     */
    public async getTicketMessages() {
        return this._getPromise(UrlAjax.pathTicketMessage);
    }
}
