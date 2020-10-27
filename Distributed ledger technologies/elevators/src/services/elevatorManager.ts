import {elevatorSpeed} from "../config/config";
import TinyQueue from 'tinyqueue';
import {MoveDirection} from "../typings/common";
import {ElevatorCallTask, FloorCallTask, MovingElevatorTask} from "../typings/elevators";
import {FloorCallPayload} from "../typings/elevatorsActionTypes";


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

    public addCallFromFloorToQueue(task: FloorCallTask) {
        let currentPriority = task.priority
        if (this.isPreferToMoveDown() && task.direction === "down" && this.currentFloor > task.fromFloor) {
            currentPriority--
        } else if (this.isPreferToMoveUp() && task.direction === "up" && this.currentFloor < task.fromFloor) {
            currentPriority--
        }
        // меньше приоритет - быстрее выполнится
        console.log(currentPriority)
        this.floorsQueue.push({
            toFloor: task.fromFloor,
            priority: currentPriority,
            direction: task.direction,
            calledFromElevator: false
        })
        return this.floorsQueue
    }

    public addCallFromElevatorToQueue(task: ElevatorCallTask) {
        this.floorsQueue.push({
            toFloor: task.toFloor,
            priority: 2,
            calledFromElevator: true
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