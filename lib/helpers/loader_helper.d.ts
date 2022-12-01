/// <reference types="jquery" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
/// <reference types="datatables.net" />
/// <reference types="select2" />
/**
 * Create a loader with a selector and attach it an id
 */
export declare class LoaderHelper {
    private selector;
    private readonly id;
    private readonly text;
    constructor(selector: JQuery, text?: string);
    initLoader(): void;
    setSelector(selector: JQuery): void;
    hideLoader(): void;
}
