import React from "react";
import { ATMKeyboard } from "../ATMKeyboard/ATMKeyboard";
import { Button, Container, Grid, GridColumn, GridRow } from "semantic-ui-react";
import { observer } from "mobx-react";
import { ATMKeyboardStore } from "../ATMKeyboard/ATMKeyboardStore";
import { ATMWindow } from "../ATMWindow/ATMWindow";
import { ATMStore } from "./ATMStore";
import { ATMСardCollector } from "../ATMCardCollector/ATMCardCollector";
import "./ATM.css"

export interface IATM {

}

@observer
export class ATM extends React.Component<IATM> {


    render() {
        const keyboardStore = new ATMKeyboardStore()
        const domainStore = new ATMStore()
        return <Container className='ATM'>

            <ATMWindow domainStore={domainStore} keyboardStore={keyboardStore} />
            <ATMСardCollector domainStore={domainStore} />
            <ATMKeyboard keyboardStore={keyboardStore} domainStore={domainStore} />

        </Container>;
    }
}