import React from "react";
import {ATMKeyboard} from "../ATMKeyboard/ATMKeyboard";
import {Button} from "semantic-ui-react";

export class ATM extends React.Component<any>{
    render() {
        return <>
            <Button content="Вставить карту"/>
            <ATMKeyboard/>
            </>;
    }
}