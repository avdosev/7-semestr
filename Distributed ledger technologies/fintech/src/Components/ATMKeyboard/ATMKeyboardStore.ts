import {injectable} from "inversify"
import {observer} from "mobx-react"
import {action, makeObservable, observable} from "mobx"
import "reflect-metadata"
import {List} from "immutable";


export class ATMKeyboardStore {
    @observable pinCode: List<number> = List()

    constructor() {
        makeObservable(this)
    }

    @action
    public addNumberToPinCode = (num: number) => {
        const newPinCode = List(this.pinCode)
        this.pinCode = newPinCode.push(num)

        if (this.pinCode.size === 3) {
            
        }
    }
}

