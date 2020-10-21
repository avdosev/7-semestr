import React from "react";
import {Button, Header} from "semantic-ui-react";
import {ElevatorAction} from "../Elevator/ElevatorAction";
import {MoveDirection} from "../../typings/common";
import LightBulb from "../LightBulb/LightBulb";
import {ElevatorManager} from "../../services/ElevatorManager";
import {ElevatorDispatcher} from "../../services/ElevatorDispatcher";
import {elevatorsCount} from "../../config/config";

export interface IFloor {
    floorNumber: number
    actions: ElevatorAction
    elevators: ElevatorDispatcher
}

export class Floor extends React.Component<IFloor>{

    render() {
        const onMove = (floorNumber: number, direction: MoveDirection) => () => {
            this.props.actions.callElevatorFromFloor(floorNumber, direction)
        }
        const isActiveButton = (floorNumber: number, direction: MoveDirection) => {
            const elevatorsCalls = []
            for (let i=0; i<elevatorsCount; i++) {
                const call = this.props.elevators.floorsQueue[i].data.find((floor) =>
                    floor.toFloor === floorNumber &&
                    floor.direction === direction)?.calledFromElevator === false
                elevatorsCalls.push(call)
            }
            return elevatorsCalls.find((call) => call)
        }

        const lighters = []
        for (let i=0; i<elevatorsCount; i++) {
            lighters.push(<LightBulb currentFloor={this.props.elevators.getCurrentFloor(i)}/>)
        }

        return <>
            <Header>{this.props.floorNumber} этаж</Header>
            {lighters}
            <Button icon="arrow alternate circle up"
                    negative={isActiveButton(this.props.floorNumber, "up")}
                    onClick={onMove(this.props.floorNumber, "up")} />
            <Button icon="arrow alternate circle down"
                    negative={isActiveButton(this.props.floorNumber, "down")}
                    onClick={onMove(this.props.floorNumber, "down")}/>
            </>;
    }
}