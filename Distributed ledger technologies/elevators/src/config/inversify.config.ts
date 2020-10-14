import "reflect-metadata";
import {Container} from "inversify";
import {TYPES} from "../typings/types";
import {ElevatorAction} from "../components/Elevator/ElevatorAction";
import ElevatorReducer from "../components/Elevator/ElevatorReducer";



const myContainer = new Container();

myContainer.bind(TYPES.ElevatorAction).to(ElevatorAction)
myContainer.bind(TYPES.ElevatorReducer).to(ElevatorReducer)

export { myContainer }