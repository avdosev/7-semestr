import React from "react";
import {ATMKeyboard} from "../ATMKeyboard/ATMKeyboard";
import {Button, Container, Grid, GridRow} from "semantic-ui-react";
import {observer} from "mobx-react";
import {ATMKeyboardStore} from "../ATMKeyboard/ATMKeyboardStore";
import {ATMWindow} from "../ATMWindow/ATMWindow";
import {ATMStore} from "./ATMStore";


@observer
export class ATM extends React.Component<any> {


    render() {
        const keyboardStore = new ATMKeyboardStore()
        return <Container>
            <Grid>
                <GridRow>
                    <ATMWindow keyboardStore={keyboardStore}/>
                </GridRow>
                <GridRow>
                    <ATMKeyboard keyboardStore={keyboardStore} domainStore={new ATMStore()} />
                </GridRow>
                <GridRow>
                    <Button content="Вставить карту"/>
                </GridRow>
            </Grid>
        </Container>;
    }
}