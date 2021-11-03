/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
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
