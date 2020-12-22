import {HeadersBaseSettings} from "../Typings/TableTypes";
import {CompanyDTO, GroupCompanyDTO, PersonalCompanyDTO} from "../Typings/Common";
import BaseTableLayout from "./Base/BaseTableLayout";
import {Button, Container, Icon} from "semantic-ui-react";
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
    let settingsColor = null
    if (data.resulting < 25 ) {
        settingsColor = {color: "red"}
    }
    return <>
        <Link to={url}>Статистика </Link>
        {!isArchive && <Link to={ClientRoutes.settings.get(data.id)}> <Button {...settingsColor} icon="settings"/> </Link>}
    </>
}


export function BaseCompaniesList(props: { isArchive: boolean, list: Array<PersonalCompanyDTO | GroupCompanyDTO> }) {
    const headers: HeadersBaseSettings<PersonalCompanyDTO | GroupCompanyDTO> = new Map()

    headers.set('resulting', {
        text: "Успех кампании",
        cellProps: ((cellValue: number) => {
            return {positive: cellValue > 75, negative: cellValue < 25,}
        }),
        convertFunction: (cellValue, columnName) => {

            return <>{cellValue < 25 && <Icon name={"warning sign"}/>} {cellValue}</>
        }
    })

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

    headers.set('', {
        text: "Действия",
        emptyDataColumn: true,
        convertFunction: getButtons(props.isArchive)
    })
    const archiveList = props.list.filter((el) => props.isArchive ? el.archive : !el.archive)

    return <BaseTableLayout<CompanyDTO, any> headers={headers} list={archiveList}/>

}