import React, {useState} from "react";
import {Button, Checkbox, Container, Dropdown, Input, Tab, Table, TableCell, TableRow} from "semantic-ui-react";
import {getOptions} from "../../utils";
import {groups, users} from "../../data";
import {MainHeader} from "../Header";


const directions = getOptions(['Россия-Чехия', 'Россия-Испания'])

export function RunCompany() {
    const usernames = users.map((user) => user.name)
    const selectableUsers = getOptions(usernames)

    const selectableGroups = getOptions(groups)

    const [isCreatingForUser, setCreatingOption] = useState(0)


    return <Container className="upper">

        <Table>
            <TableRow>
                <TableCell width={3}>
                    Направление
                </TableCell>
                <TableCell>
                    Дата действия кампании
                </TableCell>
                <TableCell>
                    Группа или пользователь
                </TableCell>
                <TableCell>
                    Пояснение
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                    <Dropdown options={directions} defaultValue={0} />
                </TableCell>
                <TableCell>
                    Дата начала
                    <br />
                    <Input type={'date'}  />
                    <br />
                    Дата окончания
                    <Input type={'date'} />
                </TableCell>
                <TableCell>
                    <Dropdown options={selectableGroups} defaultValue={0}  />
                    <br />
                    <Checkbox
                        onChange={(event, data) => setCreatingOption(data.checked)}
                        label="Конкретный пользователь"
                    />
                    <Dropdown disabled={!isCreatingForUser} options={selectableUsers} defaultValue={0} />
                </TableCell>
                <TableCell>
                    <Input />
                </TableCell>
            </TableRow>

        </Table>

        <Button content="Запустить кампанию" positive={true} />
    </Container>
}