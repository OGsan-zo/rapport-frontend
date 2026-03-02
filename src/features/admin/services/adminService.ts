import { User } from "../../auth/types";
import { useFetchAuth } from "@/hooks/useFetchAuth";
import { CalendarPeriod } from "@/features/rapports/types/calendrier/calendrierType";
export interface AdminStats {
    totalUsers: number;
    reportsReceived: number;
    missingUsers: number;
}

export interface TypeCalendrier {
    id: number;
    name: string;
}


let MOCK_PERIODS: CalendarPeriod[] = [
    {
        id: 1,
        dateDebut: "2026-02-23 00:00:00",
        dateFin: "2026-02-27 00:00:00",
        typeCalendrier: {
            id: 1, // J'ai ajouté un ID fictif pour respecter l'interface
            name: "Hebdomadaire"
        }
    },
    {
        id: 2,
        dateDebut: "2026-03-02 00:00:00",
        dateFin: "2026-03-06 00:00:00",
        typeCalendrier: {
            id: 1,
            name: "Hebdomadaire"
        }
    },
];
const fetchAuth = useFetchAuth();

export const adminService = {

    /**
     * Récupère la liste de tous les utilisateurs via le backend.
     */
    getAllUtilisateurs: async (): Promise<User[]> => {
        try {
            const response = await fetchAuth("/api/utilisateurs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store"
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || errorData.error || `Erreur serveur: ${response.status}`);
            }

            const responseData = await response.json();
            return responseData.data || responseData;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Crée un nouvel utilisateur dans le backend.
     */
    createUser: async (data: any): Promise<User> => {
        try {
            const response = await fetchAuth("/api/utilisateurs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || errorData.error || `Erreur serveur: ${response.status}`);
            }

            const responseData = await response.json();
            return responseData.data || responseData;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Récupère un utilisateur par son ID.
     */
    getUserById: async (id: number): Promise<User> => {
        try {
            const response = await fetchAuth(`/api/utilisateurs?id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store"
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || errorData.error || `Erreur serveur: ${response.status}`);
            }

            const responseData = await response.json();
            return responseData.data || responseData;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Met à jour les informations d'un utilisateur.
     */
    updateUser: async (id: number, data: any): Promise<User> => {
        try {
            const response = await fetchAuth(`/api/utilisateurs?id=${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || errorData.error || `Erreur serveur: ${response.status}`);
            }

            const responseData = await response.json();
            return responseData.data || responseData;
        } catch (error) {
            throw error;
        }
    },
};
