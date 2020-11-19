import {injectable} from "inversify"
import {observer} from "mobx-react"
import {action, makeObservable, observable} from "mobx"
import {ATMKeyboardStore} from "../ATMKeyboard/ATMKeyboardStore";
import Json from "../../data.json";
import {DB} from "../../typings/main";
import {List} from "immutable";
import {initOperation, insertCardOperation, Operation} from "../../typings/Operations"


@injectable()
export class ATMStore {
    database: DB
    @observable domainLevelOfOperation: Operation = initOperation()

    constructor() {
        makeObservable(this)
        this.database = Json
    }

    @action
    public insertCard = (cardNumber: number) => {
        this.domainLevelOfOperation = insertCardOperation(this.domainLevelOfOperation, cardNumber)
        console.log(this.domainLevelOfOperation.cardNumber);
    }

    @action
    public validatePinCode = (pinCode: number) => {
        if (pinCode > 9999) { // Больше 4 знаков
            for (const user of this.database.users) {
                if (user.pinCode === pinCode) {
                    
                }
            }
        }
    }

}

