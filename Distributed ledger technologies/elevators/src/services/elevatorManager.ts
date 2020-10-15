import {elevatorSpeed} from "../config/config";
import TinyQueue from 'tinyqueue';

export type MovingElevatorTask = {
    toFloor: number
    priority: number
}

export class ElevatorManager {
    currentFloor: number
    floorsQueue: TinyQueue<MovingElevatorTask>

    constructor(floorsQueue?: TinyQueue<MovingElevatorTask>, currentFloor?: number) {
        this.floorsQueue = floorsQueue ?? new TinyQueue<MovingElevatorTask>()
        this.currentFloor = currentFloor ?? 1
    }

    public addFloorToQueue(floorNumber: number, priority: number) {
        this.floorsQueue.push({toFloor: floorNumber, priority: priority})
        return this.floorsQueue
    }

    public getLast() {
        return this.floorsQueue.pop()
    }
}