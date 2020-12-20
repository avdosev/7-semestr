import React from "react";
import {ButtonProps} from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import {SemanticWIDTHS, StrictTableCellProps} from "semantic-ui-react";


export interface HeaderName<DTO=any> {
    width?: SemanticWIDTHS
    text: string,
    cellProps?: (cellValue: any /*DTO | DTO[keyof DTO]*/) => StrictTableCellProps
    emptyDataColumn?: boolean // если подано это значение, то в convert function будет передено не текущее значение столбца, а вся строка
    convertFunction?: (cellValue: any /*DTO | DTO[keyof DTO]*/, columnName: keyof DTO) => React.ReactElement | string
}

export type Key<T> = keyof T

export type HeadersBaseSettings<T> = Map<Key<T> | "", HeaderName<T>>
