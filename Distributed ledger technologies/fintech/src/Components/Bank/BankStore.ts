import { inject, injectable } from "inversify"
import { action, makeObservable, observable } from "mobx"
import "reflect-metadata"
import { DB, User } from "../../typings/main";
import Json from "../../data.json"
import {dailyLimit} from "../../config/constants"


type CardNumber = number

@injectable()
export class BankStore {
    @observable database: DB
    daylyWithdraw: Map<CardNumber, number>


    public getUser(cardNumber: number) {
        return this.database.users.find((user) => user.cardNumber === cardNumber)
    }

    public updateBalance = (cardNumber: number, newBalance: number) => {
        const user = this.getUser(cardNumber)
        if (!user) {
            return false
        }
        const index = this.database.users.indexOf(user)
        user.balance = newBalance
        this.database.users[index] = user
    }

    public withdraw = (cardNumber: number, sum: number) => {
        const user = this.getUser(cardNumber)
        if (!user) {
            return false
        }
        const currentExceed = this.daylyWithdraw.get(cardNumber)
        if (currentExceed !== undefined) {
            if (currentExceed + sum >= dailyLimit) {
                return false
            } else {
                this.daylyWithdraw.set(cardNumber, currentExceed + sum)
            }
        }

        return true
    }

    constructor() {
        makeObservable(this)
        this.database = Json
        const  iterableCollection = this.database.users.map((user) => ([user.cardNumber, 0]) )
        this.daylyWithdraw = new Map(iterableCollection)
        // this.daylyWithdraw.forEach((value, key) => console.log(key, value))
    }



}

