export interface ActionTypePayload<PayloadType, ActionType> {
    type: ActionType;
    payload: PayloadType;
}

export interface ActionTypePure<ActionType> {
    type: ActionType;
}

export type AnyActionName = string



export type ElevatorStore = {

}