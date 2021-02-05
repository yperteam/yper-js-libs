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
exports.AutocompletionAddressHelper = void 0;
var generic_helper_1 = require("@yper-script/helpers/generic_helper");
var yper_exception_1 = require("@yper-script/error/yper_exception");
var google_address_entity_1 = require("@yper-script/entity/google_address_entity");
var generic_helper_2 = require("@yper-script/helpers/generic_helper");
var AutocompletionAddressHelper = /** @class */ (function () {
    /**
     *
     * @param inputSelector
     * @param address
     * @param formInputsToBind: The form to bind the inputs, to actualize it
     */
    function AutocompletionAddressHelper(inputSelector, address, formInputsToBind) {
        if (address === void 0) { address = null; }
        if (formInputsToBind === void 0) { formInputsToBind = null; }
        this.onChangeCallback = null;
        this.googleAddress = new google_address_entity_1.GoogleAddress({
            formattedAddress: null,
            street: null,
            streetNumber: null,
            city: null,
            country: null,
            zip: null,
            lng: null,
            lat: null
        });
        /** Required data */
        this.streetNb = "street_number";
        this.route = "route";
        this.locality = "locality";
        this.country = "country";
        this.postalCode = "postal_code";
        /** Required data */
        this.currentRetailPoint = generic_helper_2.get(window, ["currentRetailPoint"]);
        this.rpRadius = 25000;
        !this.currentRetailPoint ? (this.currentRetailPoint = []) : null;
        this.inputSelector = inputSelector;
        if (address !== null)
            this.googleAddress = address;
        this.formInputs = formInputsToBind;
    }
    /**
     * Address getter
     */
    AutocompletionAddressHelper.prototype.getGoogleAddress = function () {
        return this.googleAddress;
    };
    /**
     * get address data
     */
    AutocompletionAddressHelper.prototype.getFormattedData = function () {
        return this.googleAddress.getFormattedData();
    };
    /**
     * Address getter
     */
    AutocompletionAddressHelper.prototype.getInputSelector = function () {
        return this.inputSelector;
    };
    AutocompletionAddressHelper.prototype.googleAutocompleteField = function (autocompleteValue) {
        var _this = this;
        var autocompleteInput = this.inputSelector.get(0);
        var observerHack = new MutationObserver(function () {
            observerHack.disconnect();
            if (!generic_helper_1.isDef(autocompleteValue) && !generic_helper_1.isIEbrowser()) {
                autocompleteValue = "new-password";
            }
            else if (!generic_helper_1.isDef(autocompleteValue) && generic_helper_1.isIEbrowser()) {
                autocompleteValue = "off";
            }
            _this.inputSelector.attr("autocomplete", autocompleteValue);
        });
        observerHack.observe(autocompleteInput, {
            attributes: true,
            attributeFilter: ["autocomplete"]
        });
    };
    /**
     * Set a custom callback on OnChange event
     */
    AutocompletionAddressHelper.prototype.setOnChangeCallback = function (callback) {
        this.onChangeCallback = callback;
    };
    AutocompletionAddressHelper.prototype.preventSubmitForm = function () {
        this.inputSelector.on("keypress", function (event) {
            if (event.which === 13) {
                return false;
            }
        });
    };
    /**
     * Actualize address information on the form set
     */
    AutocompletionAddressHelper.prototype.actualizeForm = function () {
        for (var _i = 0, _a = Object.entries(this.googleAddress); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            // @ts-ignore
            if (generic_helper_1.isSet(this.formInputs[key])) {
                // @ts-ignore
                this.formInputs[key].val(value);
            }
        }
    };
    /**
     * Remove all form data
     */
    AutocompletionAddressHelper.prototype.cleanFormData = function () {
        this.googleAddress.cleanData();
    };
    /**
     * Get bounds
     */
    AutocompletionAddressHelper.prototype.getPickUpBounds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rpCoordinates, geolocation;
            var _this = this;
            return __generator(this, function (_a) {
                rpCoordinates = generic_helper_2.get(this.currentRetailPoint, ["address", "location", "coordinates"], []);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (rpCoordinates.length === 2) {
                            geolocation = {
                                lat: rpCoordinates[1],
                                lng: rpCoordinates[0]
                            };
                            resolve(new google.maps.Circle({
                                center: geolocation,
                                radius: _this.rpRadius
                            }));
                        }
                        else if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                geolocation = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                };
                                resolve(new google.maps.Circle({
                                    center: geolocation,
                                    radius: position.coords.accuracy
                                }));
                            }, function (err) {
                                resolve(null);
                            });
                        }
                        else {
                            resolve(null);
                        }
                    })];
            });
        });
    };
    /**
     * Bind the autocompletion to an input
     */
    AutocompletionAddressHelper.prototype.bindAddressAutocomplete = function () {
        var _this = this;
        var input = this.inputSelector.get(0);
        this.getPickUpBounds().then(function (circle) {
            _this.googleAutocomplete = new google.maps.places.Autocomplete(input, {
                componentRestrictions: { country: ["fr", "be", "de", "lu"] },
                fields: ["address_component", "formatted_address", "geometry"]
            });
            if (circle) {
                _this.googleAutocomplete.setBounds(circle.getBounds());
            }
            google.maps.event.addListener(_this.googleAutocomplete, "place_changed", function () {
                _this.onPlaceChanged();
            });
        });
    };
    AutocompletionAddressHelper.prototype.onPlaceChanged = function () {
        var _this = this;
        var place = this.googleAutocomplete.getPlace();
        var isStreetNumber = false;
        var streetNumber = null;
        var street = null;
        var city = null;
        var country = null;
        var zip = null;
        place.address_components.map(function (addressComponent) {
            addressComponent.types.map(function (addrCmpType) {
                var typeElement = (document.getElementById(addrCmpType));
                if (addrCmpType === _this.streetNb) {
                    isStreetNumber = true;
                    streetNumber = addressComponent.long_name;
                }
                else if (addrCmpType === _this.route) {
                    street = addressComponent.long_name;
                }
                else if (addrCmpType === _this.locality) {
                    city = addressComponent.long_name;
                }
                else if (addrCmpType === _this.country) {
                    country = addressComponent.long_name;
                }
                else if (addrCmpType === _this.postalCode) {
                    zip = addressComponent.long_name;
                }
                if (typeElement) {
                    typeElement.value = addressComponent.long_name;
                }
            });
        });
        // TODO: devons-nous restreindres s'il n'y a pas de nom de rue ?
        if (!isStreetNumber || !place.geometry) {
            if (this.onChangeCallback instanceof Function) {
                var gError = new yper_exception_1.GoogleMapError("Missing street number or geometry place", "missing_parameters", 400);
                return this.onChangeCallback(gError);
            }
        }
        this.googleAddress = new google_address_entity_1.GoogleAddress({
            formattedAddress: place.formatted_address,
            street: street,
            streetNumber: streetNumber,
            city: city,
            country: country,
            zip: zip,
            lng: place.geometry.location.lng(),
            lat: place.geometry.location.lat()
        });
        if (this.onChangeCallback instanceof Function) {
            return this.onChangeCallback(this.googleAddress);
        }
    };
    return AutocompletionAddressHelper;
}());
exports.AutocompletionAddressHelper = AutocompletionAddressHelper;
