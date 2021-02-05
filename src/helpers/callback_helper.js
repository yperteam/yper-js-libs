"use strict";
exports.__esModule = true;
var yper_exception_1 = require("@yper-script/error/yper_exception");
var CallbackHelper = /** @class */ (function () {
    function CallbackHelper(callback, parameters) {
        if (callback === void 0) { callback = null; }
        if (parameters === void 0) { parameters = null; }
        this.callback = null;
        this.parameters = null;
        this.setCallback(callback);
        this.setParameters(parameters);
    }
    CallbackHelper.prototype.setCallback = function (callback) {
        if (callback instanceof Function) {
            this.callback = callback;
        }
        return this;
    };
    CallbackHelper.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
        return this;
    };
    CallbackHelper.prototype.getParameters = function () {
        return this.parameters;
    };
    CallbackHelper.prototype.getCallback = function () {
        return this.callback;
    };
    CallbackHelper.prototype.call = function () {
        if (this.callback instanceof Function) {
            this.callback(this.getParameters());
        }
        else {
            throw new yper_exception_1.CallbackError("Callback is not a function", "missing_callback", 400);
        }
    };
    return CallbackHelper;
}());
exports["default"] = CallbackHelper;
