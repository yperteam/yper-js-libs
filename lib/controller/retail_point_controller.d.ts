/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
import { AbstractLib } from "../libs/abstract_lib";
export default class RetailPointController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * search retail point
     */
    search(): Promise<any>;
    /**
     * Get RetailPoint
     */
    getRetailPoint(): Promise<any>;
}
