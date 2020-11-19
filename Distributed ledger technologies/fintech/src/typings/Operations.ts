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
    name: string
}


export type Operation = CorrectPasswordOperation | NoPasswordOperation | NoCardOperation


export function initOperation(): NoCardOperation {
    return {type: "NoCard"}
}

export function insertCardOperation(operation: NoCardOperation, cardNumber: number): NoPasswordOperation {
    return {...operation, type: "NoPassword", cardNumber: cardNumber}
}

function isNoCardOperation(n: Operation): n is NoCardOperation {
    return n.type == 'NoCard'
}

function isNoPasswordOperation(n: Operation): n is NoPasswordOperation {
    return n.type == 'NoPassword' && Number.isInteger(n.cardNumber)
}