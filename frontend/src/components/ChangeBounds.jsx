
import {useMap} from "react-leaflet";

function ChangeBounds({ bounds }) {
    const map:Map = useMap();
    map.fitBounds(bounds);
    return null;
}
export default ChangeBounds