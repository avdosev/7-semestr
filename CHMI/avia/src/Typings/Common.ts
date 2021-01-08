export type PersonalCompanyDetailDTO = {
    cause: string
    isPopularInGroup: boolean
    groupAttendancePercent: number
    wasHere: boolean
    isPopularAtThisTime: boolean
}

export type User = {
    id: number
    name: string
    group: string
}

export type Settings = {
    isHistoricalVisit: boolean
    isGroupVisit: boolean
    isAggregatorUse: boolean
    isConfirmNeeded: boolean
}

export interface CompanyDTO {
    id: number
    location: string,
    date: string,
    archive: boolean
    resulting: number // от 0 до 100
    settings: Settings
}

export interface UserInCompany extends User {
    degreeOfInvolvement: string
}

export interface GroupCompanyDTO extends CompanyDTO {
    participants: UserInCompany[]
    label: string
    group: string,
}

export interface PersonalCompanyDTO extends CompanyDTO {
    user: UserInCompany
    detail: PersonalCompanyDetailDTO
}