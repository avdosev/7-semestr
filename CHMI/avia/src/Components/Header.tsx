import {Link} from "react-router-dom";
import {ClientRoutes} from "../Config/Config";
import {Container} from "semantic-ui-react";
import React from "react";


export function MainHeader() {
    return <div style={{marginBottom: '20px', marginTop: '10px'}}>
        <Container>
            <Link to={ClientRoutes.index}>Главная страница</Link>

        </Container>
        < hr />
    </div>
}