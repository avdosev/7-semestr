import {ElevatorManager} from "./ElevatorManager";
import {MoveDirection} from "../typings/common";
import {ElevatorCallPayload, FloorCallPayload} from "../typings/elevatorsActionTypes";


export class ElevatorDispatcher {
    elevators: ElevatorManager[]

    constructor(elevators?: ElevatorManager[], elevatorsCount?: number) {
        this.elevators = elevators ?? []
        if (elevatorsCount !== undefined) {
            for (let i=0; i<elevatorsCount; i++) {
                this.elevators.push(new ElevatorManager())
            }
        }
    }

    get floorsQueue() {
        return this.elevators.map((man) => man.floorsQueue)
    }

    getCurrentFloor(elevatorId: number) {
        return this.elevators[elevatorId].currentFloor
    }

    getCurrentMoveDirection(elevatorId: number) {
        return this.elevators[elevatorId].currentMovingDirection
    }

    public addFloorTask = (task: FloorCallPayload) => {
        let currentPriority = 3
        let elevatorId = 0
        for (let i=0; i<this.elevators.length; i++) {
            const elevator = this.elevators[i]
            if (elevator.isPreferToMoveDown() && task.direction === "down" && elevator.currentFloor > task.fromFloor) {
                currentPriority-- // можно объединить эти 2 ветки, но может бы я решу по-разному уменьшать приортитет
                elevatorId = i
            } else if (elevator.isPreferToMoveUp() && task.direction === "up" && elevator.currentFloor < task.fromFloor) {
                currentPriority--
                elevatorId = i
            }
        }

        return this.elevators[elevatorId].addCallFromFloorToQueue({...task, priority: currentPriority})
    }

    public addElevatorTask = (task: ElevatorCallPayload) => {
        return this.elevators[task.elevatorId].addCallFromElevatorToQueue(task)
    }

    public resolve = (elevatorId: number = 0) => {
        return this.elevators[elevatorId].resolve()
    }

}