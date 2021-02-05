"use strict";
exports.__esModule = true;
exports.LoaderHelper = void 0;
require("jquery-blockui/jquery.blockUI");
var generic_helper_1 = require("@yper-script/helpers/generic_helper");
/**
 * Create a loader with a selector and attach it an id
 */
var LoaderHelper = /** @class */ (function () {
    function LoaderHelper(selector, text) {
        if (text === void 0) { text = "Chargement en cours"; }
        this.id = null;
        this.selector = selector;
        this.id = generic_helper_1.uuidv4();
        this.text = text;
    }
    LoaderHelper.prototype.initLoader = function () {
        this.selector.block({
            message: "<div id=\"" + this.id + "\" class=\"spinner-border text-primary\" role=\"status\"><span class=\"sr-only\">Loading...</span></div><span id=\"text-load\">" + this.text + "</span>",
            css: {
                color: "#1660C6",
                border: "none",
                backgroundColor: "transparent"
            }
        });
    };
    LoaderHelper.prototype.setSelector = function (selector) {
        this.selector = selector;
    };
    LoaderHelper.prototype.hideLoader = function () {
        this.selector.unblock();
    };
    return LoaderHelper;
}());
exports.LoaderHelper = LoaderHelper;
