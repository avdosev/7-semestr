import {Table, TableCell, TableRow} from "semantic-ui-react";
import React from "react";
import { Link } from "react-router-dom";
import {ClientRoutes} from "../../Config/Config";

export function MainPage() {
    return <>
        Запущенные рекламные кампании:
        <Link to={ClientRoutes.index} />
        <Table>
            <TableRow>
                <TableCell>
                    россия-чехия
                </TableCell>
                <TableCell>
                    20 декабря
                </TableCell>
            </TableRow>
        </Table>
    </>
}