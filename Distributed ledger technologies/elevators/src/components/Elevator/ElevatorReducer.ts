import {injectable} from "inversify";
import {ActionTypePayload, AnyActionName, ElevatorStore, MoveDirection} from "../../typings/common";
import {elevatorStore} from "./ElevatorStore";
import {ElevatorManager} from "../../services/elevatorManager";
import {getDirection} from "../../services/Utils";


@injectable()
export default class ElevatorReducer {
    public getReducer = () => {
        return (state: ElevatorStore=elevatorStore, action: ActionTypePayload<any, AnyActionName>) =>
            this.reduce(state, action);
    }

    public callFromFloor(state: ElevatorStore, payload: {fromFloor: number, direction: MoveDirection}) {
        const newState = {...state}

        const newQueue = newState.elevator.addFloorToQueue(payload.fromFloor, 1, false, payload.direction)
        newState.elevator = new ElevatorManager(newQueue, newState.elevator.currentFloor)

        return newState
    }

    public callFromElevator(state: ElevatorStore, payload: {toFloor: number}) {
        const newState = {...state}

        const newQueue = newState.elevator.addFloorToQueue(payload.toFloor, 1, true)
        newState.elevator = new ElevatorManager(newQueue, newState.elevator.currentFloor)

        return newState
    }

    public movingElevator(state: ElevatorStore, payload: {}) {
        const newState = {...state}

        const newElevator = new ElevatorManager(newState.elevator.floorsQueue, newState.elevator.currentFloor)
        const lastFloor = newElevator.floorsQueue.peek()
        if (lastFloor) {
            if (newElevator.currentFloor < lastFloor.toFloor) {
                newElevator.currentFloor++;
            } else if (newElevator.currentFloor > lastFloor.toFloor) {
                newElevator.currentFloor--;
            } else {
                // setTimeout(() => {
                    newElevator.floorsQueue.pop()
                // }, 500)

            }
            console.log(newElevator.currentFloor)
        }
        newState.elevator = newElevator;

        return newState
    }

    protected reduce = (state: ElevatorStore, action: ActionTypePayload<any, AnyActionName>): ElevatorStore => {
        switch (action.type) {
            case "CHANGE_ELEVATOR_FLOOR_IN_ELEVATOR":
                return this.callFromElevator(state, action.payload)
            case "CALL_ELEVATOR_FROM_FLOOR":
                return this.callFromFloor(state, action.payload)
            case "MOVING_ELEVATOR":
                return this.movingElevator(state, action.payload)
            default: {
                return state
            }
        }
    }

}