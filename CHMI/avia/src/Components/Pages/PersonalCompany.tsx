import React from "react";
import { useParams } from "react-router-dom";
import {Card, Header, Input, Progress} from "semantic-ui-react";
import {getDataById} from "../../data";
import BaseTableLayout from "../Base/BaseTableLayout";
import {HeadersBaseSettings} from "../../Typings/TableTypes";
import {CompanyDTO} from "../../Typings/Common";



export function PersonalCompany() {
    const { id } = useParams();
    const data = getDataById(id)

    const headers: HeadersBaseSettings<CompanyDTO> = new Map()

    return <>
        <Header>{data.location}</Header>

        Степень вовлеченности:
        <Progress  percent={15} label={"Зашел на страницу"} />


        Рекомендации:


        <Card>
            Дата компании
            <Input disabled={true} > {data.date} </Input>
        </Card>


        Информация о кампании:

        <BaseTableLayout<CompanyDTO, any> headers={headers} />

    </>
}