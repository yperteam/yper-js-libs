/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
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
