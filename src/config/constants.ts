export const APP_CONSTANTS = {
    appName: process.env.NEXT_PUBLIC_APP_NAME || 'ESPA',
    ministryName: process.env.NEXT_PUBLIC_MINISTRY_NAME || 'MESUPRES',
    departmentName: process.env.NEXT_PUBLIC_DEPARTMENT_NAME || 'DSINT',
    departmentFullName: process.env.NEXT_PUBLIC_DEPARTMENT_FULL_NAME || "Direction des Systèmes d'Information et du Numérique Technologique",
    copyright: {
        owner: process.env.NEXT_PUBLIC_COPYRIGHT_OWNER || 'MESUPRES',
        startYear: process.env.NEXT_PUBLIC_COPYRIGHT_YEAR || '2024'
    },
    apiPrefix: '/api'
};

export const IMAGES = {
    LOGO_MESUPRES: "/img/logo_mesupres.png",
    LOGO_REPOBLIKA: "/img/flag-mada-1.jpg",
    LOGO_ESPA: "/img/espa.png",
    LOGO_DSINT: "/img/dsint.png",
    ILLUSTRATION_LOGIN: "/img/login_illustration.svg",
};
