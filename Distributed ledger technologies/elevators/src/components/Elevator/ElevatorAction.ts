import {injectable} from "inversify";
import {ActionTypePayload, MoveDirection} from "../../typings/common";
import {ElevatorCallPayload, ElevatorIdPayload, FloorCallPayload} from "../../typings/elevatorsActionTypes";
import {
    CALL_ELEVATOR_FROM_FLOOR,
    CHANGE_ELEVATOR_FLOOR_IN_ELEVATOR,
    ELEVATOR_TYPES,
    MOVING_ELEVATOR
} from "../../typings/actionNames";

@injectable()
export class ElevatorAction {
    public changeElevatorFloor = (elevatorId: number, toFloor: number): ActionTypePayload<ElevatorCallPayload, ELEVATOR_TYPES> => ({
        type: CHANGE_ELEVATOR_FLOOR_IN_ELEVATOR,
        payload: {
            toFloor, elevatorId
        }
    })

    public callElevatorFromFloor = (fromFloor: number, direction: MoveDirection): ActionTypePayload<FloorCallPayload, ELEVATOR_TYPES> => ({
        type: CALL_ELEVATOR_FROM_FLOOR,
        payload: {
            fromFloor, direction
        }
    })

    public movingElevator = (elevatorId: number): ActionTypePayload<ElevatorIdPayload, ELEVATOR_TYPES> => ({
        type: MOVING_ELEVATOR,
        payload: {
            elevatorId
        }
    })
}
