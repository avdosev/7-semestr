import {inject, injectable} from "inversify"
import {observer} from "mobx-react"
import {action, makeObservable, observable} from "mobx"
import {ATMKeyboardStore} from "../ATMKeyboard/ATMKeyboardStore";
import Json from "../../data.json";
import {DB} from "../../typings/main";
import {List} from "immutable";
import {initOperation, inputCorrectPasswordOperation, insertCardOperation, Operation} from "../../typings/Operations"
import {TYPES} from "../../config/Types"

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
        
        if (this.domainLevelOfOperation.type === "NoPassword") {  // Больше 4 знаков
            this.keyboardStore.addNumberToPinCode(pinCodeNumber)
            if (this.keyboardStore.pinCodeNumber.value! <= 9999) {
                this.validatePinCode(this.keyboardStore.pinCodeNumber.value!)
            }
        }
    }

    public validatePinCode = (pinCode: number) => {
        for (const user of this.database.users) {
            if (user.pinCode === pinCode) {
                this.domainLevelOfOperation = inputCorrectPasswordOperation(this.domainLevelOfOperation)
            }
        }
        
    }

}

