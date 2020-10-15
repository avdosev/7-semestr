import React from "react";
import { Button, Header } from "semantic-ui-react";
import {floorsCount} from "../../config/config";
import {ElevatorAction} from "./ElevatorAction";
import {ElevatorManager} from "../../services/elevatorManager";
import {myContainer} from "../../config/inversify.config";
import {TYPES} from "../../typings/types";


export interface IElevator {
    actions: ElevatorAction,
    elevator: ElevatorManager
}

export default class Elevator extends React.Component<IElevator> {

    render() {

        const buttons = []
        for (let i = 0; i < floorsCount; i++) {
            buttons.push(<Button size="mini" content={i + 1} onClick={() => this.props.actions.changeElevatorFloor(i + 1)}/>)
        }

        return <div style={{ backgroundColor: 'grey', width: 150, transition: "ease-in 2s", marginTop: ( floorsCount - this.props.elevator.currentFloor)*100}}> {buttons} </div>;

    }
}