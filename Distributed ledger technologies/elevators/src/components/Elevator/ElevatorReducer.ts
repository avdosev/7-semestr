import {injectable} from "inversify";
import {ActionTypePayload, AnyActionName, ElevatorStore, MoveDirection} from "../../typings/common";
import {elevatorStore} from "./ElevatorStore";
import {ElevatorManager} from "../../services/ElevatorManager";
import {getDirection} from "../../services/Utils";
import {ElevatorDispatcher} from "../../services/ElevatorDispatcher";
import {BaseElevatorPayload, ElevatorCallPayload, FloorCallPayload} from "../../typings/elevatorsActionTypes";
import {
    CALL_ELEVATOR_FROM_FLOOR,
    CHANGE_ELEVATOR_FLOOR_IN_ELEVATOR,
    ELEVATOR_TYPES,
    MOVING_ELEVATOR
} from "../../typings/actionNames";


@injectable()
export default class ElevatorReducer {
    public getReducer = () => {
        return (state: ElevatorStore=elevatorStore, action: ActionTypePayload<BaseElevatorPayload, ELEVATOR_TYPES>) =>
            this.reduce(state, action);
    }

    public callFromFloor(state: ElevatorStore, payload: FloorCallPayload) {
        const newState = {...state}

        const newQueue = newState.elevators.addFloorTask(payload)
        newState.elevators = new ElevatorDispatcher(newState.elevators.elevators)

        return newState
    }

    public callFromElevator(state: ElevatorStore, payload: ElevatorCallPayload) {
        const newState = {...state}

        const newQueue = newState.elevators.addElevatorTask(payload)
        newState.elevators = new ElevatorDispatcher(newState.elevators.elevators)

        return newState
    }

    public movingElevator(state: ElevatorStore, payload: {elevatorId: number}) {
        const newState = {...state}

        const newElevators = new ElevatorDispatcher(newState.elevators.elevators)
        newElevators.resolve(payload.elevatorId)
        newState.elevators = newElevators;

        return newState
    }

    protected reduce = (state: ElevatorStore, action: ActionTypePayload<BaseElevatorPayload, ELEVATOR_TYPES>): ElevatorStore => {
        switch (action.type) {
            case CHANGE_ELEVATOR_FLOOR_IN_ELEVATOR:
                return this.callFromElevator(state, action.payload)
            case CALL_ELEVATOR_FROM_FLOOR:
                return this.callFromFloor(state, action.payload)
            case MOVING_ELEVATOR:
                return this.movingElevator(state, action.payload)
            default: {
                return state
            }
        }
    }

}