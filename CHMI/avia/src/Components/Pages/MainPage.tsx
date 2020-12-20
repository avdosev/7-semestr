import {Button, Table, TableCell, TableRow} from "semantic-ui-react";
import React from "react";
import { Link } from "react-router-dom";
import {ClientRoutes} from "../../Config/Config";
import BaseTableLayout from "../Base/BaseTableLayout";
import {HeadersBaseSettings} from "../../Typings/TableTypes";
import {data} from "../../data";
import {CompanyDTO} from "../../Typings/Common";



export function getButtons(data: CompanyDTO) {
    return <> <Link to={ClientRoutes.statistic.get(data.id)} >Статистика </Link> <Button icon="settings" /> </>
}

export function MainPage() {
    const headers: HeadersBaseSettings<CompanyDTO> = new Map()
    headers.set('location', {text: "Направление"})
    headers.set('date',  {text: "Дата действия кампании"})
    headers.set('group',  {text: "Группа или пользователь"})
    headers.set('label',  {text: "Пояснение"})
    headers.set('',  {text: "Пояснение", emptyDataColumn: true, convertFunction: getButtons})

    return <>
        Запущенные рекламные кампании:
        <Link to={ClientRoutes.index} >Главная страница</Link>
        <Link to={ClientRoutes.archiveCompany} >Завершенные кампании </Link>

        <BaseTableLayout<CompanyDTO, any> headers={headers} list={data}/>

        <Link to={ClientRoutes.runCompany} >Запустить кампанию вручную </Link>

    </>
}