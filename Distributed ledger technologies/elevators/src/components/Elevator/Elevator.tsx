import React from "react";
import { Button, Header } from "semantic-ui-react";
import {floorsCount} from "../../config/config";
import {ElevatorAction} from "./ElevatorAction";


export interface IElevator {
    actions:  ElevatorAction
}

export default class Elevator extends React.Component<IElevator> {

    render() {
        const buttons = []
        for (let i = 0; i < floorsCount; i++) {
            buttons.push(<Button content={i + 1} onClick={() => this.props.actions.changeElevatorFloor(i + 1)}/>)
        }

        return <> <Header>Лифт</Header> {buttons} </>;
    }
}