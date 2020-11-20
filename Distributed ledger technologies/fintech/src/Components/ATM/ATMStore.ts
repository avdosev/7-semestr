import { inject, injectable } from "inversify"
import { observer } from "mobx-react"
import { action, makeObservable, observable } from "mobx"
import { ATMKeyboardStore } from "../ATMKeyboard/ATMKeyboardStore";
import Json from "../../data.json";
import { DB } from "../../typings/main";
import { List } from "immutable";
import { initOperation, inputCorrectPasswordOperation, inputIncorrectPasswordOperation, insertCardOperation, Operation } from "../../typings/Operations"
import { TYPES } from "../../config/Types"
import {numDigits} from "../../utils/utils"

@injectable()
export class ATMStore {
    database: DB
    @observable domainLevelOfOperation: Operation = initOperation()
    keyboardStore: ATMKeyboardStore

    constructor(
        @inject(TYPES.ATMKeyboardStore) keyStore: ATMKeyboardStore
    ) {
        makeObservable(this)
        this.database = Json
        this.keyboardStore = keyStore
    }

    @action
    public insertCard = (cardNumber: number) => {
        this.domainLevelOfOperation = insertCardOperation(this.domainLevelOfOperation, cardNumber)
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

    public validatePinCode = (cardNumber: number, pinCode: number) => {
        const userWithThisPinCode = this.database.users.find((user) => cardNumber === user.cardNumber && user.pinCode === pinCode)
        if (userWithThisPinCode) {
            this.domainLevelOfOperation = inputCorrectPasswordOperation(this.domainLevelOfOperation)
        } else {
            this.domainLevelOfOperation = inputIncorrectPasswordOperation(this.domainLevelOfOperation)
        }
  

    }

}

