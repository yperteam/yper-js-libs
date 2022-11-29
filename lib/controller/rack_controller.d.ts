/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="datatables.net" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
/// <reference types="select2" />
import { AbstractLib } from "../libs/abstract_lib";
export default class RackController extends AbstractLib {
    /**
     * @constructor
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Get rack
     */
    getRack(): Promise<any>;
    /**
     * Get rack position
     */
    getRackPosition(): Promise<any>;
}
