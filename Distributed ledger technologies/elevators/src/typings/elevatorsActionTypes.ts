import {MoveDirection} from "./common";

export type FloorCallPayload = {
    fromFloor: number
    direction: MoveDirection
    // elevatorId: number
}

export type ElevatorCallPayload = {
    toFloor: number
    elevatorId: number
}


export type ElevatorIdPayload = {
    elevatorId: number
}


export type BaseElevatorPayload = FloorCallPayload & ElevatorCallPayload & ElevatorIdPayload
