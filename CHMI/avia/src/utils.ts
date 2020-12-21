import {DropdownItemProps} from "semantic-ui-react";

export const getOptions = (list: Array<string | number>): Array<DropdownItemProps> =>
    list.map((item, id) =>
        ({text: item, value: id}))

export const getStringOptions = (list: Array<string | number>): Array<DropdownItemProps> =>
    list.map((item, id) =>
        ({text: item, value: item}))


export const getDefaultValues = <T>(list: Array<T>, comparableList: Array<T>)  => {
    return list.filter(x => comparableList.includes(x))
}
