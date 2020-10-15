import React from "react";
import {myContainer} from "../../config/inversify.config";
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {RootStore} from "../../store";
import {ElevatorAction} from "./ElevatorAction";
import {TYPES} from "../../typings/types";
import Elevator from "./Elevator";
import {connect} from "react-redux"



function ElevatorContainer(props: any) {
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
        elevator: state.elevator.elevator
    }
}

export default connect(authAction, mapDispatchToProps)(ElevatorContainer);