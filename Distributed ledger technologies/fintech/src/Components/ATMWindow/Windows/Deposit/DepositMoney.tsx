
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import { Button, Header, Input } from 'semantic-ui-react';

@observer
export class DepositMoney extends Component<any> {
    render() {
        return (
            <div>
                <Header content={"Внести деньги"} />
                Положите купюры в купюроприемник
            </div>
        );
    }
}