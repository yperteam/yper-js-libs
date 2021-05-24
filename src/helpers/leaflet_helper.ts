import L, {LatLngExpression, Polyline, PolylineOptions} from "leaflet";

/**
 * LeafletHelper
 */
export class LeafletHelper {
    /** Default values */
    public static defaultLat = 42.348778;
    public static defaultLng = 8.853407;
    public static defaultZoomValue = 8;
    private static urlTemplate: string = "https://osm.yper.org/osm_tiles_light/{z}/{x}/{y}.png?keyId=3P783r3MFhDAekx";
    public static defaultTileLayerOpts: L.TileLayerOptions = {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMaps</a>',
    };

    private selector: string | HTMLElement;
    private map: L.Map;
    private marker: L.Marker;
    private markerList: L.Marker[] = [];
    private mapOpts: L.MapOptions;
    private viewCoordinates: { lat: number, lng: number, alt?: number };
    private zoomValue: number;
    private tileLayerOpts: L.TileLayerOptions;
    private latLng: L.LatLng;
    private fitBoundsOpts?: L.FitBoundsOptions;

    /**
     *
     * @param selector
     * @param mapOpts
     * @param viewCoordinates
     * @param zoomValue
     * @param tileLayerOpts
     */
    constructor(
        selector: string | HTMLElement,
        mapOpts: L.MapOptions = {scrollWheelZoom: false, zoomControl: true},
        viewCoordinates: { lat: number, lng: number, alt?: number } = {
            lat: LeafletHelper.defaultLat,
            lng: LeafletHelper.defaultLng
        },
        zoomValue: number = LeafletHelper.defaultZoomValue,
        tileLayerOpts: L.TileLayerOptions = LeafletHelper.defaultTileLayerOpts
    ) {
        this.selector = selector;
        this.mapOpts = mapOpts;
        this.viewCoordinates = viewCoordinates;
        this.zoomValue = zoomValue;
        this.tileLayerOpts = tileLayerOpts;
    }

    /**
     *
     * @param mapOpts
     */
    public setMapOpts(mapOpts: L.MapOptions) {
        this.mapOpts = mapOpts;

        return this;
    }

    /**
     *
     * @param viewCoordinates
     */
    public setViewCoordinates(viewCoordinates: { lat: number, lng: number, alt?: number }) {
        this.viewCoordinates = viewCoordinates;

        return this;
    }

    /**
     *
     * @param zoomValue
     */
    public setZoomValue(zoomValue: number) {
        this.zoomValue = zoomValue;

        return this;
    }

    /**
     *
     * @param tileLayerOpts
     */
    public setTileLayerOpts(tileLayerOpts: L.TileLayerOptions) {
        this.tileLayerOpts = tileLayerOpts;

        return this;
    }

    /**
     *
     * @param fitBoundsOpts
     */
    public setFitBoundsOpts(fitBoundsOpts: L.FitBoundsOptions) {
        this.fitBoundsOpts = fitBoundsOpts;

        return this;
    }

    /**
     * Apply settings and create Map
     */
    public createMap() {
        if (!this.map) {
            this.latLng = L.latLng(this.viewCoordinates);
            this.map = L.map(this.selector, this.mapOpts).setView(this.latLng, this.zoomValue);
            L.tileLayer(LeafletHelper.urlTemplate, this.tileLayerOpts).addTo(this.map);
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

    /**
     * Set Auto Zoom
     */
    public setAutoZoom() {
        const group = L.featureGroup(this.markerList);

        this.map.fitBounds(group.getBounds(), this.fitBoundsOpts);
    }

    /**
     * Get Marker List
     */
    public getMarkers(): L.Marker[] {
        return this.markerList;
    }

    /**
     * Get Map
     **/
    public getMap() {
        return this.map;
    }

    /**
     * Calculate distance between 2 markers
     * @param from
     * @param to
     */
    public getDistance(from: L.Marker, to: L.Marker) {
        const fromLatLng = from.getLatLng();
        const toLatLng = to.getLatLng();

        return this.map.distance(fromLatLng, toLatLng);
    }

    /**
     * Remove all markers
     */
    public removeMarkers(): void {
        this.markerList.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.markerList = [];
    }

    /**
     * Remove a specific marker
     * @param marker
     */
    public removeSpecificMarker(marker: L.Marker): void {
        this.markerList.map((mk, idx) => {
            if (mk == marker) {
                this.map.removeLayer(marker);
                this.markerList.splice(idx, 1);
            }
        });
    }

    /**
     *
     * @param markerLatLng
     * @param markerOpts
     */
    public setMarker(
        markerLatLng: { latitude: number, longitude: number, altitude?: number },
        markerOpts?: L.MarkerOptions
    ): L.Marker {
        let latLng = new L.LatLng(markerLatLng.latitude, markerLatLng.longitude, markerLatLng.altitude);
        let newMarker: L.Marker = L.marker(latLng, markerOpts);

        this.markerList.push(newMarker);
        newMarker.addTo(this.map);
        this.setAutoZoom();

        return newMarker;
    }


    /**
     *
     * @param markersOpts
     */
    public setMarkers(markersOpts: {
        markerLatLng: { latitude: number, longitude: number, altitude?: number },
        markerOpts?: L.MarkerOptions
    }[]) {
        let markerListCreated: L.Marker[] = [];

        markersOpts.map(markerOpts => {
            markerListCreated.push(this.setMarker(markerOpts.markerLatLng, markerOpts.markerOpts))
        });

        return markerListCreated;
    }

    /**
     *
     * @param latlngs
     * @param options
     */
    public setPolyline(latlngs: LatLngExpression[] | LatLngExpression[][], options?: PolylineOptions): Polyline {
        return L.polyline(latlngs, options).addTo(this.map);
    }
}
