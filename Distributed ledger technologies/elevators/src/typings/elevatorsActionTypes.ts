import {MoveDirection} from "./common";

export type FloorCallPayload = {
    fromFloor: number
    direction: MoveDirection
}

export type ElevatorCallPayload = {
    toFloor: number
    elevatorId: number
}


export type ElevatorIdPayload = {
    elevatorId: number
}


export type BaseElevatorPayload = FloorCallPayload & ElevatorCallPayload & ElevatorIdPayload
