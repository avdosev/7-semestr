import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Header, Input } from 'semantic-ui-react';

@observer
export default class WithdrawMoney extends Component<any, any> {
    render() {
        return (
            <div>
                <Header content={"Снять деньги"} />
                <Button content={1000} />
                <Button content={2000} />
                <Button content={5000} />
                <Button content={10000} />

                <Header content={"Снять другую сумму"} />
                <Input type="number"/>
            </div>
        );
    }
}