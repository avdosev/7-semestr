
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'semantic-ui-react';


@observer
export class ATMСardCollector extends Component<any> {
    render() {
        return (
            <div>
                <Button content="Вставить карту" />

            </div>
        );
    }
}