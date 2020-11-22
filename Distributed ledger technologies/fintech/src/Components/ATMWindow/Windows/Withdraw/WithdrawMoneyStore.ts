import {injectable} from "inversify"
import {observer} from "mobx-react"
import {action, makeObservable, observable} from "mobx"
import "reflect-metadata"
import {List} from "immutable";


@injectable()
export class WithdrawMoneyStore {
    @observable public withdrawMoneyCount: number = 0

    constructor() {
        makeObservable(this)
    }

    @action
    public changeWithdrawMoney(withdrawMoneyCount: number) {
        this.withdrawMoneyCount = withdrawMoneyCount
    }



}

