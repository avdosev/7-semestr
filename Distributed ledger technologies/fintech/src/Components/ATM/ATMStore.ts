import {injectable} from "inversify"
import {observer} from "mobx-react"
import {action, makeObservable, observable} from "mobx"
import {ATMKeyboardStore} from "../ATMKeyboard/ATMKeyboardStore";
import Json from "../../data.json";
import {DB} from "../../typings/main";
import {List} from "immutable";


@injectable()
export class ATMStore {
    // keyboardStore: ATMKeyboardStore
    database: DB
    @observable isCorrectPinCode: boolean = false

    constructor() {
        makeObservable(this)
        this.database = Json
    }

    @action
    public compute = (pinCode: List<number>) => {
        if (pinCode.size === 4) {
            for (const user of this.database.users) {
                console.log(user.pinCode)
                console.log(Number(pinCode.toArray().join("")))
                if (user.pinCode === Number(pinCode.toArray().join(""))) {
                    this.isCorrectPinCode = true
                    console.log(this.isCorrectPinCode)
                }
            }
        }
    }

}

