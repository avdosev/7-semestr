import {inject, injectable} from "inversify"
import {observer} from "mobx-react"
import {action, makeObservable, observable} from "mobx"
import {ATMKeyboardStore} from "../ATMKeyboard/ATMKeyboardStore";
import Json from "../../data.json";
import {DB} from "../../typings/main";
import {List, Map} from "immutable";
import {
    initOperation,
    inputCorrectPasswordOperation,
    inputIncorrectPasswordOperation,
    insertCardOperation,
    NoOperation,
    openBalanceOperation,
    openWithdrawMoneyWindowOperation,
    Operation,
    withdrawExistingMoneyOperation, withdrawNotExistingCacheInATMOperation, withdrawNotExistingMoneyOperation
} from "../../typings/Operations"
import {TYPES} from "../../config/Types"
import {isHasChange, numDigits, randomCacheGenerator, subtractCacheForClient} from "../../utils/utils"

@injectable()
export class ATMStore {
    database: DB
    @observable domainLevelOfOperation: Operation = initOperation()
    keyboardStore: ATMKeyboardStore
    @observable cache: Map<number, number> = randomCacheGenerator()

    constructor(
        @inject(TYPES.ATMKeyboardStore) keyStore: ATMKeyboardStore
    ) {
        makeObservable(this)
        this.database = Json
        this.keyboardStore = keyStore
    }

    @action
    public insertCard = (cardNumber: number) => {
        const user = this.database.users.find((user) => cardNumber === user.cardNumber)
        this.domainLevelOfOperation = insertCardOperation(this.domainLevelOfOperation, user!)
        console.log(this.domainLevelOfOperation.type)
    }

    @action
    openWithdrawWindow = () => {
        this.domainLevelOfOperation = openWithdrawMoneyWindowOperation(this.domainLevelOfOperation)
    }

    @action
    openBalanceOperation = () => {
        this.domainLevelOfOperation = openBalanceOperation(this.domainLevelOfOperation)
    }

    @action
    onCancelPressed = () => {
        switch (this.domainLevelOfOperation.type) {
            case "IncorrectPassword":
                this.domainLevelOfOperation = insertCardOperation(this.domainLevelOfOperation, this.domainLevelOfOperation.user)
                this.keyboardStore.clearPinCode()
                break
            case "NoPassword":
            case "CorrectPassword":
                this.domainLevelOfOperation = initOperation()
                break
            case "OpenWithdrawMoneyWindow":
            case "OpenBalanceOperation":
            case "WithdrawNotExistingMoney":
            case "WithdrawNotExistingCacheInATM":
            case "SuccessWithdrawExistingMoney":
                this.domainLevelOfOperation = inputCorrectPasswordOperation(this.domainLevelOfOperation)
                break
        }
    }

    @action
    withdrawMoney = (count: number) => {
        if (this.domainLevelOfOperation.type === "OpenWithdrawMoneyWindow") {
        const nominalsCount = isHasChange(this.cache, count)

            if (count > this.domainLevelOfOperation.user.balance) {
                this.domainLevelOfOperation = withdrawNotExistingMoneyOperation(this.domainLevelOfOperation)
            }

            if (!nominalsCount) {
                this.domainLevelOfOperation = withdrawNotExistingCacheInATMOperation(this.domainLevelOfOperation)
            } else {
                this.cache = subtractCacheForClient(this.cache, nominalsCount)
                this.domainLevelOfOperation = withdrawExistingMoneyOperation(this.domainLevelOfOperation, nominalsCount)
            }
        }

    }

    @action
    public submit = () => {
        if (this.domainLevelOfOperation.type === "OpenWithdrawMoneyWindow") {

        }
    }

    @action
    public addNumberToPinCode = (pinCodeNumber: number) => {
        if (this.domainLevelOfOperation.type === "NoPassword") {
            if (this.keyboardStore.pinCodeNumber.isNone() || this.keyboardStore.pinCodeNumber.value <= 9999) {  // Больше 4 знаков
                this.keyboardStore.addNumberToPinCode(pinCodeNumber)
            }
            if (numDigits(this.keyboardStore.pinCodeNumber.value!) === 4)
                this.validatePinCode(this.domainLevelOfOperation.user.cardNumber, this.keyboardStore.pinCodeNumber.value!)
        }
    }

    @action
    public validatePinCode = (cardNumber: number, pinCode: number) => {
        const userWithThisPinCode = this.database.users.find((user) => cardNumber === user.cardNumber && user.pinCode === pinCode)
        if (userWithThisPinCode) {
            this.domainLevelOfOperation = inputCorrectPasswordOperation(this.domainLevelOfOperation)
        } else {
            this.domainLevelOfOperation = inputIncorrectPasswordOperation(this.domainLevelOfOperation)
        }


    }

}

