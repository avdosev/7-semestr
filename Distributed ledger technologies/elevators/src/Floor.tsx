import React from "react";
import {Button, Header} from "semantic-ui-react";

export interface IFloor {
    floorNumber: number
}

export class Floor extends React.Component<IFloor>{

    render() {
        const onMove = (floorNumber: number, direction: string) => () => {
            console.log(floorNumber, direction);
            
        }

        return <>
            <Header>{this.props.floorNumber} этаж</Header>
            <Button icon="arrow alternate circle up" onClick={onMove(this.props.floorNumber, "Up")} />
            <Button icon="arrow alternate circle down" onClick={onMove(this.props.floorNumber, "Down")}/>
            </>;
    }
}