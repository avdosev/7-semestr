import {CompanyDTO, GroupCompanyDTO, PersonalCompanyDTO, User} from "./Typings/Common";

export const users: User[] = [
    {
        id: 1,
        name: "Иванов Иван Иванович mail@mail.ru",
        group: "Менеджеры"
    },
    {
        id: 2,
        name: "Петров Петр Петрович yandex@mail.ru",
        group: "Менеджеры"
    },
]

export const data: Array<PersonalCompanyDTO | GroupCompanyDTO>  = [
    {
        id: 1,
        location: "Россия-Чехия",
        date : "20 декабря - 8 января",
        group: "Менеджеры среднего звена",
        label: "Участники этой группы часто используют это направление в это время",
        participants: [
            ...users.map((user) => ({...user, degreeOfInvolvement:  "Зашел на сайт"}))
        ]
    },
    {
        id: 2,
        location: "Россия-Испания",
        date : "20 декабря - 8 января",
        user: {...users[1],  degreeOfInvolvement:  "Зашел на сайт"},
        label: "Клиент просматривал билеты на агрегаторах на это направление",
    },
    {
        id: 3,
        location: "Россия-Куба",
        date: "22 декабря - 1 января",
        user: {...users[0],  degreeOfInvolvement:  "Зашел на сайт"},
        label: "Клиент просматривал билеты на много направлений, а также летал в прошлом году в это время на это направление",
    }
]

export const getDataById = (id: number) => {
    return data.find(el => el.id == id)
}