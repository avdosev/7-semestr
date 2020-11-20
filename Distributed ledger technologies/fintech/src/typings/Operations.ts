export interface NoCardOperation {
    type: "NoCard"
}

export interface NoPasswordOperation {
    type: "NoPassword"
    cardNumber: number
}

export interface CorrectPasswordOperation {
    type: "CorrectPassword"
    cardNumber: number
}

export interface IncorrectPasswordOperation {
    type: "IncorrectPassword"
    cardNumber: number
}

export interface OpenWithdrawMoneyWindowOperation {
    type: "OpenWithdrawMoneyWindow"
    cardNumber: number
}

export interface WithdrawExistingMoneyOperation {
    type: "WithdrawExistingMoney"
    cardNumber: number
}

export interface WithdrawNotExistingMoneyOperation {
    type: "WithdrawNotExistingMoney"
    cardNumber: number
}

export interface WithdrawNotExistingCacheInATMOperation {
    type: "WithdrawNotExistingCacheInATM"
    cardNumber: number
}

export type Operation = 
CorrectPasswordOperation | 
IncorrectPasswordOperation | 
NoPasswordOperation | 
NoCardOperation |
WithdrawNotExistingCacheInATMOperation |
WithdrawNotExistingMoneyOperation |
WithdrawExistingMoneyOperation |
OpenWithdrawMoneyWindowOperation 


export function initOperation(): NoCardOperation {
    return {type: "NoCard"}
}

export function insertCardOperation(operation: Operation, cardNumber: number): Operation {
    return {...operation, type: "NoPassword", cardNumber: cardNumber}
}

export function inputCorrectPasswordOperation(operation: Operation): Operation {
    return {...operation, type: "CorrectPassword"}
}

export function inputIncorrectPasswordOperation(operation: Operation): Operation {
    return {...operation, type: "IncorrectPassword"}
}

export function openWithdrawMoneyWindowOperationOperation(operation: Operation): Operation {
    return {...operation, type: "OpenWithdrawMoneyWindow"}
}



function isNoCardOperation(n: Operation): n is NoCardOperation {
    return n.type == 'NoCard'
}

function isNoPasswordOperation(n: Operation): n is NoPasswordOperation {
    return n.type == 'NoPassword' && Number.isInteger(n.cardNumber)
}