import React from "react";
import {myContainer} from "../../config/inversify.config";
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {RootStore} from "../../store";
import {ElevatorAction} from "./ElevatorAction";
import {TYPES} from "../../typings/types";
import Elevator, {IElevator} from "./Elevator";
import {connect} from "react-redux"



function ElevatorContainer(props: IElevator) {
    return <Elevator {...props}/>
}


function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
    const actions = myContainer.get<ElevatorAction>(TYPES.ElevatorAction)

    return {
        dispatch,
        actions: {
            ...bindActionCreators({
                callElevatorFromFloor: actions.callElevatorFromFloor,
                changeElevatorFloor: actions.changeElevatorFloor,
                movingElevator: actions.movingElevator
            }, dispatch)
        }
    }
}

const authAction = (state: RootStore) => {
    return {
        elevators: state.elevator.elevators,

    }
}

export default connect(authAction, mapDispatchToProps)(ElevatorContainer);