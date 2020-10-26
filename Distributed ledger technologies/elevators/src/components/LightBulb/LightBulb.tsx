import React from "react";


export interface ILightBulb {
    currentFloor: number
}

export default class LightBulb extends React.Component<ILightBulb> {

    render() {
        return <>{this.props.currentFloor} </>;
    }
}