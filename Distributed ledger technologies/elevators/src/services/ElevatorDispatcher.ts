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
        return this.elevators[0].addCallFromFloorToQueue(task)
    }

    public addElevatorTask = (task: ElevatorCallPayload) => {
        return this.elevators[task.elevatorId].addCallFromElevatorToQueue(task)
    }

    public resolve = (elevatorId: number = 0) => {
        return this.elevators[elevatorId].resolve()
    }

}