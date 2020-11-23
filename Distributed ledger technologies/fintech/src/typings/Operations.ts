import {User} from "./main";
import {Map} from "immutable"

export interface NoCardOperation {
    type: "NoCard"
}

export interface NoPasswordOperation {
    type: "NoPassword"
}

export interface CorrectPasswordOperation {
    type: "CorrectPassword"
}

export interface IncorrectPasswordOperation {
    type: "IncorrectPassword"
}

export interface OpenWithdrawMoneyWindowOperation {
    type: "OpenWithdrawMoneyWindow"
}

export interface OpenSendMoneyWindowOperation {
    type: "OpenSendMoneyWindow"
}


export interface WithdrawExistingMoneyOperation {
    type: "SuccessWithdrawExistingMoney"
    nominalsCount: Map<number, number>
}

export interface WithdrawNotExistingMoneyOperation {
    type: "WithdrawNotExistingMoney"
}

export interface WithdrawNotExistingCacheInATMOperation {
    type: "WithdrawNotExistingCacheInATM"
}

export interface OpenBalanceWindowATMOperation {
    type: "OpenBalanceOperation"
}

export interface InputSendSumWindowOperation {
    type: "InputSendSumOperation"
}

export interface NotExistingCardNumberOperation {
    type: "NotExistingCardNumberOperation"
}

export interface SuccessSendMoneyOperation {
    type: "SuccessSendMoneyOperation"
}

export type NoOperation = NoCardOperation

export type Operation = NoOperation |
    CorrectPasswordOperation |
    IncorrectPasswordOperation |
    NoPasswordOperation |
    WithdrawNotExistingCacheInATMOperation |
    WithdrawNotExistingMoneyOperation |
    WithdrawExistingMoneyOperation |
    OpenWithdrawMoneyWindowOperation |
    OpenBalanceWindowATMOperation |
    OpenSendMoneyWindowOperation |
    InputSendSumWindowOperation |
    NotExistingCardNumberOperation |
    SuccessSendMoneyOperation



export function initOperation(): NoCardOperation {
    return {type: "NoCard"}
}

export function insertCardOperation(operation: Operation): Operation {
    return {...operation, type: "NoPassword"}
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

export function withdrawExistingMoneyOperation(operation: Operation, nominalsCount: Map<number, number>): Operation {
    return {...operation, type: "SuccessWithdrawExistingMoney", nominalsCount: nominalsCount}
}

export function withdrawNotExistingMoneyOperation(operation: Operation): Operation {
    return {...operation, type: "WithdrawNotExistingMoney"}
}

export function withdrawNotExistingCacheInATMOperation(operation: Operation): Operation {
    return {...operation, type: "WithdrawNotExistingCacheInATM"}
}

export function openSendMoneyWindowOperation(operation: Operation): Operation {
    return {...operation, type: "OpenSendMoneyWindow"}
}

export function inputSendSumWindowOperation(operation: Operation): Operation {
    return {...operation, type: "InputSendSumOperation"}
}

export function notExistingCardNumberOperation(operation: Operation): Operation {
    return {...operation, type: "NotExistingCardNumberOperation"}
}

export function successSendMoneyOperation(operation: Operation): Operation {
    return {...operation, type: "SuccessSendMoneyOperation"}
}

