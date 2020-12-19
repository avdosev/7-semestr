import React from "react";
import {Header, Input, Progress} from "semantic-ui-react";


export function PersonalCompany() {
    return <>
        <Header>Россия-Испания</Header>

        <Progress percent={15} />
        Зашел на страницу

        Дата начала компании
        <Input disabled={true} > 20.12.2020 </Input>

        Информация о кампании:
    </>
}