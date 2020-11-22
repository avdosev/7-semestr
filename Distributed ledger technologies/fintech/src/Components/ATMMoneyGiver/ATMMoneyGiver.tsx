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
            return this.props.domainStore.domainLevelOfOperation.nominalsCount.map((count, nominal) => (
                <><Image size="small" src={`/nominals/${nominal}.jpg`}/> * {count}</>
            ))
        }
        return null
    }
}