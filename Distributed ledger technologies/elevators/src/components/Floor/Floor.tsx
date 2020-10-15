import React from "react";
import {Button, Header} from "semantic-ui-react";
import {ElevatorAction} from "../Elevator/ElevatorAction";
import {MoveDirection} from "../../typings/common";

export interface IFloor {
    floorNumber: number
    actions: ElevatorAction
}

export class Floor extends React.Component<IFloor>{

    render() {
        const onMove = (floorNumber: number, direction: MoveDirection) => () => {
            this.props.actions.callElevatorFromFloor(floorNumber, direction)
        }

        return <>
            <Header>{this.props.floorNumber} этаж</Header>
            <Button icon="arrow alternate circle up" onClick={onMove(this.props.floorNumber, "up")} />
            <Button icon="arrow alternate circle down" onClick={onMove(this.props.floorNumber, "down")}/>
            </>;
    }
}