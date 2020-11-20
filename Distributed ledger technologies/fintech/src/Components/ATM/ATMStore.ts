import { inject, injectable } from "inversify"
import { observer } from "mobx-react"
import { action, makeObservable, observable } from "mobx"
import { ATMKeyboardStore } from "../ATMKeyboard/ATMKeyboardStore";
import Json from "../../data.json";
import { DB } from "../../typings/main";
import { List, Map } from "immutable";
import { initOperation, inputCorrectPasswordOperation, inputIncorrectPasswordOperation, insertCardOperation, openBalanceOperation, openWithdrawMoneyWindowOperation, Operation, withdrawExistingMoneyOperation } from "../../typings/Operations"
import { TYPES } from "../../config/Types"
import {isHasChange, numDigits, randomCacheGenerator} from "../../utils/utils"

@injectable()
export class ATMStore {
    database: DB
    @observable domainLevelOfOperation: Operation = initOperation()
    keyboardStore: ATMKeyboardStore
    @observable cache: Map<number, number> = randomCacheGenerator()

    constructor(
        @inject(TYPES.ATMKeyboardStore) keyStore: ATMKeyboardStore
    ) {
        makeObservable(this)
        this.database = Json
        this.keyboardStore = keyStore

        console.log(isHasChange(randomCacheGenerator(), 5000))
    }

    @action
    public insertCard = (cardNumber: number) => {
        this.domainLevelOfOperation = insertCardOperation(this.domainLevelOfOperation, cardNumber)
    }

    @action 
    openWithdrawWindow = () => {
        this.domainLevelOfOperation = openWithdrawMoneyWindowOperation(this.domainLevelOfOperation)
    }

    @action
    openBalanceOperation = () => {
        this.domainLevelOfOperation = openBalanceOperation(this.domainLevelOfOperation)
    }

    @action
    onCancelPressed = () => {
        const type = this.domainLevelOfOperation.type
        if (type === "IncorrectPassword") {
            this.domainLevelOfOperation = insertCardOperation(this.domainLevelOfOperation, this.domainLevelOfOperation.cardNumber)
            this.keyboardStore.clearPinCode()
        } else if (type === "NoPassword") {
            this.domainLevelOfOperation = initOperation()
        } else if(type === "OpenWithdrawMoneyWindow" || type === "OpenBalanceOperation") {
            this.domainLevelOfOperation = inputCorrectPasswordOperation(this.domainLevelOfOperation)
        } 
    }

    @action
    withdrawMoney = (count: number) => {
        
        // this.domainLevelOfOperation = withdrawExistingMoneyOperation()
    }

    @action
    public addNumberToPinCode = (pinCodeNumber: number) => {
        console.log(this.domainLevelOfOperation.type);
        console.log(this.keyboardStore.pinCodeNumber.value);

        if (this.domainLevelOfOperation.type === "NoPassword") {  
            if (this.keyboardStore.pinCodeNumber.isNone() || this.keyboardStore.pinCodeNumber.value <= 9999) {  // Больше 4 знаков
                this.keyboardStore.addNumberToPinCode(pinCodeNumber)
            }
            if (numDigits(this.keyboardStore.pinCodeNumber.value!) === 4)
                this.validatePinCode(this.domainLevelOfOperation.cardNumber, this.keyboardStore.pinCodeNumber.value!)
        }
    }

    @action
    public validatePinCode = (cardNumber: number, pinCode: number) => {
        const userWithThisPinCode = this.database.users.find((user) => cardNumber === user.cardNumber && user.pinCode === pinCode)
        if (userWithThisPinCode) {
            this.domainLevelOfOperation = inputCorrectPasswordOperation(this.domainLevelOfOperation)
        } else {
            this.domainLevelOfOperation = inputIncorrectPasswordOperation(this.domainLevelOfOperation)
        }
  

    }

}

