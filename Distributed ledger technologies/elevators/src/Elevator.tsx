import React from "react";
import { Button, Header } from "semantic-ui-react";
import {floorsCount} from "./config/config";

export interface IElevator {

}

export default class Elevator extends React.Component<IElevator> {

    render() {
        const buttons = []
        for (let i = 0; i < floorsCount; i++) {
            buttons.push(<Button>{i+1}</Button>)            
            
        }
        return <> <Header>Лифт</Header> {buttons} </>;
    }
}