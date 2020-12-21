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
                    Участник рекламной кампании
                </TableCell>
                <TableCell>
                    {data.user}
                </TableCell>
            </TableRow>
        </Table>

    </Container>
}