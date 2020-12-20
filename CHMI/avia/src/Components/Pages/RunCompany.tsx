import React from "react";
import {Checkbox, Dropdown, Input, Table, TableCell} from "semantic-ui-react";

const directions = [
    {
        key: 'Jenny Hess',
        text: 'Россия-Чехия',
        value: 'Jenny Hess',
    },

]

export function RunCompany() {
    return <>
        <Table>
            <TableCell>
                <Dropdown options={directions} />
            </TableCell>
            <TableCell>
                <Input />
                <Input />
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

    </>
}