import React from "react";
import {getDataById} from "../../data";
import {Link, useParams} from "react-router-dom";
import {
    Button,
    Card, CardContent, CardHeader,
    Container, Dropdown,
    Grid,
    GridColumn,
    GridRow,
    Header,
    Image,
    Input, List, ListIcon, ListItem, Message, MessageContent, MessageHeader, MessageItem, MessageList,
    Table,
    TableCell, TableHeader, TableHeaderCell,
    TableRow
} from "semantic-ui-react";
import {ClientRoutes} from "../../Config/Config";
import {GroupCompanyDTO} from "../../Typings/Common";
import BaseTableLayout from "../Base/BaseTableLayout";
import {getOptions} from "../../utils";

export function GroupCompany() {
    const {id} = useParams();
    const data = getDataById(id) as GroupCompanyDTO
    console.log(data)

    return <Container className="upper">
        {/*Статистика кампании*/}
        <Grid columns={2}>
            <GridRow>
                <GridColumn>
                    <Header>{data.location} </Header>
                </GridColumn>
                <GridColumn>
                    <Link to={ClientRoutes.companyParticipants.get(id)}>Посмотреть участников кампании</Link>
                </GridColumn>
            </GridRow>
            <GridRow>
                <Table>
                    <TableHeader>
                        <TableHeaderCell>
                            Группа
                        </TableHeaderCell>
                        <TableHeaderCell>
                            Дата проведения компании
                        </TableHeaderCell>
                        <TableHeaderCell>
                            Куплено предложений
                        </TableHeaderCell>
                        <TableHeaderCell>
                            Релевантность кампании
                        </TableHeaderCell>
                        <TableHeaderCell>
                            Успешность кампании
                        </TableHeaderCell>
                    </TableHeader>
                    <TableRow>
                        <TableCell>
                            {data.group}
                        </TableCell>
                        <TableCell>
                            {data.date}
                        </TableCell>
                        <TableCell>
                            18 шт.
                        </TableCell>
                        <TableCell>
                            Низкая
                        </TableCell>
                        <TableCell positive={data.resulting > 75} negative={data.resulting < 25}>
                            {data.resulting}%
                        </TableCell>
                    </TableRow>
                </Table>
            </GridRow>

            <GridRow columns={2}>
                <GridColumn width={8}>
                    <Card fluid={true} >
                        <CardHeader>
                            Визуализации воронки для каждой группы
                        </CardHeader>
                        <CardContent>
                            <Image
                                src="https://sun9-75.userapi.com/impg/wKVCGuHI6qhso8znxNfkF_0nY0EigisSC_drcw/O-28uiXH-JE.jpg?size=482x313&quality=96&proxy=1&sign=7f2bcf4283acc0c4c2b94600786d9366&type=album"/>
                            <Message>
                                <MessageHeader>
                                    Рекомендации
                                </MessageHeader>
                                <MessageList>
                                    <MessageItem>Разработчики оформили мало покупок, необходимо отключить историческое посещение этого
                                        места для этой группы.<Button content="Отключить" positive={true}/></MessageItem>
                                    <MessageItem>Сварщики мало переходили на предложения, необходимо включить учет посещения этого места внутри
                                        группы.<Button content="Включить" positive={true}/></MessageItem>
                                </MessageList>


                            </Message>

                        </CardContent>
                    </Card>

                </GridColumn>
                <GridColumn>
                    <Card>
                        <CardHeader>
                            Отношение покупок ко всем отправленным предложениям
                        </CardHeader>
                        <CardContent>
                            <Image
                                src="https://sun7-9.userapi.com/impg/f07vxn__Cl9OPQ03v-HNozB0724U3sqzWkZELg/ItF78iHCm-E.jpg?size=393x290&quality=96&proxy=1&sign=9c2874e76ed4b02e900ac8f436b7404c&type=album"/>

                        </CardContent>

                    </Card>
                </GridColumn>


            </GridRow>

            <GridRow>
                <GridColumn>
                    <Card>
                        Сегодня было куплено 1 предложение!
                    </Card>
                </GridColumn>
                <GridColumn>
                    <Card>
                        <CardHeader>
                            Отношение покупок от времени
                        </CardHeader>
                        <CardContent>
                            <Image
                                src="https://sun7-9.userapi.com/impg/f07vxn__Cl9OPQ03v-HNozB0724U3sqzWkZELg/ItF78iHCm-E.jpg?size=393x290&quality=96&proxy=1&sign=9c2874e76ed4b02e900ac8f436b7404c&type=album"/>

                        </CardContent>

                    </Card>
                </GridColumn>
            </GridRow>

        </Grid>

    </Container>
}