/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
import { AbstractLib } from "../libs/abstract_lib";
export default class LegalDocumentController extends AbstractLib {
    /**
     *
     * @param $elem
     */
    constructor($elem?: JQuery<HTMLElement> | null);
    /**
     * Get Availability Color
     */
    deleteDocument(): Promise<any>;
}
