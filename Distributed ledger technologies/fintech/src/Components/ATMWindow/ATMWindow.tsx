import { ATMStore } from "Components/ATM/ATMStore";
import { ATMKeyboardStore } from "Components/ATMKeyboard/ATMKeyboardStore";
import { observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Button, Container, Grid } from "semantic-ui-react";
import { CorrectPasswordOperation } from "./Windows/Main/CorrectPasswordOperation"
import { NoCardOperation } from "./Windows/Main/NoCardOperation"
import { NoPasswordOperation } from "./Windows/Main/NoPasswordOperation"
import { IncorrectPasswordOperation } from "./Windows/Main/IncorrectPasswordOperation"
import { WithdrawMoney } from "./Windows/Withdraw/WithdrawMoney"
import { Balance } from "./Windows/Balance/Balance"
import {Operation} from "../../typings/Operations";
import {WithdrawNotExistingMoney} from "./Windows/Withdraw/WithdrawNotExistingMoney";
import {WithdrawNotExistingCacheInATM} from "./Windows/Withdraw/WithdrawNotExistingCacheInATM";
import {SuccessWithdrawMoney} from "./Windows/Withdraw/SuccessWithdrawMoney";

export interface IATMWindow {
    domainStore: ATMStore
}

function exhaustiveCheck( param: never ) {
    throw new Error(`Unhandled value: ${param}`)
}



@observer
export class ATMWindow extends React.Component<IATMWindow>{
    Router = (windowId: Operation['type'], domainStore: ATMStore) => {
        switch (windowId) {
            case "NoCard":
                return <NoCardOperation />
            case "NoPassword":
                return <NoPasswordOperation pinCode={domainStore.keyboardStore.pinCodeNumber.value!} />
            case "CorrectPassword":
                return <CorrectPasswordOperation domainStore={domainStore} />
            case "IncorrectPassword":
                return <IncorrectPasswordOperation />
            case "OpenWithdrawMoneyWindow":
                return <WithdrawMoney domainStore={domainStore} />
            case "OpenBalanceOperation":
                return <Balance balance={domainStore.domainLevelOfOperation.user.balance} />
            case "WithdrawNotExistingMoney":
                return <WithdrawNotExistingMoney />
            case "WithdrawNotExistingCacheInATM":
                return <WithdrawNotExistingCacheInATM />
            case "SuccessWithdrawExistingMoney":
                return <SuccessWithdrawMoney />

        }
        exhaustiveCheck(windowId)
    }

    render() {
        const window = this.Router(this.props.domainStore.domainLevelOfOperation.type, this.props.domainStore)
        console.log(window)
        return <div className='ATMWindow' style={{ border: '1px solid black', height: '300px', width: '300px' }}>
            {window}

        </div>;
    }
}