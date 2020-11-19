import {injectable} from "inversify"
import {observer} from "mobx-react"
import {action, makeObservable, observable} from "mobx"
import "reflect-metadata"
import {List} from "immutable";
import {DB} from "../../typings/main";
import Json from "../../data.json"
import MaybeConstructor, { just, Maybe, none } from "@sweet-monads/maybe";


@injectable()
export class ATMKeyboardStore {
    @observable private pinCode: List<number> = List()

    constructor() {
        makeObservable(this)
    }

    
    public get pinCodeNumber() : Maybe<number> {
        const stringablePinCode = this.pinCode.join("")
        return stringablePinCode === "" ? none() : just(Number(stringablePinCode))
    }

    @action
    public clearPinCode = () => {
        this.pinCode = this.pinCode.clear()        
    }
    

    @action
    public addNumberToPinCode = (num: number) => {
        const newPinCode = List(this.pinCode)
        this.pinCode = newPinCode.push(num)        
    }
}

