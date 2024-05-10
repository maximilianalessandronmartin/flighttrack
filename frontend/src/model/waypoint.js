class Waypoint {
    id = ""
    label = ""
    value = ""
    city = ""
    state = ""
    country = ""
    elevation = 0
    lat = 0
    lon = 0
    tz = ""


    constructor(id, label, city, state, country, elevation, lat, lon, tz) {
        this.id = id;
        this.label = label;
        this.value = label;
        this.city = city;
        this.state = state;
        this.country = country;
        this.elevation = Math.round(elevation/3.2808);
        this.lat = lat;
        this.lon = lon;
        this.tz = tz;
    }

}

export default Waypoint