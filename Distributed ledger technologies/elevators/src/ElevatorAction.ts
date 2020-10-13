
export class ElevatorAction {
    public changeElevatorFloor = (toFloor: number) => ({
        type: "CHANGE_ELEVATOR_FLOOR_IN_ELEVATOR",
        payload: {
            toFloor
        }
    })

    public callElevatorFromFloor = (fromFloor: number) => ({
        type: "CALL_ELEVATOR_FROM_FLOOR",
        payload: {
            fromFloor
        }
    })
}
