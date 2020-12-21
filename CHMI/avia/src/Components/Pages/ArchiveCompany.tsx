import {CompanyDTO, GroupCompanyDTO, PersonalCompanyDTO} from "../../Typings/Common";
import {ClientRoutes} from "../../Config/Config";
import {Link} from "react-router-dom";
import {Button, Container} from "semantic-ui-react";
import {HeadersBaseSettings} from "../../Typings/TableTypes";
import BaseTableLayout from "../Base/BaseTableLayout";
import {archiveData} from "../../data";
import React from "react";
import {BaseCompaniesList} from "../BaseCompanysList";


export function ArchiveCompany() {

    return <Container className="upper">
        <Link to={ClientRoutes.index}>Главная страница</Link>

        Завершенные рекламные кампании:
        <BaseCompaniesList list={archiveData} isArchive={true} />

    </Container>
}

