import { ATMKeyboardStore } from "Components/ATMKeyboard/ATMKeyboardStore";
import { observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Button, Container, Grid } from "semantic-ui-react";

export interface IATMWindow {
    keyboardStore: ATMKeyboardStore
}

@observer
export class ATMWindow extends React.Component<any>{
    render() {
        return <div className='ATMWindow' style={{border: '1px solid black', height: '300px', width: '300px'}}>
                Ваш пин код: {this.props.keyboardStore.pinCode }
            </div>;
    }
}