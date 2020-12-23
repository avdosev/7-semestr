import {Link} from "react-router-dom";
import {ClientRoutes} from "../Config/Config";
import {Container} from "semantic-ui-react";
import React from "react";


export function MainHeader() {
    return <Container style={{marginBottom: '20px'}}>
        <Link to={ClientRoutes.index}>Главная страница</Link>
        < hr />
    </Container>
}