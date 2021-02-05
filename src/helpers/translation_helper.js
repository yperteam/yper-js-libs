"use strict";
exports.__esModule = true;
exports.translationHelper = void 0;
var generic_helper_1 = require("@yper-script/helpers/generic_helper");
var abstract_lib_1 = require("@yper-script/libs/abstract_lib");
/*
----------------------------
DO NOT EXPORT THE CLASS.
SINGLETON CLASS WITH WEBPACK.
----------------------------
 */
var TranslationHelper = /** @class */ (function () {
    /**
     * @constructor
     */
    function TranslationHelper() {
    }
    /**
     * Set the locale with the locale from the user browser
     * @param locale
     */
    TranslationHelper.prototype.setLocale = function (locale) {
        this.locale = locale;
    };
    /**
     * Get translation of a word with a keyword
     * @param keyword the keyword to get the value in the language selected
     * @param template king of keyword to look for
     * @param defaultValue Default value to return if not found
     * @return the value in the user language
     * @type string
     */
    TranslationHelper.prototype.getTranslation = function (keyword, template, defaultValue) {
        if (template === void 0) { template = null; }
        if (defaultValue === void 0) { defaultValue = keyword; }
        if (!keyword) {
            return defaultValue;
        }
        if (!this.translations) {
            return defaultValue;
        }
        if (!template) {
            return this.translations.hasOwnProperty(keyword)
                // @ts-ignore
                ? this.translations[keyword]
                : defaultValue;
        }
        else if (template.indexOf(".") > -1) {
            var templates = template.split(".");
            // @ts-ignore
            var property = this.translations[templates[0]];
            if (!generic_helper_1.isSet(property)) {
                return keyword;
            }
            templates.slice(0, 1);
            for (var _i = 0, templates_1 = templates; _i < templates_1.length; _i++) {
                var templt = templates_1[_i];
                if (typeof templt !== null && property.hasOwnProperty(templt)) {
                    property = property[templt];
                }
            }
            if (property.hasOwnProperty(keyword)) {
                return property[keyword];
            }
        }
        else if (this.translations.hasOwnProperty(template)) {
            // @ts-ignore
            return this.translations[template].hasOwnProperty(keyword)
                // @ts-ignore
                ? this.translations[template][keyword]
                : defaultValue;
        }
        return keyword;
    };
    /**
     * Set the translations in the locale storage
     */
    TranslationHelper.prototype.setTranslationsInLocaleStorage = function () {
        var _this = this;
        if (generic_helper_1.isUnDef(this.translations) &&
            !localStorage.getItem("translations")) {
            $.ajax({
                url: "/ajax/translation/" + this.locale,
                type: "GET",
                dataType: "json",
                async: false
            })
                .fail(function (data) {
                abstract_lib_1.AbstractLib.failProcess(data);
            })
                .then(function (data) {
                localStorage.setItem("translations", JSON.stringify(data));
                _this.translations = JSON.parse(localStorage.getItem("translations"));
            });
        }
        else if (generic_helper_1.isUnDef(this.translations) &&
            localStorage.getItem("translations")) {
            this.translations = JSON.parse(localStorage.getItem("translations"));
        }
    };
    return TranslationHelper;
}());
exports.translationHelper = new TranslationHelper();
