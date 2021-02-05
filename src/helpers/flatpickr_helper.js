"use strict";
exports.__esModule = true;
var flatpickr_1 = require("flatpickr");
var fr_1 = require("flatpickr/dist/l10n/fr");
flatpickr_1["default"].localize(fr_1.French);
require("flatpickr/dist/themes/light.css");
var FlatpickrHelper = /** @class */ (function () {
    /**
     *
     * @param inputSelector
     * @param wrap
     * @param mode
     * @param dateFormat
     * @param customOnChange
     */
    function FlatpickrHelper(inputSelector, customOnChange, mode, wrap, dateFormat) {
        if (customOnChange === void 0) { customOnChange = null; }
        if (mode === void 0) { mode = "single"; }
        if (wrap === void 0) { wrap = true; }
        if (dateFormat === void 0) { dateFormat = "d-m-Y"; }
        this.$flatPickr = flatpickr_1["default"](document.querySelector(inputSelector), {
            wrap: wrap,
            mode: mode,
            dateFormat: dateFormat,
            onChange: function (selectedDates, dateStr, instance) {
                if (customOnChange instanceof Function) {
                    if (mode === FlatpickrHelper.modeRange &&
                        selectedDates.length == 2) {
                        return customOnChange.call(selectedDates, dateStr, instance);
                    }
                    else if (mode === FlatpickrHelper.modeSingle ||
                        mode === FlatpickrHelper.modeMultiple ||
                        mode === FlatpickrHelper.modeTime) {
                        return customOnChange.call(selectedDates, dateStr, instance);
                    }
                }
            }
        });
        return this;
    }
    /**
     *
     * @param date
     */
    FlatpickrHelper.prototype.setDate = function (date) {
        return this.$flatPickr.setDate(date);
    };
    FlatpickrHelper.modeSingle = "single";
    FlatpickrHelper.modeMultiple = "multiple";
    FlatpickrHelper.modeRange = "range";
    FlatpickrHelper.modeTime = "time";
    return FlatpickrHelper;
}());
exports["default"] = FlatpickrHelper;
