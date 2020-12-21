import {CompanyDTO, GroupCompanyDTO, PersonalCompanyDetailDTO, PersonalCompanyDTO, User} from "./Typings/Common";

export const degreesOfInvolvement = [
    "Посмотрел предложение",
    "Зашел на сайт",
    "Открыта оплата",
    "Оформил покупку"
]

export const getRandomInvolvement = () => {
    return degreesOfInvolvement[Math.floor(Math.random() * degreesOfInvolvement.length)];
}


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
    {
        id: 3,
        name: "Смирнов Константин Петрович yandex@mail.ru",
        group: "Разработчики"
    }
]

export const groups = [
    "Нефтянники",
    "Менеджеры среднего звена",
    "Разработчики",
    "Сварщики",
]

export const data: Array<PersonalCompanyDTO | GroupCompanyDTO>  = [
    {
        id: 1,
        location: "Россия-Чехия",
        archive: true,
        date : "10 июля 2020 - 10 августа  2020",
        group: "Нефтянники",
        label: "Участники этой группы часто используют это направление в это время",
        participants: [
            ...users.map((user) => ({...user, degreeOfInvolvement: getRandomInvolvement()}))
        ]
    },
    {
        id: 2,
        location: "Россия-Испания",
        archive: true,
        date : "20 сентября 2020 - 8 октября 2020",
        user: {...users[2],  degreeOfInvolvement: getRandomInvolvement()},
        detail: {
            cause: 'Клиент просматривал билеты на агрегаторах на это направление',
            groupAttendancePercent: 7,
            isPopularAtThisTime: true,
            isPopularInGroup: false,
            wasHere: false,
        },
    },
    {
        id: 3,
        location: "Россия-Куба",
        date: "1 декабря 2020 - 20 декабря 2020",
        archive: true,
        user: {...users[1],  degreeOfInvolvement: getRandomInvolvement()},
        detail: {
            cause: 'Клиент просматривал билеты на много направлений, а также летал в прошлом году в это время на это направление',
            groupAttendancePercent: 7,
            isPopularAtThisTime: true,
            isPopularInGroup: false,
            wasHere: false,
        },
    },
    {
        id: 4,
        location: "Россия-Чехия",
        archive: false,
        date : "20 декабря - 8 января",
        group: "Менеджеры среднего звена",
        label: "Участники этой группы часто используют это направление в это время",
        participants: [
            ...users.map((user) => ({...user, degreeOfInvolvement: getRandomInvolvement()}))
        ]
    },
    {
        id: 5,
        location: "Россия-Испания",
        archive: false,
        date : "20 декабря - 8 января",
        user: {...users[1],  degreeOfInvolvement: getRandomInvolvement()},
        detail: {
            cause: 'Клиент просматривал билеты на агрегаторах на это направление',
            groupAttendancePercent: 7,
            isPopularAtThisTime: true,
            isPopularInGroup: false,
            wasHere: false,
        },
    },
    {
        id: 6,
        location: "Россия-Куба",
        date: "22 декабря - 1 января",
        archive: false,
        user: {...users[0],  degreeOfInvolvement: getRandomInvolvement()},
        detail: {
            cause: 'Клиент просматривал билеты на много направлений, а также летал в прошлом году в это время на это направление',
            groupAttendancePercent: 7,
            isPopularAtThisTime: true,
            isPopularInGroup: false,
            wasHere: false,
        },
    }
]

export const getDataById = (id: number) => {
    return data.find(el => el.id == id)

}