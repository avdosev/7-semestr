import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Header, Input } from 'semantic-ui-react';
import { ATMStore } from 'Components/ATM/ATMStore';

export interface IWithdrawNotExistingMoney {
}

@observer
export class WithdrawNotExistingMoney extends Component<IWithdrawNotExistingMoney> {
    render() {
        return (
            <div>
                <Header content={"Денег на счете недостаточно, чтобы снять эту сумму"} />
            </div>
        );
    }
}