export type PersonalCompanyDTO = {
    name: string
    cause: string
    group: string
    isPopularInGroup: boolean
    groupAttendancePercent: number
    wasHere: boolean
    isPopularAtThisTime: boolean
}

export type CompanyDTO = {
    id: number
    location: string,
    date: string,
    group: string
    label: string
}