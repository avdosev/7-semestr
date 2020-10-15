import {injectable} from "inversify";
import {ActionTypePayload, AnyActionName, ElevatorStore, MoveDirection} from "../../typings/common";
import {elevatorStore} from "./ElevatorStore";
import {ElevatorManager} from "../../services/elevatorManager";


@injectable()
export default class ElevatorReducer {
    public getReducer = () => {
        return (state: ElevatorStore=elevatorStore, action: ActionTypePayload<any, AnyActionName>) =>
            this.reduce(state, action);
    }

    public callFromFloor(state: ElevatorStore, payload: {fromFloor: number, direction: MoveDirection}) {
        const newState = {...state}

        const newQueue = newState.elevator.addFloorToQueue(payload.fromFloor, 1)
        newState.elevator = new ElevatorManager(newQueue)

        return newState
    }

    public callFromElevator(state: ElevatorStore, payload: {toFloor: number}) {
        const newState = {...state}

        const newQueue = newState.elevator.addFloorToQueue(payload.toFloor, 1)
        newState.elevator = new ElevatorManager(newQueue)

        return newState
    }

    public movingElevator(state: ElevatorStore, payload: {previousFloor: number, nextFloor: number}) {
        const newState = {...state}

        newState.elevator = new ElevatorManager(newState.elevator.floorsQueue, newState.elevator.currentFloor)
        const lastFloor = newState.elevator.getLast()
        if (lastFloor) {
            newState.elevator.currentFloor = lastFloor.toFloor;
        }

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