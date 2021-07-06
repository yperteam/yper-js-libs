import {AbstractLib} from "../libs/abstract_lib";
import {ApiAdminEnum} from "../enums/api_url_enum";

export default class AdminController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor(
        $elem: JQuery<HTMLElement> | null = null
    ) {
        super();
        this.setLoader($elem);
    }

    /**
     * Send Message to user(s)
     */
    public async postMessage(): Promise<any> {
        return this._postPromise(ApiAdminEnum.send_admin_message);
    }
}