/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="datatables.net" />
/// <reference types="jquery.blockui" />
/// <reference types="jqueryui" />
/// <reference types="bootstrap" />
/// <reference types="select2" />
export declare var GG_MAPS_LOADED: boolean;
export declare function isNotSet(prop: any): boolean;
export declare function areNotSet(array: []): boolean;
export declare function isSet(prop: any): boolean;
export declare function areSet(): boolean;
export declare function isDef(prop: any): boolean;
export declare function areDef(): boolean;
export declare function isUnDef(prop: any): boolean;
export declare function areUnDef(): boolean;
export declare function forEach(array: [], callback: Function): void;
export declare function filter(array: [], condition: any): [];
/**
 * Generate uuid
 */
export declare function uuidv4(): string;
export declare function unique(array: []): [];
export declare function shuffle(array: []): [];
export declare function isEmpty(obj: {}): boolean;
/**
 * Return true if prop is a boolean
 * @param prop
 * @returns {boolean}
 */
export declare function isBoolean(prop: any): boolean;
/**
 * Return true if prop is a string
 * @param prop
 * @returns {boolean}
 */
export declare function isString(prop: any): boolean;
/**
 * Return true if prop is a number
 * @param prop
 * @returns {boolean}
 */
export declare function isNumber(prop: any): boolean;
/**
 * Check if n is an int
 * @returns {boolean}
 * @param n
 */
export declare function isInt(n: number): boolean;
/**
 * Return string with two decimal
 * @param n: string representing a number
 * @returns string
 */
export declare function parseDecimal(n: number): string;
/**
 * Return string formatted to float
 * @param str: string representing a number
 * @returns string
 */
export declare function formatToStrFloat(str: JQuery<HTMLElement>): string;
/**
 * Return an offset number based on UTC timezone
 * @returns number
 */
export declare function getLocalTimezone(): number;
/**
 * Make the input extensible
 * @param inputSelector: to extent and reduce width
 * @param selectorHidden: to get width
 */
export declare function initTextWidthFunction(inputSelector: JQuery, selectorHidden: JQuery): void;
export declare function formatFloat(float: number): string;
/**
 * Check if browser is IE
 */
export declare function isIEbrowser(): boolean;
/**
 * Calculate fees
 */
export declare function calculateReloadingFees(amount: number): number;
/**
 * Make the label and input red, and display message
 * @param $wrapper
 * @param message
 */
export declare function createFormError($wrapper: any, message: string): void;
/**
 * Get the iban formatted and prevent bad characters
 * @param value
 */
export declare function getFormattedIban(value: string): string;
/**
 * Check if object is iterable
 * @param obj
 * @return boolean
 */
export declare function isIterable(obj: {}): boolean;
/**
 * convert string as boolean
 * @return boolean
 * @param str
 */
export declare function strToBoolean(str: string): boolean;
/**
 * Get a value by the key in array
 * @param array
 * @param keyToFind
 * @param valueToFind
 */
export declare function getValueByKeyInArray(array: [], keyToFind: string, valueToFind: string): any;
/**
 * Find if a selector is from same family or equals to itself
 * @param target
 * @param parentDiv
 */
export declare function isSelectorSameFamily(target: any, parentDiv: any): any;
/**
 * Get a query parameter with a specific name
 * @param name
 */
export declare function getUrlQueryParams(name: string): string;
/**
 * Get function
 * @param iteretable
 * @param indexes
 * @param defaultValue
 */
export declare function get(iteretable?: Array<any> | Object, indexes?: string[], defaultValue?: any): any;
/**
 * Check if key exists inside object
 * @returns {boolean}
 * @param arrayToParse
 * @param key
 */
export declare function keyExists(arrayToParse: {}, key: string): boolean;
/**
 * Remove a list of key(s) from an object
 * @returns {boolean}
 * @param arrayToParse
 * @param keysToRemove
 */
export declare function removeKeys(arrayToParse: {}, keysToRemove: string[]): {};
/**
 * Remove a key from an object
 * @returns {boolean}
 * @param arrayToParse
 * @param keyToRemove
 */
export declare function removeKey(arrayToParse: {}, keyToRemove: string): {};
/**
 * Close a dropdown (.close_dropdown) when clicking outside
 * Add .protected_dropdown to parent(s) to exclude
 */
export declare function closeDropdown(callback?: Function): void;
/**
 * Copy ID of the missions in a clipBoard
 * @param copySelector name of the input
 */
export declare function copyClipboard(copySelector: JQuery): void;
/**
 * Bind tooltips
 * @param $selector
 *
 */
export declare function bindTooltip($selector: JQuery<HTMLElement>): void;
/**
 * Bind popover to a selector
 * @param $selector name of the input
 */
export declare function bindPopover($selector: JQuery<HTMLElement>): void;
/**
 * Replace the flags in the str by the args with its keys
 * @param str
 * @param args
 */
export declare function formatString(str: string, args: string[]): string;
export declare function deepClone(obj: any): any;
/**
 * Get key based on its value
 * */
export declare function getKeyByValue(object: {}, value: any): string;
/**
 * Capitalize a character.
 */
export declare function capitalize(str: string): string;
/**
 * Check the instance of the array items
 *
 * @param arr
 * @param type
 */
export declare function checkArrayInstance(arr: [], type?: string): boolean;
/**
 * Merge 2 array of dict based on their ids
 *
 * @param firstArr
 * @param secondArr
 */
export declare function mergeDictArray(firstArr: {
    _id: string;
}[], secondArr: {
    _id: string;
}[]): {
    _id: string;
}[];
/**
 * Render into the JS console the array "yper_errors" stock into the window object
 */
export declare function renderErrors(): void;
/**
 *
 * @param list
 */
export declare function cleanArray(list: any[]): any[];
/**
 * Download resource based on an URI
 *
 * @param uri
 * @param name
 */
export declare function downloadURI(uri: string, name?: string): void;
