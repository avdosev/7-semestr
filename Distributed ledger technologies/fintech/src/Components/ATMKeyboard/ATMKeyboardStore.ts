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
    @observable private inputNumber: List<number> = List()

    constructor() {
        makeObservable(this)
    }

    
    public get input() : Maybe<number> {
        const stringablePinCode = this.inputNumber.join("")
        return stringablePinCode === "" ? none() : just(Number(stringablePinCode))
    }

    @action
    public clearInput = () => {
        this.inputNumber = this.inputNumber.clear()        
    }

    @action
    public addNumberToInput = (num: number) => {
        const newPinCode = List(this.inputNumber)
        this.inputNumber = newPinCode.push(num)  
        console.log(this.input);
        
    }
    
}

