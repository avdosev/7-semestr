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


export const groups = [
    "Нефтянники",
    "Менеджеры",
    "Разработчики",
    "Сварщики",
]

export const users: User[] = [
    {
        id: 1,
        name: "Иванов Иван Иванович mail@mail.ru",
        group: groups[1]
    },
    {
        id: 2,
        name: "Петров Петр Петрович yandex@mail.ru",
        group: groups[1]
    },
    {
        id: 3,
        name: "Смирнов Константин Петрович yandex@mail.ru",
        group: groups[2]
    },
    {
        id: 4,
        name: "Муравьев Сергей Павлович yandex@mail.ru",
        group: groups[0],
    },
    {
        id: 5,
        name: "Сахаров Петр Константинович yandex@mail.ru",
        group: groups[0]
    }
]


export const data: Array<PersonalCompanyDTO | GroupCompanyDTO>  = [
    {
        id: 1,
        location: "Россия-Чехия",
        archive: true,
        date : "10 июля 2020 - 10 августа  2020",
        group: groups[0],
        label: "Участники этой группы часто используют это направление в это время",
        participants: [
            ...users
                .filter((user) => user.group === groups[0])
                .map((user) => ({...user, degreeOfInvolvement: getRandomInvolvement()}))
        ],
        resulting: 24,
        settings: {
            isAggregatorUse: true,
            isConfirmNeeded: false,
            isGroupVisit: true,
            isHistoricalVisit: true
        }
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
        resulting: 45,
        settings: {
            isAggregatorUse: true,
            isConfirmNeeded: false,
            isGroupVisit: true,
            isHistoricalVisit: true
        }
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
        resulting: 95,
        settings: {
            isAggregatorUse: true,
            isConfirmNeeded: false,
            isGroupVisit: true,
            isHistoricalVisit: true
        }
    },
    {
        id: 4,
        location: "Россия-Нидерланды",
        archive: false,
        date : "20 декабря - 8 января",
        group: groups[1],
        label: "Участники этой группы часто используют это направление в это время",
        participants: [
            ...users
                .filter((user) => user.group === groups[1])
                .map((user) => ({...user, degreeOfInvolvement: getRandomInvolvement()}))
        ],
        resulting: 12,
        settings: {
            isAggregatorUse: true,
            isConfirmNeeded: false,
            isGroupVisit: false,
            isHistoricalVisit: true
        }
    },
    {
        id: 5,
        location: "Россия-Нидерланды",
        archive: false,
        date : "20 декабря - 8 января",
        group: groups[0],
        label: "Участники этой группы часто используют это направление в это время",
        participants: [
            ...users
                .filter((user) => user.group === groups[0])
                .map((user) => ({...user, degreeOfInvolvement: getRandomInvolvement()}))
        ],
        resulting: 35,
        settings: {
            isAggregatorUse: true,
            isConfirmNeeded: false,
            isGroupVisit: true,
            isHistoricalVisit: true
        }
    },
    {
        id: 6,
        location: "Россия-США",
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
        resulting: 89,
        settings: {
            isAggregatorUse: true,
            isConfirmNeeded: false,
            isGroupVisit: true,
            isHistoricalVisit: true
        }
    },
    {
        id: 7,
        location: "Россия-Новая зеландия",
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
        resulting: 67,
        settings: {
            isAggregatorUse: true,
            isConfirmNeeded: false,
            isGroupVisit: true,
            isHistoricalVisit: true
        }
    }
]

export const getDataById = (id: number) => {
    return data.find(el => el.id == id)

}