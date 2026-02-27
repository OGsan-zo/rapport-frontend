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

        // Simulé: On compte les utilisateurs standards
        const standardUsers = MOCK_ALL_USERS.filter(u => u.role === "Utilisateur");
        const totalUsers = standardUsers.length;

        // Simulé: On dit qu'il y a 3 rapports reçus (on pourrait varier selon typeCalendrierId si on voulait pousser le mock)
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
     * Ajoute une nouvelle période en appelant le backend via le proxy Next.js.
     */
    createPeriod: async (dateDebut: string, dateFin: string, typeCalendrierId: number): Promise<CalendarPeriod> => {
        try {
            const response = await fetch("/api/calendriers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dateDebut,
                    dateFin,
                    typeCalendrierId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || errorData.error || `Erreur serveur: ${response.status}`);
            }

            const responseData = await response.json();

            // Symfony retourne souvent l'objet créé sous 'data'
            const newPeriod: CalendarPeriod = responseData.data || responseData;

            // On met quand même à jour le mock local pour la consistance UI immédiate
            // MOCK_PERIODS = [...MOCK_PERIODS, newPeriod];

            return newPeriod;
        } catch (error) {
            console.error("Erreur createPeriod:", error);
            throw error;
        }
    }
};
