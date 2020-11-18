import { ATMKeyboardStore } from "Components/ATMKeyboard/ATMKeyboardStore";
import { observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Container } from "semantic-ui-react";

export interface IATMWindow {
    keyboardStore: ATMKeyboardStore
}

@observer
export class ATMWindow extends React.Component<any>{
    render() {
        return <>Ваш пин код: {this.props.keyboardStore.pinCode }</>;
    }
}