import { injectable } from "inversify"
import { action, makeObservable, observable } from "mobx"


@injectable()
export class SendMoneyStore {
    @observable public cardNumber: number = 0
    @observable public sendSum: number = 0

    constructor() {
        makeObservable(this)
    }

    @action
    public changeCardNumberForSend(rowCardNumber: string) {
        if (Number.parseInt(rowCardNumber) !== NaN) {
            this.cardNumber = Number.parseInt(rowCardNumber)
        }
    }

    @action
    public changeSendSum(cardNumber: number) {
        this.cardNumber = cardNumber
    }

}

