import {injectable} from "inversify";
import {ActionTypePayload, AnyActionName, ElevatorStore, MoveDirection} from "../../typings/common";
import {elevatorStore} from "./ElevatorStore";
import {ElevatorManager} from "../../services/ElevatorManager";
import {getDirection} from "../../services/Utils";
import {ElevatorDispatcher} from "../../services/ElevatorDispatcher";


@injectable()
export default class ElevatorReducer {
    public getReducer = () => {
        return (state: ElevatorStore=elevatorStore, action: ActionTypePayload<any, AnyActionName>) =>
            this.reduce(state, action);
    }

    public callFromFloor(state: ElevatorStore, payload: {fromFloor: number, direction: MoveDirection}) {
        const newState = {...state}

        const newQueue = newState.elevators.addTask(payload.fromFloor, false, payload.direction)
        newState.elevators = new ElevatorDispatcher(newState.elevators.elevators)

        return newState
    }

    public callFromElevator(state: ElevatorStore, payload: {toFloor: number, elevatorId: number}) {
        const newState = {...state}


        const newQueue = newState.elevators.addTask(payload.toFloor,  true, "down", payload.elevatorId) // не оч корректно передал сюда дауна
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