import L from "leaflet";
/**
 * LeafletHelper
 */
export declare class LeafletHelper {
    /** Default values */
    static defaultLat: number;
    static defaultLng: number;
    static defaultZoomValue: number;
    private static urlTemplate;
    static defaultTileLayerOpts: L.TileLayerOptions;
    private selector;
    private map;
    private marker;
    private markerList;
    private mapOpts;
    private viewCoordinates;
    private zoomValue;
    private tileLayerOpts;
    private latLng;
    private fitBoundsOpts?;
    /**
     *
     * @param selector
     * @param mapOpts
     * @param viewCoordinates
     * @param zoomValue
     * @param tileLayerOpts
     */
    constructor(selector: string | HTMLElement, mapOpts?: L.MapOptions, viewCoordinates?: {
        lat: number;
        lng: number;
        alt?: number;
    }, zoomValue?: number, tileLayerOpts?: L.TileLayerOptions);
    /**
     *
     * @param mapOpts
     */
    setMapOpts(mapOpts: L.MapOptions): this;
    /**
     *
     * @param viewCoordinates
     */
    setViewCoordinates(viewCoordinates: {
        lat: number;
        lng: number;
        alt?: number;
    }): this;
    /**
     *
     * @param zoomValue
     */
    setZoomValue(zoomValue: number): this;
    /**
     *
     * @param tileLayerOpts
     */
    setTileLayerOpts(tileLayerOpts: L.TileLayerOptions): this;
    /**
     *
     * @param fitBoundsOpts
     */
    setFitBoundsOpts(fitBoundsOpts: L.FitBoundsOptions): this;
    /**
     * Apply settings and create Map
     */
    createMap(): void;
    /**
     * Set map view and position, based on coordinates
     * @param latitude
     * @param longitude
     * @param zoom
     */
    setPosition(latitude: number, longitude: number, zoom: number): void;
    /**
     * Set Auto Zoom
     */
    setAutoZoom(): void;
    /**
     * Get Marker List
     */
    getMarkers(): L.Marker[];
    /**
     * Get Map
     **/
    getMap(): L.Map;
    /**
     * Calculate distance between 2 markers
     * @param from
     * @param to
     */
    getDistance(from: L.Marker, to: L.Marker): number;
    /**
     * Remove all markers
     */
    removeMarkers(): void;
    /**
     * Remove a specific marker
     * @param marker
     */
    removeSpecificMarker(marker: L.Marker): void;
    /**
     *
     * @param markerLatLng
     * @param markerOpts
     */
    setMarker(markerLatLng: {
        latitude: number;
        longitude: number;
        altitude?: number;
    }, markerOpts?: L.MarkerOptions): L.Marker;
    /**
     *
     * @param markersOpts
     */
    setMarkers(markersOpts: {
        markerLatLng: {
            latitude: number;
            longitude: number;
            altitude?: number;
        };
        markerOpts?: L.MarkerOptions;
    }[]): L.Marker<any>[];
}
