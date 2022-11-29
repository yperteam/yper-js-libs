/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="datatables.net" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
/// <reference types="select2" />
import { AbstractLib } from "../libs/abstract_lib";
export default class AdminController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Send Message to user(s)
     */
    postMessage(): Promise<any>;
    /**
     * Reactivate User
     */
    reactivateUser(): Promise<any>;
}
