import React from "react";
import {floorsCount} from "../../config/config";
import FloorContainer from "../Floor/FloorContainer";



export function Floors() {
    const floors: React.ReactElement[] = []
    for (let i = floorsCount; i > 0; i--) {
        floors.push(<FloorContainer key={i} floorNumber={i}/>)
    }
    return <>{floors}</>
}