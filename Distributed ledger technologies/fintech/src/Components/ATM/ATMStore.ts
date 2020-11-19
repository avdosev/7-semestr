import {injectable} from "inversify"
import {observer} from "mobx-react"
import {action, makeObservable, observable} from "mobx"
import {ATMKeyboardStore} from "../ATMKeyboard/ATMKeyboardStore";
import Json from "../../data.json";
import {DB} from "../../typings/main";
import {List} from "immutable";


@injectable()
export class ATMStore {
    database: DB
    @observable isCorrectPinCode: boolean = false

    constructor() {
        makeObservable(this)
        this.database = Json
    }

    @action
    public compute = (pinCode: number) => {
        if (pinCode > 9999) { // Больше 4 знаков
            for (const user of this.database.users) {
                if (user.pinCode === pinCode) {
                    this.isCorrectPinCode = true
                    console.log(this.isCorrectPinCode)
                }
            }
        }
    }

}

