import { Container } from "inversify";
import { TYPES } from "./Types";
import {ATMStore} from "../Components/ATM/ATMStore"
import {ATMKeyboardStore} from "../Components/ATMKeyboard/ATMKeyboardStore"

const myContainer = new Container()

myContainer.bind(TYPES.ATMKeyboardStore).to(ATMKeyboardStore)
myContainer.bind(TYPES.ATMStore).to(ATMStore)


export {myContainer}