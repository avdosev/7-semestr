import { ATMStore } from 'Components/ATM/ATMStore';
import { observer } from 'mobx-react';
import React from 'react'
import { Button, Container, Header } from 'semantic-ui-react'
import { openWithdrawMoneyWindowOperation } from '../../typings/Operations';

export interface ICorrectPasswordOperation {
    domainStore: ATMStore
}

@observer
export class CorrectPasswordOperation extends React.Component<ICorrectPasswordOperation> {
    render() {
        return (
            <Container textAlign={"left"}>
                
                <Button content={1} onClick={() => this.props.domainStore.openWithdrawWindow()} /> Снять деньги 
                <br />
                <Button content={2}  /> Внести деньги
                <br />
                <Button content={3}  /> Посмотреть остаток
                <br />

            </Container>
        );
    }
}

