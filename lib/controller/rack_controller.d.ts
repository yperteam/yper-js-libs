/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
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