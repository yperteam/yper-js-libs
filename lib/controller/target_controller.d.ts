/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="datatables.net" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
/// <reference types="select2" />
import { AbstractLib } from "../libs/abstract_lib";
/**
 * UserController
 */
export default class TargetController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Get all Targets
     */
    getTargets(): Promise<any>;
    /**
     * Get target Category
     */
    getTargetCategory(): Promise<any>;
    /**
     * Get Target
     */
    getTarget(): Promise<any>;
    /**
     * Execute Target
     */
    executeTarget(): Promise<any>;
    /**
     * Preview Target
     */
    previewTarget(): Promise<any>;
}
