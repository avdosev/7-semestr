import {Button, Container, Table, TableCell, TableRow} from "semantic-ui-react";
import React from "react";
import {Link} from "react-router-dom";
import {ClientRoutes} from "../../Config/Config";
import BaseTableLayout from "../Base/BaseTableLayout";
import {HeadersBaseSettings} from "../../Typings/TableTypes";
import {archiveData, data} from "../../data";
import {CompanyDTO, GroupCompanyDTO, PersonalCompanyDTO} from "../../Typings/Common";
import {BaseCompaniesList} from "../BaseCompanysList";



export function MainPage() {

    return <Container className="upper">
        <Link to={ClientRoutes.index}>Главная страница</Link>
        <Container textAlign="right">
            <Link to={ClientRoutes.archiveCompany}>Завершенные кампании </Link>
        </Container>

        Запущенные рекламные кампании:

        <BaseCompaniesList list={archiveData} isArchive={false} />

        <Link to={ClientRoutes.runCompany}>Запустить кампанию вручную </Link>

    </Container>
}