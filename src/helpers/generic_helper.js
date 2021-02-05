"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.downloadURI = exports.cleanArray = exports.renderErrors = exports.mergeDictArray = exports.checkArrayInstance = exports.capitalize = exports.getKeyByValue = exports.deepClone = exports.formatString = exports.bindPopover = exports.bindTooltip = exports.copyClipboard = exports.closeDropdown = exports.removeKey = exports.removeKeys = exports.keyExists = exports.get = exports.getUrlQueryParams = exports.isSelectorSameFamily = exports.getValueByKeyInArray = exports.strToBoolean = exports.isIterable = exports.getFormattedIban = exports.createFormError = exports.calculateReloadingFees = exports.isIEbrowser = exports.formatFloat = exports.initTextWidthFunction = exports.getLocalTimezone = exports.formatToStrFloat = exports.parseDecimal = exports.isInt = exports.isNumber = exports.isString = exports.isBoolean = exports.isEmpty = exports.shuffle = exports.unique = exports.uuidv4 = exports.filter = exports.forEach = exports.areUnDef = exports.isUnDef = exports.areDef = exports.isDef = exports.areSet = exports.isSet = exports.areNotSet = exports.isNotSet = exports.GG_MAPS_LOADED = void 0;
exports.GG_MAPS_LOADED = false;
function isNotSet(prop) {
    return isUnDef(prop) || !prop;
}
exports.isNotSet = isNotSet;
function areNotSet(array) {
    for (var i = 0; i < array.length; i++) {
        if (!isNotSet(array[i])) {
            return false;
        }
    }
    return true;
}
exports.areNotSet = areNotSet;
function isSet(prop) {
    return isDef(prop) && prop;
}
exports.isSet = isSet;
function areSet() {
    for (var i = 0; i < arguments.length; i++) {
        if (!isSet(arguments[i])) {
            return false;
        }
    }
    return true;
}
exports.areSet = areSet;
function isDef(prop) {
    return typeof prop != "undefined";
}
exports.isDef = isDef;
function areDef() {
    for (var i = 0; i < arguments.length; i++) {
        if (!isDef(arguments[i])) {
            return false;
        }
    }
    return true;
}
exports.areDef = areDef;
function isUnDef(prop) {
    return !isDef(prop);
}
exports.isUnDef = isUnDef;
function areUnDef() {
    for (var i = 0; i < arguments.length; i++) {
        if (!isUnDef(arguments[i])) {
            return false;
        }
    }
    return true;
}
exports.areUnDef = areUnDef;
function forEach(array, callback) {
    for (var i = 0; i < array.length; i++) {
        var res = callback(array[i], i);
        if (res == -1) {
            break;
        }
    }
}
exports.forEach = forEach;
function filter(array, condition) {
    var results = [];
    for (var i = 0; i < array.length; i++) {
        if (condition(array[i], i, array)) {
            results.push(array[i]);
        }
    }
    return results;
}
exports.filter = filter;
/**
 * Generate uuid
 */
function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.uuidv4 = uuidv4;
function unique(array) {
    // @ts-ignore
    return filter(array, function (x, i, a) { return a.indexOf(x) == i; });
}
exports.unique = unique;
function shuffle(array) {
    forEach(array, function (value, i) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = array[randomIndex];
        array[randomIndex] = array[i];
        array[i] = itemAtIndex;
    });
    return array;
}
exports.shuffle = shuffle;
function isEmpty(obj) {
    for (var key in obj)
        return false;
    return true;
}
exports.isEmpty = isEmpty;
/**
 * Return true if prop is a boolean
 * @param prop
 * @returns {boolean}
 */
function isBoolean(prop) {
    return typeof prop == "boolean";
}
exports.isBoolean = isBoolean;
/**
 * Return true if prop is a string
 * @param prop
 * @returns {boolean}
 */
function isString(prop) {
    return typeof prop == "string";
}
exports.isString = isString;
/**
 * Return true if prop is a number
 * @param prop
 * @returns {boolean}
 */
function isNumber(prop) {
    return typeof prop == "number";
}
exports.isNumber = isNumber;
/**
 * Check if n is an int
 * @returns {boolean}
 * @param n
 */
function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}
exports.isInt = isInt;
/**
 * Return string with two decimal
 * @param n: string representing a number
 * @returns string
 */
function parseDecimal(n) {
    return parseFloat((Math.round(n * 100) / 100).toString())
        .toFixed(2)
        .toString()
        .replace(".", ",");
}
exports.parseDecimal = parseDecimal;
/**
 * Return string formatted to float
 * @param str: string representing a number
 * @returns string
 */
function formatToStrFloat(str) {
    return str
        .text()
        .toString()
        .replace(",", ".");
}
exports.formatToStrFloat = formatToStrFloat;
/**
 * Return an offset number based on UTC timezone
 * @returns number
 */
function getLocalTimezone() {
    var timezoneOffsetMinutes = new Date().getTimezoneOffset();
    return timezoneOffsetMinutes === 0 ? 0 : -timezoneOffsetMinutes;
}
exports.getLocalTimezone = getLocalTimezone;
/**
 * Make the input extensible
 * @param inputSelector: to extent and reduce width
 * @param selectorHidden: to get width
 */
function initTextWidthFunction(inputSelector, selectorHidden) {
    $(function () {
        // @ts-ignore
        selectorHidden.text(inputSelector.val());
        inputSelector.width(selectorHidden.width());
    })
        .on("input", function () {
        // @ts-ignore
        selectorHidden.text(inputSelector.val());
        inputSelector.width(selectorHidden.width());
    })
        .trigger("input");
}
exports.initTextWidthFunction = initTextWidthFunction;
function formatFloat(float) {
    return float.toFixed(2).replace(".", ",");
}
exports.formatFloat = formatFloat;
/**
 * Check if browser is IE
 */
function isIEbrowser() {
    return /MSIE|Trident/.test(window.navigator.userAgent);
}
exports.isIEbrowser = isIEbrowser;
/**
 * Calculate fees
 */
function calculateReloadingFees(amount) {
    return 5 + amount * 0.015;
}
exports.calculateReloadingFees = calculateReloadingFees;
/**
 * Make the label and input red, and display message
 * @param $wrapper
 * @param message
 */
function createFormError($wrapper, message) {
    $wrapper.addClass("error");
    $wrapper.find($("ul")).text(message);
}
exports.createFormError = createFormError;
/**
 * Get the iban formatted and prevent bad characters
 * @param value
 */
function getFormattedIban(value) {
    return value
        .replace(/[^\da-zA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .toUpperCase();
}
exports.getFormattedIban = getFormattedIban;
/**
 * Check if object is iterable
 * @param obj
 * @return boolean
 */
function isIterable(obj) {
    // checks for null and undefined
    if (obj === null) {
        return false;
    }
    return typeof obj === "object" || Array.isArray(obj);
}
exports.isIterable = isIterable;
/**
 * convert string as boolean
 * @return boolean
 * @param str
 */
function strToBoolean(str) {
    return str === "true";
}
exports.strToBoolean = strToBoolean;
/**
 * Get a value by the key in array
 * @param array
 * @param keyToFind
 * @param valueToFind
 */
function getValueByKeyInArray(array, keyToFind, valueToFind) {
    for (var _i = 0, _a = Object.entries(array); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var iteration = value[keyToFind];
        if (isSet(iteration) && iteration === valueToFind) {
            return value;
        }
        else if (isIterable(value)) {
            return getValueByKeyInArray(value, keyToFind, valueToFind);
        }
    }
}
exports.getValueByKeyInArray = getValueByKeyInArray;
/**
 * Find if a selector is from same family or equals to itself
 * @param target
 * @param parentDiv
 */
function isSelectorSameFamily(target, parentDiv) {
    return parentDiv.find(target).length > 0 || target.is(parentDiv);
}
exports.isSelectorSameFamily = isSelectorSameFamily;
/**
 * Get a query parameter with a specific name
 * @param name
 */
function getUrlQueryParams(name) {
    var q = window.location.search.match(new RegExp("[?&]" + name + "=([^&#]*)"));
    return q && q[1];
}
exports.getUrlQueryParams = getUrlQueryParams;
// @ts-ignore
/**
 * Get function
 * @param iteretable
 * @param indexes
 * @param defaultValue
 */
function get(iteretable, indexes, 
// @ts-ignore
defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    // @ts-ignore
    if (iteretable[indexes[0]] !== undefined) {
        // @ts-ignore
        if (isIterable(iteretable[indexes[0]]) && indexes.length > 1) {
            // @ts-ignore
            return get(iteretable[indexes[0]], indexes.slice(1), defaultValue);
        }
        else {
            // @ts-ignore
            return iteretable[indexes[0]];
        }
    }
    else {
        return defaultValue;
    }
}
exports.get = get;
/**
 * Check if key exists inside object
 * @returns {boolean}
 * @param arrayToParse
 * @param key
 */
function keyExists(arrayToParse, key) {
    if (arrayToParse instanceof Object) {
        return key in arrayToParse;
    }
    return false;
}
exports.keyExists = keyExists;
/**
 * Remove a list of key(s) from an object
 * @returns {boolean}
 * @param arrayToParse
 * @param keysToRemove
 */
function removeKeys(arrayToParse, keysToRemove) {
    if (keysToRemove.length > 0) {
        keysToRemove.forEach(function (key) {
            arrayToParse = removeKey(arrayToParse, key);
        });
    }
    return arrayToParse;
}
exports.removeKeys = removeKeys;
/**
 * Remove a key from an object
 * @returns {boolean}
 * @param arrayToParse
 * @param keyToRemove
 */
function removeKey(arrayToParse, keyToRemove) {
    // @ts-ignore
    if (arrayToParse[keyToRemove] !== undefined) {
        // @ts-ignore
        delete arrayToParse[keyToRemove];
    }
    return arrayToParse;
}
exports.removeKey = removeKey;
/**
 * Close a dropdown (.close_dropdown) when clicking outside
 * Add .protected_dropdown to parent(s) to exclude
 */
function closeDropdown(callback) {
    if (callback === void 0) { callback = null; }
    var closeDropdown = $(".close_dropdown");
    $(document).on("click", function (e) {
        var $target = $(e.target);
        if (!$target.closest(".close_dropdown").length &&
            closeDropdown.is(":visible") &&
            !$target.hasClass("protected_dropdown") &&
            $target.parents(".protected_dropdown").length === 0) {
            closeDropdown.removeClass("show");
            if (callback instanceof Function) {
                return callback();
            }
        }
    });
}
exports.closeDropdown = closeDropdown;
/**
 * Copy ID of the missions in a clipBoard
 * @param copySelector name of the input
 */
function copyClipboard(copySelector) {
    copySelector.on("click", function (e) {
        $(e.currentTarget).select();
        document.execCommand("copy");
    });
}
exports.copyClipboard = copyClipboard;
/**
 * Bind tooltips
 * @param $selector
 *
 */
function bindTooltip($selector) {
    $selector.tooltip();
    $selector.on("click", function (e) {
        $selector.tooltip("hide");
    });
}
exports.bindTooltip = bindTooltip;
/**
 * Bind popover to a selector
 * @param $selector name of the input
 */
function bindPopover($selector) {
    $selector.popover({
        html: true
    });
    $('body').on('click', function (e) {
        $selector.each(function () {
            if (!$selector.is(e.target) && $selector.has(e.target).length === 0 && $selector.has(e.target).length === 0) {
                $selector.popover('hide');
            }
        });
    });
}
exports.bindPopover = bindPopover;
/**
 * Replace the flags in the str by the args with its keys
 * @param str
 * @param args
 */
function formatString(str, args) {
    if (args !== null && args.length) {
        for (var i = 0; i < args.length; i++) {
            str = str.replace(new RegExp("\\{" + i + "\\}", "gi"), args[i]);
        }
    }
    return str;
}
exports.formatString = formatString;
// TODO: to test
function deepClone(obj) {
    if (obj === null || typeof obj !== "object")
        return obj;
    var props = Object.getOwnPropertyDescriptors(obj);
    for (var prop in props) {
        props[prop].value = deepClone(props[prop].value);
    }
    return Object.create(Object.getPrototypeOf(obj), props);
}
exports.deepClone = deepClone;
/**
 * Get key based on its value
 * */
function getKeyByValue(object, value) {
    // @ts-ignore
    return Object.keys(object).find(function (key) { return object[key] === value; });
}
exports.getKeyByValue = getKeyByValue;
/**
 * Capitalize a character.
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalize = capitalize;
/**
 * Check the instance of the array items
 *
 * @param arr
 * @param type
 */
function checkArrayInstance(arr, type) {
    if (type === void 0) { type = "string"; }
    return arr.every(function (i) { return typeof i === type; });
}
exports.checkArrayInstance = checkArrayInstance;
/**
 * Merge 2 array of dict based on their ids
 *
 * @param firstArr
 * @param secondArr
 */
function mergeDictArray(firstArr, secondArr) {
    var res = [];
    for (var _i = 0, _a = Object.entries(firstArr); _i < _a.length; _i++) {
        var _b = _a[_i], mainKey = _b[0], mainVal = _b[1];
        for (var _c = 0, _d = Object.entries(secondArr); _c < _d.length; _c++) {
            var _e = _d[_c], secondKey = _e[0], secondVal = _e[1];
            if (secondVal._id === mainVal._id) {
                res.push(__assign(__assign({}, mainVal), secondVal));
            }
        }
    }
    return res;
}
exports.mergeDictArray = mergeDictArray;
/**
 * Render into the JS console the array "yper_errors" stock into the window object
 */
function renderErrors() {
    // @ts-ignore
    var errors = window.yper_errors;
    if (!Array.isArray(errors)) {
        return null;
    }
    errors.map(function (error) {
        console.log(error);
    });
}
exports.renderErrors = renderErrors;
/**
 *
 * @param list
 */
function cleanArray(list) {
    return list.filter(function (arg) {
        return arg != null;
    });
}
exports.cleanArray = cleanArray;
/**
 * Download resource based on an URI
 *
 * @param uri
 * @param name
 */
function downloadURI(uri, name) {
    if (name === void 0) { name = Math.random().toString(12); }
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove();
}
exports.downloadURI = downloadURI;
