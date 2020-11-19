import {injectable} from "inversify"
import {observer} from "mobx-react"
import {action, makeObservable, observable} from "mobx"
import "reflect-metadata"
import {List} from "immutable";
import {DB} from "../../typings/main";
import Json from "../../data.json"


export class ATMKeyboardStore {
    @observable private pinCode: List<number> = List()

    constructor() {
        makeObservable(this)
    }

    
    public get pinCodeNumber() : number {
        return Number(this.pinCode.join(""))
    }

    public set pinCodeNumber(pinCode: number) {

    }
    

    @action
    public addNumberToPinCode = (num: number) => {
        const newPinCode = List(this.pinCode)
        this.pinCode = newPinCode.push(num)

    }
}

