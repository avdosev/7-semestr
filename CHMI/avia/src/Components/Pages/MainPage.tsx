import {Button, Container, Table, TableCell, TableRow} from "semantic-ui-react";
import React from "react";
import {Link} from "react-router-dom";
import {ClientRoutes} from "../../Config/Config";
import {BaseCompaniesList} from "../BaseCompanysList";
import {data} from "../../data";



export function MainPage() {

    return <Container className="upper">
        <Link to={ClientRoutes.index}>Главная страница</Link>
        <Container textAlign="right">
            <Link to={ClientRoutes.archiveCompany}>Завершенные кампании </Link>
        </Container>

        Запущенные рекламные кампании:

        <BaseCompaniesList list={data} isArchive={false} />

        <Link to={ClientRoutes.runCompany}>Запустить кампанию вручную </Link>

    </Container>
}