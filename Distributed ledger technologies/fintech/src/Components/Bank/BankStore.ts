import {inject, injectable} from "inversify"
import {observer} from "mobx-react"
import {action, makeObservable, observable} from "mobx"
import "reflect-metadata"
import {List, Map} from "immutable";
import {DB, User} from "../../typings/main";
import Json from "../../data.json"
import MaybeConstructor, { just, Maybe, none } from "@sweet-monads/maybe";
import {initOperation, Operation} from "../../typings/Operations";
import {randomCacheGenerator} from "../../utils/utils";
import {TYPES} from "../../config/Types";


@injectable()
export class BankStore {
    @observable database: DB

    public getUser(cardNumber: number) {
        return this.database.users.find((user) => user.cardNumber === cardNumber)
    }

    public updateBalance = (cardNumber: number, newBalance: number) => {
        const user = this.getUser(cardNumber)
        if (!user) return false

        const index = this.database.users.indexOf(user)
        user.balance = newBalance
        this.database.users[index] = user
    }

   

    constructor() {
        makeObservable(this)
        this.database = Json
    }



}

