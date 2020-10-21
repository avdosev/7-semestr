import {ElevatorManager, MovingElevatorTask} from "./ElevatorManager";
import {MoveDirection} from "../typings/common";


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

    public addTask = (floorNumber: number, calledFromElevator: boolean,  direction?: MoveDirection, elevatorId: number = 0) => {
        return this.elevators[elevatorId].addFloorToQueue(floorNumber, calledFromElevator, direction)
    }

    public resolve = (elevatorId: number = 0) => {
        return this.elevators[elevatorId].resolve()
    }

}