import {injectable} from "inversify";
import {MoveDirection} from "../../typings/common";

@injectable()
export class ElevatorAction {
    public changeElevatorFloor = (toFloor: number) => ({
        type: "CHANGE_ELEVATOR_FLOOR_IN_ELEVATOR",
        payload: {
            toFloor
        }
    })

    public callElevatorFromFloor = (fromFloor: number, direction: MoveDirection) => ({
        type: "CALL_ELEVATOR_FROM_FLOOR",
        payload: {
            fromFloor, direction
        }
    })

    public movingElevator = () => ({
        type: "MOVING_ELEVATOR",
        payload: {
        }
    })
}
