import {dashboard, expenses, transactions, trend} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Főoldal',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Tranzakciok",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Bevételek",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Kiadások",
        icon: expenses,
        link: "/dashboard",
    },
]