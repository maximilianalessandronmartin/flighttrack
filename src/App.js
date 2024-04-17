import './App.css';
import React, {useEffect, useState} from "react";
import Select from 'react-select';
import {Button, Col, Container, Row} from "react-bootstrap";
import Route from "./components/Route";
import Waypoint from "./model/waypoint";
import Map from "./components/Map";
import {latLng} from "leaflet/src/geo";


function App() {

    const [options, setOptions] = useState([]);
    const [center, setCenter] = useState([49, 10.451526])
    const [zoom, setZoom] = useState(null);
    const [bounds, setBounds] = useState([[53, 9],
        [45, 12]]);

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
        console.log(result)

        return [...result];
    }

    useEffect(() => {
            // GET request using fetch inside useEffect React hook
            fetch('http://localhost:3000/api/airports', {})
                .then(response => response.json())
                .then(data => setOptions(generateWaypoints(data)))
                .catch(error => console.log(error));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
        },
        []);


    const c = document.getElementById("canvas");

    let ctx;
    //const [routes, setRoutes] = useState([]);
    const [waypoint, setWaypoint] = useState(null);
    const [waypoints, setWaypoints] = useState([]);


    function array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
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
        // setWaypoints(oldValues => {
        //
        //     return oldValues.filter((_,i) => i !== index)
        // });
        setWaypoints([...array]);
        console.log("Route after remove: ", waypoints)

    }


    //Move waypoint up
    const handleMoveUp = targetIndex => {


        let array = array_move([...waypoints], targetIndex, targetIndex - 1);
        setWaypoints([...array]);
        console.log("Route after move: ", waypoints)
    }

    const handleMoveDown = targetIndex => {

        let array = array_move([...waypoints], targetIndex, targetIndex + 1);
        setWaypoints([...array]);
        console.log("Route after move: ", waypoints)

    }

    const handleChange = selected => {
        setWaypoint(selected);
        setTimeout(function() {

            setCenter([selected.lat, selected.lon]);
            setZoom(9);
        }, 500);

        console.log(selected);
    }


    function drawPoint(x, y, radius, context) {
        context.beginPath();
        while (radius >= 1) {
            context.arc(x, y, radius, 0, 2 * Math.PI, true);
            context.stroke();
            radius--;
        }
    }

    /*function drawLine(firstWaypoint, secondWaypoint, context) {
        context.moveTo(firstWaypoint.x, firstWaypoint.y);
        context.lineTo(secondWaypoint.x, secondWaypoint.y);
        context.stroke();
    }*/

    function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color) {
        //variables to be used when creating the arrow
        var headlen = 10;
        var angle = Math.atan2(toy - fromy, tox - fromx);

        ctx.save();
        ctx.strokeStyle = color;

        //starting path of the arrow from the start square to the end square
        //and drawing the stroke
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.lineWidth = arrowWidth;
        ctx.stroke();

        //starting a new path from the head of the arrow to one of the sides of
        //the point
        ctx.beginPath();
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7),
            toy - headlen * Math.sin(angle - Math.PI / 7));

        //path from the side point of the arrow, to the other side point
        ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7),
            toy - headlen * Math.sin(angle + Math.PI / 7));

        //path from the side point back to the tip of the arrow, and then
        //again to the opposite side point
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7),
            toy - headlen * Math.sin(angle - Math.PI / 7));

        //draws the paths created above
        ctx.stroke();
        ctx.restore();
    }

    function drawText(text, x, y, context) {
        context.letterSpacing = '4px';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, x, y);
        context.strokeText(text, x, y);
    }

    function changeStrokeColor(color, font, fontSize, context) {
        context.fillStyle = color;
        context.strokeStyle = color;
        context.font = fontSize + 'px ' + font;
    }

    function clearCanvas(context) {

        context.clearRect(0, 0, c.width, c.height);
    }

    function planRoute(waypoints) {
        console.log("Calc Route");
        ctx = c.getContext("2d");
        clearCanvas(ctx);
        let points = waypoints;
        if (points.length > 0) {

            console.log("Waypoint count: ", points.length);

            changeStrokeColor("black", "Roboto", 14, ctx);

            // Draw Waypoints
            for (let i = 0; i < points.length; i++) {
                drawPoint(points[i].x, points[i].y, 3, ctx);
                drawText(points[i].label, points[i].x - 50, points[i].y - 20, ctx);

            }
            // Draw Routes
            if (points.length > 1) {
                for (let i = 0; i < points.length - 1; i++) {
                    //drawLine(points[i], points[i + 1], ctx)
                    drawArrow(ctx, points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, 2, "black")
                }
            }
        }
    }


    function addWaypoint() {
        waypoints.push(waypoint);
        let arr = waypoints;
        if (waypoints.length > 1) {

            let lat = [];
            let lon = [];
            let maxLat = 0;
            let minLat = 1000;
            let maxLon = 0;
            let minLon = 1000;
            for (let i = 0; i < arr.length; i++) {
                lat.push(arr[i].lat);
                lon.push(arr[i].lon);
                console.log(lat);
                console.log(lon);
            }
            for(let i = 0; i < lat.length; i++) {
                maxLat = Math.max(maxLat, lat[i]);
                minLat = Math.min(minLat, lat[i]);
                maxLon = Math.max(maxLon, lon[i]);
                minLon = Math.min(minLon, lon[i]);
            }
            console.log(minLat, maxLat, minLon, maxLon);
            let c1 = latLng(minLat, minLon);
            let c2 = latLng(maxLat, maxLon);
            setBounds([c1, c2]);

            // correct zoom to fit markers
            setTimeout(function() {
                setZoom(zoom - 1);
            }, 500);
        } else {
            setCenter([waypoint.lat, waypoint.lon]);
            setZoom(11)
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
                               handleMoveDown={handleMoveDown
                               } handleRemove={handleRemove}></Route>

                    </Container>
                </Row>
            </Container>
            <Map waypoints={waypoints} center={center} zoom={zoom} bounds={bounds}/>
        </>
    );
}

export default App;
