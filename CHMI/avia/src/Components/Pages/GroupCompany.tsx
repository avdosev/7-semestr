import React, {useState} from "react";
import {data, getDataById} from "../../data";
import {Link, useParams} from "react-router-dom";
import {
    Button,
    Card, CardContent, CardHeader,
    Container, Dropdown,
    Grid,
    GridColumn,
    GridRow,
    Header, Icon,
    Image,
    Input, List, ListIcon, ListItem, Message, MessageContent, MessageHeader, MessageItem, MessageList, Statistic,
    Table,
    TableCell, TableHeader, TableHeaderCell,
    TableRow
} from "semantic-ui-react";
import {ClientRoutes} from "../../Config/Config";
import {GroupCompanyDTO} from "../../Typings/Common";
import BaseTableLayout from "../Base/BaseTableLayout";
import {getOptions} from "../../utils";
import {MainHeader} from "../Header";
import {DropdownProps} from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";

export function GroupCompany() {
    const {id} = useParams();
    const [currentCompany, setData] = useState(getDataById(id) as GroupCompanyDTO)

    const [img, setImg] = useState('https://sun9-72.userapi.com/impg/_GupIy0zhpD83QvZ7CHctVFptiY0cYz5XLgLWQ/ZV8ShWeCmZA.jpg?size=556x434&quality=96&proxy=1&sign=3672ba9a4bdd13eed248181d4b17508e&type=album')

    const options = ['без фильтраций', 'по возрасту', 'по гендеру']

    const images = []
    images.push('https://sun9-72.userapi.com/impg/_GupIy0zhpD83QvZ7CHctVFptiY0cYz5XLgLWQ/ZV8ShWeCmZA.jpg?size=556x434&quality=96&proxy=1&sign=3672ba9a4bdd13eed248181d4b17508e&type=album')
    images.push('')
    images.push('https://sun9-71.userapi.com/impg/oXLO6e3T4rWI1onHpk_6N8lKfZ0kLF24-Nwqmg/MPcy8EOpHw4.jpg?size=640x480&quality=96&proxy=1&sign=276da00a1ee7576c55341939bb9543c0&type=album')

    return <Container className="upper">

        <Grid columns={2}>
            <GridRow>
                <GridColumn>
                    <Header>Статистика кампании</Header>
                </GridColumn>
                <GridColumn textAlign="right">
                    <Link to={ClientRoutes.settings.get(id)}>Настройки</Link>
                    <Button style={{marginLeft: '30px'}} content="Завершить кампанию"/>
                </GridColumn>
            </GridRow>
        </Grid>


        <Container textAlign={"center"}>
            <Table className="shadowCard" style={{marginBottom: '40px', marginTop: '30px'}} textAlign={"center"}>
                <TableHeader>
                    <TableHeaderCell>
                        Направление
                    </TableHeaderCell>
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
                        Участники
                    </TableHeaderCell>
                    <TableHeaderCell>
                        Релевантность кампании
                    </TableHeaderCell>

                </TableHeader>
                <TableRow>
                    <TableCell>
                        {currentCompany.location}
                    </TableCell>
                    <TableCell>
                        {currentCompany.group}
                    </TableCell>
                    <TableCell>
                        {currentCompany.date}
                    </TableCell>
                    <TableCell>
                        18 шт.
                    </TableCell>
                    <TableCell>
                        <Link to={ClientRoutes.companyParticipants.get(id)}><Button icon="user"/></Link>
                    </TableCell>
                    <TableCell positive={currentCompany.resulting > 75} negative={currentCompany.resulting < 25}>
                        {currentCompany.resulting < 25 && <Icon name={"warning sign"}/>} {currentCompany.resulting}%
                    </TableCell>
                </TableRow>
            </Table>
        </Container>


        <Grid columns={2}>
            <GridRow columns={2}>
                <GridColumn width={8}>
                    <Card className="shadowCard" fluid={true}>
                        <CardHeader>
                            Показать визуализацию воронки продаж
                            <Dropdown style={{marginLeft: '5px'}} button={true} defaultValue={0}
                                      onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
                                          const val = images[data.value]
                                          setImg(val)
                                      }}
                                      options={getOptions(options)}/>
                        </CardHeader>
                        <CardContent>
                            <Image
                                src={img}/>
                            <Message>
                                <MessageHeader>
                                    Рекомендации
                                </MessageHeader>
                                {
                                    !data[id].settings.isHistoricalVisit && data[id].settings.isGroupVisit &&
                                        <Message positive={true}>Действия не требуются</Message>
                                }
                                <MessageList>

                                    {
                                        data[id].settings.isHistoricalVisit &&
                                        <MessageItem>{currentCompany.group} оформили мало покупок, необходимо отключить
                                            историческое
                                            посещение этого
                                            места для этой группы.
                                            <br/>
                                            <Button size={'tiny'} onClick={() => {
                                                data[id].settings.isHistoricalVisit = false;
                                                setData({
                                                    ...currentCompany,
                                                    settings: {
                                                        ...currentCompany.settings,
                                                        isHistoricalVisit: false
                                                    }
                                                })
                                            }} content="Отключить" positive={true}/>
                                        </MessageItem>
                                    }

                                    {
                                        !data[id].settings.isGroupVisit &&
                                        <MessageItem>{currentCompany.group} мало переходили на предложения, необходимо включить
                                            учет
                                            посещения этого места внутри
                                            группы.
                                            <br/>
                                            <Button size={'tiny'} onClick={() => {
                                                data[id].settings.isGroupVisit = true;
                                                console.log(data)
                                                setData({
                                                    ...currentCompany,
                                                    settings: {
                                                        ...currentCompany.settings,
                                                        isGroupVisit: true
                                                    }
                                                })
                                            }} content="Включить" positive={true}/></MessageItem>
                                    }

                                </MessageList>


                            </Message>

                        </CardContent>
                    </Card>
                </GridColumn>
                <GridColumn>

                    <Card className="shadowCard" fluid={true}>
                        <CardHeader>
                            Статистика покупок билетов:
                        </CardHeader>
                        <CardContent>
                            <Container textAlign={"center"}><Statistic label='Сегодняшние покупки' value='1'/>
                            </Container>

                            <Image
                                src="https://sun9-12.userapi.com/impg/fVqWRxK1_eP7Z64fc61nNyuoxlX6_xuKxf19VA/je4O_1VGaD4.jpg?size=533x397&quality=96&proxy=1&sign=19c6000fe67bcdcff3d4d33f4a762d59&type=album"/>

                            <br/>
                            {/*<Message positive={true}>Сегодня было куплено 1 предложение! </Message>*/}

                        </CardContent>

                    </Card>

                </GridColumn>
            </GridRow>

            <GridRow>
                <GridColumn>
                    <Card className="shadowCard" fluid={true}>
                        <CardHeader>
                            Отношение покупок ко всем отправленным предложениям
                        </CardHeader>
                        <CardContent>
                            <Image
                                src="https://sun7-9.userapi.com/impg/f07vxn__Cl9OPQ03v-HNozB0724U3sqzWkZELg/ItF78iHCm-E.jpg?size=393x290&quality=96&proxy=1&sign=9c2874e76ed4b02e900ac8f436b7404c&type=album"/>

                        </CardContent>
                    </Card>
                </GridColumn>
                <GridColumn>
                    <Card className="shadowCard" fluid={true}>
                        <CardHeader>
                            Покупки билетов среди мужчин и женщин
                        </CardHeader>
                        <CardContent>
                            <Image
                                size={"medium"}
                                src="https://sun9-67.userapi.com/impg/Zi_WASt61BwEwtiJ6wi3V0l7CNmq99iXmSjddw/bBBU8gY-BtM.jpg?size=378x383&quality=96&proxy=1&sign=ea952d397205bca57079c411a7ef89f4&type=album"/>
                            <br/>
                            Женщины совершили меньше покупок.
                        </CardContent>
                    </Card>
                </GridColumn>
            </GridRow>

            <GridRow>

            </GridRow>


        </Grid>

    </Container>
}