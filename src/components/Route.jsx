import React from "react";
import {Table} from "react-bootstrap";
import {CaretDownSquare, CaretUpSquare, Trash} from 'react-bootstrap-icons';
import "./Route.css"


const Route = ({waypoints, handleRemove, handleMoveUp, handleMoveDown}) => {

    return (
        <>
            <Table responsive>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>ICAO</th>
                    <th>Stadt</th>
                    <th>Bundesland</th>
                    <th>Land</th>
                    <th>Höhe</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Verschieben</th>
                    <th>Löschen</th>
                </tr>
                </thead>
                <tbody>
                {waypoints.map((waypoint, index) => (
                    <tr key={index}>
                        <td>{waypoint.label}</td>
                        <td>{waypoint.id}</td>
                        <td>{waypoint.city}</td>
                        <td>{waypoint.state}</td>
                        <td>{waypoint.country}</td>
                        <td>{waypoint.elevation}</td>
                        <td>{waypoint.lat}</td>
                        <td>{waypoint.lon}</td>
                        <td>
                            <CaretUpSquare
                                onClick={() => handleMoveUp(index)}
                                cursor={"pointer"}
                                className={"me-2 hover"}
                                style={{fontSize: "30px"}}/>
                            <CaretDownSquare
                                onClick={() => handleMoveDown(index)}
                                cursor={"pointer"}
                                className={" hover"}
                                style={{fontSize: "30px"}}/>
                        </td>
                        <td key={index}>
                            <Trash
                                cursor={"pointer"}
                                className={"pointer neutral-hover"}
                                style={{fontSize: "30px"}}
                                onClick={() => handleRemove(index)}>
                                Remove</Trash>
                        </td>
                    </tr>
                ))}

                </tbody>
            </Table>
        </>
    )
}


export default Route;