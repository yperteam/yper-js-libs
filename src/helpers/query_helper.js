"use strict";
exports.__esModule = true;
/**
 * QueryHelper used to format our call
 */
var generic_helper_1 = require("@yper-script/helpers/generic_helper");
var QueryHelper = /** @class */ (function () {
    /**
     * Constructor
     * @param {string} path - url to call
     * @param {object} queryParameters - query params to format {key : value}
     */
    function QueryHelper(path, queryParameters) {
        if (path === void 0) { path = null; }
        if (queryParameters === void 0) { queryParameters = {}; }
        this.formattedUrl = "";
        this.formattedParameters = "";
        this.path = "";
        this.parameters = {};
        this.path = path;
        this.parameters = queryParameters;
        this.setFormattedParameters();
        this.formattedUrl = this.getFormattedUrl();
    }
    /**
     * Get formatted url from the path and parameters
     */
    QueryHelper.prototype.getFormattedUrl = function () {
        return this.formattedUrl;
    };
    /**
     * Remove all parameters
     */
    QueryHelper.prototype.removeAllParameters = function () {
        this.parameters = {};
        this.setFormattedParameters();
        return this;
    };
    /**
     * Return path
     */
    QueryHelper.prototype.getPath = function () {
        return this.path;
    };
    /**
     * Return parameters
     */
    QueryHelper.prototype.getParams = function () {
        return this.parameters;
    };
    /**
     * Return number of parameters
     */
    QueryHelper.prototype.getNbParams = function () {
        return Object.keys(this.getParams()).length;
    };
    /**
     * Return a specific parameter
     * @param key
     */
    QueryHelper.prototype.getParam = function (key) {
        if (generic_helper_1.keyExists(this.parameters, key)) {
            // @ts-ignore
            return this.parameters[key];
        }
        return null;
    };
    /**
     * Return formatted parameters
     */
    QueryHelper.prototype.getFormattedParams = function () {
        return this.formattedParameters;
    };
    /**
     * Update parameters
     * @param parameters
     */
    QueryHelper.prototype.updateParams = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        for (var _i = 0, _a = Object.entries(parameters); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            // @ts-ignore
            this.parameters[key] = value;
        }
        this.setFormattedParameters();
        return this;
    };
    /**
     * Check if key exists among parameters
     * @param key
     */
    QueryHelper.prototype.keyParametersExists = function (key) {
        return generic_helper_1.keyExists(this.parameters, key);
    };
    /**
     * Remove an array of key(s) from parameters
     * @param {array} keysToRemove - array of key(s) to remove
     */
    QueryHelper.prototype.removeParameters = function (keysToRemove) {
        var _this = this;
        if (keysToRemove.length > 0) {
            keysToRemove.forEach(function (key) {
                _this.parameters = generic_helper_1.removeKey(_this.parameters, key);
            });
            this.setFormattedParameters();
        }
        return this;
    };
    /**
     * Create or Remove an array of key(s) from parameters
     * @param {array} keysToToggle - array of key(s) to remove
     */
    QueryHelper.prototype.toggleParameters = function (keysToToggle) {
        var _this = this;
        if (keysToToggle.length > 0) {
            keysToToggle.forEach(function (key) {
                if (generic_helper_1.keyExists(_this.parameters, key) !== undefined) {
                    // @ts-ignore
                    delete _this.parameters[key];
                }
                else {
                    // @ts-ignore
                    _this.parameters[key] = true;
                }
            });
            this.setFormattedParameters();
        }
        return this;
    };
    /**
     * Set Query Parameters
     * @param {object} queryParameters - query params to update {key : value}
     */
    QueryHelper.prototype.setParams = function (queryParameters) {
        if (queryParameters === void 0) { queryParameters = {}; }
        this.parameters = queryParameters;
        this.setFormattedParameters();
        return this;
    };
    /**
     * Format the querystring
     */
    QueryHelper.prototype.setFormattedParameters = function () {
        var rawQueryString = "?";
        var i = 0;
        if (Object.keys(this.parameters).length === 0) {
            this.formattedUrl = this.path;
            return this;
        }
        for (var _i = 0, _a = Object.entries(this.parameters); _i < _a.length; _i++) {
            var _b = _a[_i], index = _b[0], keyQS = _b[1];
            i++;
            if (Array.isArray(keyQS)) {
                keyQS = keyQS.join();
            }
            rawQueryString += index + "=" + keyQS;
            if (i < Object.keys(this.parameters).length) {
                rawQueryString += "&";
            }
        }
        this.formattedParameters = rawQueryString;
        this.formattedUrl = "" + this.path + this.formattedParameters;
        return this;
    };
    return QueryHelper;
}());
exports["default"] = QueryHelper;
