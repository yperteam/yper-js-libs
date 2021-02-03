export var GG_MAPS_LOADED = false;

export function isNotSet(prop: any): boolean {
    return isUnDef(prop) || !prop;
}

export function areNotSet(array: []): boolean {
    for (var i = 0; i < array.length; i++) {
        if (!isNotSet(array[i])) {
            return false;
        }
    }

    return true;
}

export function isSet(prop: any): boolean {
    return isDef(prop) && prop;
}

export function areSet(): boolean {
    for (var i = 0; i < arguments.length; i++) {
        if (!isSet(arguments[i])) {
            return false;
        }
    }

    return true;
}

export function isDef(prop: any) {
    return typeof prop != "undefined";
}

export function areDef() {
    for (var i = 0; i < arguments.length; i++) {
        if (!isDef(arguments[i])) {
            return false;
        }
    }

    return true;
}

export function isUnDef(prop: any) {
    return !isDef(prop);
}

export function areUnDef() {
    for (var i = 0; i < arguments.length; i++) {
        if (!isUnDef(arguments[i])) {
            return false;
        }
    }

    return true;
}

export function forEach(array: [], callback: Function) {
    for (var i = 0; i < array.length; i++) {
        var res = callback(array[i], i);

        if (res == -1) {
            break;
        }
    }
}

export function filter(array: [], condition: any): [] {
    let results: [] = [];

    for (var i = 0; i < array.length; i++) {
        if (condition(array[i], i, array)) {
            results.push(array[i]);
        }
    }

    return results;
}

/**
 * Generate uuid
 */
export function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        let r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function unique(array: []) {
    // @ts-ignore
    return filter(array, (x, i, a) => a.indexOf(x) == i);
}

export function shuffle(array: []) {
    forEach(array, (value: any, i: number) => {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = array[randomIndex];

        array[randomIndex] = array[i];
        array[i] = itemAtIndex;
    });

    return array;
}

export function isEmpty(obj: {}) {
    for (let key in obj) return false;
    return true;
}

/**
 * Return true if prop is a boolean
 * @param prop
 * @returns {boolean}
 */
export function isBoolean(prop: any): boolean {
    return typeof prop == "boolean";
}

/**
 * Return true if prop is a string
 * @param prop
 * @returns {boolean}
 */
export function isString(prop: any): boolean {
    return typeof prop == "string";
}

/**
 * Return true if prop is a number
 * @param prop
 * @returns {boolean}
 */
export function isNumber(prop: any): boolean {
    return typeof prop == "number";
}

/**
 * Check if n is an int
 * @returns {boolean}
 * @param n
 */
export function isInt(n: number) {
    return Number(n) === n && n % 1 === 0;
}

/**
 * Return string with two decimal
 * @param n: string representing a number
 * @returns string
 */
export function parseDecimal(n: number) {
    return parseFloat((Math.round(n * 100) / 100).toString())
        .toFixed(2)
        .toString()
        .replace(".", ",");
}

/**
 * Return string formatted to float
 * @param str: string representing a number
 * @returns string
 */
export function formatToStrFloat(str: JQuery<HTMLElement>) {
    return str
        .text()
        .toString()
        .replace(",", ".");
}

/**
 * Return an offset number based on UTC timezone
 * @returns number
 */
export function getLocalTimezone() {
    const timezoneOffsetMinutes = new Date().getTimezoneOffset();
    return timezoneOffsetMinutes === 0 ? 0 : -timezoneOffsetMinutes;
}

/**
 * Make the input extensible
 * @param inputSelector: to extent and reduce width
 * @param selectorHidden: to get width
 */
export function initTextWidthFunction(
    inputSelector: JQuery,
    selectorHidden: JQuery
) {
    $(() => {
        // @ts-ignore
        selectorHidden.text(inputSelector.val());
        inputSelector.width(selectorHidden.width());
    })
        .on("input", () => {
            // @ts-ignore
            selectorHidden.text(inputSelector.val());
            inputSelector.width(selectorHidden.width());
        })
        .trigger("input");
}

export function formatFloat(float: number) {
    return float.toFixed(2).replace(".", ",");
}

/**
 * Check if browser is IE
 */
export function isIEbrowser() {
    return /MSIE|Trident/.test(window.navigator.userAgent);
}

/**
 * Calculate fees
 */
export function calculateReloadingFees(amount: number) {
    return 5 + amount * 0.015;
}

/**
 * Make the label and input red, and display message
 * @param $wrapper
 * @param message
 */
export function createFormError($wrapper: any, message: string) {
    $wrapper.addClass("error");
    $wrapper.find($("ul")).text(message);
}

/**
 * Get the iban formatted and prevent bad characters
 * @param value
 */
export function getFormattedIban(value: string) {
    return value
        .replace(/[^\da-zA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .toUpperCase();
}

/**
 * Check if object is iterable
 * @param obj
 * @return boolean
 */
export function isIterable(obj: {}) {
    // checks for null and undefined
    if (obj === null) {
        return false;
    }
    return typeof obj === "object" || Array.isArray(obj);
}

/**
 * convert string as boolean
 * @return boolean
 * @param str
 */
export function strToBoolean(str: string) {
    return str === "true";
}

/**
 * Get a value by the key in array
 * @param array
 * @param keyToFind
 * @param valueToFind
 */
export function getValueByKeyInArray(array: [], keyToFind: string, valueToFind: string): any {
    for (let [key, value] of Object.entries(array)) {
        const iteration = value[keyToFind];

        if (isSet(iteration) && iteration === valueToFind) {
            return value;
        } else if (isIterable(value)) {
            return getValueByKeyInArray(value, keyToFind, valueToFind);
        }
    }
}

/**
 * Find if a selector is from same family or equals to itself
 * @param target
 * @param parentDiv
 */
export function isSelectorSameFamily(target: any, parentDiv: any) {
    return parentDiv.find(target).length > 0 || target.is(parentDiv);
}

/**
 * Get a query parameter with a specific name
 * @param name
 */
export function getUrlQueryParams(name: string) {
    const q = window.location.search.match(new RegExp(`[?&]${name}=([^&#]*)`));
    return q && q[1];
}

// @ts-ignore
/**
 * Get function
 * @param iteretable
 * @param indexes
 * @param defaultValue
 */
export function get(
    iteretable?: Array<any> | Object,
    indexes?: string[],
    // @ts-ignore
    defaultValue = null
): any {
    // @ts-ignore
    if (iteretable[indexes[0]] !== undefined) {
        // @ts-ignore
        if (isIterable(iteretable[indexes[0]]) && indexes.length > 1) {
            // @ts-ignore
            return get(iteretable[indexes[0]], indexes.slice(1), defaultValue);
        } else {
            // @ts-ignore
            return iteretable[indexes[0]];
        }
    } else {
        return defaultValue;
    }
}

/**
 * Check if key exists inside object
 * @returns {boolean}
 * @param arrayToParse
 * @param key
 */
export function keyExists(arrayToParse: {}, key: string) {
    if (arrayToParse instanceof Object) {
        return key in arrayToParse;
    }

    return false;
}

/**
 * Remove a list of key(s) from an object
 * @returns {boolean}
 * @param arrayToParse
 * @param keysToRemove
 */
export function removeKeys(arrayToParse: {}, keysToRemove: string[]) {
    if (keysToRemove.length > 0) {
        keysToRemove.forEach(key => {
            arrayToParse = removeKey(arrayToParse, key);
        });
    }

    return arrayToParse;
}

/**
 * Remove a key from an object
 * @returns {boolean}
 * @param arrayToParse
 * @param keyToRemove
 */
export function removeKey(arrayToParse: {}, keyToRemove: string) {
    // @ts-ignore
    if (arrayToParse[keyToRemove] !== undefined) {
        // @ts-ignore
        delete arrayToParse[keyToRemove];
    }

    return arrayToParse;
}

/**
 * Close a dropdown (.close_dropdown) when clicking outside
 * Add .protected_dropdown to parent(s) to exclude
 */
export function closeDropdown(callback: Function = null) {
    const closeDropdown = $(".close_dropdown");

    $(document).on("click", e => {
        const $target = $(e.target);

        if (
            !$target.closest(".close_dropdown").length &&
            closeDropdown.is(":visible") &&
            !$target.hasClass("protected_dropdown") &&
            $target.parents(".protected_dropdown").length === 0
        ) {
            closeDropdown.removeClass("show");
            if (callback instanceof Function) {
                return callback();
            }
        }
    });
}

/**
 * Copy ID of the missions in a clipBoard
 * @param copySelector name of the input
 */
export function copyClipboard(copySelector: JQuery) {
    copySelector.on("click", e => {
        $(e.currentTarget).select();
        document.execCommand("copy");
    });
}

/**
 * Bind tooltips
 * @param $selector
 *
 */
export function bindTooltip($selector: JQuery<HTMLElement>) {
    $selector.tooltip();
    $selector.on("click", e => {
        $selector.tooltip("hide");
    });
}

/**
 * Bind popover to a selector
 * @param $selector name of the input
 */
export function bindPopover($selector: JQuery<HTMLElement>) {
    $selector.popover({
        html: true,
    });
    console.log('toto');
    $('body').on('click', e => {
        $selector.each(function () {
            if (!$selector.is(e.target) && $selector.has(e.target).length === 0 && $selector.has(e.target).length === 0) {
                $selector.popover('hide');
            }
        });
    });
}

/**
 * Replace the flags in the str by the args with its keys
 * @param str
 * @param args
 */
export function formatString(str: string, args: string[]) {
    if (args !== null && args.length) {
        for (let i = 0; i < args.length; i++) {
            str = str.replace(new RegExp("\\{" + i + "\\}", "gi"), args[i]);
        }
    }
    return str;
}

// TODO: to test
export function deepClone(obj: any) {
    if (obj === null || typeof obj !== "object") return obj;
    var props = Object.getOwnPropertyDescriptors(obj);
    for (var prop in props) {
        props[prop].value = deepClone(props[prop].value);
    }
    return Object.create(Object.getPrototypeOf(obj), props);
}

/**
 * Get key based on its value
 * */
export function getKeyByValue(object: {}, value: any) {
    // @ts-ignore
    return Object.keys(object).find(key => object[key] === value);
}

/**
 * Capitalize a character.
 */
export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Check the instance of the array items
 *
 * @param arr
 * @param type
 */
export function checkArrayInstance(arr: [], type: string = "string") {
    return arr.every(i => typeof i === type);
}

/**
 * Merge 2 array of dict based on their ids
 *
 * @param firstArr
 * @param secondArr
 */
export function mergeDictArray(
    firstArr: { _id: string }[],
    secondArr: { _id: string }[]
) {
    let res = [];

    for (const [mainKey, mainVal] of Object.entries(firstArr)) {
        for (const [secondKey, secondVal] of Object.entries(secondArr)) {
            if (secondVal._id === mainVal._id) {
                res.push({...mainVal, ...secondVal});
            }
        }
    }

    return res;
}

/**
 * Render into the JS console the array "yper_errors" stock into the window object
 */
export function renderErrors(): void {
    // @ts-ignore
    const errors = window.yper_errors;

    if (!Array.isArray(errors)) {
        return null;
    }
    errors.map(error => {
        console.log(error);
    });
}

/**
 *
 * @param list
 */
export function cleanArray(list: any[]) {
    return list.filter(arg => {
        return arg != null;
    });
}

/**
 * Download resource based on an URI
 *
 * @param uri
 * @param name
 */
export function downloadURI(uri: string, name = Math.random().toString(12)) {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove();
}
