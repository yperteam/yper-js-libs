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
var lottie_web_1 = require("lottie-web");
/**
 * Lottie Helper
 */
var LottieHelper = /** @class */ (function () {
    /**
     * @constructor
     */
    function LottieHelper(elemId, conf) {
        this.elem = document.getElementById(elemId);
        this.conf = conf;
        this.lottieInst = lottie_web_1["default"];
    }
    /**
     * Load loader animation with lottieJs
     */
    LottieHelper.prototype.loaderAnimation = function () {
        this.lottieInst.loadAnimation(__assign({ container: this.elem }, this.conf));
    };
    LottieHelper.prototype.start = function () {
        this.loaderAnimation();
    };
    /**
     * Destroy loader animation with lottieJs
     */
    LottieHelper.prototype.stop = function () {
        this.lottieInst.destroy();
    };
    return LottieHelper;
}());
exports["default"] = LottieHelper;
