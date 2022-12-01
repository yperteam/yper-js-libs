/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
/// <reference types="datatables.net" />
/// <reference types="select2" />
import { AbstractLib } from "../libs/abstract_lib";
export default class ProController extends AbstractLib {
    /**
     *
     * @constructor
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Get pro infos
     */
    getPro(): Promise<any>;
}
