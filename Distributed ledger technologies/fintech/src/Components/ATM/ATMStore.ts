import {inject, injectable} from "inversify"
import {observer} from "mobx-react"
import {action, makeObservable, observable} from "mobx"
import {ATMKeyboardStore} from "../ATMKeyboard/ATMKeyboardStore";
import Json from "../../data.json";
import {DB, User} from "../../typings/main";
import {List, Map} from "immutable";
import {
    initOperation,
    inputCorrectPasswordOperation,
    inputIncorrectPasswordOperation,
    inputSendSumWindowOperation,
    insertCardOperation,
    NoOperation,
    notExistingCardNumberOperation,
    openBalanceOperation,
    openSendMoneyWindowOperation,
    openWithdrawMoneyWindowOperation,
    Operation,
    successSendMoneyOperation,
    withdrawExistingMoneyOperation, withdrawNotExistingCacheInATMOperation, withdrawNotExistingMoneyOperation
} from "../../typings/Operations"
import {TYPES} from "../../config/Types"
import {isHasChange, numDigits, randomCacheGenerator, subtractCacheForClient} from "../../utils/utils"
import {BankStore} from "../Bank/BankStore";


@injectable()
export class ATMStore {
    @observable domainLevelOfOperation: Operation = initOperation()
    keyboardStore: ATMKeyboardStore
    bankStore: BankStore
    @observable cache: Map<number, number> = randomCacheGenerator()
    currentUser: User | null = null

    constructor(
        @inject(TYPES.ATMKeyboardStore) keyStore: ATMKeyboardStore,
        @inject(TYPES.BankStore) bank: BankStore,
    ) {
        makeObservable(this)
        this.keyboardStore = keyStore
        this.bankStore = bank
    }

    @action
    public insertCard = (cardNumber: number) => {
        const user = this.bankStore.getUser(cardNumber)
        this.currentUser = user! //  вообще мы не должны получать всю инфу о пользователя сюда
        this.domainLevelOfOperation = insertCardOperation(this.domainLevelOfOperation)
    }

    @action
    public openWithdrawWindow = () => {
        this.domainLevelOfOperation = openWithdrawMoneyWindowOperation(this.domainLevelOfOperation)
    }

    @action
    public openBalanceOperation = () => {
        this.domainLevelOfOperation = openBalanceOperation(this.domainLevelOfOperation)
    }

    @action
    public openSendMoneyOperation = () => {
        this.domainLevelOfOperation = openSendMoneyWindowOperation(this.domainLevelOfOperation)
    }

    @action
    public onCancelPressed = () => {
        switch (this.domainLevelOfOperation.type) {
            case "IncorrectPassword":
                this.domainLevelOfOperation = insertCardOperation(this.domainLevelOfOperation)
                this.keyboardStore.clearInput()
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
            case "OpenSendMoneyWindow":
            case "SuccessSendMoneyOperation":
                this.domainLevelOfOperation = inputCorrectPasswordOperation(this.domainLevelOfOperation)
                break
            case "InputSendSumOperation":
            case "NotExistingCardNumberOperation":
                this.domainLevelOfOperation = openSendMoneyWindowOperation(this.domainLevelOfOperation)
                break
        }
        this.keyboardStore.clearInput() // при переходе вперед, очистим поле

    }

    @action
    public sendMoney = (destCardNumber: number, sendingSum: number) => {
        this.bankStore.updateBalance(this.currentUser!.cardNumber, this.currentUser!.balance - sendingSum)
        const destUser = this.bankStore.getUser(destCardNumber)
        this.bankStore.updateBalance(destCardNumber, destUser!.balance + sendingSum)
    }

    @action
    public withdrawMoney = (count: number) => {
        if (this.domainLevelOfOperation.type === "OpenWithdrawMoneyWindow") {
            const nominalsCount = isHasChange(this.cache, count)
            if (count > this.currentUser!.balance) {
                this.domainLevelOfOperation = withdrawNotExistingMoneyOperation(this.domainLevelOfOperation)
                return
            }
            if (!nominalsCount) {
                this.domainLevelOfOperation = withdrawNotExistingCacheInATMOperation(this.domainLevelOfOperation)
                return
            }
            this.cache = subtractCacheForClient(this.cache, nominalsCount)

            this.domainLevelOfOperation = withdrawExistingMoneyOperation(this.domainLevelOfOperation, nominalsCount)
            this.bankStore.updateBalance(this.currentUser!.cardNumber, this.currentUser!.balance - count)
        }
    }

    destCardNumber: number | undefined = undefined

    @action
    public submit = () => {
        if (this.domainLevelOfOperation.type === "OpenWithdrawMoneyWindow") {            
            this.withdrawMoney(this.keyboardStore.input.value!)
        } else if (this.domainLevelOfOperation.type === "OpenSendMoneyWindow") {
            const cardNumber = this.keyboardStore.input.value
            const user = this.bankStore.getUser(cardNumber!)
            if (!user) { 
                this.domainLevelOfOperation = notExistingCardNumberOperation(this.domainLevelOfOperation)
                return
            }
            this.destCardNumber = cardNumber
            this.domainLevelOfOperation = inputSendSumWindowOperation(this.domainLevelOfOperation)
        } else if (this.domainLevelOfOperation.type === "InputSendSumOperation") {
            const sendingSum = this.keyboardStore.input.value!
            if (this.currentUser!.balance - sendingSum < 0) {
                this.domainLevelOfOperation = withdrawNotExistingMoneyOperation(this.domainLevelOfOperation)
                return
            }
            
            this.sendMoney(this.destCardNumber!, sendingSum!)
            this.domainLevelOfOperation = successSendMoneyOperation(this.domainLevelOfOperation)
        }

        this.keyboardStore.clearInput() // при переходе вперед, очистим поле
    }

    @action
    public addNumberToInputField = (pinCodeNumber: number) => {
        if (this.domainLevelOfOperation.type === "NoPassword") {
            if (this.keyboardStore.input.isNone() || this.keyboardStore.input.value <= 9999) {  // Больше 4 знаков
                this.keyboardStore.addNumberToInput(pinCodeNumber)
            }
            if (numDigits(this.keyboardStore.input.value!) === 4) {
                this.validatePinCode(this.currentUser!.cardNumber, this.keyboardStore.input.value!)
            }
        } else if (this.domainLevelOfOperation.type === "OpenSendMoneyWindow") {
            this.keyboardStore.addNumberToInput(pinCodeNumber)
        } else if (this.domainLevelOfOperation.type === "OpenWithdrawMoneyWindow") {
            this.keyboardStore.addNumberToInput(pinCodeNumber)
        } else if (this.domainLevelOfOperation.type === "InputSendSumOperation") {
            this.keyboardStore.addNumberToInput(pinCodeNumber)
        }
    }

    @action
    public validatePinCode = (cardNumber: number, pinCode: number) => {
        const userWithThisPinCode = this.currentUser?.pinCode === pinCode // не очень верно,
        if (userWithThisPinCode) {
            this.domainLevelOfOperation = inputCorrectPasswordOperation(this.domainLevelOfOperation)
        } else {
            this.domainLevelOfOperation = inputIncorrectPasswordOperation(this.domainLevelOfOperation)
        }
        this.submit()


    }

}

