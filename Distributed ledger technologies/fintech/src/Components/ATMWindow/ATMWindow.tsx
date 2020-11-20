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
import { WithdrawMoney } from "./WithdrawMoney"
import { Balance } from "./Balance"

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
                break
            case "CorrectPassword":
                block = <CorrectPasswordOperation domainStore={this.props.domainStore} />
                break
            case "IncorrectPassword":
                block = <IncorrectPasswordOperation />
                break
            case "OpenWithdrawMoneyWindow":
                block = <WithdrawMoney domainStore={this.props.domainStore} />
                break
            case "OpenBalanceOperation":
                block = <Balance balance={this.props.domainStore.domainLevelOfOperation.user.balance} />
                break
            default:
                break;
        }

        return <div className='ATMWindow' style={{ border: '1px solid black', height: '300px', width: '300px' }}>
            {block}

        </div>;
    }
}