import {injectable} from "inversify";
import {ActionTypePayload, AnyActionName, ElevatorStore} from "../../typings/common";
import {elevatorStore} from "./ElevatorStore";


@injectable()
export default class ElevatorReducer {
    public getReducer = () => {
        return (state: ElevatorStore=elevatorStore, action: ActionTypePayload<any, AnyActionName>) =>
            this.reduce(state, action);
    }

    protected reduce = (state: ElevatorStore, action: ActionTypePayload<any, AnyActionName>): ElevatorStore => {
        switch (action.type) {
            default: {
                return state
            }
        }
    }

}