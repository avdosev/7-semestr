import React from "react";
import {Button, Header} from "semantic-ui-react";

export interface IFloor {
    floorNumber: number
}

export class Floor extends React.Component<IFloor>{

    render() {
        return <>
            <Header>{this.props.floorNumber} этаж</Header>
            <Button icon="arrow alternate circle up" />
            <Button icon="arrow alternate circle down" />
            </>;
    }
}