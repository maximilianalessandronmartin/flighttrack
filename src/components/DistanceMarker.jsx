import {Circle, Tooltip} from "react-leaflet";

import React from "react";
import {LatLng, LatLngBounds} from "leaflet/src/geo";


const DistanceMarker = ({lines, airspeed}) => {

    function getCenter(line) {
        let center = new LatLngBounds(line[0], line[2]).getCenter();
        console.log(center);
        return center;
    }

    function getDistance(line) {
        let distance = new LatLng(line[0][0], line[0][1]).distanceTo(new LatLng(line[2][0], line[2][1])) / 1000;
        console.log(distance);
        return Math.round(distance);

    }

    function getDuration(line, airspeed) {
        let distance = getDistance(line);
        // Calc flight duration
        let totalMinutes = distance / airspeed * 60;
        let hours = Math.floor(totalMinutes / 60);
        let minutes = Math.floor(totalMinutes % 60);

        return String(hours +"h " + minutes + "min");
    }

    return (
        <>
            {lines.map((line, index) => (
                <Circle key={"distance-marker" + index} center={getCenter(line)} radius={500} opacity={0.5}>
                    <Tooltip permanent>
                        Strecke: {getDistance(line)} km <br/> Dauer: {getDuration(line, airspeed)}
                    </Tooltip>
                </Circle>
            ))}
        </>
    )
}

export default DistanceMarker;