"use strict";
exports.__esModule = true;
var StatusEnum_1 = require("@yper-script/enums/StatusEnum");
var generic_helper_1 = require("@yper-script/helpers/generic_helper");
var moment_1 = require("moment");
var StatusHistoryHelper = /** @class */ (function () {
    function StatusHistoryHelper(statusHistory) {
        this.statusHistory = statusHistory;
    }
    /**
     * Get time spent to search shopper
     */
    StatusHistoryHelper.prototype.getTimeSpentForSearching = function () {
        var lastSearchingStatus;
        var nextStatus;
        var indexOfLastSearchingStatus;
        // @ts-ignore
        for (var _i = 0, _a = this.statusHistory.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], index = _b[0], statusObject = _b[1];
            if (statusObject.status === StatusEnum_1.StatusEnum.payment) {
                lastSearchingStatus = statusObject;
                indexOfLastSearchingStatus = index;
            }
        }
        if (!generic_helper_1.isSet(lastSearchingStatus)) {
            // To return 0 minute
            var momentNow = moment_1["default"]();
            return moment_1["default"].duration(momentNow.diff(momentNow));
        }
        nextStatus = this.statusHistory[indexOfLastSearchingStatus + 1];
        if (generic_helper_1.isSet(nextStatus)) {
            return moment_1["default"].duration(moment_1["default"](nextStatus.when).diff(moment_1["default"](lastSearchingStatus.when)));
        }
        return moment_1["default"].duration(moment_1["default"]().diff(moment_1["default"](lastSearchingStatus.when)));
    };
    return StatusHistoryHelper;
}());
exports["default"] = StatusHistoryHelper;
