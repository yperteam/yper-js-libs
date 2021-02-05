"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var StatusEnum_1 = require("@yper-script/enums/StatusEnum");
/**
 * StatusHelper
 */
var StatusHelper = /** @class */ (function () {
    function StatusHelper() {
        var _a, _b;
        this.intentCycle = [StatusEnum_1.StatusEnum.intent];
        this.paymentCycle = [StatusEnum_1.StatusEnum.payment];
        this.confirmedCycle = [StatusEnum_1.StatusEnum.confirmed];
        this.deliveryCycle = [
            StatusEnum_1.StatusEnum.started,
            StatusEnum_1.StatusEnum.picked,
            StatusEnum_1.StatusEnum.go,
            StatusEnum_1.StatusEnum.returning,
        ];
        this.endCycle = [
            StatusEnum_1.StatusEnum.returned,
            StatusEnum_1.StatusEnum.delivered,
            StatusEnum_1.StatusEnum.hold,
            StatusEnum_1.StatusEnum.verified,
            StatusEnum_1.StatusEnum.end,
        ];
        this.canceledCycle = [
            StatusEnum_1.StatusEnum.requestCanceled,
            StatusEnum_1.StatusEnum.bookingCanceled,
        ];
        this.statusKeyAll = "status_all";
        this.statusKeyIntent = "status_intent";
        this.statusKeyLate = "status_late";
        this.statusKeyWithoutShopper = "status_payment";
        this.statusKeyProcessing = "status_processing";
        this.statusKeyEnd = "status_end";
        this.statusKeyCanceled = "status_canceled";
        this.tradStatusEnum = (_a = {},
            _a[this.statusKeyAll] = __spreadArrays(this.paymentCycle, this.confirmedCycle, this.deliveryCycle),
            _a[this.statusKeyIntent] = this.intentCycle,
            _a[this.statusKeyWithoutShopper] = this.paymentCycle,
            _a[this.statusKeyProcessing] = this.deliveryCycle,
            _a[this.statusKeyEnd] = this.endCycle,
            _a[this.statusKeyCanceled] = this.canceledCycle,
            _a);
        this.STATUS_GRAPH = (_b = {},
            // [StatusEnum.intent]: [StatusEnum.created], // Not available
            // [StatusEnum.created]: [StatusEnum.payment], // Not available
            // [StatusEnum.payment]: [StatusEnum.confirmed],  //Not available
            _b[StatusEnum_1.StatusEnum.confirmed] = [StatusEnum_1.StatusEnum.started],
            _b[StatusEnum_1.StatusEnum.started] = [StatusEnum_1.StatusEnum.picked],
            _b[StatusEnum_1.StatusEnum.picked] = [StatusEnum_1.StatusEnum.go],
            _b[StatusEnum_1.StatusEnum.go] = [StatusEnum_1.StatusEnum.delivered, StatusEnum_1.StatusEnum.returning],
            // [StatusEnum.delivered]: [StatusEnum.hold, StatusEnum.verified], // A job do that
            _b[StatusEnum_1.StatusEnum.returning] = [StatusEnum_1.StatusEnum.returned],
            // [StatusEnum.returned]: [StatusEnum.delivered], // A job do that
            _b[StatusEnum_1.StatusEnum.hold] = [StatusEnum_1.StatusEnum.verified],
            _b[StatusEnum_1.StatusEnum.verified] = [StatusEnum_1.StatusEnum.end],
            _b);
    }
    StatusHelper.prototype.next = function (status) {
        return this.STATUS_GRAPH[status] !== undefined
            ? this.STATUS_GRAPH[status]
            : [];
    };
    StatusHelper.prototype.previous = function (status) {
        var _this = this;
        var keys = [];
        Object.keys(this.STATUS_GRAPH).map(function (key) {
            if (_this.STATUS_GRAPH[key].includes(status)) {
                keys.push(key);
            }
        });
        return keys;
    };
    /**
     *
     * @param status
     */
    StatusHelper.prototype.isRunning = function (status) {
        return [
            StatusEnum_1.StatusEnum.started,
            StatusEnum_1.StatusEnum.picked,
            StatusEnum_1.StatusEnum.go,
            StatusEnum_1.StatusEnum.delivered,
            StatusEnum_1.StatusEnum.returning,
            StatusEnum_1.StatusEnum.returned,
        ].includes(status);
    };
    return StatusHelper;
}());
exports["default"] = StatusHelper;
