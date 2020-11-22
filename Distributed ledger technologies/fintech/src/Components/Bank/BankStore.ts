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
    database: DB

    public getUser(cardNumber: number) {
        return this.database.users.find((user) => user.cardNumber === cardNumber)
    }

    public updateBalance = (cardNumber: number, newBalance: number) => {

    }

    constructor() {
        // makeObservable(this)
        this.database = Json
    }



}

