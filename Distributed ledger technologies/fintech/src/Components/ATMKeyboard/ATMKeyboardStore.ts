import {injectable} from "inversify"
import {observer} from "mobx-react"
import {action, makeObservable, observable} from "mobx"
import "reflect-metadata"
import {List} from "immutable";
import {DB} from "../../typings/main";
import Json from "../../data.json"


export class ATMKeyboardStore {
    @observable pinCode: List<number> = List()

    constructor() {
        makeObservable(this)
    }

    @action
    public addNumberToPinCode = (num: number) => {
        const newPinCode = List(this.pinCode)
        this.pinCode = newPinCode.push(num)

    }
}

