import {ElevatorManager} from "../services/ElevatorManager";
import {ElevatorDispatcher} from "../services/ElevatorDispatcher";

export interface ActionTypePayload<PayloadType, ActionType> {
    type: ActionType;
    payload: PayloadType;
}

export interface ActionTypePure<ActionType> {
    type: ActionType;
}

export type AnyActionName = string



export type ElevatorStore = {
    elevators: ElevatorDispatcher
}

export type MoveDirection = "up" | "down" | "stopped"