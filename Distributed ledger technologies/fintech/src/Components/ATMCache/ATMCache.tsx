import {observer} from "mobx-react";
import React from "react";
import {Container, Image} from "semantic-ui-react";
import {ATMStore} from "../ATM/ATMStore";


export interface ICorrectPasswordOperation {
    domainStore: ATMStore
}

@observer
export class ATMCache extends React.Component<ICorrectPasswordOperation> {
    render() {
        const elements: React.ReactElement[] = []
        this.props.domainStore.cache.forEach((count, nominal) => (
            elements.push(<Container textAlign='left'>
                <Image style={{marginTop: '5px'}}  size="tiny" src={`/nominals/${nominal}.jpg`} verticalAlign='middle' /> <span> * {count} </span>
            </Container>)
        ))
        return (elements);
    }
}

