/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
import { AbstractLib } from "../libs/abstract_lib";
export default class ProviderController extends AbstractLib {
    /**
     *
     * @constructor
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Get provider list
     */
    getProviderList(): Promise<any>;
    /**
     * Get provider stats
     */
    getProviderStats(): Promise<any>;
    /**
     * Get provider hub stats
     */
    getProviderHubStats(): Promise<any>;
}