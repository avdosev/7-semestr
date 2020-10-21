import {ElevatorStore} from "../../typings/common";
import {ElevatorManager} from "../../services/ElevatorManager";
import {ElevatorDispatcher} from "../../services/ElevatorDispatcher";
import {elevatorsCount} from "../../config/config";


export const elevatorStore: ElevatorStore = {
    elevators: new ElevatorDispatcher([], elevatorsCount)
}