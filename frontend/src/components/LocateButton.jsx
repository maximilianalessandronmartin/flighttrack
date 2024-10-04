
import {Crosshair} from "react-bootstrap-icons";
import React from "react";
import { useMap} from "react-leaflet";
import LocationMarker from "./LocationMarker";


const LocateButton = () => {
    const map:Map = useMap();

    const handleClick = () => {
        const locationMarker = new LocationMarker();
        locationMarker.addTo(map)
    }

    return(

        <Crosshair onClick={handleClick} style={{fontSize: "30px"}}  className={"mb-1 pointer-event hover bg-gradient"}>Locate</Crosshair>

    )

}
export default LocateButton;