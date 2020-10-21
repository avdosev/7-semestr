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
    currentMovingDirection: MoveDirection

    constructor(oldInstance?: ElevatorManager) {
        this.floorsQueue = oldInstance?.floorsQueue ?? new TinyQueue<MovingElevatorTask>([], this.comparator)
        this.currentFloor = oldInstance?.currentFloor ?? 1
        this.currentMovingDirection = oldInstance?.currentMovingDirection ?? "stopped"
    }

    public comparator(task1: MovingElevatorTask, task2: MovingElevatorTask) {
        return task1.priority - task2.priority
    }

    public isPreferToMoveDown() {
        return this.currentMovingDirection === "down" || this.currentMovingDirection === "stopped"
    }

    public isPreferToMoveUp() {
        return this.currentMovingDirection === "up" || this.currentMovingDirection === "stopped"
    }

    public addFloorToQueue(floorNumber: number, calledFromElevator: boolean, direction?: MoveDirection,) {
        let currentPriority = 2
        if (this.isPreferToMoveDown() && direction === "down" && this.currentFloor > floorNumber) {
            currentPriority = 1
        } else if (this.isPreferToMoveUp() && direction === "up" && this.currentFloor < floorNumber) {
            currentPriority = 1
        }
        // меньше приоритет - быстрее выполнится

        this.floorsQueue.push({
            toFloor: floorNumber,
            priority: currentPriority,
            direction: direction,
            calledFromElevator: calledFromElevator
        })
        return this.floorsQueue
    }

    public resolve() {
        const lastFloor = this.floorsQueue.peek()
        if (lastFloor) {
            if (this.currentFloor < lastFloor.toFloor) {
                this.currentFloor++;
                this.currentMovingDirection = 'up'
            } else if (this.currentFloor > lastFloor.toFloor) {
                this.currentFloor--;
                this.currentMovingDirection = 'down'
            } else {
                this.floorsQueue.pop()
                this.currentMovingDirection = 'stopped'
            }
        }
    }

}