import {CompanyDTO, GroupCompanyDTO, PersonalCompanyDTO} from "../../Typings/Common";
import {ClientRoutes} from "../../Config/Config";
import {Link} from "react-router-dom";
import {Button, Container} from "semantic-ui-react";
import React from "react";
import {BaseCompaniesList} from "../BaseCompanysList";
import {data} from "../../data";


export function ArchiveCompany() {

    return <Container className="upper">
        <Link to={ClientRoutes.index}>Главная страница</Link>

        <Container>
        Завершенные рекламные кампании:
        </Container>
        <BaseCompaniesList list={data} isArchive={true} />

    </Container>
}

