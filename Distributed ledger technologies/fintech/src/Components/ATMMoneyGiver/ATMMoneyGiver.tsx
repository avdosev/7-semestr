import React from "react";
import {observer} from "mobx-react";
import {Image} from "semantic-ui-react";
import {ATMStore} from "../ATM/ATMStore";

export interface IATMMoneyGiver {
    domainStore: ATMStore
}

@observer
export class ATMMoneyGiver extends React.Component<IATMMoneyGiver>{
    render() {
        if (this.props.domainStore.domainLevelOfOperation.type === "SuccessWithdrawExistingMoney") {
            const money: React.ReactElement[] = []
            this.props.domainStore.domainLevelOfOperation.nominalsCount.forEach((count, nominal) => (
                money.push(<><Image size="small" src={`/nominals/${nominal}.jpg`}  verticalAlign='middle' /> * {count}</>)
            ))
            return money
        }
        return null
    }
}