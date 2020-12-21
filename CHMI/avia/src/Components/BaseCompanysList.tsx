import {HeadersBaseSettings} from "../Typings/TableTypes";
import {CompanyDTO, GroupCompanyDTO, PersonalCompanyDTO} from "../Typings/Common";
import BaseTableLayout from "./Base/BaseTableLayout";
import {archiveData} from "../data";
import {Button, Container} from "semantic-ui-react";
import React from "react";
import {ClientRoutes} from "../Config/Config";
import {Link} from "react-router-dom";

export const getButtons = (isArchive: boolean) => (data: GroupCompanyDTO | PersonalCompanyDTO) => {
    let url = "#"
    if ("user" in data) {
        url = ClientRoutes.company.get(data.id)
    } else {
        url = ClientRoutes.groupCompany.get(data.id)
    }
    return <>
        <Link to={url}>Статистика </Link>
        {!isArchive && <Link to={ClientRoutes.settings.get(data.id)}> <Button icon="settings"/> </Link>}
    </>
}


export function BaseCompaniesList(props: {isArchive: boolean, list: Array<PersonalCompanyDTO | GroupCompanyDTO>}) {
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
    headers.set('', {text: "Действия", emptyDataColumn: true, convertFunction: getButtons(props.isArchive)})

    return <BaseTableLayout<CompanyDTO, any> headers={headers} list={props.list}/>

}