import {Button, Container, Table, TableCell, TableRow} from "semantic-ui-react";
import React from "react";
import {Link} from "react-router-dom";
import {ClientRoutes} from "../../Config/Config";
import BaseTableLayout from "../Base/BaseTableLayout";
import {HeadersBaseSettings} from "../../Typings/TableTypes";
import {data} from "../../data";
import {CompanyDTO, GroupCompanyDTO, PersonalCompanyDTO} from "../../Typings/Common";


export function getButtons(data: GroupCompanyDTO | PersonalCompanyDTO) {
    let url = "#"
    if ("user" in data) {
        url = ClientRoutes.company.get(data.id)
    } else {
        url = ClientRoutes.groupCompany.get(data.id)
    }
    return <>
        <Link to={url}>Статистика </Link>
        <Link to={ClientRoutes.settings.get(data.id)}> <Button icon="settings"/> </Link> </>
}

export function MainPage() {
    const headers: HeadersBaseSettings<PersonalCompanyDTO | GroupCompanyDTO> = new Map()
    headers.set('location', {
        text: "Направление",
    })
    headers.set('date', {text: "Дата действия кампании"})
    headers.set('group', {
            text: "Группа или пользователь",
            emptyDataColumn: true,
            convertFunction: (cellValue: PersonalCompanyDTO | GroupCompanyDTO, columnName) => {
                if ("user" in cellValue) {
                    return cellValue.user.name
                } else {
                    return cellValue.group
                }
            }
        }
    )

    headers.set('label', {
        text: "Пояснение",
        emptyDataColumn: true,
        convertFunction: (cellValue: PersonalCompanyDTO | GroupCompanyDTO, columnName) => {
            if ("user" in cellValue) {
                return cellValue.detail.cause
            } else {
                return cellValue.label
            }
        }
    })
    headers.set('', {text: "Действия", emptyDataColumn: true, convertFunction: getButtons})

    return <Container className="upper">
        <Link to={ClientRoutes.index}>Главная страница</Link>
        <Container textAlign="right">
            <Link to={ClientRoutes.archiveCompany}>Завершенные кампании </Link>
        </Container>

        Запущенные рекламные кампании:

        <BaseTableLayout<CompanyDTO, any> headers={headers} list={data}/>

        <Link to={ClientRoutes.runCompany}>Запустить кампанию вручную </Link>

    </Container>
}