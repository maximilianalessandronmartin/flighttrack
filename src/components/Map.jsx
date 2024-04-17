import {Container} from "react-bootstrap";
import {MapContainer, TileLayer, useMapEvent} from "react-leaflet";
import CustomMarker from "./CustomMarker";
import ChangeView from "./ChangeView";
import React, {useRef} from "react";
import ChangeBounds from "./ChangeBounds";
import './Map.css'


const Map = ({waypoints, center, zoom, bounds}) => {


    const animateRef = useRef(true)
    function SetViewOnClick({animateRef}) {
        const map = useMapEvent('click', (e) => {
            map.setView(e.latlng, map.getZoom(), {
                animate: animateRef.current || false,
            })
        })

        return null
    }


    return (
        <>
            <Container className={"w-75 z-0"}>
                <p>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => {
                                animateRef.current = !animateRef.current
                            }}
                        />
                        Animate panning
                    </label>
                </p>
                <MapContainer

                    bounds={bounds}
                    center={center}
                    zoom={zoom}
                    scrollWheelZoom={true}
                    className={"z-1"}
                >
                    <TileLayer
                        attribution='&copy; <a href="http:localhost.org/copyright">OpenStreetMap</a> contributors'
                        minZoom={4}
                        maxZoom={11}
                        url="http://localhost:3000/api/{z}/{x}/{y}.png"
                    />
                    <CustomMarker waypoints={waypoints}/>
                    <ChangeView center={center} zoom={zoom}/>
                    <ChangeBounds bounds={bounds}/>
                    <SetViewOnClick animateRef={animateRef}/>
                </MapContainer>
            </Container>
        </>
    )
}

export default Map;
