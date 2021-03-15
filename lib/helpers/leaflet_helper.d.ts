import L from "leaflet";
import "leaflet/dist/leaflet.css";
export declare class LeafletHelper {
    private zoomControl;
    private location;
    private selector;
    private map;
    private marker;
    private markerList;
    constructor(selector: string | HTMLElement, zoomControl?: boolean, location?: [number, number]);
    getMarkerList(): L.Marker<any>[];
    initMap(zoom: boolean, location?: [number, number]): void;
    /**
     * Set map view and position, based on coordinates
     * @param latitude
     * @param longitude
     * @param zoom
     */
    setPosition(latitude: number, longitude: number, zoom: number): void;
    setAutoZoom(): void;
    getMarkers(): L.Marker<any>[];
    removeMarkers(): void;
    /**
     * Remove a specific marker
     * @param marker
     */
    removeSpecificMarker(marker: L.Marker): void;
    /**
     *
     * @param coordList
     */
    setMarkers(coordList: []): L.Marker<any>[];
    getDistance(from: L.Marker, to: L.Marker): number;
    /**
     * Display
     **/
    getMap(): L.Map;
}
