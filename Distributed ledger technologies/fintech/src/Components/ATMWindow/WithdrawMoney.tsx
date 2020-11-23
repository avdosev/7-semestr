import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Header, Input } from 'semantic-ui-react';
import { ATMStore } from '../../Components/ATM/ATMStore';

export interface IWithdrawMoney {
    domainStore: ATMStore
}

@observer
export class WithdrawMoney extends Component<IWithdrawMoney> {
    render() {
        return (
            <div>
                <Header content={"Снять деньги"} />
                {[1000, 2000, 5000, 10000].map(sum => (
                    <Button content={sum} onClick={() => this.props.domainStore.withdrawMoney(sum)} />
                ))}

                <Header content={"Снять другую сумму"} />
                <Input type="number" />
            </div>
        );
    }
}