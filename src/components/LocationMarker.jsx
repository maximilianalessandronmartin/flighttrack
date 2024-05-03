import {Marker, Popup} from "react-leaflet";
import L from "leaflet";
import {useState} from "react";



const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState(null);


    let greenIcon = L.icon({
        iconUrl: 'airport-icon.png',

        iconSize:     [46, 46], // size of the icon
        shadowSize:   [0, 0], // size of the shadow
        iconAnchor:   [23, 46], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [0, -46] // point from which the popup should open relative to the iconAnchor
    });

    /*useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            const radius = e.accuracy;
            const circle = L.circle(e.latlng, radius);
            circle.addTo(map);
            setBbox(e.bounds.toBBoxString().split(","));
        });

    }, [map]);
*/


    return position === null ? null : (
        <Marker position={position} icon={greenIcon}>
            <Popup>
                You are here. <br />
                Map bbox: <br />
                <b>Southwest lng</b>: {bbox[0]} <br />
                <b>Southwest lat</b>: {bbox[1]} <br />
                <b>Northeast lng</b>: {bbox[2]} <br />
                <b>Northeast lat</b>: {bbox[3]}
            </Popup>
        </Marker>
    )
}
export default LocationMarker