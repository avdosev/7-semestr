import {injectable} from "inversify";
import {MoveDirection} from "../../typings/common";

@injectable()
export class ElevatorAction {
    public changeElevatorFloor = (elevatorId: number, toFloor: number) => ({
        type: "CHANGE_ELEVATOR_FLOOR_IN_ELEVATOR",
        payload: {
            toFloor, elevatorId
        }
    })

    public callElevatorFromFloor = (fromFloor: number, direction: MoveDirection) => ({
        type: "CALL_ELEVATOR_FROM_FLOOR",
        payload: {
            fromFloor, direction
        }
    })

    public movingElevator = (elevatorId: number) => ({
        type: "MOVING_ELEVATOR",
        payload: {
            elevatorId
        }
    })
}
