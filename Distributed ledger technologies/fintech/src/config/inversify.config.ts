import { Container } from "inversify";
import { TYPES } from "./Types";
import {ATMStore} from "../Components/ATM/ATMStore"
import {ATMKeyboardStore} from "../Components/ATMKeyboard/ATMKeyboardStore"
import {BankStore} from "../Components/Bank/BankStore";
import {WithdrawMoneyStore} from "../Components/ATMWindow/Windows/Withdraw/WithdrawMoneyStore";
import { SendMoneyStore } from "../Components/ATMWindow/Windows/Send/SendMoneyStore";

const myContainer = new Container()

myContainer.bind(TYPES.ATMKeyboardStore).to(ATMKeyboardStore)
myContainer.bind(TYPES.ATMStore).to(ATMStore)
myContainer.bind(TYPES.BankStore).to(BankStore).inSingletonScope()
myContainer.bind(TYPES.WithdrawMoneyStore).to(WithdrawMoneyStore)
myContainer.bind(TYPES.SendMoneyStore).to(SendMoneyStore)


export {myContainer}