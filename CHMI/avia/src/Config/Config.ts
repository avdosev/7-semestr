
export const ClientRoutes = {
    index: '/home',
    runCompany: '/runCompany',
    company: {
        template: '/company/:id',
        get: (id: number) => `/company/${id}`
    },

    statistic: {
        template: '/company/:id/statistic',
        get: (id: number) => `/company/${id}/statistic`
    },
    settings: {
        template: '/settings/:id',
        get: (id: number) => `/settings/${id}`
    },
    companyParticipants: {
        template: '/company/:id/users',
        get: (id: number) => `/company/${id}/users`
    },

    archiveCompany: '/archiveCompany'
}

