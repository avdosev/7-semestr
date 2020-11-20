import {User} from "./main";

export interface NoCardOperation {
    type: "NoCard"
}

export interface NoPasswordOperation {
    type: "NoPassword"
    user: User
}

export interface CorrectPasswordOperation {
    type: "CorrectPassword"
    user: User
}

export interface IncorrectPasswordOperation {
    type: "IncorrectPassword"
    user: User
}

export interface OpenWithdrawMoneyWindowOperation {
    type: "OpenWithdrawMoneyWindow"
    user: User
}

export interface WithdrawExistingMoneyOperation {
    type: "WithdrawExistingMoney"
    user: User

}

export interface WithdrawNotExistingMoneyOperation {
    type: "WithdrawNotExistingMoney"
    user: User

}

export interface WithdrawNotExistingCacheInATMOperation {
    type: "WithdrawNotExistingCacheInATM"
    user: User

}

export interface OpenBalanceWindowATMOperation {
    type: "OpenBalanceOperation"
    user: User
}

export type NoOperation = NoCardOperation

export type OperationUnion = NoOperation |
    CorrectPasswordOperation |
    IncorrectPasswordOperation |
    NoPasswordOperation |
    WithdrawNotExistingCacheInATMOperation |
    WithdrawNotExistingMoneyOperation |
    WithdrawExistingMoneyOperation |
    OpenWithdrawMoneyWindowOperation |
    OpenBalanceWindowATMOperation

export type Operation = OperationUnion


export function initOperation(): NoCardOperation {
    return {type: "NoCard"}
}

export function insertCardOperation(operation: Operation, user: User): Operation {
    return {...operation, type: "NoPassword", user: user}
}

export function inputCorrectPasswordOperation(operation: Operation): Operation {
    return {...operation, type: "CorrectPassword"}
}

export function inputIncorrectPasswordOperation(operation: Operation): Operation {
    return {...operation, type: "IncorrectPassword"}
}

export function openWithdrawMoneyWindowOperation(operation: Operation): Operation  {
    return {...operation, type: "OpenWithdrawMoneyWindow"}
}

export function openBalanceOperation(operation: Operation): Operation {
    return {...operation, type: "OpenBalanceOperation"}
}

export function withdrawExistingMoneyOperation(operation: Operation): Operation {
    return {...operation, type: "WithdrawExistingMoney"}
}

export function withdrawNotExistingMoneyOperation(operation: Operation): Operation {
    return {...operation, type: "WithdrawNotExistingMoney"}
}


// function isNoCardOperation(n: Operation): n is NoCardOperation {
//     return n.type == 'NoCard'
// }

// function isNoPasswordOperation(n: Operation): n is NoPasswordOperation {
//     return n.type == 'NoPassword' && Number.isInteger(n.cardNumber)
// }