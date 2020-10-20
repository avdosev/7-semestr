import React from "react";
import {Button, Header} from "semantic-ui-react";
import {ElevatorAction} from "../Elevator/ElevatorAction";
import {MoveDirection} from "../../typings/common";
import LightBulb from "../LightBulb/LightBulb";
import {ElevatorManager} from "../../services/elevatorManager";

export interface IFloor {
    floorNumber: number
    actions: ElevatorAction
    elevator: ElevatorManager
}

export class Floor extends React.Component<IFloor>{

    render() {
        const onMove = (floorNumber: number, direction: MoveDirection) => () => {
            this.props.actions.callElevatorFromFloor(floorNumber, direction)
        }
        const isActiveButton = (floorNumber: number, direction: MoveDirection) => {
            return this.props.elevator.floorsQueue.data.find((floor) =>
                floor.toFloor === floorNumber &&
                floor.direction === direction)?.calledFromElevator === false
        }

        return <>
            <Header>{this.props.floorNumber} этаж</Header>
            <LightBulb currentFloor={this.props.elevator.currentFloor}/>
            <Button icon="arrow alternate circle up" negative={isActiveButton(this.props.floorNumber, "up")} onClick={onMove(this.props.floorNumber, "up")} />
            <Button icon="arrow alternate circle down" negative={isActiveButton(this.props.floorNumber, "down")} onClick={onMove(this.props.floorNumber, "down")}/>
            </>;
    }
}