import './App.css';
import React, {useEffect, useState} from "react";
import Select from 'react-select';
import {Button, Col, Container, Row} from "react-bootstrap";
import Route from "./components/Route";
import Waypoint from "./model/waypoint";
import Map from "./components/Map";
import {latLng} from "leaflet/src/geo";
import Login from "./components/Login";


function App() {
    const API_URL = "http://192.168.178.61:3000"
    const [options, setOptions] = useState([]);
    const [center, setCenter] = useState([48.0426251, 9.0125809]);
    const [zoom, setZoom] = useState(8);
    const [bounds, setBounds] = useState([[53, 9],
        [45, 12]]);
    const [lines, setLines] = useState([]);
    const [color, setColor] = useState({color: 'purple'});
    const [airspeed, setAirspeed] = useState(120);
    const [waypoint, setWaypoint] = useState(new Waypoint("Leibertingen", "Leibertingen", "Leibertingen", "Baden-Württemberg", "DE", 2733, 48.0426251, 9.0125809, "Europe/Berlin"));
    const [waypoints, setWaypoints] = useState([]);

    useEffect(() => {
            // GET request using fetch inside useEffect React hook
            fetch(API_URL + '/api/airports', {})
                .then(response => response.json())
                .then(data => setOptions(generateWaypoints(data)))
                .catch(error => console.log(error));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
        },
        []);
    function generateWaypoints(airports: Object): Array<Waypoint> {
        let result = airports.map(airport => (new Waypoint(
            airport.icao,
            airport.name,
            airport.city,
            airport.state,
            airport.country,
            airport.elevation,
            airport.lat,
            airport.lon,
            airport.tz
        )));

        return [...result];
    }





    function array_move(arr, old_index, new_index) {
        if (new_index >= arr.length && arr.length !== 1) {
            console.log("Shifting")
            arr.unshift(arr.pop());
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr;
        } else if (new_index <= 0) {

            arr.push(arr.shift())
            return arr;

        } else {
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr;
        }
    }


    const handleRemove = targetIndex => {
        console.log("Route before remove: ", waypoints)
        const array = waypoints.filter((item, index) => index !== targetIndex);
        setWaypoints([...array]);
        planRoute([...array]);
        console.log("Route after remove: ", waypoints)
    }


    //Move waypoint up
    const handleMoveUp = targetIndex => {
        let array = array_move([...waypoints], targetIndex, targetIndex - 1);
        setWaypoints([...array]);
        planRoute([...array])
        console.log("Route after move: ", waypoints)
    }

    const handleMoveDown = targetIndex => {
        let array = array_move([...waypoints], targetIndex, targetIndex + 1);
        setWaypoints([...array]);
        planRoute([...array])
        console.log("Route after move: ", waypoints)

    }

    const handleChange = selected => {
        setWaypoint(selected);
        setTimeout(function () {
            setZoom(9);
            setCenter([selected.lat, selected.lon]);

        }, 200);
        console.log(selected);
        console.log(zoom)
    }


    function planRoute(waypoints) {
        console.log("Calc Route");
        console.log(waypoints.length)
        if (waypoints.length > 1) {
            let lines = [];
            for (let i = 0; i < waypoints.length - 1; i++) {
                let line =
                    [
                        [waypoints[i].lat, waypoints[i].lon],
                        [waypoints[i].lat, waypoints[i].lon],
                        [waypoints[i + 1].lat, waypoints[i + 1].lon]
                    ];
                lines.push(line);
            }
            setLines([...lines]);
            fitBounds(waypoints);
        } else if (waypoints.length === 1) {
            setWaypoint(null)
            setLines([])
            setZoom(9);
            setCenter([waypoints[0].lat, waypoints[0].lon]);
        } else {
            setLines([])
            setZoom(9);
            setWaypoint(new Waypoint("Leibertingen", "Leibertingen", "Leibertingen", "Baden-Württemberg", "DE", 2733, 48.0426251, 9.0125809, "Europe/Berlin"));
            setCenter([48.0426251, 9.0125809])
        }
    }


    function fitBounds(waypoints) {
        if (waypoints.length > 1) {
            let lat = [];
            let lon = [];
            let maxLat = 0;
            let minLat = 1000;
            let maxLon = 0;
            let minLon = 1000;
            for (let i = 0; i < waypoints.length; i++) {
                lat.push(waypoints[i].lat);
                lon.push(waypoints[i].lon);
                console.log(lat);
                console.log(lon);
            }
            for (let i = 0; i < lat.length; i++) {
                maxLat = Math.max(maxLat, lat[i]);
                minLat = Math.min(minLat, lat[i]);
                maxLon = Math.max(maxLon, lon[i]);
                minLon = Math.min(minLon, lon[i]);
            }

            let c1 = latLng(minLat - 0.2, minLon - 0.2);
            let c2 = latLng(maxLat + 0.2, maxLon + 0.2);
            console.log(minLat, maxLat, minLon, maxLon);

            // correct zoom to fit markers
            setTimeout(function () {
                setBounds([c1, c2]);
            }, 100);
        } else {
            setLines([]);
            setTimeout(function () {
                setCenter([waypoint.lat, waypoint.lon]);
                setZoom(9);
            }, 100);
        }
    }

    function addWaypoint() {
        waypoints.push(waypoint);
        if (waypoints.length > 1) {
            planRoute([...waypoints]);
        }


        console.log(waypoints);
        setWaypoints([...waypoints]);
    }


    return (

        <>
            <Container>
                <Row className={"row-1 my-5"}>

                    <Col>
                        <Select onChange={handleChange}
                                options={options}>
                        </Select>
                    </Col>
                    <Col className={"d-flex justify-content-end"}>
                        <Button onClick={addWaypoint}>
                            Add waypoint</Button>
                    </Col>

                </Row>
                <Row className={"mb-5"}>
                    <Container>

                        <h3>Route</h3>
                        <hr></hr>
                        <Route waypoints={waypoints}
                               handleMoveUp={handleMoveUp}
                               handleMoveDown={handleMoveDown}
                               handleRemove={handleRemove}></Route>

                    </Container>
                </Row>
            </Container>
            <Map waypoints={waypoints} waypoint={waypoint} center={center} zoom={zoom} bounds={bounds} lines={lines}
                 color={color} airspeed={airspeed}/>
            <Login />

        </>
    )
}

export default App;
