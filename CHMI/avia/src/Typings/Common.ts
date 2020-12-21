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

export interface CompanyDTO {
    id: number
    location: string,
    date: string,
}

export interface UserInCompany extends User {
    degreeOfInvolvement: string
}

export interface GroupCompanyDTO extends CompanyDTO {
    participants: UserInCompany[]
    label: string
    group: string
}

export interface PersonalCompanyDTO extends CompanyDTO {
    user: UserInCompany
    detail: PersonalCompanyDetailDTO
}