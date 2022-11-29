import React, { useEffect, useRef } from "react";
// TODO: We use "@monsonjeremy/react-leaflet" package temporarily because Symfony Encore's webpack version isn't abble to build from leaflet main package
import {
  MapContainer,
  TileLayer,
  Marker,
  GeoJSON,
  useMap,
} from "@monsonjeremy/react-leaflet";
import Leaflet, { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import { Retailpoint } from "../../data/entity/retailpoint.entity";
import styled, { useTheme } from "styled-components";
import { GeoJsonDirections } from "../../data/entity/mission.entity";
import { atom, useRecoilValue } from "recoil";
import CustomLoader from "./loader";
import { SvgPicture, Text } from "../../app/widget/mixins";
import { Row } from "./generic";

const infoIcon = "/img/react/icon/ic_information_circle.svg";

interface LeafletProps {
  height: string;
}

enum pinMapIcon {
  store = "/img/react/icon/pin-store.png",
  pickup = "/img/react/icon/pin-pickup.png",
  delivery = "/img/react/icon/pin-delivery.png",
}

export const reloadItineraryMapState = atom<Boolean>({
  key: "reload-itinerary-map-state",
  default: false,
});

export default function Map(props: {
  retailPointList: Retailpoint[];
  enableScrollZoom?: boolean;
  icon: string[];
  height: string;
}) {
  const bounds = props.retailPointList.map(rp => [
    rp.address.location.coordinates[1],
    rp.address.location.coordinates[0],
  ]) as LatLngBoundsExpression;

  const marketIcon = Leaflet.icon({
    iconUrl: pinMapIcon[`${props.icon[0]}`],
    iconAnchor: [20, 41],
  });

  return (
    <LeafletWrapper height={props.height}>
      <MapContainer
        bounds={bounds}
        scrollWheelZoom={props.enableScrollZoom || false}
        boundsOptions={{ padding: [15, 15] }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.yper.fr/default/{z}/{x}/{y}.png"
        />
        {props.retailPointList.map(rp => (
          <Marker
            key={rp.id}
            position={
              [
                rp.address.location.coordinates[1],
                rp.address.location.coordinates[0],
              ] as LatLngExpression
            }
            icon={marketIcon}
          ></Marker>
        ))}
      </MapContainer>
    </LeafletWrapper>
  );
}

export function ItineraryMap(props: {
  fromCoordinates: [number, number];
  toCoordinates: [number, number];
  isLoading: boolean;
  itinerary: GeoJsonDirections;
  enableScrollZoom?: boolean;
  height: string;
}) {
  const theme = useTheme();
  const bounds = (props.toCoordinates
    ? [
      [props.fromCoordinates[1], props.fromCoordinates[0]],
      [props.toCoordinates[1], props.toCoordinates[0]],
    ]
    : [
      [props.fromCoordinates[1], props.fromCoordinates[0]],
    ]) as LatLngBoundsExpression;

  /** We need to call this method in <MapContainer> on "whenCreated" prop
   * Leaflet have an issue on size validation
   */
  const setMap = (map: Leaflet.Map) => {
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    const container = document.getElementById("map-container");
    if (container) {
      resizeObserver.observe(container);
    }
  };

  return (
    <LeafletWrapper height={props.height}>
      <MapContainer
        id="map-container"
        center={[props.fromCoordinates[1], props.fromCoordinates[0]]}
        scrollWheelZoom={props.enableScrollZoom || false}
        whenCreated={setMap}
        zoom={13}
      >
        <ItineraryMapContent
          fromCoordinates={[...props.fromCoordinates]}
          toCoordinates={props.toCoordinates}
          bounds={bounds}
          itinerary={props.itinerary}
        />
      </MapContainer>
      <InfoBox
        alignItems="center"
        padding={{ left: "5px", right: "5px" }}
        height="24px"
        width="280px"
      >
        <SvgPicture
          width="13px"
          height="13px"
          color={theme.color.information["400"]}
          src={infoIcon}
        />
        <Text
          padding={{ left: "5px" }}
          textStyle={theme.textTheme.body.small.copyWith({
            color: theme.color.information["700"],
          })}
        >
          Distance et itinéraire calculés par{" "}
          <a href="https://www.mapbox.com/about/maps/">&copy; Mapbox</a>
        </Text>
      </InfoBox>
      {props.isLoading && (
        <OverlayLoader>
          <CustomLoader color={theme.color.grayscale["000"]} />
        </OverlayLoader>
      )}
    </LeafletWrapper>
  );
}

function ItineraryMapContent(props: {
  fromCoordinates: [number, number] | null;
  toCoordinates: [number, number] | null;
  bounds: LatLngBoundsExpression;
  itinerary: GeoJsonDirections;
}) {
  const theme = useTheme();
  const map = useMap();
  const isReloaded = useRecoilValue(reloadItineraryMapState);
  // <GeoJSON> need ref to refresh
  const geoJsonLayer = useRef<any>(null);

  const pickupIcon = Leaflet.icon({
    iconUrl: pinMapIcon["pickup"],
    iconAnchor: [47, 70],
  });

  const deliveryIcon = Leaflet.icon({
    iconUrl: pinMapIcon["delivery"],
    iconAnchor: [47, 70],
  });

  let geoJsonData: GeoJSON.Feature = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: props.itinerary!.coordinates,
    },
    properties: {},
  };

  const itineraryStyle: Leaflet.StyleFunction = () => {
    return { color: theme.color.primary[400], weight: 4 };
  };

  useEffect(() => {
    if (isReloaded) {
      map.fitBounds(props.bounds, { paddingTopLeft: [50, 50] });
    }
  }, [isReloaded]);

  useEffect(() => {
    geoJsonData = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: props.itinerary?.coordinates,
      },
      properties: {},
    };
    if (geoJsonLayer.current) {
      geoJsonLayer.current?.clearLayers().addData(geoJsonData);
      map.fitBounds(props.bounds, { paddingTopLeft: [50, 50] });
    }
  }, [props.itinerary]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.yper.fr/default/{z}/{x}/{y}.png"
      />
      {props.fromCoordinates && (
        <Marker
          key="from-marker"
          position={
            [
              props.fromCoordinates[1],
              props.fromCoordinates[0],
            ] as LatLngExpression
          }
          icon={pickupIcon}
        />
      )}
      {props.toCoordinates && (
        <Marker
          key="to-marker"
          position={
            [props.toCoordinates[1], props.toCoordinates[0]] as LatLngExpression
          }
          icon={deliveryIcon}
        />
      )}
      {props.itinerary && (
        <GeoJSON
          ref={geoJsonLayer}
          data={geoJsonData}
          style={itineraryStyle()}
        />
      )}
    </>
  );
}

const LeafletWrapper = styled.div<LeafletProps>`
  position: relative;
  .leaflet-container {
    width: 100%;
    height: ${props => props.height || "initial"};
    .leaflet-control-container > div {
      z-index: 0;
    }
  }
  .leaflet-pane {
    z-index: 0;
  }
`;

const OverlayLoader = styled.div`
  background-color: ${props => props.theme.color.primary["400"]};
  display: flex;
  height: 225px;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
`;

const InfoBox = styled(Row)`
  background-color: ${props => props.theme.color.grayscale["000"]};
  border-radius: 5px;
  bottom: 7px;
  box-shadow: 0 4px 10px 0 ${props => props.theme.color.grayscale["200"]};
  left: 7px;
  position: absolute;
`;
