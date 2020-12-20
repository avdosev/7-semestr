
export const ClientRoutes = {
    index: '/home',
    runCompany: '/runCompany',
    company: '/company/:id',

    statistic: {
        template: '/company/:id',
        get: (id: number) => `company/${id}`
    },
    settings: '/settings/:id',
    archiveCompany: '/archiveCompany'
}

