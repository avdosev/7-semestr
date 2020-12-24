import React, {ReactNode} from "react";
import {Card, StrictTableCellProps, StrictTableProps, StrictTableRowProps, Table} from "semantic-ui-react";
import {HeadersBaseSettings} from "../../Typings/TableTypes";
import {ButtonProps} from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import {convert, getCellProps, getMappingForCell} from "./BaseTableUtils";


export interface IBaseTableLayout<T> {
    list?: Array<T>
    headers: HeadersBaseSettings<T>
    strictTableProps?: StrictTableProps
    rowProps?: (entity: T) => StrictTableRowProps
}


class BaseTableLayout<T, U extends IBaseTableLayout<T>> extends React.Component<U> {

    public render(): React.ReactElement {
        return (
            <Table className="shadowCard"  celled={true} {...this.props.strictTableProps} >
                <Table.Header><Table.Row>{this.renderHeaders(this.props.headers)}</Table.Row></Table.Header>
                <Table.Body>{this.renderBody(this.props.list)}</Table.Body>
            </Table>
        )
    }

    protected renderHeaders = (headerNames: HeadersBaseSettings<T>): ReactNode => {
        const headerElements: Array<JSX.Element> = []

        headerNames.forEach((header, name) => {

            let widthParam = null
            if (header.width) {
                widthParam = {width: header.width}
            }

            headerElements.push(<Table.HeaderCell {...widthParam} key={name.toString()}>
                {header.text}
            </Table.HeaderCell>)
        })
        return headerElements
    }


    protected renderBody = (records?: Array<any>): ReactNode =>
        records?.map((item: any, index: number) => {
            const {id, ...itemData} = item;

            const mappedFields = getMappingForCell(this.props.headers) // TODO проверить, правильно ли инициализирован
            const rowProps = this.props.rowProps && this.props.rowProps(item)

            return (
                <Table.Row {...rowProps}  key={id.toString()}>

                    {mappedFields.map((nameOfField: any) => this.renderCell(item, nameOfField, id))}

                </Table.Row>
            );
        });

    protected renderCell = (item: any, column: keyof T, rowId: number): ReactNode => {
        const cellValue = item[column];

        const convertedValue = convert(this.props.headers, column, cellValue, item) // работает не так уж долго, как я думал
        const cellProps = getCellProps(this.props.headers, column, cellValue, item)

        return (
            <Table.Cell {...cellProps} key={`${rowId}.${column}`}>
                {convertedValue}
            </Table.Cell>
        )
    }

}

export default BaseTableLayout