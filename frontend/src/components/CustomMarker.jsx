import {Marker, Popup} from "react-leaflet";

import React from "react";
import L from 'leaflet'
import {LatLng} from "leaflet/src/geo";


let greenIcon = L.icon({
    iconUrl: 'airport-icon.png',

    iconSize:     [46, 46], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [23, 46], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -46] // point from which the popup should open relative to the iconAnchor
});


const CustomMarker = ({waypoints, index}) => {
    console.log(waypoints);
    if(waypoints.size !== 0 && waypoints[0] !==null) {
    return (

        <>
            {waypoints.map((waypoint, index) => (

                <Marker key={"custommarker-"+index} icon={greenIcon} position={new LatLng([waypoint.lat], [waypoint.lon])}>
                    <Popup>
                        {waypoint.label} <br/> Höhe: {waypoint.elevation}m
                    </Popup>
                </Marker>
            ))}
        </>
    )
    }
}

export default CustomMarker;