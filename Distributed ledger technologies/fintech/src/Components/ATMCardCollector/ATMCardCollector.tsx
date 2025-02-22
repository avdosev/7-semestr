
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {Button, Container} from 'semantic-ui-react';
import { ATMStore } from 'Components/ATM/ATMStore';
import { User } from 'typings/main';

export interface IATMCardCollector {
    domainStore: ATMStore

}

@observer
export class ATMCardCollector extends Component<IATMCardCollector> {


    onPutCard = (cardNumber: number) => () => {
        this.props.domainStore.insertCard(cardNumber)

    }

    render() {
        const store = this.props.domainStore
        if (store.domainLevelOfOperation.type === "NoCard") {
            return (
                <Container textAlign={"left"}>
                    { 
                    store.bankStore.database.users.map((user) => (
                    <><Button content={`Вставить карту ${user.name}`} key={user.name} onClick={this.onPutCard(user.cardNumber)} /> <br /> </>
                    ))}
                </Container>
            );
        } else {
            const currentUser = store.bankStore.database.users.find((user) => user.cardNumber === store.currentUser!.cardNumber)
            return (<div>
               Нелегальная подсказка: {currentUser?.name} {currentUser?.pinCode} 
            </div>)
        }
        
    
    }
}