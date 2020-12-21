import React from "react";
import { useParams } from "react-router-dom";
import {
    Card, Container, Grid, GridColumn, GridRow,
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
import {CompanyDTO, PersonalCompanyDetailDTO, PersonalCompanyDTO} from "../../Typings/Common";
import {BooleanViewer} from "../BooleanViewer";


export function PersonalCompany() {
    const { id } = useParams();
    const data = getDataById(id) as PersonalCompanyDTO

    const headers: HeadersBaseSettings<PersonalCompanyDetailDTO> = new Map()

    return <Container className="upper">
        <Header>{data.location}</Header>

        <Header>{data.user.name} </Header>
        <Grid columns={2}>
            <GridRow>
                <GridColumn>
                    Степень вовлеченности:
                    <Progress  percent={15} label={"Зашел на страницу"} />
                </GridColumn>
                <GridColumn>
                    <Card>
                        Дата компании
                        <Input disabled={true} > {data.date} </Input>
                    </Card>
                </GridColumn>
            </GridRow>
        </Grid>




        Рекомендации:
        <Message positive={true}>
            <MessageContent>
                <Icon name="check circle outline" color="green" />
                Алгоритм работает корректно, настройка не требуется.
            </MessageContent>
        </Message>



        Информация о кампании:
        <Table>
            <TableRow>
                <TableCell>
                    Участник рекламной кампании
                </TableCell>
                <TableCell>
                    {data.user.name}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                    Причина
                </TableCell>
                <TableCell>
                    {data.detail.cause}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                    Информация о группе
                </TableCell>
                <TableCell>
                    {data.user.group}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                    Место популярно в его группе?
                </TableCell>
                <TableCell>
                    <BooleanViewer isTrue={data.detail.isPopularInGroup} />

                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                    Сколько процентов группы посещало хотя бы раз это место?
                </TableCell>
                <TableCell>
                    {data.detail.groupAttendancePercent}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                    Посещал ли клиент это место ранее?
                </TableCell>
                <TableCell>
                    <BooleanViewer isTrue={data.detail.wasHere} />
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                    Популярно ли это место среди
                    всех клиентов в это время?
                </TableCell>
                <TableCell>
                    <BooleanViewer isTrue={data.detail.isPopularAtThisTime} />
                </TableCell>
            </TableRow>
        </Table>

    </Container>
}