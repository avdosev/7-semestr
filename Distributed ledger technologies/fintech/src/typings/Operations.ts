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
    balance: number
}

export interface IncorrectPasswordOperation {
    type: "IncorrectPassword"
    cardNumber: number
}

export interface OpenWithdrawMoneyWindowOperation {
    type: "OpenWithdrawMoneyWindow"
    cardNumber: number
    balance: number
}

export interface WithdrawExistingMoneyOperation {
    type: "WithdrawExistingMoney"
    cardNumber: number
    balance: number

}

export interface WithdrawNotExistingMoneyOperation {
    type: "WithdrawNotExistingMoney"
    cardNumber: number
    balance: number

}

export interface WithdrawNotExistingCacheInATMOperation {
    type: "WithdrawNotExistingCacheInATM"
    cardNumber: number
    balance: number

}

export interface OpenBalanceWindowATMOperation {
    type: "OpenBalanceOperation"
    cardNumber: number
    balance: number

}


export type Operation = 
CorrectPasswordOperation | 
IncorrectPasswordOperation | 
NoPasswordOperation | 
NoCardOperation |
WithdrawNotExistingCacheInATMOperation |
WithdrawNotExistingMoneyOperation |
WithdrawExistingMoneyOperation |
OpenWithdrawMoneyWindowOperation |
OpenBalanceWindowATMOperation


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

export function openWithdrawMoneyWindowOperation(operation: Operation): Operation {
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

function isNoPasswordOperation(n: Operation): n is NoPasswordOperation {
    return n.type == 'NoPassword' && Number.isInteger(n.cardNumber)
}