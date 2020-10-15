import {ElevatorStore} from "../../typings/common";
import {ElevatorManager} from "../../services/elevatorManager";


export const elevatorStore: ElevatorStore = {
    elevator: new ElevatorManager()
}