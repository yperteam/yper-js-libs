/// <reference types="react" />
import { Retailpoint } from "../../data/entity/retailpoint.entity";
import { GeoJsonDirections } from "../../data/entity/mission.entity";
export declare const reloadItineraryMapState: import("recoil").RecoilState<Boolean>;
export default function Map(props: {
    retailPointList: Retailpoint[];
    enableScrollZoom?: boolean;
    icon: string[];
    height: string;
}): JSX.Element;
export declare function ItineraryMap(props: {
    fromCoordinates: [number, number];
    toCoordinates: [number, number];
    isLoading: boolean;
    itinerary: GeoJsonDirections;
    enableScrollZoom?: boolean;
    height: string;
}): JSX.Element;
