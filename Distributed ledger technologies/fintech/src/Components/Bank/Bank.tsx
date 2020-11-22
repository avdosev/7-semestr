import { ATMStore } from "Components/ATM/ATMStore";
import { ATMKeyboardStore } from "Components/ATMKeyboard/ATMKeyboardStore";
import { observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Button, Container, Grid } from "semantic-ui-react";
import {exhaustiveCheck} from "../../utils/utils";


export interface IBank {
    domainStore: ATMStore
}

@observer
export class Bank extends React.Component<IBank>{
    
    render() {
        return null
    }
}