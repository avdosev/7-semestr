import React from "react";
import {Button, Header} from "semantic-ui-react";
import {floorsCount} from "../../config/config";
import {ElevatorAction} from "./ElevatorAction";
import {ElevatorManager} from "../../services/elevatorManager";
import {myContainer} from "../../config/inversify.config";
import {TYPES} from "../../typings/types";
import LightBulb from "../LightBulb/LightBulb";


export interface IElevator {
    actions: ElevatorAction,
    elevator: ElevatorManager
}

export default class Elevator extends React.Component<IElevator> {

    render() {

        const buttons = []
        for (let i = 0; i < floorsCount; i++) {
            buttons.push(<Button size="mini" content={i + 1}
                                 onClick={() => this.props.actions.changeElevatorFloor(i + 1)}/>)
        }

        console.log(this.props.elevator.currentFloor)
        return <div
            style={{
                backgroundColor: 'grey',
                width: 150, transition: "ease-in 2s",
                marginTop: (floorsCount - this.props.elevator.currentFloor) * 110
            }}
        >
            <LightBulb currentFloor={this.props.elevator.currentFloor}/>
            {buttons}
        </div>;

    }
}