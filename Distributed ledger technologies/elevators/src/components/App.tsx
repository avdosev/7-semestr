import React from 'react';
import './App.css';
import {Floor} from "./Floor/Floor";
import {Grid, GridColumn} from "semantic-ui-react";
import Elevator from './Elevator/Elevator';
import {elevatorsCount, elevatorSpeed, floorsCount} from "../config/config";
import ElevatorContainer from "./Elevator/ElevatorContainer";
import FloorContainer from "./Floor/FloorContainer";
import {Floors} from "./Floors/Floors";
import {myContainer} from "../config/inversify.config";
import {TYPES} from "../typings/types";
import {ElevatorAction} from "./Elevator/ElevatorAction";
import {store} from "../store";
import {BaseElevatorPayload} from "../typings/elevatorsActionTypes";


function sleep(time: number) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}

async function loop(stop: boolean) {
    const elevator = myContainer.get<ElevatorAction>(TYPES.ElevatorAction)
    const currentStore = store.getState().elevator.elevators
    const timeForStopOnFloor = 2000

    while (!stop) {
        await sleep(elevatorSpeed)
        for (let i = 0; i < elevatorsCount; i++) {
            if (currentStore.elevators[i].isArrived) {
                await sleep(timeForStopOnFloor)
            }
            store.dispatch(elevator.movingElevator(i))
        }
    }
}

function App() {
    loop(false)

    const elevators = []
    for (let i = 0; i < elevatorsCount; i++) {
        elevators.push(<GridColumn key={i} width={3}>
            <ElevatorContainer elevatorId={i}/>
        </GridColumn>)
    }

    return (
        <div className="App">
            <Grid>
                <GridColumn width={2}>
                    <Floors/>
                </GridColumn>
                {elevators}

            </Grid>
        </div>
    );
}

export default App;
