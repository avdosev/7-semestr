import React from "react";
import {Checkbox, Container, Dropdown, Input, Table, TableCell} from "semantic-ui-react";

const directions = [
    {
        key: 'Россия-Чехия',
        text: 'Россия-Чехия',
        value: 'Россия-Чехия',
    },

]

export function RunCompany() {
    return <Container className="upper">
        <Table>
            <TableCell>
                <Dropdown options={directions} />
            </TableCell>
            <TableCell>
                <Input type={'date'} />
                <Input type={'date'} />
            </TableCell>
            <TableCell>
                <Dropdown />
                <Checkbox />
                <Dropdown />
            </TableCell>
            <TableCell>
                <Input />
            </TableCell>
        </Table>

    </Container>
}