import {Container} from "react-bootstrap";
import { MapContainer, Polyline, TileLayer, useMapEvent} from "react-leaflet";
import CustomMarker from "./CustomMarker";
import ChangeView from "./ChangeView";
import React, {useRef} from "react";
import ChangeBounds from "./ChangeBounds";
import './Map.css'
import DistanceMarker from "./DistanceMarker";
import 'leaflet/dist/leaflet.css';



const Map = ({waypoints, waypoint, center, zoom, bounds, lines, color, airspeed}) => {

    const animateRef = useRef(true)

    function SetViewOnClick({animateRef}) {
        const map: Map = useMapEvent('click', (e) => {
            console.log("Current zoom:", map.getZoom())

            map.setView(e.latlng, map.getZoom(), {
                animate: animateRef.current || false,
            })
        })

        return null;
    }


    function MapPlaceholder() {
        return (
            <p>
                FlightMap of Germany.{' '}
                <noscript>You need to enable JavaScript to see this map.</noscript>
            </p>
        )
    }

    return (
        <>
            <Container className={"w-75  z-0"}>
               
                <MapContainer
                    placeholder={<MapPlaceholder/>}
                    bounds={bounds}
                    center={center}
                    zoom={zoom}
                    scrollWheelZoom={true}
                >
                    <TileLayer

                        attribution='&copy; <a href="http:localhost.org/copyright">OpenFlightMaps</a> contributors'
                        minZoom={4}
                        maxZoom={11}
                        url="http://192.168.178.61:3000/api/{z}/{x}/{y}.png"
                    />

                    <CustomMarker waypoints={Array.of(waypoint)}/>
                    <CustomMarker waypoints={waypoints}/>
                    <ChangeView center={center} zoom={zoom}/>
                    <ChangeBounds bounds={bounds}/>
                    <SetViewOnClick animateRef={animateRef}/>
                    <Polyline pathOption={color} positions={lines} arrowheads/>
                    <DistanceMarker lines={lines} airspeed={airspeed}/>

                </MapContainer>
            </Container>
        </>
    )
}

export default Map;
