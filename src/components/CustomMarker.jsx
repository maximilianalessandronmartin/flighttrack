import {Marker, Popup} from "react-leaflet";

import React from "react";

import {LatLng} from "leaflet/src/geo";


const CustomMarker = ({waypoints, index}) => {

    return (
        <>
            {waypoints.map(waypoint => (
                <Marker key={index} position={new LatLng([waypoint.lat], [waypoint.lon])}>
                    <Popup>
                        {waypoint.label} <br/> Höhe: {waypoint.elevation}m
                    </Popup>
                </Marker>
            ))}
        </>
    )
}

export default CustomMarker;