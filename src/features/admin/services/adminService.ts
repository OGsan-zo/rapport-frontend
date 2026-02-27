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
    typeCalendrierId?: number;
    typeCalendrierName?: string;
}

// Mock users database
const MOCK_ALL_USERS: User[] = [
    { id: 1, email: "admin@mesupres.gov.mg", entite: "Admin Syst", role: "Admin" },
    { id: 2, email: "agent@mesupres.gov.mg", entite: "Agent DSINT", role: "Utilisateur" },
    { id: 4, email: "jean@mesupres.gov.mg", entite: "Jean Rakoto", role: "Utilisateur" },
    { id: 5, email: "marie@mesupres.gov.mg", entite: "Marie Randria", role: "Utilisateur" },
    { id: 6, email: "paul@mesupres.gov.mg", entite: "Paul Rabary", role: "Utilisateur" },
];

let MOCK_PERIODS: CalendarPeriod[] = [
    { id: 1, dateDebut: "2026-02-23", dateFin: "2026-02-27", typeCalendrierName: "Hebdomadaire" },
    { id: 2, dateDebut: "2026-03-02", dateFin: "2026-03-06", typeCalendrierName: "Hebdomadaire" },
];

export const adminService = {
    /**
     * Calcule les statistiques de conformité sur une période.
     */
    getStats: async (dateDebut: string, dateFin: string, typeCalendrierId?: number): Promise<AdminStats> => {
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Simulation de données filtrées
        const modifier = typeCalendrierId ? (typeCalendrierId * 10) : 0;

        return {
            totalUsers: 120 + modifier,
            reportsReceived: 95 + (modifier / 2),
            missingUsers: 25 + (modifier / 4),
        };
    },

    /**
     * Liste les utilisateurs n'ayant pas envoyé de rapport.
     */
    getMissingUsers: async (dateDebut: string, dateFin: string): Promise<User[]> => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Simulé: Jean et Paul n'ont pas envoyé
        return MOCK_ALL_USERS.filter(u => u.email.includes("jean") || u.email.includes("paul"));
    },
};
