import React from "react";
import {Button, Header} from "semantic-ui-react";
import {ElevatorAction} from "../Elevator/ElevatorAction";

export interface IFloor {
    floorNumber: number
    actions: ElevatorAction
}

export class Floor extends React.Component<IFloor>{

    render() {
        const onMove = (floorNumber: number, direction: string) => () => {
            console.log(floorNumber, direction);
            this.props.actions.callElevatorFromFloor(floorNumber)
        }

        return <>
            <Header>{this.props.floorNumber} этаж</Header>
            <Button icon="arrow alternate circle up" onClick={onMove(this.props.floorNumber, "Up")} />
            <Button icon="arrow alternate circle down" onClick={onMove(this.props.floorNumber, "Down")}/>
            </>;
    }
}