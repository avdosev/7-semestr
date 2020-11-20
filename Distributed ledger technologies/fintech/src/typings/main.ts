export interface User {
    name: string,
    cardNumber: number,
    pinCode: number
    balance: number
}

export interface DB {
    users: User[]
}



export type PinCodeBrand = {
    readonly Int: unique symbol
} 

export type PinCode = number & PinCodeBrand

function isPinCode(n: number): n is PinCode {
    return Number.isInteger(n) && n <= 9999 // четырехзначное чесло
}

// export function makePinCode(n: number): PinCode {
//     // return isPinCode(n) ? 
// }