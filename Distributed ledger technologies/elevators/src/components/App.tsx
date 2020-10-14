import React from 'react';
import './App.css';
import {Floor} from "./Floor/Floor";
import {Grid} from "semantic-ui-react";
import Elevator from './Elevator/Elevator';
import {floorsCount} from "../config/config";
import ElevatorContainer from "./Elevator/ElevatorContainer";
import FloorContainer from "./Floor/FloorContainer";


function App() {
    const floors: React.ReactElement[] = []
    for (let i = floorsCount; i > 0; i--) {
        floors.push(<FloorContainer key={i} floorNumber={i}/>)
    }
    return (
        <div className="App">
            {floors}
            {<ElevatorContainer/>}
        </div>
    );
}

export default App;
