"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AbstractLib = void 0;
/**
 * Abstract lib to manage libs
 */
var callback_helper_1 = require("@yper-script/helpers/callback_helper");
var generic_helper_1 = require("@yper-script/helpers/generic_helper");
var yper_exception_1 = require("@yper-script/error/yper_exception");
var loader_helper_1 = require("@yper-script/helpers/loader_helper");
/**
 * AbstractLib
 */
var AbstractLib = /** @class */ (function () {
    function AbstractLib() {
        /** path params */
        this.cHelper = null;
        /** path params */
        this.pathParams = [];
        /** query params */
        this.queryParams = "";
        /** Payload params */
        this.payloadParams = {};
        /** Loader */
        this.loader = null;
        /** Must we do a custom fail */
        this.customFail = false;
    }
    /**
     *
     * @param pathParams
     */
    AbstractLib.prototype.setPathParams = function (pathParams) {
        this.pathParams = pathParams;
    };
    /**
     *
     * @param queryParams
     */
    AbstractLib.prototype.setQueryParams = function (queryParams) {
        this.queryParams = queryParams;
    };
    /**
     *
     * @param pathParams
     */
    AbstractLib.prototype.addPathParams = function (pathParams) {
        var _this = this;
        pathParams.map(function (pParam) {
            _this.pathParams.push(pParam);
        });
    };
    /**
     *
     */
    AbstractLib.prototype.getPayloadParams = function () {
        return this.payloadParams;
    };
    /**
     *
     * @param payloadParams
     */
    AbstractLib.prototype.setPayloadParams = function (payloadParams) {
        this.payloadParams = payloadParams;
    };
    /**
     *
     * @param customFail
     */
    AbstractLib.prototype.setCustomFail = function (customFail) {
        this.customFail = customFail;
    };
    /**
     *
     * @param payloadParams
     */
    AbstractLib.prototype.addPayloadParams = function (payloadParams) {
        for (var _i = 0, _a = Object.entries(payloadParams); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            // @ts-ignore
            this.payloadParams[key] = value;
        }
    };
    /**
     *
     * @param $elem
     */
    AbstractLib.prototype.setLoader = function ($elem) {
        if ($elem) {
            this.loader = new loader_helper_1.LoaderHelper($elem);
        }
    };
    /**
     *
     * @param toasterTitle
     * @param toasterMessage
     */
    AbstractLib.successProcess = function (toasterTitle, toasterMessage) {
        if (toasterTitle === void 0) { toasterTitle = null; }
        if (toasterMessage === void 0) { toasterMessage = null; }
    };
    /**
     *
     * @param errorYperCode
     */
    AbstractLib.shouldLogout = function (errorYperCode) {
    };
    /**
     *
     * @param resp
     * @param toasterTitle
     * @param toasterMessage
     */
    AbstractLib.failProcess = function (resp, toasterTitle, toasterMessage) {
        if (toasterTitle === void 0) { toasterTitle = null; }
        if (toasterMessage === void 0) { toasterMessage = null; }
        var errorTitle = generic_helper_1.get(resp, ["statusText"], "");
        var errorMessage = generic_helper_1.get(resp, ["responseText"], "");
        var errorYperCode = generic_helper_1.get(resp, ["responseJSON", "yper_code"], "");
        console.error(errorTitle, errorMessage);
        AbstractLib.shouldLogout(errorYperCode);
        $(".modal").modal("hide");
        new yper_exception_1.AjaxCallbackError("ajax_error", resp.responseText, resp.status);
    };
    /**
     *
     * @param callback
     */
    AbstractLib.prototype.setCallback = function (callback) {
        if (callback instanceof Function &&
            this.cHelper instanceof callback_helper_1["default"]) {
            this.cHelper.setCallback(callback);
        }
        return this;
    };
    /**
     *
     * @param path
     * @private
     */
    AbstractLib.prototype._getPromise = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.loader) {
                    this.loader.initLoader();
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        $.ajax({
                            url: generic_helper_1.formatString(path, _this.pathParams) + _this.queryParams,
                            type: "GET"
                        })
                            .fail(function (r) {
                            if (_this.customFail) {
                                reject(r);
                            }
                            else {
                                reject(AbstractLib.failProcess(r));
                            }
                        })
                            .then(function (data) {
                            resolve(data);
                        })
                            .always(function (data) {
                            if (_this.loader) {
                                _this.loader.hideLoader();
                            }
                        });
                    })];
            });
        });
    };
    /**
     *
     * @param path
     * @private
     */
    AbstractLib.prototype._get = function (path) {
        var _this = this;
        if (this.loader) {
            this.loader.initLoader();
        }
        $.ajax({
            url: generic_helper_1.formatString(path, this.pathParams) + this.queryParams,
            type: "GET"
        })
            .fail(function (r) {
            AbstractLib.failProcess(r);
        })
            .then(function (data) {
            if (_this.cHelper instanceof callback_helper_1["default"]) {
                _this.cHelper.setParameters(data);
                _this.cHelper.call();
            }
            return data;
        })
            .always(function (data) {
            if (_this.loader) {
                _this.loader.hideLoader();
            }
        });
    };
    /**
     *
     * @param path
     * @private
     */
    AbstractLib.prototype._postPromise = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var pathParams, payloadParams;
            var _this = this;
            return __generator(this, function (_a) {
                pathParams = this.pathParams;
                payloadParams = this.payloadParams;
                if (this.loader) {
                    this.loader.initLoader();
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        $.ajax({
                            url: generic_helper_1.formatString(path, _this.pathParams) + _this.queryParams,
                            type: "POST",
                            contentType: "application/json",
                            dataType: "json",
                            data: JSON.stringify(_this.payloadParams)
                        })
                            .fail(function (r) {
                            if (_this.customFail) {
                                reject(r);
                            }
                            else {
                                reject(AbstractLib.failProcess(r));
                            }
                        })
                            .then(function (data) {
                            resolve({
                                pathParams: pathParams,
                                payloadParams: payloadParams,
                                data: data
                            });
                        })
                            .always(function (data) {
                            if (_this.loader) {
                                _this.loader.hideLoader();
                            }
                        });
                    })];
            });
        });
    };
    /**
     *
     * @param path
     * @private
     */
    AbstractLib.prototype._putPromise = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var pathParams, payloadParams;
            var _this = this;
            return __generator(this, function (_a) {
                pathParams = this.pathParams;
                payloadParams = this.payloadParams;
                if (this.loader) {
                    this.loader.initLoader();
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        $.ajax({
                            url: generic_helper_1.formatString(path, _this.pathParams) + _this.queryParams,
                            type: "PUT",
                            contentType: "application/json",
                            dataType: "json",
                            data: JSON.stringify(_this.payloadParams)
                        })
                            .fail(function (r) {
                            if (_this.customFail) {
                                reject(r);
                            }
                            else {
                                reject(AbstractLib.failProcess(r));
                            }
                        })
                            .then(function (data) {
                            resolve({
                                pathParams: pathParams,
                                payloadParams: payloadParams,
                                data: data
                            });
                        })
                            .always(function (data) {
                            if (_this.loader) {
                                _this.loader.hideLoader();
                            }
                        });
                    })];
            });
        });
    };
    /**
     *
     * @param path
     * @private
     */
    AbstractLib.prototype._post = function (path) {
        var _this = this;
        if (this.loader) {
            this.loader.initLoader();
        }
        $.ajax({
            url: generic_helper_1.formatString(path, this.pathParams) + this.queryParams,
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(this.payloadParams)
        })
            .fail(function (r) {
            AbstractLib.failProcess(r);
        })
            .then(function (data) {
            if (_this.cHelper instanceof callback_helper_1["default"]) {
                _this.cHelper.setParameters(data);
                _this.cHelper.call();
            }
            return data;
        })
            .always(function (data) {
            if (_this.loader) {
                _this.loader.hideLoader();
            }
        });
    };
    /**
     *
     * @param path
     * @private
     */
    AbstractLib.prototype._put = function (path) {
        var _this = this;
        if (this.loader) {
            this.loader.initLoader();
        }
        $.ajax({
            url: generic_helper_1.formatString(path, this.pathParams) + this.queryParams,
            type: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(this.payloadParams)
        })
            .fail(function (r) {
            AbstractLib.failProcess(r);
        })
            .then(function (data) {
            if (_this.cHelper instanceof callback_helper_1["default"]) {
                _this.cHelper.setParameters(data);
                _this.cHelper.call();
            }
            return data;
        })
            .always(function (data) {
            if (_this.loader) {
                _this.loader.hideLoader();
            }
        });
    };
    /**
     *
     * @param path
     * @private
     */
    AbstractLib.prototype._delete = function (path) {
        var _this = this;
        if (this.loader) {
            this.loader.initLoader();
        }
        $.ajax({
            url: generic_helper_1.formatString(path, this.pathParams) + this.queryParams,
            type: "DELETE"
        })
            .fail(function (r) {
            AbstractLib.failProcess(r);
        })
            .then(function (data) {
            if (_this.cHelper instanceof callback_helper_1["default"]) {
                _this.cHelper.setParameters(data);
                _this.cHelper.call();
            }
            return data;
        })
            .always(function (data) {
            if (_this.loader) {
                _this.loader.hideLoader();
            }
        });
    };
    /**
     *
     * @param path
     * @private
     */
    AbstractLib.prototype._deletePromise = function (path) {
        var _this = this;
        if (this.loader) {
            this.loader.initLoader();
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: generic_helper_1.formatString(path, _this.pathParams) + _this.queryParams,
                type: "DELETE",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(_this.payloadParams)
            })
                .fail(function (r) {
                if (_this.customFail) {
                    reject(r);
                }
                else {
                    reject(AbstractLib.failProcess(r));
                }
            })
                .then(function (data) {
                resolve(data);
            })
                .always(function (data) {
                if (_this.loader) {
                    _this.loader.hideLoader();
                }
            });
        });
    };
    return AbstractLib;
}());
exports.AbstractLib = AbstractLib;
