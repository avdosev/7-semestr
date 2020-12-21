import React from "react";
import {useParams} from "react-router-dom";
import {getDataById} from "../../data";
import {Container, Header} from "semantic-ui-react";
import BaseTableLayout from "../Base/BaseTableLayout";
import {GroupCompanyDTO, UserInCompany} from "../../Typings/Common";
import {HeadersBaseSettings} from "../../Typings/TableTypes";



export function CompanyParticipants() {
    const { id } = useParams();
    const data = getDataById(id) as GroupCompanyDTO

    const headers: HeadersBaseSettings<UserInCompany> = new Map()
    headers.set('name', {text: "Пользователь"})
    headers.set('degreeOfInvolvement', {text: "Степерь вовлеченности"})
    headers.set('group', {text: "Группа"})

    return <Container className="upper">
        <Header>{data.location}</Header>
        Участники рекламной кампании:
        <BaseTableLayout<UserInCompany, any> headers={headers} list={data.participants} />
    </Container>
}