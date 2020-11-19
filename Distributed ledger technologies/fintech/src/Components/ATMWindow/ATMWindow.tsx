import { ATMStore } from "Components/ATM/ATMStore";
import { ATMKeyboardStore } from "Components/ATMKeyboard/ATMKeyboardStore";
import { observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Button, Container, Grid } from "semantic-ui-react";
import { CorrectPasswordOperation } from "./CorrectPasswordOperation"
import { NoCardOperation } from "./NoCardOperation"
import { NoPasswordOperation } from "./NoPasswordOperation"
import { IncorrectPasswordOperation } from "./IncorrectPasswordOperation"

export interface IATMWindow {
    domainStore: ATMStore
}


@observer
export class ATMWindow extends React.Component<IATMWindow>{
    render() {
        let block
        switch (this.props.domainStore.domainLevelOfOperation.type) {
            case "NoCard":
                block = <NoCardOperation />
                break;
            case "NoPassword":
                block = <NoPasswordOperation pinCode={this.props.domainStore.keyboardStore.pinCodeNumber.value!} />
                console.log(this.props.domainStore.keyboardStore.pinCodeNumber);
                break
            case "CorrectPassword":
                block = <CorrectPasswordOperation />
                break
            case "IncorrectPassword":
                block = <IncorrectPasswordOperation />
            default:
                break;
        }

        return <div className='ATMWindow' style={{ border: '1px solid black', height: '300px', width: '300px' }}>
            {block}

        </div>;
    }
}