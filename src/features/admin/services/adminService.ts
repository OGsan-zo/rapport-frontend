import { RapportConsolide } from "../../rapports/types";
import { User } from "../../auth/types";

export interface AdminStats {
    totalUsers: number;
    reportsReceived: number;
    missingUsers: number;
}

export interface CalendarPeriod {
    id: number;
    dateDebut: string;
    dateFin: string;
}

// Mock users database
const MOCK_ALL_USERS: User[] = [
    { id: "001", email: "admin@mesupres.gov.mg", nom: "Admin Syst", role: "ADMIN" },
    { id: "002", email: "agent@mesupres.gov.mg", nom: "Agent DSINT", role: "USER" },
    { id: "004", email: "jean@mesupres.gov.mg", nom: "Jean Rakoto", role: "USER" },
    { id: "005", email: "marie@mesupres.gov.mg", nom: "Marie Randria", role: "USER" },
    { id: "006", email: "paul@mesupres.gov.mg", nom: "Paul Rabary", role: "USER" },
];

let MOCK_PERIODS: CalendarPeriod[] = [
    { id: 1, dateDebut: "2026-02-23", dateFin: "2026-02-27" },
    { id: 2, dateDebut: "2026-03-02", dateFin: "2026-03-06" },
];

export const adminService = {
    /**
     * Calcule les statistiques de conformité sur une période.
     */
    getStats: async (dateDebut: string, dateFin: string): Promise<AdminStats> => {
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Simulé: On compte les utilisateurs standards
        const standardUsers = MOCK_ALL_USERS.filter(u => u.role === "USER");
        const totalUsers = standardUsers.length;

        // Simulé: On dit qu'il y a 3 rapports reçus
        const reportsReceived = 3;
        const missingUsers = totalUsers - reportsReceived;

        return { totalUsers, reportsReceived, missingUsers };
    },

    /**
     * Liste les utilisateurs n'ayant pas envoyé de rapport.
     */
    getMissingUsers: async (dateDebut: string, dateFin: string): Promise<User[]> => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Simulé: Jean et Paul n'ont pas envoyé
        return MOCK_ALL_USERS.filter(u => u.email.includes("jean") || u.email.includes("paul"));
    },

    /**
     * Liste les périodes du calendrier.
     */
    getPeriods: async (): Promise<CalendarPeriod[]> => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return MOCK_PERIODS;
    },

    /**
     * Ajoute une nouvelle période.
     */
    createPeriod: async (dateDebut: string, dateFin: string): Promise<CalendarPeriod> => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const newPeriod: CalendarPeriod = {
            id: MOCK_PERIODS.length + 1,
            dateDebut,
            dateFin
        };
        MOCK_PERIODS = [...MOCK_PERIODS, newPeriod];
        return newPeriod;
    }
};
