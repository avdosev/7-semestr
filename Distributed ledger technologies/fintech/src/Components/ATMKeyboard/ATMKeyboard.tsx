import { observer } from "mobx-react";
import React from "react";
import { Button, Grid, GridColumn, GridRow } from "semantic-ui-react";
import { ATMKeyboardStore } from "./ATMKeyboardStore";

export interface IATMKeyboard {
    store: ATMKeyboardStore
}

@observer
export class ATMKeyboard extends React.Component<IATMKeyboard> {
    
    
    onSubmit = () => {

    }

    onPressNumberButton = (buttonId: number) => () => {
        this.props.store.addNumberToPinCode(buttonId)
    }

    render() {
        const store = this.props.store

        return <Grid>

            <GridRow>
                {[1, 2, 3].map((num) => (
                    <Button onClick={this.onPressNumberButton(num)}>{num}</Button>
                ))}

                <Button content="Отмена" negative={true} />
            </GridRow>
            <GridRow>
                {[4, 5, 6].map((num) => (
                    <Button onClick={this.onPressNumberButton(num)}>{num}</Button>
                ))}
                <Button content="Сброс" color={'yellow'} />

            </GridRow>
            <GridRow>
                {[7, 8, 9].map((num) => (
                    <Button onClick={this.onPressNumberButton(num)}>{num}</Button>
                ))}
                <Button />

            </GridRow>
            <GridRow>
                <Button>0</Button>
                <Button content="Ввод" positive={true} onClick={this.onSubmit} />
            </GridRow>

        </Grid>;
    }
}