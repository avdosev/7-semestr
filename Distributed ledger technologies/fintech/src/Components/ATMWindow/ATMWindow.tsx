import { ATMStore } from "Components/ATM/ATMStore";
import { ATMKeyboardStore } from "Components/ATMKeyboard/ATMKeyboardStore";
import { observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Button, Container, Grid } from "semantic-ui-react";

export interface IATMWindow {
    keyboardStore: ATMKeyboardStore
    domainStore: ATMStore
}

@observer
export class ATMWindow extends React.Component<IATMWindow>{
    render() {


        return <div className='ATMWindow' style={{ border: '1px solid black', height: '300px', width: '300px' }}>

               
        </div>;
    }
}