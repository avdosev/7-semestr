import {MoveDirection} from "./common";


export type MovingElevatorTask = {
    toFloor: number
    priority: number
    calledFromElevator: boolean
    direction?: MoveDirection
}


export type FloorCallTask = { // без айдишника элеватора
    fromFloor: number
    direction: MoveDirection
}

export type ElevatorCallTask = { // без айдишника элеватора
    toFloor: number
}