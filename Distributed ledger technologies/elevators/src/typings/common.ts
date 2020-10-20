import {ElevatorManager} from "../services/elevatorManager";

export interface ActionTypePayload<PayloadType, ActionType> {
    type: ActionType;
    payload: PayloadType;
}

export interface ActionTypePure<ActionType> {
    type: ActionType;
}

export type AnyActionName = string



export type ElevatorStore = {
    elevator: ElevatorManager
}

export type MoveDirection = "up" | "down" | "stopped"