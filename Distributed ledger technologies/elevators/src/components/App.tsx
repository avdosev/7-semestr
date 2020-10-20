import React from 'react';
import './App.css';
import {Floor} from "./Floor/Floor";
import {Grid, GridColumn} from "semantic-ui-react";
import Elevator from './Elevator/Elevator';
import {elevatorSpeed, floorsCount} from "../config/config";
import ElevatorContainer from "./Elevator/ElevatorContainer";
import FloorContainer from "./Floor/FloorContainer";
import {Floors} from "./Floors/Floors";
import {myContainer} from "../config/inversify.config";
import {TYPES} from "../typings/types";
import {ElevatorAction} from "./Elevator/ElevatorAction";
import {store} from "../store";


function App() {
    const elevator = myContainer.get<ElevatorAction>(TYPES.ElevatorAction)
    setInterval(() => {
        store.dispatch(elevator.movingElevator())
    }, elevatorSpeed)
    
    return (
        <div className="App">
            <Grid>
                <GridColumn width={2}>
                    <Floors />
                </GridColumn>
                <GridColumn>
                    <ElevatorContainer/>
                </GridColumn>
            </Grid>
        </div>
    );
}

export default App;
