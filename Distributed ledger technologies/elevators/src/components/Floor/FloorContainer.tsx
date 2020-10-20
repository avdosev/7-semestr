import React from "react";
import {myContainer} from "../../config/inversify.config";
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {RootStore} from "../../store";
import {ElevatorAction} from "../Elevator/ElevatorAction";
import {TYPES} from "../../typings/types";
import {Floor} from "./Floor";
import {connect} from "react-redux"



function FloorContainer(props: any) {
    return <Floor {...props}/>
}


function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
    const actions = myContainer.get<ElevatorAction>(TYPES.ElevatorAction)

    return {
        dispatch,
        actions: {
            ...bindActionCreators({
                callElevatorFromFloor: actions.callElevatorFromFloor,
                changeElevatorFloor: actions.changeElevatorFloor
            }, dispatch)
        }
    }
}

const authAction = (state: RootStore) => {
    return {
        elevator: state.elevator.elevator
    }
}

export default connect(authAction, mapDispatchToProps)(FloorContainer);