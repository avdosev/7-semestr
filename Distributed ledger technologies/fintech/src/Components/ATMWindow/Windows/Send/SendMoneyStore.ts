import { injectable } from "inversify"
import { action, makeObservable, observable } from "mobx"


@injectable()
export class SendMoneyStore {
    @observable public cardNumber: number = 0

    constructor() {
        makeObservable(this)
    }

    @action
    public changeCardNumberForSend(cardNumber: number) {
        this.cardNumber = cardNumber
    }



}

