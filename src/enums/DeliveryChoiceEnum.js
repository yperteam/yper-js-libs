"use strict";
exports.__esModule = true;
exports.DeliveryTradEnum = exports.DeliveryChoiceEnum = void 0;
/**
 * DeliveryChoiceEnum used to know distinct mission status (ordered).
 */
var DeliveryChoiceEnum;
(function (DeliveryChoiceEnum) {
    DeliveryChoiceEnum["hub"] = "hub";
    DeliveryChoiceEnum["retailpoint"] = "retailpoint";
    DeliveryChoiceEnum["user"] = "user";
})(DeliveryChoiceEnum = exports.DeliveryChoiceEnum || (exports.DeliveryChoiceEnum = {}));
/**
 * Delivery traduction enum
 */
var DeliveryTradEnum;
(function (DeliveryTradEnum) {
    DeliveryTradEnum["fresh"] = "frais";
    DeliveryTradEnum["climb"] = "Monter la commande";
    DeliveryTradEnum["containWater"] = "Contient de l'eau";
    DeliveryTradEnum["frozen"] = "surgel\u00E9";
    DeliveryTradEnum["base"] = "Prix de base";
    DeliveryTradEnum["voluminous"] = "Volumineux";
    DeliveryTradEnum["door"] = "D\u00E9poser devant la porte";
    DeliveryTradEnum["car"] = "Voiture";
    DeliveryTradEnum["back"] = "back";
    DeliveryTradEnum["neighbour"] = "D\u00E9poser chez un voisin";
})(DeliveryTradEnum = exports.DeliveryTradEnum || (exports.DeliveryTradEnum = {}));
