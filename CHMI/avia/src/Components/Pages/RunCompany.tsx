import React from "react";
import {Checkbox, Dropdown, Input, Table, TableCell} from "semantic-ui-react";

export function RunCompany() {
    return <>
        <Table>
            <TableCell>
                <Dropdown />
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