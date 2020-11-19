export interface User {
    "name": string,
    "cardNumber": number,
    "pinCode": number
}

export interface DB {
    users: User[]
}