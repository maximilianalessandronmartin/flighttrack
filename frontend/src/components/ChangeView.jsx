import {useMap} from "react-leaflet";

function ChangeView({ center, zoom }) {
    const map:Map = useMap();
    map.setView(center, zoom);
    console.log(map.getZoom(), map.getCenter())
    return null;
}
export default ChangeView