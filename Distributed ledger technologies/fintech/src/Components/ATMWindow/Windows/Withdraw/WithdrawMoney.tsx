import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Header, Input } from 'semantic-ui-react';
import { ATMStore } from 'Components/ATM/ATMStore';
import {InputOnChangeData} from "semantic-ui-react/dist/commonjs/elements/Input/Input";

export interface IWithdrawMoney {
    domainStore: ATMStore

}

@observer
export class WithdrawMoney extends Component<IWithdrawMoney> {
    customNumber: number = 0

    onChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.customNumber = Number.parseInt(data.value)
    }

    render() {
        return (
            <div>
                <Header content={"Снять деньги"} />
                {[1000, 2000, 5000, 10000].map(sum => (
                    <Button content={sum} onClick={() => this.props.domainStore.withdrawMoney(sum)} />
                ))}

                <Header content={"Снять другую сумму"} />
                <Input onChange={this.onChange} type="number" />
            </div>
        );
    }
}