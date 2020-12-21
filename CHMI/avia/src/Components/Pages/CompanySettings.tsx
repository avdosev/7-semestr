import React from "react";
import { useParams } from "react-router-dom";
import {
    Card, Container, Form, Grid, GridColumn, GridRow,
    Header,
    Icon,
    Input,
    Message,
    MessageContent,
    Progress, Radio,
    Table,
    TableCell,
    TableRow
} from "semantic-ui-react";
import {getDataById} from "../../data";
import BaseTableLayout from "../Base/BaseTableLayout";
import {HeadersBaseSettings} from "../../Typings/TableTypes";
import {CompanyDTO, PersonalCompanyDetailDTO} from "../../Typings/Common";



export function CompanySettings() {
    const { id } = useParams();
    const data = getDataById(id)

    const headers: HeadersBaseSettings<PersonalCompanyDetailDTO> = new Map()

    return <Container className="upper">
        <Header>{data.location}</Header>

        <Grid columns={2}>
            <GridRow>
                <GridColumn>
                    <Header as={'h4'}>{data.group} </Header>
                </GridColumn>
                <GridColumn>
                    <Card>
                        Дата кампании
                        <Input>{data.date} </Input>
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


        Настройки алгоритма (изменять на свой риск, может повлиять на действия клиента)
        <Form className="checkboxFormFields">
            <Form.Field>
                <Radio
                    label='Учитывать историческое посещение этого места'
                    name='radioGroup'
                    value=""
                />
            </Form.Field>
            <Form.Field>
                <Radio
                    label='Не учитывать'
                    name='radioGroup'
                    value=''
                />
            </Form.Field>
        </Form>

        <Form className="checkboxFormFields">
            <Form.Field>
                <Radio
                    label='Учитывать посещение этого места внутри группы'
                    name='radioGroup'
                    value=""
                />
            </Form.Field>
            <Form.Field>
                <Radio
                    label='Не учитывать'
                    name='radioGroup'
                    value=''
                />
            </Form.Field>
        </Form>

        <Form className="checkboxFormFields">
            <Form.Field>
                <Radio
                    label='Анализировать  поиск по агрегаторам'
                    name='radioGroup'
                    value=""
                />
            </Form.Field>
            <Form.Field>
                <Radio
                    label='Не учитывать'
                    name='radioGroup'
                    value=''
                />
            </Form.Field>
        </Form>

        <Form className="checkboxFormFields">
            <Form.Field>
                <Radio
                    label='Включить подтверждение'
                    name='radioGroup'
                    value=""
                />
            </Form.Field>
            <Form.Field>
                <Radio
                    label='Выключить, подтверждение не требуется'
                    name='radioGroup'
                    value=''
                />
            </Form.Field>
        </Form>

    </Container>
}