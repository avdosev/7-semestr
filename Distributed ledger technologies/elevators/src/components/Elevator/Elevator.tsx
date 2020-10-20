import React from "react";
import {Button, Header} from "semantic-ui-react";
import {elevatorSpeed, floorsCount} from "../../config/config";
import {ElevatorAction} from "./ElevatorAction";
import {ElevatorManager} from "../../services/elevatorManager";
import {myContainer} from "../../config/inversify.config";
import {TYPES} from "../../typings/types";
import LightBulb from "../LightBulb/LightBulb";
import {Property} from "csstype";


export interface IElevator {
    actions: ElevatorAction,
    elevator: ElevatorManager
}

export default class Elevator extends React.Component<IElevator> {

    render() {
        const floorsQueue = this.props.elevator.floorsQueue.data.map((floor) => floor.toFloor)

        const buttons = []
        for (let i = 0; i < floorsCount; i++) {
            buttons.push(<Button
                size="mini"
                content={i + 1}
                negative={floorsQueue.includes(i+1)}
                onClick={() => this.props.actions.changeElevatorFloor(i + 1)}
            />)
        }
        // const speedByFloor = `ease-in ${elevatorSpeed/1000}s`
        // console.log(speedByFloor)
        return <div
            style={{
                backgroundColor: 'grey',
                width: 150, transition: "ease-in 0.3s",
                marginTop: (floorsCount - this.props.elevator.currentFloor) * 110
            }}
        >
            <LightBulb currentFloor={this.props.elevator.currentFloor}/>
            {buttons}
        </div>;

    }
}