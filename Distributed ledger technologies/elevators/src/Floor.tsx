import React from "react";
import {Button} from "semantic-ui-react";

export class Floor extends React.Component<any, any>{
    render() {
        return <>
            <Button icon="arrow alternate circle up" />
            <Button icon="arrow alternate circle down" />
            </>;
    }
}