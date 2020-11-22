import React from "react";
import { ATMKeyboard } from "../ATMKeyboard/ATMKeyboard";
import { Button, Container, Grid, GridColumn, Image } from "semantic-ui-react";
import { observer } from "mobx-react";
import { ATMKeyboardStore } from "../ATMKeyboard/ATMKeyboardStore";
import { ATMWindow } from "../ATMWindow/ATMWindow";
import { ATMStore } from "./ATMStore";
import { ATMCardCollector } from "../ATMCardCollector/ATMCardCollector";
import "./ATM.css"
import {myContainer} from "../../config/inversify.config"
import { TYPES } from "../../config/Types";
import {ATMMoneyGiver} from "../ATMMoneyGiver/ATMMoneyGiver";
import {ATMCache} from "../ATMCache/ATMCache";

export interface IATM {

}

@observer
export class ATM extends React.Component<IATM> {


    render() {
        const domainStore = myContainer.get<ATMStore>(TYPES.ATMStore)


        return <Container className='ATM'>

            <ATMWindow domainStore={domainStore}/>
            <ATMMoneyGiver domainStore={domainStore} />
            <ATMCardCollector domainStore={domainStore} />
            <ATMKeyboard domainStore={domainStore} />
            <ATMCache domainStore={domainStore}/>

        </Container>;
    }
}