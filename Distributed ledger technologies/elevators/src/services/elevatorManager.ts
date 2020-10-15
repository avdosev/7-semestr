import {elevatorSpeed} from "../config/config";


export class ElevatorManager {
    currentFloor: number
    floorsQueue: Array<number>

    constructor(floorsQueue?: Array<number>, currentFloor?: number) {
        this.floorsQueue = floorsQueue ?? []
        this.currentFloor = currentFloor ?? 1
    }

    public addFloorToQueue(floorNumber: number) {
        this.floorsQueue.push(floorNumber)
        return [...this.floorsQueue]
    }

    public getLast() {
        return this.floorsQueue[this.floorsQueue.length-1]
    }
}