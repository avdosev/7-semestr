
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'semantic-ui-react';
import { ATMStore } from 'Components/ATM/ATMStore';
import { User } from 'typings/main';

export interface IATMCardCollector {
    domainStore: ATMStore

}

@observer
export class ATMСardCollector extends Component<IATMCardCollector> {


    onPutCard = (cardNumber: number) => () => {
        this.props.domainStore.insertCard(cardNumber)

    }

    render() {
        return (
            <div>
                {this.props.domainStore.database.users.map((user) => (
                    <Button content={`Вставить карту ${user.name}`} key={user.name} onClick={this.onPutCard(user.cardNumber)} />
                ))}
                

            </div>
        );
    }
}