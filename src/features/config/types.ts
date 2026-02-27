export interface TypeCalendrier {
    id: number;
    name: string;
}

export interface CalendarPeriod {
    id: number;
    dateDebut: string;
    dateFin: string;
    typeCalendrierId?: number;
    typeCalendrierName?: string;
    typeCalendrier?: TypeCalendrier;
}
