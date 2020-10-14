import {combineReducers, } from 'redux';
import {TYPES} from "../typings/types";
import {myContainer} from "../config/inversify.config";
import {ElevatorAction} from "../components/Elevator/ElevatorAction";
import ElevatorReducer from "../components/Elevator/ElevatorReducer";

const elevator = myContainer.get<ElevatorReducer>(TYPES.ElevatorReducer)

const createRootReducer = () => combineReducers({
    elevator: elevator.getReducer(),
});


export default createRootReducer
