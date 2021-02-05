"use strict";
exports.__esModule = true;
exports.StatusTransEnum = exports.StatusEnum = void 0;
/**
 * StatusEnum used to know distinct mission status (ordered).
 */
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["intent"] = "intent";
    StatusEnum["created"] = "created";
    StatusEnum["payment"] = "payment";
    StatusEnum["paymentTimeout"] = "paymentTimeout";
    StatusEnum["confirmed"] = "confirmed";
    StatusEnum["started"] = "started";
    StatusEnum["picked"] = "picked";
    StatusEnum["go"] = "go";
    StatusEnum["delivered"] = "delivered";
    StatusEnum["returning"] = "returning";
    StatusEnum["returned"] = "returned";
    StatusEnum["hold"] = "hold";
    StatusEnum["verified"] = "verified";
    StatusEnum["end"] = "end";
    StatusEnum["requestCanceled"] = "requestCanceled";
    StatusEnum["bookingCanceled"] = "bookingCanceled";
    StatusEnum["pendingCustomerChoice"] = "pendingCustomerChoice";
})(StatusEnum = exports.StatusEnum || (exports.StatusEnum = {}));
/**
 * StatusTransEnum.
 */
var StatusTransEnum;
(function (StatusTransEnum) {
    StatusTransEnum["created"] = "non pay\u00E9e";
    StatusTransEnum["intent"] = "intention";
    StatusTransEnum["payment"] = "en recherche";
    StatusTransEnum["confirmed"] = "attribu\u00E9e";
    StatusTransEnum["started"] = "en livraison";
    StatusTransEnum["picked"] = "en livraison";
    StatusTransEnum["go"] = "en livraison";
    StatusTransEnum["returning"] = "en retour";
    StatusTransEnum["returned"] = "en retour";
    StatusTransEnum["delivered"] = "livr\u00E9e";
    StatusTransEnum["hold"] = "livr\u00E9e";
    StatusTransEnum["verified"] = "livr\u00E9e";
    StatusTransEnum["end"] = "livr\u00E9e";
    StatusTransEnum["requestCanceled"] = "annul\u00E9e";
    StatusTransEnum["bookingCanceled"] = "annul\u00E9e";
    StatusTransEnum["paymentTimeout"] = "d\u00E9lais de paiement d\u00E9pass\u00E9";
    StatusTransEnum["refused"] = "Refus\u00E9";
})(StatusTransEnum = exports.StatusTransEnum || (exports.StatusTransEnum = {}));
