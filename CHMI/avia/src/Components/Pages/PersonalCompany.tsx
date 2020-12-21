import React from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    Header,
    Icon,
    Input,
    Message,
    MessageContent,
    Progress,
    Table,
    TableCell,
    TableRow
} from "semantic-ui-react";
import {getDataById} from "../../data";
import BaseTableLayout from "../Base/BaseTableLayout";
import {HeadersBaseSettings} from "../../Typings/TableTypes";
import {CompanyDTO, PersonalCompanyDetailDTO} from "../../Typings/Common";


const personalData: PersonalCompanyDetailDTO[] = [
    {
        name: 'Петров Петр Петрович',
        cause: 'Клиент просматривал билеты на агрегаторах на это направление',
        group: "Юрист",
        groupAttendancePercent: 7,
        isPopularAtThisTime: true,
        isPopularInGroup: false,
        wasHere: false,
    }
]

export function PersonalCompany() {
    const { id } = useParams();
    const data = getDataById(id)

    const headers: HeadersBaseSettings<PersonalCompanyDetailDTO> = new Map()

    return <>
        <Header>{data.location}</Header>

        Степень вовлеченности:
        <Progress  percent={15} label={"Зашел на страницу"} />


        Рекомендации:
        <Message positive={true}>
            <MessageContent>
                <Icon name="check circle outline" color="green" />
                Алгоритм работает корректно, настройка не требуется.
            </MessageContent>
        </Message>
        <Card>
            Дата компании
            <Input disabled={true} > {data.date} </Input>
        </Card>


        Информация о кампании:
        <Table>
            <TableRow>
                <TableCell>
                    Участник рекламной кампании
                </TableCell>
            </TableRow>
        </Table>

    </>
}