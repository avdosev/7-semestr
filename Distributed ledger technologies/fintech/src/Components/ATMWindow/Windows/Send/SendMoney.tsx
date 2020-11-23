import React, {Component} from 'react';
import {observer} from 'mobx-react';
import { ATMStore } from '../../../../Components/ATM/ATMStore';
import { Input, InputOnChangeData, List, ListItem } from 'semantic-ui-react';

export interface ISendMoney {
    store: ATMStore
}

@observer
export class SendMoney extends Component<ISendMoney> {
    onChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        this.props.store.keyboardStore.addNumberToInput(Number.parseInt(data.value))
    }

    render() {
        const users = this.props.store.bankStore.database.users.filter((user) => user.cardNumber !== this.props.store.currentUser?.cardNumber)
        return (
            <div>
                Отправить сумму на счет:

                <Input value={this.props.store.keyboardStore.input.value} disabled={true} onChange={this.onChange} />

                Ваши друзья:
                <List>
                {users.map((user) => <ListItem>{user.name} {user.cardNumber}</ListItem>)}
                </List>
                
                
            </div>
        );
    }
}