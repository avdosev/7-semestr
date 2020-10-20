import React from "react";
import { Button, Header } from "semantic-ui-react";
import {floorsCount} from "../../config/config";
import {ElevatorManager} from "../../services/elevatorManager";
import {myContainer} from "../../config/inversify.config";
import {TYPES} from "../../typings/types";


export interface ILightBulb {
    currentFloor: number
}

export default class LightBulb extends React.Component<ILightBulb> {

    render() {

        return <div>{this.props.currentFloor}</div>;

    }
}