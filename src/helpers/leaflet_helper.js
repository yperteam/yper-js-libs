"use strict";
exports.__esModule = true;
exports.LeafletHelper = void 0;
var leaflet_1 = require("leaflet");
require("leaflet/dist/leaflet.css");
var LeafletHelper = /** @class */ (function () {
    function LeafletHelper(selector, zoomControl, location) {
        if (zoomControl === void 0) { zoomControl = true; }
        if (location === void 0) { location = null; }
        this.zoomControl = zoomControl;
        this.location = location;
        this.markerList = [];
        this.selector = selector;
        this.initMap(zoomControl, location);
    }
    /*
     * Get the marker list
     */
    LeafletHelper.prototype.getMarkerList = function () {
        return this.markerList;
    };
    LeafletHelper.prototype.initMap = function (zoom, location) {
        if (location === void 0) { location = null; }
        if (this.map === undefined) {
            var options = {
                scrollWheelZoom: false
            };
            if (zoom === false) {
                // @ts-ignore
                options["zoomControl"] = false;
            }
            // We set a default view point to prevent grey background on init
            var zoomValue = 8;
            var defautRegion = [48.853407, 2.348778];
            if (location !== null) {
                // TODO: WTF why we swap the array
                defautRegion = [location[1], location[0]];
                zoomValue = 12;
            }
            var latLng = leaflet_1["default"].latLng(defautRegion[0], defautRegion[1]);
            this.map = leaflet_1["default"].map(this.selector, options).setView(latLng, zoomValue);
            leaflet_1["default"].tileLayer("https://osm.yper.org/osm_tiles_light/{z}/{x}/{y}.png?keyId=3P783r3MFhDAekx", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMaps</a>'
            }).addTo(this.map);
        }
    };
    /**
     * Set map view and position, based on coordinates
     * @param latitude
     * @param longitude
     * @param zoom
     */
    LeafletHelper.prototype.setPosition = function (latitude, longitude, zoom) {
        var latLng = new leaflet_1["default"].LatLng(latitude, longitude);
        this.map.setView(latLng, zoom);
        if (this.marker === undefined) {
            this.marker = leaflet_1["default"].marker(latLng).addTo(this.map);
        }
        this.map.panTo(latLng);
        this.marker.setLatLng(latLng);
    };
    LeafletHelper.prototype.setAutoZoom = function () {
        var group = leaflet_1["default"].featureGroup(this.markerList);
        this.map.fitBounds(group.getBounds());
    };
    LeafletHelper.prototype.getMarkers = function () {
        return this.markerList;
    };
    LeafletHelper.prototype.removeMarkers = function () {
        var _this = this;
        this.markerList.forEach(function (marker) {
            _this.map.removeLayer(marker);
        });
        this.markerList = [];
    };
    /**
     * Remove a specific marker
     * @param marker
     */
    LeafletHelper.prototype.removeSpecificMarker = function (marker) {
        var _this = this;
        this.markerList.map(function (mk, idx) {
            if (mk == marker) {
                _this.map.removeLayer(marker);
                _this.markerList.splice(idx, 1);
            }
        });
    };
    /**
     *
     * @param coordList
     */
    LeafletHelper.prototype.setMarkers = function (coordList) {
        var _this = this;
        var sumLat = 0;
        var sumLong = 0;
        var lat = 0;
        var long = 0;
        var latLng = null;
        var newMarkerList = [];
        var newMarker;
        coordList.forEach(function (coordObj) {
            lat = coordObj["latitude"];
            long = coordObj["longitude"];
            sumLat = sumLat + lat;
            sumLong = sumLong + long;
            latLng = new leaflet_1["default"].LatLng(lat, long);
            var myIcon = leaflet_1["default"].icon({
                iconUrl: "/img/" + coordObj["icon"],
                iconAnchor: coordObj["iconAnchor"]
            });
            newMarker = leaflet_1["default"].marker(latLng, { icon: myIcon });
            _this.markerList.push(newMarker);
            newMarker.addTo(_this.map);
            newMarkerList.push(newMarker);
        });
        this.setAutoZoom();
        return newMarkerList;
    };
    /*
     * Calculate distance between 2 markers
     */
    LeafletHelper.prototype.getDistance = function (from, to) {
        var fromLatLng = from.getLatLng();
        var toLatLng = to.getLatLng();
        return this.map.distance(fromLatLng, toLatLng);
    };
    /**
     * Display
     **/
    LeafletHelper.prototype.getMap = function () {
        return this.map;
    };
    return LeafletHelper;
}());
exports.LeafletHelper = LeafletHelper;
