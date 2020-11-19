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


export type Operation = CorrectPasswordOperation | IncorrectPasswordOperation | NoPasswordOperation | NoCardOperation


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

function isNoCardOperation(n: Operation): n is NoCardOperation {
    return n.type == 'NoCard'
}

function isNoPasswordOperation(n: Operation): n is NoPasswordOperation {
    return n.type == 'NoPassword' && Number.isInteger(n.cardNumber)
}