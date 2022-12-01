/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
/// <reference types="datatables.net" />
/// <reference types="select2" />
import { AbstractLib } from "../libs/abstract_lib";
/**
 * UserController
 */
export default class UserController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Search
     */
    searchRetailPoint(): Promise<any>;
}
