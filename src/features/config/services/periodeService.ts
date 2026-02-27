import { CalendarPeriod } from "../types";
import { User } from "../../auth/types";
import { useFetchAuth } from "@/hooks/useFetchAuth";


const fetchAuth = useFetchAuth();
export const periodeService = {
    /**
     * Liste les périodes du calendrier depuis le backend Symfony via le proxy Next.js.
     */
    getPeriods: async (): Promise<CalendarPeriod[]> => {
        try {
            const response = await fetchAuth("/api/calendriers", {
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
            // console.error("Erreur getPeriods:", error);
            throw error;
        }
    },

    /**
     * Ajoute une nouvelle période en appelant le backend via le proxy Next.js.
     */
    createPeriod: async (dateDebut: string, dateFin: string, typeCalendrierId: number): Promise<CalendarPeriod> => {
        try {
            const response = await fetchAuth("/api/calendriers", {
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
            return responseData.data || responseData;
        } catch (error) {
            // console.error("Erreur createPeriod:", error);
            throw error;
        }
    },

    /**
     * Récupère la liste des utilisateurs en retard pour un calendrier donné.
     */
    getLateUsers: async (idCalendrier: number | string): Promise<User[]> => {
        try {
            const response = await fetchAuth(`/api/admin/retard?idCalendrier=${idCalendrier}`, {
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
            // console.error("Erreur getLateUsers:", error);
            throw error;
        }
    }
};
