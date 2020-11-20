import React, {Component} from 'react';
import {observer} from 'mobx-react';

export interface IBalance {
    balance: number
}

@observer
export default class Balance extends Component<IBalance> {
    render() {
        return (
            <div>
                Остаток на счете: {this.props.balance}
            </div>
        );
    }
}