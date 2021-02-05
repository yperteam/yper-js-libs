"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.SearchEngineArgsError = exports.AjaxCallbackError = exports.CallbackError = exports.GoogleMapError = exports.YperException = void 0;
var YperException = /** @class */ (function (_super) {
    __extends(YperException, _super);
    function YperException(message, scope, code) {
        var _newTarget = this.constructor;
        if (message === void 0) { message = null; }
        if (scope === void 0) { scope = null; }
        if (code === void 0) { code = null; }
        var _this = _super.call(this, message) || this;
        _this._description = "YperException Error";
        _this._scope = "yper_error";
        _this._code = 500;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this._code = code ? code : _this._code;
        _this._scope = scope ? scope : _this._scope;
        _this._description = message ? message : _this._description;
        return _this;
    }
    YperException.prototype.getMessage = function () {
        return this._description;
    };
    YperException.prototype.getScope = function () {
        return this._scope;
    };
    YperException.prototype.getCode = function () {
        return this._code;
    };
    return YperException;
}(Error));
exports.YperException = YperException;
var GoogleMapError = /** @class */ (function (_super) {
    __extends(GoogleMapError, _super);
    function GoogleMapError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GoogleMapError;
}(YperException));
exports.GoogleMapError = GoogleMapError;
var CallbackError = /** @class */ (function (_super) {
    __extends(CallbackError, _super);
    function CallbackError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CallbackError;
}(YperException));
exports.CallbackError = CallbackError;
var AjaxCallbackError = /** @class */ (function (_super) {
    __extends(AjaxCallbackError, _super);
    function AjaxCallbackError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._scope = "ajax_error";
        return _this;
    }
    return AjaxCallbackError;
}(YperException));
exports.AjaxCallbackError = AjaxCallbackError;
var SearchEngineArgsError = /** @class */ (function (_super) {
    __extends(SearchEngineArgsError, _super);
    function SearchEngineArgsError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._scope = "search_engine_args_error";
        _this._description = "You need to register a valid property";
        _this._code = 403;
        return _this;
    }
    return SearchEngineArgsError;
}(YperException));
exports.SearchEngineArgsError = SearchEngineArgsError;
