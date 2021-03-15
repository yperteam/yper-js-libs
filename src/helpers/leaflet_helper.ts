import L from "leaflet";
import "leaflet/dist/leaflet.css";

export class LeafletHelper {
    private selector: string | HTMLElement;
    private map: L.Map;
    private marker: L.Marker;
    private markerList: L.Marker[] = [];

    constructor(
        selector: string | HTMLElement,
        private zoomControl: boolean = true,
        private location: [number, number] = null
    ) {
        this.selector = selector;
        this.initMap(zoomControl, location);
    }

    /*
     * Get the marker list
     */
    public getMarkerList() {
        return this.markerList;
    }

    public initMap(zoom: boolean, location: [number, number] = null) {
        if (this.map === undefined) {
            let options = {
                scrollWheelZoom: false,
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
            const latLng = L.latLng(defautRegion[0], defautRegion[1]);
            this.map = L.map(this.selector, options).setView(latLng, zoomValue);
            L.tileLayer(
                "https://osm.yper.org/osm_tiles_light/{z}/{x}/{y}.png?keyId=3P783r3MFhDAekx",
                {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMaps</a>',
                }
            ).addTo(this.map);
        }
    }

    /**
     * Set map view and position, based on coordinates
     * @param latitude
     * @param longitude
     * @param zoom
     */
    public setPosition(latitude: number, longitude: number, zoom: number) {
        let latLng = new L.LatLng(latitude, longitude);
        this.map.setView(latLng, zoom);

        if (this.marker === undefined) {
            this.marker = L.marker(latLng).addTo(this.map);
        }

        this.map.panTo(latLng);
        this.marker.setLatLng(latLng);
    }

    public setAutoZoom() {
        const group = L.featureGroup(this.markerList);

        this.map.fitBounds(group.getBounds());
    }

    public getMarkers() {
        return this.markerList;
    }

    public removeMarkers() {
        this.markerList.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.markerList = [];
    }

    /**
     * Remove a specific marker
     * @param marker
     */
    public removeSpecificMarker(marker: L.Marker) {
        this.markerList.map((mk, idx) => {
            if (mk == marker) {
                this.map.removeLayer(marker);
                this.markerList.splice(idx, 1);
            }
        });
    }

    /**
     *
     * @param coordList
     */
    public setMarkers(coordList: []) {
        let sumLat = 0;
        let sumLong = 0;
        let lat = 0;
        let long = 0;
        let latLng = null;
        let newMarkerList: L.Marker[] = [];
        let newMarker: L.Marker;

        coordList.forEach(coordObj => {
            lat = coordObj["latitude"];
            long = coordObj["longitude"];
            sumLat = sumLat + lat;
            sumLong = sumLong + long;

            latLng = new L.LatLng(lat, long);

            const myIcon = L.icon({
                iconUrl: "/img/" + coordObj["icon"],
                iconAnchor: coordObj["iconAnchor"],
            });
            newMarker = L.marker(latLng, {icon: myIcon});

            this.markerList.push(newMarker);
            newMarker.addTo(this.map);
            newMarkerList.push(newMarker);
        });

        this.setAutoZoom();
        return newMarkerList;
    }

    /*
     * Calculate distance between 2 markers
     */
    public getDistance(from: L.Marker, to: L.Marker) {
        const fromLatLng = from.getLatLng();
        const toLatLng = to.getLatLng();

        return this.map.distance(fromLatLng, toLatLng);
    }

    /**
     * Display
     **/
    public getMap() {
        return this.map;
    }
}
