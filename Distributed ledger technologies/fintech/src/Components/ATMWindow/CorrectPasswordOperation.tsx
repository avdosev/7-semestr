import { ATMStore } from 'Components/ATM/ATMStore';
import { observer } from 'mobx-react';
import React from 'react'
import { Button } from 'semantic-ui-react'
import { openWithdrawMoneyWindowOperation } from '../../typings/Operations';

export interface ICorrectPasswordOperation {
    domainStore: ATMStore
}

@observer
export class CorrectPasswordOperation extends React.Component<ICorrectPasswordOperation> {
    render() {
        return (
            <div>
                <Button content={1} onClick={() => this.props.domainStore.openWithdrawWindow()} /> Снять деньги
                <Button content={2}  /> Внести деньги
                <Button content={3}  /> Посмотреть остаток

            </div>
        );
    }
}

