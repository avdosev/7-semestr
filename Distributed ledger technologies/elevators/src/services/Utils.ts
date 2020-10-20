import {MoveDirection} from "../typings/common";


export function getDirection(currentFloor: number, toFloor: number): MoveDirection {
    return currentFloor < toFloor ? "up" : "down"
}