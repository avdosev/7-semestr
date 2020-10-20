import {elevatorSpeed} from "../config/config";
import TinyQueue from 'tinyqueue';
import {MoveDirection} from "../typings/common";

export type MovingElevatorTask = {
    toFloor: number
    priority: number
    calledFromElevator: boolean
    direction?: MoveDirection
}

export class ElevatorManager {
    currentFloor: number
    floorsQueue: TinyQueue<MovingElevatorTask>

    constructor(floorsQueue?: TinyQueue<MovingElevatorTask>, currentFloor?: number) {
        this.floorsQueue = floorsQueue ?? new TinyQueue<MovingElevatorTask>()
        this.currentFloor = currentFloor ?? 1
    }

    public addFloorToQueue(floorNumber: number, priority: number, calledFromElevator: boolean,  direction?: MoveDirection, ) {
        this.floorsQueue.push({toFloor: floorNumber, priority: priority, direction: direction, calledFromElevator: calledFromElevator})
        return this.floorsQueue
    }

    public getLast() {
        return this.floorsQueue.pop()
    }
}